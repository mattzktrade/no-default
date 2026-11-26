import { foodTerms, SITE } from "./content";

export type GuideFunnel = "food" | "b2b";

export type GuideSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type Guide = {
  slug: string;
  funnel: GuideFunnel;
  title: string;
  h1Lead: string;
  h1Ital: string;
  description: string;
  answer: string;
  datePublished: string;
  cta: { to: "/contact" | "/chat"; label: string };
  sections: GuideSection[];
};

const published = "2026-11-26";

export const guides: Guide[] = [
  {
    slug: "pub-website-cost-uk",
    funnel: "food",
    title: `How much does a pub website cost in the UK? | ${foodTerms.price}/month | no default`,
    h1Lead: "What a pub website",
    h1Ital: "actually costs.",
    description: `UK pub and restaurant websites: agencies often quote thousands up front. Our hands-off plan is ${foodTerms.price} a month, no setup fee, no VAT, ownership after ${foodTerms.ownershipMonths} payments.`,
    answer: `A working UK pub website usually costs either a few thousand pounds up front plus hosting, or a monthly plan. We charge ${foodTerms.price} a month, with no setup fee and no VAT, and the site becomes yours after ${foodTerms.ownershipMonths} monthly payments.`,
    datePublished: published,
    cta: { to: "/chat", label: "Book a free chat" },
    sections: [
      {
        heading: "The three ways pubs pay for a website",
        paragraphs: [
          "I get asked this more than anything else. Owners compare a one-off quote, a DIY builder, and a monthly “we’ll do it for you” plan, and the numbers look like they are measuring different jobs. They are.",
          "A design agency will often quote £2,000 to £5,000 to build a site, then hosting, a booking widget and someone to change the menu on top. A Wix or Squarespace site looks cheap until you count the evenings spent fighting templates. A monthly plan only works if the fee really includes the boring work: hosting, updates, and the search listings people actually use.",
        ],
      },
      {
        heading: "What our £79 covers",
        paragraphs: [
          `${foodTerms.price} a month is the whole job for one place: design and build, hosting, security, backups, support, unlimited small menu/price/hours updates, local SEO basics, Google Business Profile help, a booking or enquiry form and a what’s-on page. There is no setup fee. We are not VAT registered, so there is no VAT to add.`,
          `The price is fixed for the first ${foodTerms.priceLockMonths} months. The minimum term is ${foodTerms.minimumMonths} months, then ${foodTerms.noticeDays} days’ notice. After ${foodTerms.ownershipMonths} monthly payments the website is yours. Leave earlier and the site comes down unless you pay the months left to reach ${foodTerms.ownershipMonths}. Your domain, menus, photos and words stay yours either way.`,
        ],
        bullets: [
          "No setup fee and no VAT on the monthly price",
          "Design, hosting, updates and support in the same fee",
          `Yours to keep after ${foodTerms.ownershipMonths} payments`,
        ],
      },
      {
        heading: "What is not in the monthly fee",
        paragraphs: [
          "Professional photography is not included. Phone photos are fine; we will tell you what to shoot. Premium domains and real mailboxes (Microsoft 365 or Google Workspace) are passed on at cost. New pages, a redesign or extra features are quoted first, so nothing extra is charged unless you agree.",
          "We also do not take a cut of your bookings. Requests go to you. That matters if you have been quoted “free” sites that charge per cover.",
        ],
      },
      {
        heading: "How to compare quotes honestly",
        paragraphs: [
          "Ask who changes the Sunday hours when you decide to close for a wake. Ask who owns the domain. Ask what happens if you stop paying in month six. If those answers are vague, the headline price is not the cost.",
          `If you want the full plain-English version of our plan, it is on the website plan terms. If you just want to know whether ${foodTerms.price} is a fit for your place, that is a twenty-minute chat.`,
        ],
      },
    ],
  },
  {
    slug: "what-a-pub-website-needs",
    funnel: "food",
    title: "What a pub website actually needs | no default",
    h1Lead: "What a pub website",
    h1Ital: "actually needs.",
    description: "The pages and details UK diners look for before they visit: today’s menu, hours, phone, events, photos, and a Google listing that matches the site.",
    answer: "A pub website has to answer the questions people ask before they leave the house: are you open, what is on the menu, can we book, and is it the kind of place we want. If those answers live only on Facebook, a lot of people never see them.",
    datePublished: published,
    cta: { to: "/chat", label: "Book a free chat" },
    sections: [
      {
        heading: "What people look up before they come in",
        paragraphs: [
          "I have sat with owners who think the website is a brochure. The visits that matter are shorter than that. Someone is standing in the car park, or arguing about where to eat, and they need hours, the food, a phone number and a photo of the room. If any of that is wrong, they pick the place down the road.",
        ],
        bullets: [
          "Today’s hours, including bank holidays and private parties",
          "A menu they can read on a phone, not a PDF from last spring",
          "A number they can tap, and an address that matches Google Maps",
          "What’s on: quiz, live music, Sunday roast, Christmas menu",
          "A way to book or enquire that does not vanish into Messenger",
        ],
      },
      {
        heading: "Facebook is not a website",
        paragraphs: [
          "Facebook is useful for regulars. It is a terrible homepage for anyone who is not already following you. Posts get buried, not everyone has an account, and Google does not treat a Facebook page as a reliable source of opening hours. The site should be the source of truth; social can point at it.",
        ],
      },
      {
        heading: "Google Business Profile has to match the site",
        paragraphs: [
          "If Maps says you close at 11 and the website says 10.30, people trust neither. We help claim or set up the profile and keep hours, photos and the menu link in step with the site. You still have to tell us when something changes. Google’s own verification can take days. Nobody honest can promise a ranking; we can make sure Google is not working from last year’s hours.",
        ],
      },
      {
        heading: "The example on our site is a demo, not a client",
        paragraphs: [
          "The Hare & Lantern on our pub page is a coded mock-up so you can click around a menu, events and a booking form. It is not a live venue we built. When we do build yours, those same pieces are what we actually ship: current food, what’s on, hours, and a form that lands in your inbox.",
        ],
      },
    ],
  },
  {
    slug: "pub-website-vs-diy-builders",
    funnel: "food",
    title: "Pub website vs Wix or Squarespace | no default",
    h1Lead: "DIY builders vs",
    h1Ital: "someone who just does it.",
    description: "Wix and Squarespace are cheap until you count the evenings. A hands-off pub website is for owners who would rather run the bar than a website builder.",
    answer: "A DIY website builder is cheaper in software fees and more expensive in your time. If you like tinkering, use one. If you are already behind on the cellar and the rota, paying someone to build it and change the specials for you is usually the cheaper option.",
    datePublished: published,
    cta: { to: "/chat", label: "Book a free chat" },
    sections: [
      {
        heading: "Where DIY is honest",
        paragraphs: [
          "If you enjoy the builder, have spare evenings, and will actually keep the menu current, a Wix or Squarespace site can be enough. You keep control. You also keep the job of remembering SSL renewals, plugin updates, and why the Sunday hours widget broke after a theme change.",
        ],
      },
      {
        heading: "Where it quietly costs more",
        paragraphs: [
          "The pattern I see is the same: a well-meaning nephew builds it, the menu PDF is uploaded once, then six months later nobody has the login. Or the owner has the login and spends Sunday night fighting a drag-and-drop layout instead of going home.",
          `Our plan exists for that person. You message a change; we make it. ${foodTerms.price} a month, no setup fee, and after ${foodTerms.ownershipMonths} payments the site is yours so you are not renting a template forever.`,
        ],
      },
      {
        heading: "Ownership and lock-in",
        paragraphs: [
          "Builders lock design to their platform. If you leave, you often start again. We register the domain in your name, and after twelve monthly payments we hand over the site. Leave earlier and you can pay the remaining months to keep it, or walk away with your content and domain.",
          "That is the comparison that matters, not whether a theme looks pretty on day one.",
        ],
      },
    ],
  },
  {
    slug: "replace-salesforce-without-another-subscription",
    funnel: "b2b",
    title: "Replace Salesforce without another subscription | no default",
    h1Lead: "Stop renting a CRM",
    h1Ital: "nobody opens.",
    description: "How we replaced Salesforce, DocuSign and PandaDoc inside a real UK company with one system the business owns, instead of buying yet another seat licence.",
    answer: "If your team has quietly gone back to spreadsheets, another CRM subscription will not fix it. I replaced Salesforce, DocuSign and PandaDoc inside the company I worked for with one system shaped around how that business already sold, then connected the rest.",
    datePublished: published,
    cta: { to: "/contact", label: "Book a free 30-min chat" },
    sections: [
      {
        heading: "What actually happened",
        paragraphs: [
          "This is not a composite case study. I worked there. New systems kept arriving to make us “more organised”. Each one needed training, a champion, and a licence count. Within months the team was back on spreadsheets because the tools did not match the work.",
          "We were paying for Salesforce, DocuSign, PandaDoc, an outreach tool and a ticketing platform, and still re-typing the same customer into four places. I replaced them one at a time, starting with the CRM, because that was the record everything else disagreed with.",
        ],
      },
      {
        heading: "Why “just implement it properly” failed",
        paragraphs: [
          "Salesforce can be made to fit almost any process if you have an admin team and the appetite for it. We did not. Off-the-shelf quoting tools wanted our prices to look like their prices. E-sign lived in someone’s inbox, not on the deal. The cost was not only the subscriptions. It was Friday afternoons spent reconciling who had the latest version.",
        ],
      },
      {
        heading: "What we put in their place",
        paragraphs: [
          "A CRM that followed our sales process. Quotes with live prices and a signature in the same flow, so accepted quotes became orders instead of email attachments. A trade portal so customers could reorder without phoning. Xero for the accounts, connected both ways, with overdue reminders in our voice. Event tickets and PDF brochures generated from the same records. A website that sent enquiries into the same system.",
          "The business owns the code and the data. No per-seat fee. That is the offer I now make to other UK companies who have outgrown the pile of tools.",
        ],
      },
      {
        heading: "What this is not",
        paragraphs: [
          "It is not a productised CRM you log into. Hollis Interiors on our homepage is a demo so you can click the flows, not a client. If an off-the-shelf tool would genuinely do the job, we will say so on the first call. We only build when the mess is real.",
        ],
      },
    ],
  },
  {
    slug: "xero-connected-operations",
    funnel: "b2b",
    title: "Xero connected to operations, without Zapier | no default",
    h1Lead: "Payments should update",
    h1Ital: "the deal itself.",
    description: "Connect Xero to the rest of the business so paid invoices update the job, and overdue reminders go out in your voice, without a fragile chain of Zapier steps.",
    answer: "Xero is often the one tool a UK business is right to keep. The mess starts when accounts live in Xero and everyone else lives in a spreadsheet, so Friday is spent asking who has paid. The fix is a two-way connection to the system that already holds the job, not another automation plugin.",
    datePublished: published,
    cta: { to: "/contact", label: "Book a free 30-min chat" },
    sections: [
      {
        heading: "Keep Xero. Stop re-typing it.",
        paragraphs: [
          "Accounts teams need a proper ledger. We do not replace Xero with a homemade bookkeeping tool. We connect it so a payment landing in Xero updates the deal, and a job marked complete can raise the invoice without someone copying line items.",
        ],
      },
      {
        heading: "Why Zapier was a poor fit for us",
        paragraphs: [
          "Zapier is fine for a one-off “email me when this form submits”. It is a bad backbone for invoices. When a mapping breaks, nobody notices until a customer is chased for a bill they paid, or not chased for one they did not. The failure is silent, and it always happens on a Friday.",
          "Inside the company I rebuilt, overdue reminders went out on a schedule, in our voice, because the state of the invoice lived next to the state of the job. That is the difference between a connection and a Rube Goldberg machine of zaps.",
        ],
      },
      {
        heading: "What “connected” looks like in practice",
        paragraphs: [
          "Sales can see what is overdue without logging into Xero. Accounts can see which job an invoice belongs to without hunting a spreadsheet. Reminders are boring on purpose: polite, on time, stop when it is paid. If you already have a credit-control process, we shape the reminders around it rather than inventing a new one.",
        ],
      },
    ],
  },
  {
    slug: "trade-portal-instead-of-email-orders",
    funnel: "b2b",
    title: "A trade portal instead of orders by email | no default",
    h1Lead: "Stop taking reorders",
    h1Ital: "by email.",
    description: "Wholesale and trade customers already know what they want. A portal with their prices, their products and last time’s order beats another “same as last time” email.",
    answer: "If your trade customers email “same as last time” and someone in the office re-keys it, you do not need a storefront. You need their prices, their products and their previous order on a page they can submit themselves.",
    datePublished: published,
    cta: { to: "/contact", label: "Book a free 30-min chat" },
    sections: [
      {
        heading: "The email is the process",
        paragraphs: [
          "Wholesale and trade supply rarely fails because the website is ugly. It fails because the customer’s price list lives in a PDF, last month’s order lives in someone’s inbox, and stock lives in a spreadsheet that is wrong by 10am. The customer did nothing wrong. They used the only channel that works: email and the phone.",
        ],
      },
      {
        heading: "What a portal has to get right",
        paragraphs: [
          "Account pricing, not a public catalogue. Repeat order from last time, with the lines they actually buy. Availability that is honest enough that you are not confirming by phone anyway. A login the warehouse can also see, so the order is not re-typed into a second system.",
          "That is what I built when we replaced the pile of tools at my old employer, and it is a common first stage for the manufacturers and trade suppliers we talk to now.",
        ],
      },
      {
        heading: "What you can skip",
        paragraphs: [
          "You probably do not need a consumer checkout, abandoned-cart emails, or a blog. Those are ecommerce habits. Trade buyers want their list, their price, and a confirmation. If an off-the-shelf B2B platform already fits, we will tell you. If your pricing and packs are too specific, a small portal on top of a system you own is usually less painful than bending Shopify into a trade desk.",
        ],
      },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((guide) => guide.slug === slug);
}

export function guidesFor(funnel: GuideFunnel): Guide[] {
  return guides.filter((guide) => guide.funnel === funnel);
}

export function guidePath(guide: Guide): string {
  return `/guides/${guide.slug}`;
}

export const guideIndexCopy = {
  title: "Guides | Custom systems and pub websites | no default",
  description: `First-hand notes from ${SITE.founder} on replacing SaaS piles, connecting Xero, trade portals, and what a UK pub website actually needs to cost and contain.`,
  h1Lead: "Written from the work,",
  h1Ital: "not from a template.",
};
