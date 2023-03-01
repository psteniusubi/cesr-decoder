# CESR

https://weboftrust.github.io/ietf-cesr/draft-ssmith-cesr.html

## codex.json

Map selector to name. Generated automatically

```json
{
    "Matter": {
        "A": "Ed25519_Seed",
        ...
    },
    "Indexer": {
        "A": "Ed25519_Sig",
        ...
    },
    "Counter": {
        "-A": "ControllerIdxSigs",
        ...
    }
}
```

## sizes.json

Map selector to code parameters. Generated automatically

```json
{
  "Matter": {
    "A": {"hs": 1,"ss": 0,"fs": 44,"ls": 0},
    ...
  "Indexer": {
    "A": {"hs": 1,"ss": 1,"os": 0,"fs": 88,"ls": 0},
    ...
  },
  "Counter": {
    "-A": {"hs": 2,"ss": 2,"fs": 4,"ls": 0},
  }
}
```

## names.json

List all names as a sorted array. Generated automatically

```json
[
  "AttachedMaterialQuadlets",
  "Big",
  "BigAttachedMaterialQuadlets",
  ...
]
```

## counter.json

Maintain manually.

Define number of entries in a group with `count` parameter, ie `-A`, `-B`, `-C` and `-D` selectors.

Define context specific tables with `context` parameter, ie `-A` and `-B` selectors.

If `count` is missing then specifies number of quadlets, ie `-V` selector.

Possible values for `count`

- `"*1"` = `size * 1`
- `"*2"` = `size * 2`
- `"*3"` = `size * 3`
- `"*4"` = `size * 4`
- `"*2+1"` = `size * 2 + 1`

```json
{
    "Counter": {
        "-A": {
            "context": "Indexer",
            "count": "*1",
        },
        "-B": {
            "context": "Indexer",
            "count": "*1",
        },
        "-C": {
            "count": "*2",
        },
        "-D": {
            "count": "*4",
        },
        ...
        "-K": {
            "count": "*2+1" 
        },
        ...
        "-V": {
        },
        ...       
        "--AAA": {
            "context": "Matter"
        }
    }
}
```

## default_sizes.json

Maintain manually.

Default sizes for (otherwise unknown) codes based on CESR specification. Match codes using regular expression.

```json
{
    "Matter": {
        "[:alpha:]{1}": {
            "hs": 1,
            "ss": 0
        },
        ...
    }
}
```

For improved readability the regular expressions use `[:alpha:]` and `[:base64]` templates. 

Regex details 

- `[:alpha:]` is `[A-Za-z]`
- `[:base64:]` is `[A-Za-z0-9_-]`
- `(?P<name>` is (python) prefix for named group. In JavaScript the prefix is `(?<name>`
