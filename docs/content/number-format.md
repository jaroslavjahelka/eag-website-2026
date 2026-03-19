# Number Format

Number formatting defines how quantitative values are rendered across the product.
It is a foundational system used by currency, measurements, percentages, reporting, and data display.

## Rules

- separate raw numeric value from rendered output
- use one canonical formatter across the product
- never hard-code separators or grouping in components
- keep units optional
- treat formatting as configuration, not component logic

## Scope

This system defines:

- decimal places
- decimal separator
- group separator
- grouping style
- optional unit display

This system does not define:

- currency formatting
- exchange rates
- unit conversion
- measurement-system logic
- business calculations

## System model

Number formatting consists of three layers:

1. numeric value
2. formatting profile
3. rendered output

## Numeric value

Numeric value is the raw quantity before formatting.

Examples:

- `10`
- `10.5`
- `1000000`
- `-1234.567`

### Rules

- raw values must stay free of visual separators
- raw values must not contain units
- formatting is applied only at render time

## Formatting profile

Formatting profile defines how a number is displayed.

| Field              | Description                                   |
| ------------------ | --------------------------------------------- |
| `hasUnit`          | Whether the rendered number includes a unit   |
| `unitType`         | Unit resolved from the measurement system     |
| `decimalPlaces`    | Number of visible decimal digits              |
| `decimalSeparator` | Separator between integer and fractional part |
| `groupSeparator`   | Separator between digit groups                |
| `groupingStyle`    | Grouping pattern such as `3-3-3` or `2-2-3`   |

### Rules

- units are optional
- separators must be configurable
- grouping must be configurable independently of separators
- visible precision must be explicit

## Units

Numbers may optionally include units.
Units are not part of the numeric value itself. They are semantic metadata attached during rendering.

Unit labels should be resolved from the measurement system.

Examples:

- `10`
- `10 kg`
- `1.5 l`
- `120 s`

## Rendered output

Rendered output is the final visible value shown in UI.

It is the result of:

`numeric value + formatting profile + optional unit`

Examples:

- `10`
- `10,00`
- `10.00`
- `1 000 000,00`
- `1,000,000.00`
- `10 kg`

## Decimal places

Decimal places define visible precision.

Common values:

- `0`
- `2`
- `3`

Examples:

- `10`
- `10.00`
- `10.000`

### Rules

- decimal precision must be configurable
- display precision must not define calculation precision

## Decimal separator

Decimal separator splits integer and fractional parts.

Common values:

- `,`
- `.`
- `'`

Examples:

- `10,50`
- `10.50`

## Group separator

Group separator splits large numbers into readable groups.

Common values:

- space
- `,`
- `.`
- `'`

Examples:

- `1 000 000`
- `1,000,000`
- `1.000.000`
- `1'000'000`

## Grouping style

Grouping style defines how digits are chunked.

Common patterns:

- no grouping: `123456789`
- standard grouping: `123 456 789`
- partial grouping: `123456 789`
- Indian grouping: `12 34 56 789`

### Rules

- grouping style must be configurable
- grouping style and separator are separate settings

## Configuration UI

A configuration surface for number formatting should usually include:

- unit on / off toggle
- unit type selector
- decimal places selector
- decimal separator selector
- group separator selector
- grouping style selector
- live preview

Recommended preview values:

- `10`
- `10.25`
- `1000`
- `1000000.5`

## Design-system guidance

Number formatting belongs to the system layer, not to individual components.

### Rules

- components should consume formatted values
- components should not implement separators locally
- units should come from the measurement system
- dense data UI should prefer stable, explicit formatting

## Relationship to other systems

Number formatting is a base system.

It is extended by:

- currency formatting
- measurement formatting
- percentage formatting
- reporting and analytics views

Currency formatting adds currency identity and currency display rules.
Measurement formatting adds unit resolution and measurement-system rules.

## Summary

Number formatting defines how numeric values are rendered in a consistent and configurable way across the product.
It separates raw values from presentation and treats units as an optional semantic layer above the core number.
