import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import type { Route } from "./+types/root";
import { I18nProvider } from "./i18n";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://api.eag.group" },
  { rel: "dns-prefetch", href: "https://api.eag.group" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  /* Favicon */
  { rel: "icon", type: "image/png", href: "/favicon.png" },
  { rel: "apple-touch-icon", href: "/favicon.png" },
  /* Primary font — narrowed to actually used weights */
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap",
  },
  /* Secondary fonts — loaded alongside primary (no deferred script needed) */
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;500;600&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#000000" />
        <link rel="alternate" hrefLang="en" href="https://www.eag.cz" />
        <link rel="alternate" hrefLang="cs" href="https://www.eag.cz" />
        <link rel="alternate" hrefLang="x-default" href="https://www.eag.cz" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <Outlet />
    </I18nProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
