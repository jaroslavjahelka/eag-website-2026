# Currency Format

Currency formatting defines how monetary values are identified, configured, and rendered across the product.
Good currency formatting makes values unambiguous, comparable, and locally readable.

## Rules

- separate currency identity from visual formatting
- separate formatting rules from business policy
- never infer locale from currency alone
- use one canonical formatter across the product
- prefer explicit output when ambiguity is possible
- preview formatted output wherever configuration is editable

## System model

Currency formatting should be understood as four distinct layers:

1. currency identity
2. formatting profile
3. product policy
4. rendered output

Each layer solves a different problem.

## Currency identity

Currency identity defines the monetary unit itself. It answers: **what currency is this?**

Use ISO 4217 as the canonical source.

### Required fields

| Field          | Description                                                   |
| -------------- | ------------------------------------------------------------- |
| `code`         | ISO 4217 alphabetic code, for example `CZK`, `EUR`, `USD`     |
| `numeric`      | ISO 4217 numeric code, for example `203`                      |
| `name`         | Human-readable currency name                                  |
| `symbol`       | Default currency symbol, for example `Kč`, `€`, `$`           |
| `minorUnit`    | Default number of decimal places, usually `0`, `2`, or `3`    |
| `countryCodes` | Related ISO 3166-1 country codes; may contain multiple values |

### Rules

- currency identity must be stable and ISO-based
- one currency may be linked to multiple countries
- country must not be used as a substitute for currency
- currency identity does not define final visual output by itself

## Formatting profile

Formatting profile defines how a monetary value is shown. It answers: **how should this value look?**

### Formatting fields

| Field              | Description                                                 |
| ------------------ | ----------------------------------------------------------- |
| `decimalPlaces`    | Number of visible decimal digits                            |
| `decimalSeparator` | Separator between integer and fractional part               |
| `groupSeparator`   | Separator between digit groups                              |
| `groupingStyle`    | Grouping pattern such as `3-3-3` or `2-2-3`                 |
| `positivePattern`  | Pattern for positive values                                 |
| `negativePattern`  | Pattern for negative values                                 |
| `currencyDisplay`  | Whether to show symbol or ISO code                          |
| `spacing`          | Whether currency marker is attached or separated by a space |

### Rules

- formatting profile controls presentation only
- formatting must be configurable independently of currency identity
- symbol, code, separators, and patterns must be treated as separate concerns
- negative formatting must be explicit, not implied by text color alone

## Product policy

Product policy defines what the system allows. It answers: **what is supported in this product?**

### Policy fields

| Field               | Description                                           |
| ------------------- | ----------------------------------------------------- |
| `isAllowed`         | Whether the currency can be selected in the product   |
| `isDefault`         | Whether the currency is a product default             |
| `availableDisplays` | Allowed rendering modes, such as symbol and/or code   |
| `availableProfiles` | Allowed formatting profiles for the product or market |

### Rules

- a currency may exist in system data but still be unavailable to users
- supported currencies should be managed by policy, not by deleting reference data
- policy should not override canonical ISO identity
- policy should be explicit for multi-market products

## Rendered output

Rendered output is the final formatted string shown in UI.

It is the result of:

`amount + currency identity + formatting profile + product policy`

### Examples

- `1 234,50 Kč`
- `Kč 1 234,50`
- `1,234.50 USD`
- `-1 234,50 Kč`
- `(1,234.50 USD)`

## Currency vs locale

Currency and locale are related but not identical.

- **Currency** defines the monetary unit
- **Locale** defines regional reading conventions
- **Formatting profile** defines the concrete rendering decision in the product

This distinction is necessary because the same currency can be rendered differently in different markets, and different currencies can share the same symbol.

### Rule

Never assume that selecting `EUR` or `USD` is enough to determine separators, grouping, or symbol placement.

## Formatting parts

A currency formatter should treat the output as a composition of small tokens, not as one hard-coded string.

### Tokens

- currency marker
- numeric value
- negative operator
- decimal part
- group separators
- optional spacing

This makes configuration easier and prevents fragile string templates.

## Currency marker

The system must support two currency-marker modes:

- **symbol**
- **ISO code**

### Use symbol when

- the context is local and obvious
- compact display is preferred
- ambiguity is low

### Use ISO code when

- multiple currencies appear together
- the symbol is ambiguous
- the UI is reporting-heavy, admin-heavy, or cross-border
- precision matters more than brevity

### Example

`$100.00` is ambiguous. It may refer to USD, CAD, AUD, and other dollar-based currencies.

`USD 100.00` is explicit.

## Decimal places

Decimal places define visible precision.

### Supported values

- `0`
- `2`
- `3`

### Examples

- `1234`
- `1234.50`
- `1234.500`

### Rule

Display precision must be configurable and must not be hard-coded into the component layer.

## Decimal separator

Decimal separator splits integer and fractional parts.

### Common values

- `,`
- `.`
- `'`

### Examples

- `1234,50`
- `1234.50`

## Group separator

Group separator splits large numbers into readable groups.

### Common values

- space
- `,`
- `.`
- `'`

### Examples

- `1 234 567`
- `1,234,567`
- `1.234.567`
- `1'234'567`

## Grouping style

Grouping style defines how digits are chunked.

### Common patterns

- no grouping: `123456789`
- standard grouping: `123 456 789`
- partial grouping: `123456 789`
- Indian grouping: `12 34 56 789`

### Rule

Grouping style and group separator must be configured independently.

## Positive pattern

Positive pattern defines how non-negative values are arranged.

### Examples

- `Kč1,1`
- `1,1Kč`
- `Kč 1,1`
- `1,1 Kč`
- `USD 1,234.50`
- `1,234.50 USD`

### Rule

Positive formatting should be built from ordered tokens, not from a fixed set of hard-coded examples.

## Negative pattern

Negative pattern defines how negative values are arranged.

### Examples

- `-1 234,50 Kč`
- `Kč -1 234,50`
- `-Kč 1 234,50`
- `(1 234,50 Kč)`

### Rule

Negative formatting must support configurable placement of:

- currency marker
- negative operator
- numeric value

Color may reinforce negativity, but it must not be the only signal.

## Functional requirements

| ID   | Requirement        | Description                                                          |
| ---- | ------------------ | -------------------------------------------------------------------- |
| RQ01 | Currency selection | The system allows selection from a defined currency list             |
| RQ02 | Allowed currencies | The system allows control of supported currencies                    |
| RQ03 | Decimal places     | The system allows configuration of visible decimal precision         |
| RQ04 | Group separator    | The system allows configuration of digit-group separator             |
| RQ05 | Decimal separator  | The system allows configuration of decimal separator                 |
| RQ06 | Grouping style     | The system allows configuration of digit-grouping pattern            |
| RQ07 | Positive pattern   | The system allows configuration of positive-value pattern            |
| RQ08 | Negative pattern   | The system allows configuration of negative-value pattern            |
| RQ09 | Currency display   | The system allows switch between symbol and ISO code                 |
| RQ10 | Live preview       | The system shows formatted examples for positive and negative values |

## Configuration UI

A configuration surface for currency formatting should usually include:

- currency selector
- allowed / excluded toggle
- decimal places selector
- decimal separator selector
- group separator selector
- grouping style selector
- positive pattern selector
- negative pattern selector
- symbol vs code selector
- live preview

### Preview values

Use fixed preview values so users can understand the effect of each option.

Recommended preview set:

- `1234.56`
- `-1234.56`
- `1234567.89`

## Design-system guidance

Currency formatting belongs to the system layer, not to individual components.

### Rules

- components should consume already formatted values
- components should not implement currency rules locally
- formatting logic should live in one shared formatter
- typography and color may style a value, but should not redefine its meaning
- dense tables and exports should prefer more explicit output than promotional UI

## Out of scope

This system does not define:

- exchange-rate retrieval
- conversion logic
- financial calculation rules
- accounting standards
- tax compliance
- backend reconciliation

## Decision model for AI

When generating currency formatting rules or components:

1. identify the currency
2. identify the formatting profile
3. identify product policy constraints
4. determine whether symbol or ISO code is safer
5. render one canonical output
6. verify positive and negative preview examples
