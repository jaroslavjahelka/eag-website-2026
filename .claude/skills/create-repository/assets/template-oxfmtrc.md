# `oxfmtrc.json` config

```json
{
  "$schema": "./node_modules/oxfmt/configuration_schema.json",
  "ignorePatterns": [],
  "experimentalTailwindcss": {
    "attributes": ["class", "className"],
    "functions": ["clsx", "cn", "tv"],
    "preserveDuplicates": false,
    "preserveWhitespace": false
  },
  "experimentalSortImports": {
    "groups": [
      ["side_effect"],
      ["value-builtin"],
      ["value-external", "type-external"],
      ["value-internal", "type-internal"],
      ["value-parent", "type-parent"],
      ["value-sibling", "type-sibling"],
      ["value-index", "type-index"]
    ]
  }
}
```
