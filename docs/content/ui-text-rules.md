# UI Text Rules

UI text defines how the interface communicates actions, states, and guidance.

UI copy must remain concise, predictable, and easy to scan.  
Text in the interface exists to support interaction and task completion.

UI text is not narrative content.

---

## Rules

- UI text must remain concise and functional
- prefer clear action wording over descriptive language
- avoid unnecessary punctuation or decoration
- write labels that match the user’s task
- keep structure consistent across components
- avoid ambiguity in interactive elements
- every UI element must communicate a clear purpose

---

## Capitalization

Use **sentence case** for all UI text.

Rules:

- capitalize only the first word and proper nouns
- avoid title case in UI labels
- maintain consistent casing across the interface

Examples

**Good**

Create project  
Upload file

**Avoid**

Create Project  
UPLOAD FILE

---

## Buttons

Buttons represent actions.  
Button labels should describe the action that will occur.

Rules:

- prefer verbs
- keep labels short
- avoid vague wording

Examples

**Good**

Save  
Create project  
Upload file  
Continue

**Avoid**

Submit  
Confirm action  
Proceed with operation

---

## Destructive Buttons

Destructive actions must clearly communicate consequences.

Rules:

- name the exact destructive action
- avoid generic wording

Examples

**Good**

Delete project

**Avoid**

Confirm  
Remove item

---

## Links

Links represent navigation.

Rules:

- describe the destination or outcome
- avoid generic link wording

Examples

**Good**

View documentation  
Open settings

**Avoid**

Click here  
Learn more

---

## Form Labels

Form labels must clearly identify the required input.

Rules:

- labels should be nouns describing the field
- avoid full sentences
- labels must remain stable across the system

Examples

**Good**

Email  
Project name  
Password

**Avoid**

Enter your email here

---

## Placeholders

Placeholders provide examples, not instructions.

Rules:

- placeholders must never replace labels
- keep placeholders short
- use examples when useful

Examples

**Good**

name@example.com

**Avoid**

Please type your email

---

## Helper Text

Helper text provides additional guidance when necessary.

Rules:

- use helper text only when clarification is required
- keep helper text short
- avoid repeating the label

Example

Label

Password

Helper text

Must contain at least 8 characters.

---

## Error Messages

Error messages must explain the problem and how to fix it.

Rules:

- clearly describe the issue
- suggest the correction
- avoid technical terminology

Examples

**Good**

Password must contain at least 8 characters.  
Email address is not valid.

**Avoid**

Invalid input  
Error 402

---

## Success Messages

Success messages confirm that an action completed successfully.

Rules:

- keep messages short
- confirm the completed action

Examples

**Good**

Project created.  
Changes saved.

**Avoid**

Everything worked perfectly.

---

## Loading States

Loading messages communicate ongoing system activity.

Rules:

- keep messages minimal
- describe the action in progress

Examples

Uploading file…  
Saving changes…  
Generating report…

---

## Empty States

Empty states should guide the next action.

Rules:

- explain why the space is empty
- suggest a useful action

Example

No projects yet.  
Create your first project to get started.

---

## AI Interface Text

AI-related UI should remain clear and grounded.

Rules:

- describe AI actions clearly
- avoid anthropomorphic language
- avoid implying certainty when output is probabilistic

Examples

**Good**

Generate summary  
Improve writing

**Avoid**

Let the AI think for you

---

## Decision Model for AI

When generating UI text:

1. identify the component type
2. determine the user’s intended action
3. write the shortest clear label
4. ensure wording matches system terminology
5. remove unnecessary words

---

## AI Implementation Rules

When generating UI text, AI must follow these rules:

- write concise labels
- prefer verbs for actions
- use sentence case
- avoid vague wording
- maintain consistent terminology
- ensure every label describes a clear action or input
- avoid marketing language in UI components
