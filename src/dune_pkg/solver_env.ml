open Import

module Variable = struct
  module Sys = struct
    module T = struct
      type t =
        [ `Arch
        | `Os
        | `Os_version
        | `Os_distribution
        | `Os_family
        ]

      let to_string = function
        | `Arch -> "arch"
        | `Os -> "os"
        | `Os_version -> "os-version"
        | `Os_distribution -> "os-distribution"
        | `Os_family -> "os-family"
      ;;

      let compare a b = String.compare (to_string a) (to_string b)
      let to_dyn t = Dyn.string (to_string t)
      let all = [ `Arch; `Os; `Os_version; `Os_distribution; `Os_family ]
    end

    include T

    let of_string_opt s = List.find all ~f:(fun t -> String.equal s (to_string t))

    let decode =
      let open Decoder in
      let+ loc, name = located string in
      match of_string_opt name with
      | Some t -> t
      | None ->
        User_error.raise
          ~loc
          [ Pp.textf "No such sys variable: %s" (String.maybe_quoted name)
          ; Pp.textf
              "Valid variables: %s"
              (String.enumerate_and
                 (List.map T.all ~f:(fun v -> String.maybe_quoted @@ to_string v)))
          ]
    ;;

    module Map = Map.Make (T)

    module Bindings = struct
      type t = string Map.t

      let empty = Map.empty
      let to_dyn = Map.to_dyn Dyn.string
      let equal = Map.equal ~equal:String.equal
      let set = Map.set
      let get = Map.find

      let decode =
        let open Decoder in
        let+ loc, bindings = located (repeat (pair decode string)) in
        match Map.of_list bindings with
        | Ok t -> t
        | Error (duplicate_key, a, b) ->
          User_error.raise
            ~loc
            [ Pp.textf
                "Duplicate entries for sys variable %s (%s, %s)"
                (String.maybe_quoted (to_string duplicate_key))
                (String.maybe_quoted a)
                (String.maybe_quoted b)
            ]
      ;;

      let extend t t' = Map.superpose t' t

      let pp t =
        Pp.enumerate all ~f:(fun variable ->
          match Map.find t variable with
          | Some value ->
            Pp.textf "%s = %s" (to_string variable) (String.maybe_quoted value)
          | None -> Pp.textf "%s (unset)" (to_string variable))
      ;;
    end
  end

  module Const = struct
    type t = [ `Opam_version ]

    let to_string = function
      | `Opam_version -> "opam-version"
    ;;

    let all = [ `Opam_version ]
    let of_string_opt s = List.find all ~f:(fun t -> String.equal s (to_string t))

    module Bindings = struct
      type t = { opam_version : string }

      let to_dyn { opam_version } = Dyn.(record [ "opam_version", string opam_version ])
      let equal { opam_version } t = String.equal opam_version t.opam_version

      let get { opam_version } = function
        | `Opam_version -> opam_version
      ;;

      let pp { opam_version } =
        Pp.enumerate
          [ `Opam_version, opam_version ]
          ~f:(fun (variable, value) -> Pp.textf "%s = %s" (to_string variable) value)
      ;;
    end

    let bindings = { Bindings.opam_version = OpamVersion.to_string OpamVersion.current }
  end

  type t =
    | Sys of Sys.t
    | Const of Const.t

  let of_string_opt string =
    match Sys.of_string_opt string with
    | Some sys -> Some (Sys sys)
    | None -> Const.of_string_opt string |> Option.map ~f:(fun const -> Const const)
  ;;
end

type t =
  { sys : Variable.Sys.Bindings.t
  ; const : Variable.Const.Bindings.t
  ; repos : Workspace.Repository.Name.t list
  }

module Fields = struct
  let sys = "sys"
  let const = "const"
  let repos = "repositories"
end

let default =
  { sys = Variable.Sys.Bindings.empty
  ; const = Variable.Const.bindings
  ; repos = [ Workspace.Repository.Name.of_string "default" ]
  }
;;

let repos_of_ordered_set ordered_set =
  Dune_lang.Ordered_set_lang.eval
    ordered_set
    ~parse:(fun ~loc string -> Workspace.Repository.Name.parse_string_exn (loc, string))
    ~eq:Workspace.Repository.Name.equal
    ~standard:default.repos
;;

let decode =
  let open Decoder in
  fields
  @@
  let+ sys = field Fields.sys ~default:default.sys Variable.Sys.Bindings.decode
  and+ repos = Dune_lang.Ordered_set_lang.field Fields.repos in
  let const = default.const in
  let repos = repos_of_ordered_set repos in
  { sys; const; repos }
;;

let to_dyn { sys; const; repos } =
  Dyn.record
    [ Fields.sys, Variable.Sys.Bindings.to_dyn sys
    ; Fields.const, Variable.Const.Bindings.to_dyn const
    ; Fields.repos, Dyn.list Workspace.Repository.Name.to_dyn repos
    ]
;;

let equal { sys; const; repos } t =
  Variable.Sys.Bindings.equal sys t.sys
  && Variable.Const.Bindings.equal const t.const
  && List.equal Workspace.Repository.Name.equal repos t.repos
;;

let sys { sys; _ } = sys
let set_sys t sys = { t with sys }
let repos { repos; _ } = repos

let pp =
  let pp_section heading pp_section =
    (* The hbox is to prevent long values in [pp_section] from causing the heading to wrap. *)
    let pp_heading = Pp.hbox (Pp.text heading) in
    Pp.concat ~sep:Pp.space [ pp_heading; pp_section ] |> Pp.vbox
  in
  fun { sys; const; repos } ->
    Pp.enumerate
      ~f:Fun.id
      [ pp_section "System Environment Variables" (Variable.Sys.Bindings.pp sys)
      ; pp_section "Constants" (Variable.Const.Bindings.pp const)
      ; pp_section
          "Repositories"
          (Pp.chain repos ~f:(fun r -> Workspace.Repository.Name.pp r))
      ]
;;

module Variable_value = struct
  type t =
    | String of string
    | Unset_sys
end

let get t variable =
  match (variable : Variable.t) with
  | Const const -> Variable_value.String (Variable.Const.Bindings.get t.const const)
  | Sys sys ->
    (match Variable.Sys.Bindings.get t.sys sys with
     | Some value -> String value
     | None -> Unset_sys)
;;
