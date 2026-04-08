# Number format

Number formatting defines how quantitative values are rendered across the product.

---

# References

- country-specific numeric standards: [ISO 80000-1:2022](https://www.iso.org/standard/76921.html)

---

## Rules

- keep units outside the value
- never hard-code separators or grouping in components

---

## Numeric value definition

Numeric value is the raw quantity before formatting (`10`, `10.5`, `1000000`, `-1234.567`).

- raw values must stay free of visual separators
- raw values must not contain units

---

## Decimal places

Decimal places define visible precision, meaning how many digits are shown after the decimal separator (`10`, `10.00`, `10.000`).

---

## Group separator

The group separator improves readability by splitting long numbers into digit groups (`1 000 000`, `1,000,000`, `1.000.000`, `1'000'000`).

- the group separator must follow the active locale or country format
- grouping should usually apply only to larger values, not short numbers unless required by the format
- formatting must support country-specific standards ([ISO 80000-1:2022](https://www.iso.org/standard/76921.html))

---

## Grouping styles

Grouping style defines how digits are chunked.

| style    | output         |
| -------- | -------------- |
| none     | `123456789`    |
| standard | `123 456 789`  |
| partial  | `123456 789`   |
| indian   | `12 34 56 789` |
