# Content Patterns

Content patterns define repeatable structures for common interface communication.

Patterns ensure consistency across the product and allow AI systems to generate predictable UI messaging.

A pattern defines:

- the purpose of the message
- the structure of the content
- the level of detail

Patterns prevent inconsistent messaging across features and components.

---

## Rules

- use patterns for recurring UI communication
- keep pattern structures consistent
- avoid inventing new structures for similar situations
- prioritize clarity and task completion
- keep messages concise

---

## Error Pattern

Error messages communicate that an action failed and help the user recover.

### Structure

Problem  
Optional explanation  
Suggested action

### Example

Upload failed.  
The file exceeds the maximum size.  
Try uploading a smaller file.

### Rules

- clearly describe the problem
- avoid technical language
- provide a recovery action when possible

### Avoid

Unexpected error occurred.

---

## Success Pattern

Success messages confirm that an action completed.

### Structure

Action completed  
Optional result information

### Example

Project created.

### Example with detail

Changes saved.  
Your settings are now updated.

### Rules

- keep messages short
- confirm the completed action

---

## Loading Pattern

Loading messages communicate that the system is processing.

### Structure

Verb + object

### Examples

Saving changes…  
Uploading file…  
Generating report…  
Analyzing document…

### Rules

- avoid full sentences
- describe the operation in progress

---

## Empty State Pattern

Empty states explain why a view contains no data and guide the next action.

### Structure

State description  
Primary action suggestion

### Example

No projects yet.  
Create your first project to get started.

### Rules

- clearly explain the empty state
- suggest a meaningful next action

---

## Confirmation Pattern

Confirmation dialogs ensure the user understands an important or destructive action.

### Structure

Action summary  
Consequence explanation  
Primary action  
Secondary action

### Example

Delete project?

This action cannot be undone.

Delete project  
Cancel

### Rules

- clearly state the action
- describe irreversible consequences
- avoid vague confirmation dialogs

### Avoid

Are you sure?

---

## Form Validation Pattern

Validation messages guide users to correct input.

### Structure

Field problem  
Correction guidance

### Example

Email address is not valid.  
Enter a valid email address.

### Rules

- reference the field clearly
- provide a fix

### Avoid

Invalid value.

---

## Notification Pattern

Notifications communicate system events that occur outside the immediate interaction.

### Structure

Event summary  
Optional context  
Optional action

### Example

File uploaded successfully.

View file

### Rules

- keep notifications concise
- avoid long explanations

---

## AI Response Pattern

AI-generated responses must remain structured and easy to scan.

### Structure

Result  
Optional explanation  
Optional suggested next step

### Example

Summary generated.

The document focuses on quarterly revenue trends and market expansion.

You can refine the summary or generate key insights.

### Rules

- present the result first
- keep explanations concise
- avoid speculative language

---

## Onboarding Pattern

Onboarding helps users understand a feature and start using it.

### Structure

Feature introduction  
Value explanation  
Primary action

### Example

Create your first project.

Projects help you organize tasks and collaborate with your team.

Create project

### Rules

- keep onboarding concise
- avoid marketing language
- guide the first useful action

---

## Decision Model for AI

When generating UI messaging:

1. determine the communication type
2. select the correct content pattern
3. follow the pattern structure
4. keep the message concise
5. ensure terminology matches the product vocabulary

---

## AI Implementation Rules

When generating UI content, AI must follow these rules:

- select a defined content pattern before generating text
- follow the pattern structure
- avoid inventing new message structures
- keep messages concise
- maintain consistent terminology
- prioritize clarity and task completion
- avoid decorative or promotional language
