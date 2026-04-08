# Route architecture

## React Router types

- `PageName` is case-sensitive and always reflect file name.

```tsx
import type { Route } from "./+types/PageName";
```

## Routing and Navigation

Location: `app/routes.ts`

- Always declare routes using the RouteConfig type annotation.
- Do not implement nested route structures.

```ts
export default [
  index("routes/homepage/Home.tsx"),
  route("/about", "routes/about/About.tsx"),
  route("/case-studies/CaseStudy", "routes/case-studies/case-study/CaseStudy.tsx"),
] satisfies RouteConfig;
```

---

## Data Loader

```tsx
import { RouteNameData } from "./RouteName.data";

/**
 * @description
 * Server-side data loader executed before component rendering on initial route requests.
 * Provides extension point for future server-side data fetching.
 */
export function loader() {
  return RouteNameData;
}

/**
 * ROUTE NAME
 * @version 1.0.0
 *
 * @description
 * Route description goes here.
 */
export default function RouteName() {
  const data = useLoaderData<typeof loader>();

  return (
    <main>
      <p>{data.parameter}</p>
    </main>
  );
}
```

---

## Metadata

React Router has a two way to specify metadata. One is global settings for global metadata and page-specific metadata for specific route.

### Global Metadata

Location: `root.tsx`

```tsx
export function Layout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Robin Remsa" />
        <meta name="robots" content="index, follow" />
        <meta name="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <Meta />
        <link rel="icon" type="image/png" href="" />
      </head>
      <body>
        {props.children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
  s;
}
```

### Page-Specific Metadata

You can specify metadata for a specific route using the `meta` function.

```tsx
import type { Route } from "./+types/PageName";

export function meta({ location }: Route.MetaArgs) {
  const title = "...";
  const description = "...";
  const keywords = "...";
  const url = `https://www.domain.com${location.pathname}`;
  const image = {};

  return [s
    { title: title },
    { name: "description", content: description },
    { name: "keywords", content: keywords },

    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: image },
    { property: "og:url", content: url },

    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
    { name: "twitter:url", content: url },
  ];
}
```
