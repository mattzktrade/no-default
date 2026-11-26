import { createFileRoute } from "@tanstack/react-router";
import { CtaLink, Kicker } from "@/components/site";
import { PricingPlans } from "@/components/pricing-plans";
import { breadcrumbLd, offerCatalogLd, pageHead } from "@/lib/seo";

const title = "Pricing | Systems audit, fixed-price builds & an in-house tech team";
const description =
  "Clear, fair pricing for custom business systems: a £1,500 systems audit, fixed-scope builds from £8k per stage, and an ongoing in-house tech team from £2.5k a month.";

export const Route = createFileRoute("/pricing")({
  head: () =>
    pageHead({
      title,
      description,
      path: "/pricing",
      ogTitle: "no default pricing",
      jsonLd: [
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Pricing", path: "/pricing" },
        ]),
        offerCatalogLd(),
      ],
    }),
  component: Pricing,
});

function Pricing() {
  return (
    <main className="overflow-x-clip">
      <section className="grain mx-auto max-w-7xl px-5 pb-12 pt-10 md:pt-20">
        <Kicker className="rise">Pricing</Kicker>
        <h1 className="rise mt-6 text-[3.4rem] leading-[0.9] md:text-[7rem]">Fair, fixed, <span className="ital">and written down.</span></h1>
        <p className="rise mt-6 max-w-2xl text-xl text-muted-foreground">No surprise invoices, no per-seat fees. Most clients spend less over three years than they would on their current subscriptions, and they own the result.</p>
      </section>
      <section className="hierarchy-acid">
        <div className="mx-auto max-w-7xl px-5 py-12 md:py-20"><PricingPlans /></div>
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-24 text-center">
        <h2 className="text-4xl md:text-6xl">Not sure where you fit?</h2>
        <p className="mt-3 text-lg text-muted-foreground">That's what the free chat is for.</p>
        <div className="mt-8 flex justify-center"><CtaLink to="/contact" tone="ink" size="lg">Book a free chat</CtaLink></div>
      </section>
    </main>
  );
}
