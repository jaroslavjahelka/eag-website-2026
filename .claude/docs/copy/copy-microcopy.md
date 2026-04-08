# Microcopy

Defines how the interface communicates actions, states, and guidance in support of interaction and task completion. It must remain concise, predictable, and easy to scan, so users can understand what to do, what is happening, and what happens next without friction.

---

## Rules

- text must remain concise and functional
- prefer clear action wording over descriptive language
- keep structure consistent across components

---

## Error messages

Error messages communicate that an action failed and help the user recover.

- clearly explain what went wrong (`Email address is not valid.`)
- describe how to fix the issue (`Try uploading a smaller file.`)
- avoid technical error codes in user-facing UI unless genuinely useful

---

## Success messages

Success messages confirm that an action completed.

- confirm the completed action (`Changes saved.`)
- reference the field clearly

---

## Loading messages

Loading messages communicate ongoing system activity.

- describe the operation in progress (`Saving changes…`)
- avoid full sentences

---

## Confirmation messages

Confirmation dialogs ensure the user understands an important or destructive action.

- clearly state the action (`Delete project?`)
- describe irreversible consequences (`This action cannot be undone.`)

---

## Placeholders

Placeholders provide examples, not instructions.

- use examples when useful (`name@example.com`)
- placeholders must never replace labels

---

## Helper text

Helper text provides additional guidance when necessary.

- use helper text only when clarification is required (`Must contain at least 8 characters.`)

---

## Links

Links represent navigation.

- describe the destination or outcome (`View documentation`)
- avoid generic link wording (`Click here`)

---
