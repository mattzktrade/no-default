import { createFileRoute, Link } from "@tanstack/react-router";
import { Kicker } from "@/components/site";
import { privacy, SITE } from "@/lib/content";
import { breadcrumbLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () =>
    pageHead({
      title: "Privacy | no default",
      description: `How ${SITE.legalName} uses the details you send through no-default.com.`,
      path: "/privacy",
      jsonLd: breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Privacy", path: "/privacy" },
      ]),
    }),
  component: Privacy,
});

function Privacy() {
  return (
    <main className="grain">
      <div className="mx-auto max-w-3xl px-5 pb-20 pt-10 md:pb-28 md:pt-16">
        <Kicker>{privacy.title}</Kicker>
        <h1 className="mt-6 text-5xl leading-[0.95] md:text-7xl">How we handle <span className="ital text-signal">your details.</span></h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{privacy.intro}</p>
        <p className="label mt-4 text-muted-foreground">Last updated {privacy.updated}</p>

        <div className="mt-12 space-y-12">
          {privacy.sections.map((section) => (
            <section key={section.title} className="scroll-mt-24 border-t-2 border-ink pt-6">
              <h2 className="text-3xl md:text-4xl">{section.title}</h2>
              <ul className="mt-5 space-y-3 text-lg leading-relaxed text-muted-foreground">
                {section.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <p className="mt-16 text-sm text-muted-foreground">
          Pub & food website plan terms are separate: <Link to="/terms" className="font-semibold underline underline-offset-4">read the plan terms</Link>.
        </p>
      </div>
    </main>
  );
}
