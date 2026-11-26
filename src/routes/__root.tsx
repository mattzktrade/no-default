import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import appCss from "../styles.css?url";
import { Header, Footer } from "@/components/site";
import { SITE } from "@/lib/content";
import { brandImageMeta, iconLinks, jsonLdScript, siteGraphLd } from "@/lib/seo";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-5">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl">404</h1>
        <p className="hand mt-2 text-4xl text-signal">this page went missing, like a spreadsheet called FINAL_v2.</p>
        <Link to="/" className="mt-8 inline-flex h-12 items-center rounded-full bg-ink px-6 font-semibold text-paper">Go home</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <div className="max-w-md text-center">
        <h1 className="font-display text-4xl">This page didn't load</h1>
        <p className="mt-2 text-muted-foreground">Something went wrong. Try again or head home.</p>
        <div className="mt-6 flex justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="h-12 rounded-full bg-ink px-6 font-semibold text-paper">Try again</button>
          <a href="/" className="inline-flex h-12 items-center rounded-full border border-ink px-6 font-semibold">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#eeeff1" },
      { title: "no default — custom business systems for UK SMEs" },
      { name: "description", content: "We replace your pile of half-used software and spreadsheets with one system you own." },
      { property: "og:site_name", content: SITE.name },
      { property: "og:locale", content: "en_GB" },
      { property: "og:type", content: "website" },
      ...brandImageMeta(),
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      ...iconLinks(),
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@100..125,400;100..125,700;100..125,800;100..125,900&family=Newsreader:ital,opsz,wght@1,6..72,400&family=Schibsted+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Nanum+Pen+Script&display=swap",
      },
    ],
    scripts: [jsonLdScript(siteGraphLd())],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GB">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Outlet />
      <Footer />
    </QueryClientProvider>
  );
}
