window.BENCHMARK_DATA = {
  "lastUpdate": 1672798530379,
  "repoUrl": "https://github.com/ocaml/dune",
  "entries": {
    "Melange Benchmark": [
      {
        "commit": {
          "author": {
            "email": "javier.chavarri@gmail.com",
            "name": "Javier Chávarri",
            "username": "jchavarri"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "905247a2e69cbc0a10fd86a314504e4103eaf40c",
          "message": "melange: add build benchmark to ci (#6791)\n\nSigned-off-by: Javier Chávarri <javier.chavarri@gmail.com>",
          "timestamp": "2022-12-29T15:53:30-06:00",
          "tree_id": "06291f117daf78ff12d184f40b41ec0b3755bd2b",
          "url": "https://github.com/ocaml/dune/commit/905247a2e69cbc0a10fd86a314504e4103eaf40c"
        },
        "date": 1672352576731,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "pupilfirst build time (Linux)",
            "value": "41.88697116556667",
            "unit": "seconds"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "me@rgrinberg.com",
            "name": "Rudi Grinberg",
            "username": "rgrinberg"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "752ba97135b04d1f5e4a4c171bd35f3551e73c65",
          "message": "test(melange): include_subdirs (#6810)\n\ntest should include .js paths to show that they're currently wrong\r\n\r\nSigned-off-by: Rudi Grinberg <me@rgrinberg.com>",
          "timestamp": "2022-12-29T16:46:32-06:00",
          "tree_id": "08bc84c1c9e4ad86e6b817bde15acc4d309d9003",
          "url": "https://github.com/ocaml/dune/commit/752ba97135b04d1f5e4a4c171bd35f3551e73c65"
        },
        "date": 1672355228489,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "pupilfirst build time (Linux)",
            "value": "38.341008513940004",
            "unit": "seconds"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "me@rgrinberg.com",
            "name": "Rudi Grinberg",
            "username": "rgrinberg"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "344f618d035ccb12fea78f4f8bb3996d0192fd3c",
          "message": "chore(fiber): add pool benchmarks (#6813)\n\nBenchmark the Fiber.Pool implementation\r\n\r\nSigned-off-by: Rudi Grinberg <me@rgrinberg.com>",
          "timestamp": "2022-12-30T00:44:54-06:00",
          "tree_id": "7bbb1f43a7b7bb7a2ccea15b16cf5dff87145f82",
          "url": "https://github.com/ocaml/dune/commit/344f618d035ccb12fea78f4f8bb3996d0192fd3c"
        },
        "date": 1672384014418,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "pupilfirst build time (Linux)",
            "value": "40.397050457726664",
            "unit": "seconds"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "me@rgrinberg.com",
            "name": "Rudi Grinberg",
            "username": "rgrinberg"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "cf96d82837dd422391bac47cdc747b098018ee65",
          "message": "test(fiber): Pool.{run,stop} tests (#6812)\n\n* double running a pool should be forbidden\r\n* stopping and then running is allowed\r\n\r\nSigned-off-by: Rudi Grinberg <me@rgrinberg.com>",
          "timestamp": "2022-12-30T01:30:13-06:00",
          "tree_id": "8cab5ec95b4e1b7d2198aa94fe0f7b6dd28ca90a",
          "url": "https://github.com/ocaml/dune/commit/cf96d82837dd422391bac47cdc747b098018ee65"
        },
        "date": 1672390817074,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "pupilfirst build time (Linux)",
            "value": "38.03061777441334",
            "unit": "seconds"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "me@rgrinberg.com",
            "name": "Rudi Grinberg",
            "username": "rgrinberg"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "b1ae0c773116e53a911d934cbdb9f6d5dbbe25ff",
          "message": "refactor(rpc): distinguish Timeout from Shutdown (#6802)\n\nWhen the scheduler shuts down due to a timeout (during testing), we\r\nclarify this in the error message.\r\n\r\nSigned-off-by: Rudi Grinberg <me@rgrinberg.com>",
          "timestamp": "2022-12-31T09:10:03-06:00",
          "tree_id": "42d5b03f36bae68c7f64240f6fff18c88fa53f27",
          "url": "https://github.com/ocaml/dune/commit/b1ae0c773116e53a911d934cbdb9f6d5dbbe25ff"
        },
        "date": 1672500975994,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "pupilfirst build time (Linux)",
            "value": "48.57778337701334",
            "unit": "seconds"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "alizter@gmail.com",
            "name": "Ali Caglayan",
            "username": "Alizter"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "1b6570f7011cc21a53fa7bb3a5cd077aa84c69b2",
          "message": "fix(dune_console): print missing newline after dune exec (#6821)\n\nSigned-off-by: Ali Caglayan <alizter@gmail.com>",
          "timestamp": "2023-01-03T19:44:06-06:00",
          "tree_id": "b66f046a22726b54e56eb46d6beac2cae19a2f9d",
          "url": "https://github.com/ocaml/dune/commit/1b6570f7011cc21a53fa7bb3a5cd077aa84c69b2"
        },
        "date": 1672798529027,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "pupilfirst build time (Linux)",
            "value": "38.658632765246665",
            "unit": "seconds"
          }
        ]
      }
    ]
  }
}