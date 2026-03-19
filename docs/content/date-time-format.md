# Date, Time, and Time Zone Format

Date, time, and time zone formatting define how temporal values are identified, configured, and rendered across the product.
This system is used by calendars, event surfaces, scheduling, timestamps, reporting, and localized UI.

## Rules

- separate raw temporal data from rendered output
- use one canonical formatter across the product
- never hard-code date or time patterns in components
- treat locale and time zone as separate concerns
- use Gregorian calendar only
- use ISO 8601 as the canonical interchange model
- use locale-aware rendering for end-user presentation
- include time zone only when it improves clarity

## Scope

This system defines:

- date formatting
- time formatting
- time zone display
- first day of week
- localized day and month naming
- relative date and time labels
- date and time configuration profiles

This system does not define:

- custom user-authored format strings
- non-Gregorian calendars
- holiday logic
- event scheduling logic
- browser-based automatic location detection
- business rules for notifications or reminders

## System model

Date and time formatting should be understood as four distinct layers:

1. temporal value
2. localization profile
3. time zone context
4. rendered output

## Temporal value

Temporal value is the raw value before formatting.

Examples:

- date only
- time only
- full date-time
- date range
- time range
- relative reference point

### Rules

- raw values must remain independent from rendering style
- raw values must not contain localized month names, weekday names, or time zone labels
- rendering is applied only at output time
- ISO 8601 should be the canonical exchange format between systems

### Canonical ISO model

Unshortened ISO 8601 date-time may be represented as:

`YYYY-MM-DDThh:mm:ss[.mmm]TZD`

Example:

`2012-03-29T10:05:45-06:00`

Where:

- `YYYY` = four-digit year
- `MM` = two-digit month
- `DD` = two-digit day
- `T` = separator between date and time
- `hh` = hour in 24-hour format
- `mm` = minute
- `ss` = second
- `mmm` = millisecond
- `TZD` = time zone designator such as `Z`, `+hh:mm`, `-hh:mm`

## Localization profile

Localization profile defines how temporal values are presented for a given locale or market.

| Field            | Description                                                  |
| ---------------- | ------------------------------------------------------------ |
| `locale`         | Locale used for localized formatting                         |
| `months`         | Full month names                                             |
| `monthsShort`    | Short month names                                            |
| `weekdays`       | Full weekday names                                           |
| `weekdaysShort`  | Short weekday names                                          |
| `weekdaysMin`    | Minimal weekday names                                        |
| `longDateFormat` | Named date and time format presets                           |
| `calendarLabels` | Relative calendar phrases such as today, tomorrow, yesterday |
| `relativeTime`   | Relative time phrases such as minute, hour, day              |
| `weekFirstDay`   | First day of week                                            |

### Rules

- locale controls naming, ordering, and standard display conventions
- locale does not replace time zone
- formatting profiles should come from a capable localization library
- avoid country-by-country manual definitions unless necessary
- predefined locale defaults are preferred over fully custom local definitions

## Time zone context

Time zone context defines which zone the rendered value should use.

### Rules

- time zone must be explicitly associated with tenant or user
- the system should not infer the active time zone from browser location
- daylight-saving changes must be handled automatically by the selected time zone rules
- time zone display is optional in UI, but time zone context is always required for correct rendering of date-time values

### Examples

- local tenant time zone
- explicit user profile time zone
- event-specific time zone

## Date formatting

Date formatting defines how date values are rendered.

### Rules

- use locale-aware date presets
- short and long variants should be supported
- components must not assemble date strings manually
- the formatter must support multiple valid patterns per locale when required

### Example short date outputs

- `01.07.2021`
- `01.07.21`
- `1. 7. 2021`

### Example long date outputs

- `čtvrtek 1. července 2021`
- `1. července 2021`

## Time formatting

Time formatting defines how clock values are rendered.

### Rules

- support both 24-hour and 12-hour formats
- use 24-hour format for international and cross-market contexts
- use 12-hour format where it is the expected local convention
- always use a colon between hour and minute
- do not use comma or period as a time separator
- standard layouts should always include minutes

### 24-hour examples

Use:

- `19:00`
- `07:30`
- `19:00 - 20:00`

Do not use:

- `19:00 pm`
- `19.00`
- `19,00`

### 12-hour examples

Use:

- `7:00 am`
- `7:30 pm`
- `7:00 am - 8:00 am`

Compact exceptions for tight space:

- `7am`
- `7:30pm`

Do not use:

- `7:00AM`
- `7 a.m.`
- `7 PM`
- `7:30 PM`

## Time zone display

Time zone display is optional and depends on context clarity.

Use it when the same rendered time may be interpreted differently by users in different regions.

Typical cases:

- conference calls
- shared meetings
- cross-region events
- remote participation flows

### Rules

- when shown, place one space after the time or time range
- render the abbreviation in parentheses
- for ranges, show the time zone once at the end
- do not repeat the same time zone on both sides of a range

### Examples

Use:

- `19:00 (EDT)`
- `19:00 - 20:00 (EDT)`
- `7:00 pm - 8:00 pm (EDT)`

Do not use:

- `7 PM (EDT)`
- `19:00 (EDT) - 20:00 (EDT)`
- `7:00 pm (EDT) - 8:00 pm (EDT)`

## Time ranges

Time ranges define a start and end time.

### Rules

- separate start and end with a hyphen
- use the same clock style on both sides
- in 12-hour format, include `am` or `pm` on both values
- if time zone is shown, place it once after the full range

### Examples

- `19:00 - 20:00`
- `7:00 pm - 8:00 pm`
- `19:00 - 20:00 (EDT)`

## Relative date and time

Relative formatting supports contextual labels for dates and elapsed time.

### Calendar-style labels

Examples:

- today
- tomorrow
- yesterday
- next week
- last week

### Relative-time labels

Examples:

- `Now`
- `1 min`
- `2 mins`
- `1 hour`
- `2 hours`
- `1 day`
- `2 days`
- `1 week`
- `2 weeks`
- `1 month`
- `2 months`
- `1 year`
- `2 years`

### Rules

- relative labels must come from locale-aware definitions
- use full approved labels, not cryptic compressed forms
- keep relative calendar phrases and relative duration phrases as separate concerns

## First day of week

The first day of week must be configurable per locale or market profile.

### Rules

- it must not be globally hard-coded
- calendar UI must consume this value from the formatting system
- locale defaults should be overridable by product configuration if needed

## Configuration model

A system profile for date, time, and time zone formatting should support:

| Field                | Description                   |
| -------------------- | ----------------------------- |
| `locale`             | Active locale                 |
| `dateShort`          | Short date preset             |
| `dateLong`           | Long date preset              |
| `timeShort`          | Short time preset             |
| `timeLong`           | Long time preset              |
| `clockType`          | 24-hour or 12-hour            |
| `showSeconds`        | Whether seconds are shown     |
| `showTimeZone`       | Whether time zone is rendered |
| `timeZone`           | Active time zone identifier   |
| `weekFirstDay`       | First day of week             |
| `calendarLabels`     | Relative date phrases         |
| `relativeTimeLabels` | Relative time phrases         |

## Library expectations

The implementation should rely on a robust localization library rather than a manually maintained formatter set.

The preferred library should:

- provide locale defaults for date and time patterns
- provide localized month and weekday names
- support first day of week
- support relative date and time formatting
- support time zone aware rendering
- correctly handle leap years, leap days, month lengths, and daylight-saving transitions

Manual per-country definitions should be minimized.

## System assumptions

- Gregorian calendar is the only supported calendar model
- ISO 8601 is the canonical data exchange format
- user or tenant time zone is explicitly stored in the system
- daylight-saving changes are handled automatically by the underlying time zone rules
- users do not define fully custom format strings
- the UI should expose settings and previews, not free-text pattern authoring

## Configuration UI

A configuration surface for date, time, and time zone formatting should usually include:

- locale selector
- short date format selector
- long date format selector
- short time format selector
- long time format selector
- 24-hour or 12-hour selector
- first day of week selector
- time zone selector
- show time zone toggle
- live preview

Recommended preview set:

- current date
- current time
- current time zone
- short date preview
- long date preview
- short time preview
- long time preview
- time range preview
- relative date preview
- relative time preview

## Open questions

The following area may require a separate decision:

- whether the system should also manage localized naming sets directly, or fully delegate them to the selected localization library and CLDR-derived data

This mainly affects:

- month naming
- weekday naming
- short and minimal naming variants
- relative labels

## Out of scope

This system does not define:

- multiple calendar systems
- holiday definitions
- holiday colors
- weekend colors
- browser geolocation-driven time zone resolution
- custom separator experiments outside standard conventions

These concerns belong to other systems such as holidays, calendars, or tenant-level localization policy.

## Relationship to other systems

This system is closely related to:

- calendar system
- holiday system
- number formatting
- currency formatting
- localization and internationalization infrastructure

Date and time formatting is a foundational layer. Calendar features, holidays, and scheduling should consume it rather than redefine it.

## Summary

Date, time, and time zone formatting define how temporal values are rendered in a consistent, locale-aware, and system-controlled way across the product.
The system uses ISO 8601 as the canonical exchange model, Gregorian calendar as the supported calendar model, and locale-aware rendering rules for end-user output. It keeps locale, time zone, and formatting profile separate so that temporal values remain accurate, readable, and predictable across markets.
