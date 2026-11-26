import { createFileRoute, Link } from "@tanstack/react-router";
import { Kicker } from "@/components/site";
import { guideIndexCopy, guidesFor, type Guide } from "@/lib/guides";
import { breadcrumbLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/guides/")({
  head: () =>
    pageHead({
      title: guideIndexCopy.title,
      description: guideIndexCopy.description,
      path: "/guides",
      jsonLd: breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Guides", path: "/guides" },
      ]),
    }),
  component: GuidesIndex,
});

function Cluster({ title, intro, items }: { title: string; intro: string; items: Guide[] }) {
  return (
    <section className="mt-16">
      <h2 className="text-3xl md:text-5xl">{title}</h2>
      <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{intro}</p>
      <ul className="mt-8 grid gap-4 md:grid-cols-3">
        {items.map((guide) => (
          <li key={guide.slug}>
            <Link to="/guides/$slug" params={{ slug: guide.slug }} className="card-hard block h-full p-6 hover:bg-acid/20">
              <h3 className="text-2xl leading-tight">{guide.h1Lead} <span className="ital text-signal">{guide.h1Ital}</span></h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{guide.answer}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function GuidesIndex() {
  return (
    <main className="grain">
      <div className="mx-auto max-w-7xl px-5 pb-24 pt-10 md:pt-20">
        <Kicker>Guides</Kicker>
        <h1 className="mt-6 max-w-4xl text-[3.4rem] leading-[0.9] md:text-[7rem]">
          {guideIndexCopy.h1Lead} <span className="ital text-signal">{guideIndexCopy.h1Ital}</span>
        </h1>
        <p className="mt-6 max-w-2xl text-xl text-muted-foreground">{guideIndexCopy.description}</p>
        <Cluster
          title="Pub & restaurant websites"
          intro="Written for owners who need a site that answers hours, menu and bookings, without learning a website builder."
          items={guidesFor("food")}
        />
        <Cluster
          title="Custom business systems"
          intro="From replacing a CRM nobody opened, to connecting Xero and taking trade orders off email."
          items={guidesFor("b2b")}
        />
      </div>
    </main>
  );
}
