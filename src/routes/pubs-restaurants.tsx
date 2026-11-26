import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarX, Check, FileText, ImageOff, LifeBuoy, MapPin, MapPinOff, MessageSquareText, Palette, PartyPopper, PhoneCall, Plus, Search, ThumbsUp } from "lucide-react";
import { CtaLink, Kicker, Note, Reveal } from "@/components/site";
import { PricingPlans } from "@/components/pricing-plans";
import { PubDemo } from "@/components/pub-demo";
import { foodFaqs, foodHero, foodIncluded, foodPlans, foodPlanTerms, foodProblems, foodSteps, foodTerms, SITE } from "@/lib/content";
import { guidesFor } from "@/lib/guides";
import { absoluteUrl, breadcrumbLd, faqLd, orgId, pageHead } from "@/lib/seo";
import { cn } from "@/lib/utils";

const title = `Pub & Restaurant Website Design UK | ${foodTerms.price}/month | no default`;
const description = `Websites for UK pubs, cafés, restaurants and takeaways. Built, hosted and kept up to date for you: menus, hours and local SEO. ${foodTerms.price}/month, no setup fee.`;

const offer = (plan: (typeof foodPlans)[number]) => ({
  "@type": "Offer",
  name: plan.name,
  description: `${plan.blurb} No setup fee. ${foodTerms.minimumMonths}-month minimum term, then ${foodTerms.noticeDays} days' notice.`,
  price: plan.monthly,
  priceCurrency: "GBP",
  priceSpecification: { "@type": "UnitPriceSpecification", price: plan.monthly, priceCurrency: "GBP", unitText: "MONTH", referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" } },
  eligibleDuration: { "@type": "QuantitativeValue", minValue: foodTerms.minimumMonths, unitCode: "MON" },
  areaServed: { "@type": "Country", name: SITE.area },
});

export const Route = createFileRoute("/pubs-restaurants")({
  head: () =>
    pageHead({
      title,
      description,
      path: "/pubs-restaurants",
      ogTitle: foodHero.title,
      jsonLd: [
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Pub & restaurant websites", path: "/pubs-restaurants" },
        ]),
        {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Service",
              name: "Websites for pubs, cafés, restaurants and takeaways",
              url: absoluteUrl("/pubs-restaurants"),
              serviceType: "Website design, hosting and menu updates",
              description: foodHero.description,
              provider: { "@id": orgId(), "@type": "ProfessionalService", name: SITE.legalName, alternateName: SITE.name, email: SITE.email, areaServed: { "@type": "Country", name: SITE.area } },
              areaServed: { "@type": "Country", name: SITE.area },
              audience: { "@type": "BusinessAudience", audienceType: "Pubs, cafés, restaurants and takeaways" },
              offers: foodPlans.map(offer),
            },
            faqLd(foodFaqs),
          ],
        },
      ],
    }),
  component: PubsRestaurants,
});

const problemIcons = { pdf: FileText, social: ThumbsUp, phone: PhoneCall, photo: ImageOff, map: MapPinOff, booking: CalendarX };
const includedIcons = { design: Palette, support: LifeBuoy, updates: MessageSquareText, seo: Search, google: MapPin, events: PartyPopper };

function PubsRestaurants() {
  const [faq, setFaq] = useState<number | null>(0);
  return (
    <main className="overflow-x-clip">
      {/* OPENING */}
      <section className="food-hero-section">
        <div className="food-hero-drafting" aria-hidden="true">
          <span /><span /><span /><span />
        </div>
        <div className="food-hero-frame">
          <div className="food-hero-copy">
            <Kicker className="food-hero-in food-hero-kicker justify-center">{foodHero.kicker}</Kicker>
            <h1 className="food-hero-title">
              <span className="food-hero-line"><span>Your pub deserves</span></span>
              <span className="food-hero-line"><span>a website <span className="ital text-signal">as good as</span></span></span>
              <span className="food-hero-line"><span className="ital text-signal food-hero-ink">your food.</span></span>
            </h1>
            <p className="food-hero-in food-hero-lede">{foodHero.description}</p>
            <ul className="food-hero-in food-hero-points">
              {[`${foodTerms.price}/month, all in`, "No setup cost", `Live in about ${foodTerms.launchWeeks} weeks`].map((x) => (
                <li key={x} className="flex items-center gap-1.5 rounded-full border border-ink bg-card px-3 py-1.5"><Check className="h-3.5 w-3.5 text-signal" />{x}</li>
              ))}
            </ul>
            <p className="food-hero-in food-hero-facts">{foodHero.facts}</p>
            <div className="food-hero-in food-hero-actions">
              <CtaLink to="/chat" size="lg" tone="acid" className="w-full justify-center sm:w-auto">Book a free chat</CtaLink>
              <a href="#example" className="text-sm font-semibold underline underline-offset-4">See an example pub site ↓</a>
            </div>
            <p className="food-hero-in food-hero-trust">{foodHero.trust}</p>
          </div>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="pain-band">
        <div className="mx-auto max-w-7xl px-5 py-16 md:py-24">
          <Kicker n="01">Sound familiar?</Kicker>
          <div className="mt-6 grid gap-5 md:grid-cols-[1.3fr_1fr] md:items-end">
            <h2 className="section-title">Great food.<br /><span className="ital">Shame about the website.</span></h2>
            <p className="max-w-md text-lg leading-relaxed text-muted-foreground">You're running a kitchen, a bar and a rota. Nobody has time to wrestle a website builder, so the online side quietly falls behind.</p>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {foodProblems.map((p, i) => {
              const Icon = problemIcons[p.icon];
              return (
                <li key={p.title}>
                  <Reveal delay={i * 60} className="card-hard flex h-full flex-col p-6">
                    <Icon className="h-6 w-6 text-signal" aria-hidden />
                    <h3 className="mt-5 text-2xl leading-tight">{p.title}</h3>
                    <p className="mt-3 text-muted-foreground">{p.detail}</p>
                    <p className="hand mt-auto pt-5 text-2xl text-signal">“{p.quote}”</p>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* EXAMPLE SITE */}
      <section id="example" className="build-section scroll-mt-20 text-paper">
        <div className="mx-auto max-w-7xl px-5 py-16 md:py-24">
          <Kicker n="02" className="text-paper/70">An example pub site</Kicker>
          <div className="mb-10 mt-6 grid gap-6 md:grid-cols-[1.3fr_1fr] md:items-end">
            <h2 className="section-title text-paper">Meet the Hare & Lantern.<br /><span className="ital text-acid">Have a look around.</span></h2>
            <p className="max-w-md text-lg leading-relaxed text-paper/80">A made-up local with the kind of site we build: a real menu, what's on, table booking and how to find it. The same pub on a phone and a laptop.</p>
          </div>
          <PubDemo />
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="bg-card">
        <div className="mx-auto max-w-7xl px-5 py-16 md:py-24">
          <Kicker n="03">What's included</Kicker>
          <h2 className="section-title mt-6 max-w-4xl">Everything a busy kitchen needs online. <span className="ital">Nothing it doesn't.</span></h2>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-lg border border-ink bg-ink sm:grid-cols-2 lg:grid-cols-3">
            {foodIncluded.map((item) => {
              const Icon = includedIcons[item.icon];
              return (
                <li key={item.title} className="flex flex-col bg-card p-6 md:p-7">
                  <Icon className="h-6 w-6 text-signal" aria-hidden />
                  <h3 className="mt-5 text-2xl leading-tight">{item.title}</h3>
                  <p className="mt-3 text-muted-foreground">{item.detail}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="pain-band">
        <div className="mx-auto max-w-7xl px-5 py-16 md:py-24">
          <Kicker n="04">How it works</Kicker>
          <h2 className="section-title mt-6 max-w-4xl">Live in about {foodTerms.launchWeeks} weeks. <span className="ital">Then just message us.</span></h2>
          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {foodSteps.map((s, i) => (
              <li key={s.t} className="card-hard flex flex-col p-6">
                <div className="flex items-center justify-between">
                  <span className="font-display text-6xl text-signal">{i + 1}</span>
                  <span className="label rounded-full bg-muted px-2.5 py-1">{s.w}</span>
                </div>
                <h3 className="mt-6 text-3xl">{s.t}</h3>
                <p className="mt-3 text-muted-foreground">{s.d}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground">No logins, no website builder, no training. If you can send a text, you can keep your website up to date.</p>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="hierarchy-acid scroll-mt-20">
        <div className="mx-auto max-w-7xl px-5 py-16 md:py-24">
          <Kicker n="05">Pricing</Kicker>
          <div className="mb-10 mt-6 grid gap-5 md:grid-cols-[1.3fr_1fr] md:items-end">
            <h2 className="section-title">One flat fee.<br /><span className="ital">Completely hands-off.</span></h2>
            <p className="max-w-md text-lg leading-relaxed">The design and build are included, and so is keeping it up to date: support, maintenance, menu changes and local SEO.</p>
          </div>
          <PricingPlans
            plans={foodPlans}
            to="/chat"
            footer={
              <div className="grid grid-cols-2 gap-px bg-border lg:grid-cols-4">
                {foodPlanTerms.map(({ title, detail }) => (
                  <div key={title} className="bg-paper px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
                    <p className="font-semibold">{title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{detail}</p>
                  </div>
                ))}
              </div>
            }
          />
          <p className="mt-6 text-sm">
            The plain-English details are in our <Link to="/terms" className="font-semibold underline underline-offset-4">plan terms</Link>.
          </p>
        </div>
      </section>

      {/* FOUNDER NOTE */}
      <section className="grain hierarchy-signal">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-[1.4fr_1fr] md:items-end md:py-24">
          <div>
            <Kicker n="06" className="text-paper/80">A note from {SITE.founderFirst}</Kicker>
            <Reveal>
              <blockquote className="mt-8 font-display text-3xl leading-[1.08] md:text-5xl">
                “Good locals are the <span className="ital text-acid">heart of a high street.</span> They deserve a website that works as hard as they do.”
              </blockquote>
            </Reveal>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/85">
              Pubs, cafés and restaurants run on long days and thin margins. The last thing an owner needs is a website they have to fight with. So we build you a good one, keep it up to date when you message us, and charge a fair flat fee for it.
            </p>
            <p className="label mt-6 text-paper/60">{SITE.founder} · founder</p>
          </div>
          <div className="border-t border-paper/25 pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
            <p className="text-paper/80">no default started when {SITE.founderFirst} rebuilt the software at the company he worked for. Same idea here: technology should take work off your plate, not add to it.</p>
            <div className="mt-6"><CtaLink to="/story" tone="paper" size="sm">Read how it started</CtaLink></div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-4xl scroll-mt-20 px-5 py-20 md:py-28">
        <Kicker n="07">Fair questions</Kicker>
        <div className="mt-8 divide-y divide-ink border-y-2 border-ink">
          {foodFaqs.map((f, i) => (
            <div key={f.q}>
              <button onClick={() => setFaq(faq === i ? null : i)} aria-expanded={faq === i} className="flex w-full items-center justify-between gap-6 py-5 text-left">
                <h3 className="font-sans text-lg font-semibold tracking-normal md:text-2xl" style={{ lineHeight: 1.25 }}>{f.q}</h3>
                <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink transition-transform", faq === i && "rotate-45 bg-signal text-paper")}><Plus className="h-4 w-4" /></span>
              </button>
              <div className={cn("grid transition-all duration-300", faq === i ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]")}>
                <div className="overflow-hidden">
                  <p className="text-lg text-muted-foreground">{f.a}</p>
                  {faq === i && f.terms && <Link to="/terms" hash={f.terms} className="mt-3 inline-block text-sm font-semibold underline underline-offset-4">See the terms</Link>}
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          Longer answers:{" "}
          {guidesFor("food").map((guide, i) => (
            <span key={guide.slug}>
              {i > 0 ? " · " : ""}
              <Link to="/guides/$slug" params={{ slug: guide.slug }} className="font-semibold underline underline-offset-4">
                {guide.h1Lead} {guide.h1Ital}
              </Link>
            </span>
          ))}
        </p>
      </section>

      {/* FINAL CTA */}
      <section className="hierarchy-signal">
        <div className="mx-auto max-w-7xl px-5 py-16 text-center md:py-24">
          <Note className="text-acid">no pitch. no pressure.</Note>
          <h2 className="mx-auto mt-4 max-w-4xl text-5xl md:text-8xl">Let's get your menu <span className="ital text-acid">online properly.</span></h2>
          <p className="mx-auto mt-6 max-w-lg text-lg text-paper/80">A relaxed chat about your place and what you need. You'll come away knowing exactly what we'd build and what it costs.</p>
          <div className="mt-8 flex justify-center"><CtaLink to="/chat" size="lg" tone="acid">Book a free chat</CtaLink></div>
        </div>
      </section>
    </main>
  );
}
