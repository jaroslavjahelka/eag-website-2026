# Route template

```tsx
import type { Route } from "./+types/PageName";
import { RouteNameData } from "./RouteName.data";

export function meta({ location }: Route.MetaArgs) {
  const title = "...";
  const description = "...";
  const keywords = "...";
  const url = `https://www.domain.com${location.pathname}`;
  const image = {};

  return [
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
