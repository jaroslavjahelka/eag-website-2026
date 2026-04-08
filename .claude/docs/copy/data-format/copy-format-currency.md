# Currency format

Currency formatting defines how monetary values are identified, configured, and rendered across the product. Good currency formatting makes values unambiguous, comparable, and locally readable.

---

## References

- country-specific currency standards: [ISO 4217:2015](https://www.iso.org/standard/64758.html)
- general number format: [copy-format-number.md](./copy-format-number.md)

---

## Rules

- currency must be stable and ISO-based (`ISO 4217:2015`)
- locale defines regional reading conventions (`100,50 Kč` or `$1,234.50`)
- one currency may be linked to multiple countries
- components should consume already formatted values
- formatting logic should live in one shared formatter
- a currency may exist in system data but still be unavailable to users

---

## When to use `symbol`

Default currency symbol, for example `Kč`, `€`, `$`.

- when compact display is preferred (`$100.00`)
- when the context is local and obvious

---

## When to use `ISO Code`

`ISO 4217` alphabetic code, for example `CZK`, `EUR`, `USD`.

- when precision matters more than brevity (`USD 100.00`)
- when multiple currencies appear together

---

## Positive pattern

- positive pattern defines how non-negative values are arranged (`1 000,50 Kč`)
- positive formatting should be built from ordered tokens

---

## Negative pattern

- negative pattern defines how negative values are arranged (`-1 000,50 Kč`)
- color (eq. `green-60`) may reinforce negativity, but it must not be the only signal
