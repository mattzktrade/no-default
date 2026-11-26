import { createFileRoute } from "@tanstack/react-router";
import { CtaLink, Kicker, Reveal } from "@/components/site";
import { solutionScreens } from "@/components/mockups";
import { pains, SITE } from "@/lib/content";
import { breadcrumbLd, orgId, pageHead } from "@/lib/seo";
import { cn } from "@/lib/utils";

const title = "What we fix | Custom CRM, portals, Xero automation & more";
const description =
  "Real problems, real fixes: one customer record instead of four, invoices that chase themselves via Xero, quotes signed in minutes, trade portals, live dashboards, and one login instead of nine subscriptions.";

export const Route = createFileRoute("/solutions")({
  head: () =>
    pageHead({
      title,
      description,
      path: "/solutions",
      ogTitle: "What no default fixes",
      jsonLd: [
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "What we fix", path: "/solutions" },
        ]),
        {
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: pains.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: { "@type": "Service", name: p.fix, description: p.fixDetail, provider: { "@id": orgId(), name: SITE.legalName } },
          })),
        },
      ],
    }),
  component: Solutions,
});

function Solutions() {
  return (
    <main className="overflow-x-clip">
      <section className="grain mx-auto max-w-7xl px-5 pb-12 pt-10 md:pt-20">
        <Kicker className="rise">What we fix</Kicker>
        <h1 className="rise mt-6 text-[3.4rem] leading-[0.9] md:text-[7rem]">
          Real problems<span className="text-signal">.</span> <span className="ital">Fixes you can see.</span>
        </h1>
        <p className="rise mt-6 max-w-2xl text-xl text-muted-foreground">Every business is different, but the headaches are remarkably similar. Here's what they look like, and what they look like after.</p>
      </section>

      <div className="solution-chapters">
        {pains.map((p, i) => {
          const Screen = solutionScreens[p.id];
          return (
            <section key={p.id} id={p.id} className="solution-chapter scroll-mt-20"><div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 md:grid-cols-2 md:items-center md:gap-16 md:py-24">
              <Reveal className={cn(i % 2 && "md:order-2")}>
                <p className="label text-signal">0{i + 1} · {p.chip}</p>
                <h2 className="mt-4 text-4xl md:text-6xl">{p.title}</h2>
                <blockquote className="mt-6 border-l-2 border-signal pl-4 text-sm italic text-muted-foreground">“{p.before[0]?.msg}”</blockquote>
                <p className="mt-6 text-2xl font-semibold leading-snug text-signal">{p.fix}</p>
                <p className="mt-3 text-lg text-muted-foreground">{p.fixDetail}</p>
              </Reveal>
              <Reveal delay={120}>
                <Screen />
              </Reveal>
            </div></section>
          );
        })}
      </div>

      <section className="mx-auto max-w-7xl px-5 pb-24 text-center">
        <h2 className="mx-auto max-w-3xl text-5xl md:text-7xl">Got a headache that's <span className="ital">not</span> on here?</h2>
        <p className="mx-auto mt-4 max-w-md text-lg text-muted-foreground">Good. That's usually the interesting one.</p>
        <div className="mt-8 flex justify-center"><CtaLink to="/contact" tone="acid" size="lg">Tell us about it</CtaLink></div>
      </section>
    </main>
  );
}
