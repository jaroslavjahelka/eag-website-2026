# Date and Time format

Date, time, and time zone formatting define how temporal values are identified, configured, and rendered across the product. This system is used by calendars, event surfaces, scheduling, timestamps, reporting, and localized UI.

---

## References

- country-specific date-time standards: [Part 1 – ISO 8601-1:2019](https://www.iso.org/standard/70907.html), [Part 2 – ISO 8601-2:2019/Amd 1:2025](https://www.iso.org/standard/86124.html)

---

## Rules

- use Gregorian calendar only
- use time zone only when it improves clarity
- never hard-code date or time patterns in components
- avoid country-by-country manual definitions

---

## Date format

Date formatting defines how date values are rendered.

- short (`1. 7. 2021`) and long (`1. července 2021`) variants should be supported
- use locale-aware date presets (ex. asian format `2025/02/21`)

### Relative date

Relative formatting supports contextual labels for dates (`today`, `tomorrow`, `next week`).

---

## Time format

Time formatting defines how clock values are rendered.

- use 24-hour format (`19:00`) for international and cross-market contexts
- use 12-hour format (`7:00 am` or `7am`) where it is the expected local convention
- always use a colon between hour and minute
- do not use comma or period as a time separator

### Time ranges

Time ranges define a start and end time.

- use the same clock style on both sides
- separate start and end with a hyphen (`19:00 - 20:00`)
- in 12-hour format, include `am` or `pm` on both values (`7:00 pm - 8:00 pm`)

### Relative time

Relative formatting supports contextual labels for time (`now`, `1 min`, `1 hour`).

---

## Timezone format

Time zone context defines which zone the rendered value should use.

- time zone must be explicitly associated with tenant or user
- the system should not infer the active time zone from browser location
- display it (`19:00 (EDT)`) when the same rendered time may be interpreted differently by users in different regions (conference calls, region events).
- for time ranges, show the time zone once at the end

---

## ISO model

- Unshortened `ISO 8601` date-time is represented as: `YYYY-MM-DDThh:mm:ss[.mmm]TZD` (`2012-03-29T10:05:45-06:00`)
- locale controls naming, ordering, and standard display conventions

| Value  | Description                                          |
| ------ | ---------------------------------------------------- |
| `YYYY` | four-digit year                                      |
| `MM`   | two-digit month                                      |
| `DD`   | two-digit day                                        |
| `T`    | separator between date and time                      |
| `hh`   | hour in 24-hour format                               |
| `mm`   | minute                                               |
| `ss`   | second                                               |
| `mmm`  | millisecond                                          |
| `TZD`  | time zone designator such as `Z`, `+hh:mm`, `-hh:mm` |
