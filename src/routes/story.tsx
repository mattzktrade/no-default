import { createFileRoute } from "@tanstack/react-router";
import { CtaLink, Kicker, Note, Reveal } from "@/components/site";
import { SITE } from "@/lib/content";
import { breadcrumbLd, pageHead, storyArticleLd } from "@/lib/seo";

const title = "Our story | How no default started inside a real business";
const description =
  "How one company's six-figure software headache became one system they own: a custom CRM, e-sign, trade portal, ticketing, Xero automation and more. Built by the person who worked there.";

export const Route = createFileRoute("/story")({
  head: () =>
    pageHead({
      title,
      description,
      path: "/story",
      type: "article",
      ogTitle: "It started with one company. Mine.",
      jsonLd: [
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Our story", path: "/story" },
        ]),
        storyArticleLd(),
      ],
    }),
  component: Story,
});

const chapters = [
  { t: "The mess", note: "sound familiar?", d: "New systems kept arriving to make us 'more organised'. Each one cost a fortune, needed training, and didn't quite fit how we worked. Within months, the team was quietly back on spreadsheets. We were paying for Salesforce, DocuSign, PandaDoc, an outreach tool, a ticketing platform, and still re-typing everything." },
  { t: "The rebuild", note: "one at a time", d: "So I started replacing them, one by one. First the CRM. Out went Salesforce, in came something shaped exactly like our sales process. People actually used it, because it was built around what they already did." },
  { t: "The snowball", note: "this is where it got fun", d: "Once everything lived in one place, connecting it was easy. Contracts signed inside the deal. Booking forms that filled themselves. Outreach triggered by real activity. Xero updating payments and chasing overdue invoices on its own." },
  { t: "The result", note: "one login.", d: "One system the whole company runs on. Fewer manual enquiries, faster sales, no more Friday invoice chasing, and a team that actually likes the software. And the business owns every line of it." },
  { t: "The idea", note: "why not everyone?", d: "Other business owners kept asking how we'd done it. They had the same problem: too many tools, not enough time back. So I started no default to do for other businesses what I did for mine, as their in-house tech team." },
];

const built = [
  ["CRM", "replaced Salesforce"],
  ["E-signatures", "replaced DocuSign"],
  ["Booking forms", "replaced PandaDoc"],
  ["Sales outreach", "automated, activity-triggered"],
  ["Trade portal", "customers order themselves"],
  ["Xero link", "payments + overdue reminders"],
  ["Event ticketing", "branded, wired into ops"],
  ["PDF brochures", "generated from live data"],
  ["Website", "connected to the CRM"],
];

function Story() {
  return (
    <main className="overflow-x-clip">
      <section className="grain mx-auto max-w-7xl px-5 pb-16 pt-10 md:pt-20">
        <Kicker className="rise">The story · by {SITE.founderFirst}, founder</Kicker>
        <h1 className="rise mt-6 text-[3.6rem] leading-[0.9] md:text-[8rem]">
          It started with <span className="ital text-signal">one</span> company.
        </h1>
        <p className="rise mt-6 max-w-2xl text-xl md:text-2xl">
          Mine. I watched them spend <span className="hl">hundreds of thousands</span> on software that was complicated, a pain, and mostly ignored. So I built them something better.
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-5 pb-20">
        <ol className="relative border-l-2 border-dashed border-ink/40 pl-8 md:pl-14">
          {chapters.map((c, i) => (
            <li key={c.t} className="relative pb-14 last:pb-0">
              <span className="absolute -left-[3.05rem] top-1 grid h-10 w-10 place-items-center rounded-full border border-ink bg-acid font-display text-lg md:-left-[4.6rem]">{i + 1}</span>
              <Reveal>
                <Note className="text-xl md:text-2xl">{c.note}</Note>
                <h2 className="mt-1 text-4xl md:text-6xl">{c.t}</h2>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{c.d}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section className="grain bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-5 py-20 md:py-28">
          <Kicker className="text-acid">What I built</Kicker>
          <h2 className="mt-4 text-5xl md:text-7xl">Nine tools. <span className="ital text-acid">One</span> system.</h2>
          <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">
            {built.map(([a, b], i) => (
              <Reveal key={a} delay={i * 50} className="rounded-2xl border border-paper/20 p-4 md:p-6">
                <p className="font-display text-2xl md:text-3xl">{a}</p>
                <p className="mt-1 text-sm text-paper/60">{b}</p>
              </Reveal>
            ))}
          </ul>
          <div className="mt-12"><CtaLink to="/contact" tone="paper">Could this work for you?</CtaLink></div>
        </div>
      </section>
    </main>
  );
}
