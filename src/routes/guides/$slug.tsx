import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CtaLink, Kicker } from "@/components/site";
import { SITE } from "@/lib/content";
import { getGuide, guidesFor } from "@/lib/guides";
import { absoluteUrl, breadcrumbLd, orgId, pageHead, personId } from "@/lib/seo";

export const Route = createFileRoute("/guides/$slug")({
  beforeLoad: ({ params }) => {
    const guide = getGuide(params.slug);
    if (!guide) throw notFound();
    return { guide };
  },
  head: ({ params }) => {
    const guide = getGuide(params.slug);
    if (!guide) return {};
    const path = `/guides/${guide.slug}`;
    return pageHead({
      title: guide.title,
      description: guide.description,
      path,
      type: "article",
      ogTitle: `${guide.h1Lead} ${guide.h1Ital}`,
      jsonLd: [
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides" },
          { name: `${guide.h1Lead} ${guide.h1Ital}`, path },
        ]),
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: `${guide.h1Lead} ${guide.h1Ital}`,
          description: guide.answer,
          datePublished: guide.datePublished,
          dateModified: guide.datePublished,
          author: { "@id": personId() },
          publisher: { "@id": orgId() },
          url: absoluteUrl(path),
          image: absoluteUrl(SITE.ogImage),
          mainEntityOfPage: absoluteUrl(path),
        },
      ],
    });
  },
  component: GuidePage,
});

function GuidePage() {
  const { guide } = Route.useRouteContext();
  const related = guidesFor(guide.funnel).filter((item) => item.slug !== guide.slug);

  return (
    <main className="grain">
      <article className="mx-auto max-w-3xl px-5 pb-20 pt-10 md:pb-28 md:pt-16">
        <Kicker>Guide</Kicker>
        <h1 className="mt-6 text-5xl leading-[0.95] md:text-7xl">
          {guide.h1Lead} <span className="ital text-signal">{guide.h1Ital}</span>
        </h1>
        <p className="mt-6 text-xl leading-relaxed">{guide.answer}</p>
        <p className="label mt-4 text-muted-foreground">{SITE.founder} · {guide.datePublished}</p>

        <div className="mt-12 space-y-12">
          {guide.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-3xl md:text-4xl">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-lg leading-relaxed text-muted-foreground">{paragraph}</p>
              ))}
              {section.bullets && (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-lg leading-relaxed text-muted-foreground">
                  {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              )}
            </section>
          ))}
        </div>

        <div className="mt-16 rounded-lg border border-ink bg-card p-6 md:p-8">
          <h2 className="text-3xl">Want this done for you?</h2>
          <p className="mt-3 text-muted-foreground">A short chat. No pitch. Honest answer if it is not a fit.</p>
          <div className="mt-6"><CtaLink to={guide.cta.to}>{guide.cta.label}</CtaLink></div>
        </div>

        {related.length > 0 && (
          <nav aria-label="Related guides" className="mt-16">
            <p className="label text-muted-foreground">Related</p>
            <ul className="mt-4 space-y-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link to="/guides/$slug" params={{ slug: item.slug }} className="font-semibold underline underline-offset-4">
                    {item.h1Lead} {item.h1Ital}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </article>
    </main>
  );
}
