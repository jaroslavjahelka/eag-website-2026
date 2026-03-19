# Loading Patterns

Loading should communicate progress without creating uncertainty.

## Rules

- acknowledge loading quickly
- preserve layout stability where possible
- use skeletons when structure is known
- use spinners when the structure is unknown or tiny
- long operations should explain what is happening

## Threshold guidance

- instant or near-instant: minimal visible transition
- short wait: subtle loading indicator
- longer wait: explicit loading state or skeleton
- very long wait: progress or status explanation

## Avoid

- blank screens without explanation
- major layout jumps after loading
- endless loading with no next action
