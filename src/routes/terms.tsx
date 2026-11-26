import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { CtaLink, Kicker } from "@/components/site";
import { foodAgreement, foodAgreementUpdated, foodTerms } from "@/lib/content";
import { breadcrumbLd, pageHead } from "@/lib/seo";

const title = "Website plan terms | no default";
const description = `Plain-English terms for our pub & food website plan: ${foodTerms.price} a month, ${foodTerms.minimumMonths}-month minimum, who owns what, domain and email, updates and payment.`;

export const Route = createFileRoute("/terms")({
  head: () =>
    pageHead({
      title,
      description,
      path: "/terms",
      ogTitle: "Website plan terms",
      jsonLd: breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Pub & restaurant websites", path: "/pubs-restaurants" },
        { name: "Website plan terms", path: "/terms" },
      ]),
    }),
  component: Terms,
});

function Terms() {
  return (
    <main className="grain">
      <div className="mx-auto max-w-3xl px-5 pb-20 pt-10 md:pb-28 md:pt-16">
        <Kicker>Website plan terms</Kicker>
        <h1 className="mt-6 text-5xl leading-[0.95] md:text-7xl">The deal, <span className="ital text-signal">in plain English.</span></h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          Plain-English summary of our <Link to="/pubs-restaurants" className="font-semibold text-ink underline underline-offset-4">pub & food website plan</Link>. If anything here is unclear, ask us before you sign up.
        </p>
        <p className="label mt-4 text-muted-foreground">Last updated {foodAgreementUpdated}</p>

        <nav aria-label="On this page" className="mt-10 rounded-lg border border-ink bg-card p-5">
          <p className="label text-muted-foreground">On this page</p>
          <ol className="mt-3 grid gap-x-6 gap-y-2 text-sm font-semibold sm:grid-cols-2">
            {foodAgreement.map((s) => <li key={s.id}><a href={`#${s.id}`} className="underline-offset-4 hover:underline">{s.title}</a></li>)}
          </ol>
        </nav>

        <div className="mt-12 space-y-12">
          {foodAgreement.map((s) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="scroll-mt-24 border-t-2 border-ink pt-6">
              <h2 id={`${s.id}-title`} className="text-3xl md:text-4xl">{s.title}</h2>
              <ul className="mt-5 space-y-3">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-3 text-lg leading-relaxed text-muted-foreground"><Check className="mt-1.5 h-4 w-4 shrink-0 text-signal" aria-hidden />{p}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-16 rounded-lg border border-ink bg-card p-6 md:p-8">
          <h2 className="text-3xl">Questions about any of this?</h2>
          <p className="mt-3 text-muted-foreground">We'll go through it on a free chat, before you commit to anything.</p>
          <div className="mt-6"><CtaLink to="/chat">Book a free chat</CtaLink></div>
        </div>
      </div>
    </main>
  );
}
