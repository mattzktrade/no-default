import { faqs, plans, SITE, storyMeta } from "./content";
import { guides } from "./guides";

export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalised = path.startsWith("/") ? path : `/${path}`;
  if (normalised === "/") return `${SITE.url}/`;
  return `${SITE.url}${normalised}`;
}

export function orgId(): string {
  return `${SITE.url}/#org`;
}

export function websiteId(): string {
  return `${SITE.url}/#website`;
}

export function personId(): string {
  return `${SITE.url}/#founder`;
}

export const STATIC_PATHS = [
  "/",
  "/solutions",
  "/story",
  "/pricing",
  "/pubs-restaurants",
  "/contact",
  "/chat",
  "/terms",
  "/privacy",
  "/guides",
] as const;

export function publicPaths(): string[] {
  return [...STATIC_PATHS, ...guides.map((guide) => `/guides/${guide.slug}`)];
}

export function sitemapXml(): string {
  const urls = publicPaths()
    .map((path) => `  <url><loc>${absoluteUrl(path)}</loc></url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function isFoodChrome(pathname: string): boolean {
  if (pathname === "/pubs-restaurants" || pathname === "/terms" || pathname === "/chat") return true;
  const slug = pathname.startsWith("/guides/") ? pathname.slice("/guides/".length) : "";
  return guides.some((guide) => guide.slug === slug && guide.funnel === "food");
}

export function jsonLdScript(data: unknown) {
  return { type: "application/ld+json" as const, children: JSON.stringify(data) };
}

export function brandImageMeta() {
  const image = absoluteUrl(SITE.ogImage);
  return [
    { property: "og:image", content: image },
    { property: "og:image:alt", content: SITE.ogImageAlt },
    { property: "og:image:type", content: "image/png" },
    { property: "og:image:width", content: String(SITE.ogImageWidth) },
    { property: "og:image:height", content: String(SITE.ogImageHeight) },
    { name: "twitter:image", content: image },
    { name: "twitter:image:alt", content: SITE.ogImageAlt },
  ];
}

export function iconLinks() {
  return [
    { rel: "icon", href: "/favicon.ico?v=nd" },
    { rel: "icon", href: "/favicon.svg?v=nd", type: "image/svg+xml" },
    { rel: "icon", href: "/favicon-32x32.png?v=nd", type: "image/png", sizes: "32x32" },
    { rel: "icon", href: "/favicon-48x48.png?v=nd", type: "image/png", sizes: "48x48" },
    { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
    { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#1c1e22" },
    { rel: "manifest", href: "/site.webmanifest" },
  ];
}

export function breadcrumbLd(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function siteGraphLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["ProfessionalService", "Organization"],
        "@id": orgId(),
        name: SITE.legalName,
        alternateName: SITE.name,
        url: SITE.url,
        email: SITE.email,
        logo: absoluteUrl(SITE.logo),
        image: absoluteUrl(SITE.ogImage),
        description:
          "Custom business systems and an ongoing in-house tech team for UK SMEs. We replace messy stacks of SaaS tools, spreadsheets and manual processes with one connected system the business owns. We also build and look after websites for UK pubs, cafés, restaurants and takeaways.",
        areaServed: { "@type": "Country", name: SITE.area },
        founder: { "@id": personId() },
        knowsAbout: [
          "Custom CRM development",
          "Business process automation",
          "Xero integration",
          "Trade portals",
          "E-signature workflows",
          "Replacing SaaS tools",
          "Bespoke business software",
          "Pub and restaurant websites",
        ],
        priceRange: "££",
      },
      {
        "@type": "Person",
        "@id": personId(),
        name: SITE.founder,
        jobTitle: "Founder",
        worksFor: { "@id": orgId() },
        email: SITE.email,
        url: absoluteUrl("/story"),
      },
      {
        "@type": "WebSite",
        "@id": websiteId(),
        name: SITE.name,
        url: SITE.url,
        inLanguage: "en-GB",
        publisher: { "@id": orgId() },
      },
    ],
  };
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function offerCatalogLd() {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "no default services",
    url: absoluteUrl("/pricing"),
    itemListElement: plans.map((plan) => ({
      "@type": "Offer",
      name: plan.name,
      description: plan.blurb,
      url: absoluteUrl("/pricing"),
      seller: { "@id": orgId() },
      priceCurrency: "GBP",
      ...(plan.minPrice
        ? { priceSpecification: { "@type": "PriceSpecification", minPrice: plan.amount, priceCurrency: "GBP" } }
        : { price: plan.amount }),
    })),
  };
}

export function storyArticleLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: storyMeta.headline,
    datePublished: storyMeta.datePublished,
    dateModified: storyMeta.datePublished,
    author: { "@id": personId() },
    publisher: { "@id": orgId() },
    url: absoluteUrl("/story"),
    image: absoluteUrl(SITE.ogImage),
    mainEntityOfPage: absoluteUrl("/story"),
    about: "Replacing Salesforce, DocuSign, PandaDoc and other SaaS tools with one custom business system",
  };
}

export function homeFaqLd() {
  return faqLd(faqs);
}

type PageHead = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  ogTitle?: string;
  jsonLd?: unknown | unknown[];
};

export function pageHead({ title, description, path, type = "website", ogTitle, jsonLd }: PageHead) {
  const url = absoluteUrl(path);
  const blocks = jsonLd === undefined ? [] : Array.isArray(jsonLd) ? jsonLd : [jsonLd];
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: ogTitle ?? title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: url },
      ...brandImageMeta(),
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: ogTitle ?? title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: blocks.map(jsonLdScript),
  };
}
