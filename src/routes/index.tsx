import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { Check, Plus } from "lucide-react";
import { CtaLink, Kicker, Note, Reveal } from "@/components/site";
import { BuildProducts } from "@/components/build-products";
import { PricingPlans } from "@/components/pricing-plans";
import { FallingCards } from "@/components/falling-cards";
import { PainExplorer, CostCalculator, Comparison } from "@/components/interactive";
import { faqs, SITE, heroCopy } from "@/lib/content";
import { guidesFor } from "@/lib/guides";
import { homeFaqLd, pageHead } from "@/lib/seo";
import { cn } from "@/lib/utils";

const title = "no default | Custom business systems for UK SMEs, without the hire";
const description =
  "Too many tools, still doing it by hand? We replace messy SaaS stacks, spreadsheets and manual admin with one connected system you own. Your in-house tech team, without the hire.";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title,
      description,
      path: "/",
      ogTitle: "You bought the tools. You're still doing it by hand.",
      jsonLd: homeFaqLd(),
    }),
  component: Home,
});

const signs = [
  "We pay for tools nobody fully uses",
  "The same info gets typed into more than one place",
  "One person knows how 'the spreadsheet' works",
  "Customers still email or phone to order",
  "Month-end reporting takes a day or more",
  "We've been burnt by software that didn't fit",
];

const sectors = [
  ["Wholesale & distribution", "Trade accounts, reorders, stock, delivery notes"],
  ["Trade suppliers & manufacturers", "Quotes, job tracking, portals, brochures"],
  ["Events & hospitality", "Bookings, tickets, contracts, suppliers"],
  ["Professional services", "Clients, proposals, e-sign, billing"],
  ["Construction & trades", "Quotes, jobs, sign-offs, chasing payment"],
  ["Growing service businesses", "Anything still living in spreadsheets"],
];

const steps = [
  { t: "Listen", d: "We sit with your team. What do you actually do all day? Which tools does nobody open?", w: "Week 1" },
  { t: "Map", d: "An honest audit of every tool, spreadsheet and workaround, and what it's really costing you.", w: "Week 1–2" },
  { t: "Build", d: "One system, in stages. The most painful bit first, so you feel the difference in weeks.", w: "Week 3–6" },
  { t: "Stick around", d: "Your in-house tech team. The business changes, the system changes with it.", w: "Ongoing" },
];

function Home() {
  const [openingReady, setOpeningReady] = useState(false);
  const revealOpening = useCallback(() => setOpeningReady(true), []);
  const hideOpening = useCallback(() => setOpeningReady(false), []);
  const [ticked, setTicked] = useState<number[]>([]);
  const [faq, setFaq] = useState<number | null>(0);
  const toggle = (i: number) => setTicked((t) => (t.includes(i) ? t.filter((x) => x !== i) : [...t, i]));

  return (
    <main className="overflow-x-clip">
      {/* HERO */}
      <section className={`opening-section ${openingReady ? "opening-ready" : "opening-waiting"}`}>
        <div className="opening-drafting" aria-hidden="true"><span /><span /><span /><span /></div>
        <div className="opening-copy">
          <Kicker className="justify-center">{heroCopy.intro}</Kicker>
          <h1 className="opening-title">
            More tools<span className="text-signal">.</span><br />
            <span className="ital">Same old</span> <span className="hl">mess.</span>
          </h1>
          <p className="opening-description">{heroCopy.description}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
            <CtaLink to="/contact" size="lg" tone="acid">Book a free 30-min chat</CtaLink>
            <a href="#fix" className="text-sm font-semibold underline underline-offset-4">See what we fix ↓</a>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">Built first inside a real company. No pitch. No pressure.</p>
        </div>
        <FallingCards onSettled={revealOpening} onStart={hideOpening} />
      </section>

      {/* PAIN EXPLORER */}
      <section id="fix" className="pain-band scroll-mt-24">
        <div className="mx-auto max-w-7xl px-5 pb-14 pt-6 md:py-28">
          <Reveal>
            <Kicker n="01">Pick your headache</Kicker>
          </Reveal>
          <div className="mt-5 md:mt-8"><PainExplorer /></div>
          <div className="mt-12"><CtaLink to="/solutions" tone="ghost">See everything we fix</CtaLink></div>
        </div>
      </section>


      <BuildProducts />

      {/* STORY TEASER */}
      <section className="grain hierarchy-signal">
        <div className="mx-auto max-w-7xl px-5 py-20 md:py-28">
          <Kicker n="03" className="text-paper/80">Why this exists</Kicker>
          <Reveal>
            <blockquote className="mt-8 font-display text-4xl leading-[1.02] md:text-7xl">
              “I watched my company spend <span className="text-acid">hundreds of thousands</span> on software nobody used. So I <span className="ital text-acid">rebuilt all of it</span> myself.”
            </blockquote>
            <p className="label mt-6 text-paper/60">{SITE.founder} · founder</p>
          </Reveal>
          <div className="mt-12 grid grid-cols-3 gap-3 md:gap-8">
            {[["9", "paid tools replaced"], ["1", "login for everyone"], ["100%", "owned by the business"]].map(([n, l], i) => (
              <Reveal key={l} delay={i * 100} className="border-t border-paper/20 pt-4">
                <p className="font-display text-5xl text-acid md:text-7xl">{n}</p>
                <p className="label mt-2 text-paper/60">{l}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-12"><CtaLink to="/story" tone="paper">Read the whole story</CtaLink></div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:py-28">
        <Kicker n="04">Is this you?</Kicker>
        <div className="mt-6 grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-5xl md:text-7xl">Tick what's <span className="ital">true</span>.</h2>
            <ul className="mt-8 space-y-2">
              {signs.map((s, i) => {
                const on = ticked.includes(i);
                return (
                  <li key={s}>
                    <button onClick={() => toggle(i)} aria-pressed={on} className={cn("flex w-full items-center gap-4 rounded-2xl border p-4 text-left font-medium transition", on ? "border-ink bg-acid" : "border-border bg-card hover:border-ink")}>
                      <span className={cn("grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-ink", on && "bg-ink text-paper")}>{on && <Check className="h-4 w-4" />}</span>
                      {s}
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="mt-5 min-h-12 text-lg font-semibold" aria-live="polite">
              {ticked.length === 0 && <span className="text-muted-foreground">Go on, be honest.</span>}
              {ticked.length > 0 && ticked.length < 3 && <>A couple of leaks. Worth a quick look.</>}
              {ticked.length >= 3 && <><Note className="mr-2 text-3xl">{ticked.length}/6.</Note>We should talk. <Link to="/contact" className="underline decoration-signal decoration-2 underline-offset-4">Book a chat →</Link></>}
            </p>
          </div>
          <div>
            <p className="text-lg text-muted-foreground">We work best with established businesses of <strong className="text-foreground">10 to 150 people</strong> that have no in-house IT or dev team, and have outgrown spreadsheets and off-the-shelf tools.</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {sectors.map(([t, d], i) => (
                <Reveal key={t} delay={i * 60} className="rounded-2xl border border-ink bg-card p-5">
                  <p className="font-display text-2xl">{t}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{d}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section className="border-y border-ink bg-acid">
        <div className="mx-auto max-w-7xl px-5 py-20 md:py-28">
          <Kicker n="05">The bit nobody adds up</Kicker>
          <h2 className="mt-6 max-w-4xl text-5xl md:text-7xl">What's the mess <span className="ital">actually</span> costing you?</h2>
          <div className="mt-10"><CostCalculator /></div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-card border-b border-border"><div className="mx-auto max-w-7xl px-5 py-20 md:py-28">
        <Kicker n="06">How it works</Kicker>
        <h2 className="mt-6 text-5xl md:text-7xl">Like hiring a tech team. <span className="ital">Minus</span> the recruitment.</h2>
        <ol className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0">
          {steps.map((s, i) => (
            <li key={s.t} className="card-hard flex w-[78%] shrink-0 snap-center flex-col p-6 md:w-auto">
              <div className="flex items-center justify-between">
                <span className="font-display text-6xl text-signal">{i + 1}</span>
                <span className="label rounded-full bg-muted px-2.5 py-1">{s.w}</span>
              </div>
              <h3 className="mt-6 text-3xl">{s.t}</h3>
              <p className="mt-3 text-muted-foreground">{s.d}</p>
            </li>
          ))}
        </ol>
        <p className="label mt-2 text-muted-foreground md:hidden">← swipe →</p>
      </div></section>

      {/* WHY US */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:py-28">
        <Kicker n="07">Why us, not them</Kicker>
        <h2 className="mt-6 max-w-4xl text-5xl md:text-7xl">We've sat on <span className="ital">your</span> side of the desk.</h2>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">Most agencies have only ever built for clients. We built our first system for the company we worked in, used it every day, and fixed what annoyed people. That's the difference.</p>
        <div className="mt-10"><Comparison /></div>
      </section>

      {/* PRICING */}
      <section className="hierarchy-acid">
        <div className="mx-auto max-w-7xl px-5 py-16 md:py-24">
          <Kicker n="08">Pricing</Kicker>
          <div className="mb-10 mt-6 grid gap-5 md:grid-cols-[1.3fr_1fr] md:items-end">
            <h2 className="section-title">Fair, fixed,<br /><span className="ital">and written down.</span></h2>
            <p className="max-w-md text-lg leading-relaxed">No surprise invoices, no per-seat fees. Start with a clear plan, build in stages, and keep us on as your tech team.</p>
          </div>
          <PricingPlans />
          <p className="mt-7 text-center text-sm">Not sure where you fit? <Link to="/contact" className="font-semibold underline underline-offset-4">That's what the free chat is for.</Link></p>
        </div>
      </section>

      {/* HONEST BIT */}
      <section className="bg-card">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 md:grid-cols-[1fr_auto] md:items-center md:py-20">
          <div>
            <p className="label">The honest bit</p>
            <h2 className="mt-4 text-4xl leading-tight md:text-5xl">Sometimes the answer is <span className="ital">“you don't need us.”</span></h2>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">If a simple tool does exactly what you need, we'll point you to it. We only build things that genuinely make your life easier.</p>
          </div>
          <Note className="rotate-[-6deg] text-5xl md:text-6xl">no pitch.<br />no pressure.</Note>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-5 py-20 md:py-28">
        <Kicker n="09">Fair questions</Kicker>
        <div className="mt-8 divide-y divide-ink border-y-2 border-ink">
          {faqs.map((f, i) => (
            <div key={f.q}>
              <button onClick={() => setFaq(faq === i ? null : i)} aria-expanded={faq === i} className="flex w-full items-center justify-between gap-6 py-5 text-left text-lg font-semibold md:text-2xl">
                <h3 className="font-sans text-lg font-semibold tracking-normal md:text-2xl" style={{ lineHeight: 1.25 }}>{f.q}</h3>
                <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink transition-transform", faq === i && "rotate-45 bg-signal text-paper")}><Plus className="h-4 w-4" /></span>
              </button>
              <div className={cn("grid transition-all duration-300", faq === i ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]")}>
                <p className="overflow-hidden text-lg text-muted-foreground">{f.a}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          Longer notes from the work:{" "}
          {guidesFor("b2b").map((guide, i) => (
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
          <Note className="text-acid">30 minutes. that's it.</Note>
          <h2 className="mx-auto mt-4 max-w-4xl text-5xl md:text-8xl">Tell us what's <span className="ital text-acid">driving you mad.</span></h2>
          <p className="mx-auto mt-6 max-w-lg text-lg text-paper/80">A relaxed chat about your tools and processes. You'll leave with at least one idea to save time, whether you work with us or not.</p>
          <div className="mt-8 flex justify-center"><CtaLink to="/contact" size="lg" tone="acid">Book your free chat</CtaLink></div>
        </div>
      </section>
    </main>
  );
}
