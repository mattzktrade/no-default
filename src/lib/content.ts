// Shared site copy. Used by pages and by JSON-LD so answers stay consistent.

export const SITE = {
  name: "no default",
  legalName: "No Default Systems",
  tagline: "Your in-house tech team, without the hire",
  founder: "Matt Johnson",
  founderFirst: "Matt",
  email: "matt@no-default.com",
  url: "https://no-default.com",
  area: "United Kingdom",
  logo: "/icon-512.png",
  ogImage: "/og.png",
  ogImageAlt: "nd",
  ogImageWidth: 1200,
  ogImageHeight: 630,
};

export const heroCards = [
  { title: "Salesforce", detail: "Another login", icon: "cloud", tone: "paper" },
  { title: "Chasing invoices", detail: "There goes Friday", icon: "receipt", tone: "ink" },
  { title: "Excel", detail: "FINAL_v7_actual.xlsx", icon: "sheet", tone: "paper" },
  { title: "Copy. Paste. Repeat.", detail: "Same data. Four places.", icon: "copy", tone: "accent" },
  { title: "DocuSign", detail: "Still waiting on a signature", icon: "sign", tone: "paper" },
  { title: "Who updated this?", detail: "Nobody knows", icon: "message", tone: "ink" },
  { title: "Monday.com", detail: "One more tab open", icon: "columns", tone: "paper" },
  { title: "Zapier", detail: "This connection broke again", icon: "bolt", tone: "accent" },
  { title: "PandaDoc", detail: "The quote is in my inbox", icon: "file", tone: "paper" },
  { title: "Manual reporting", detail: "Your Sunday evening", icon: "chart", tone: "ink" },
  { title: "9 subscriptions", detail: "And it still doesn't join up", icon: "layers", tone: "accent" },
  { title: "Orders by email", detail: "Same as last time, please", icon: "mail", tone: "paper" },
] as const;

export const heroCopy = {
  intro: "Custom business systems. Built around you.",
  description: "Your business doesn't need another tool. It needs the right things, connected. We turn the subscriptions, spreadsheets and workarounds into one system you own — then stay on as your tech team.",
  mess: "Your tools. Your team's problem.",
  solution: "One login. Everything moving.",
};

export const buildExamples = [
  { id: "crm", category: "Customers & sales", title: "A CRM your team actually wants to use.", description: "Every customer, conversation and next step in one place. Built around your sales process, not someone else's.", features: ["Customer records", "Sales pipeline", "Team activity"] },
  { id: "quotes", category: "Quotes & e-signing", title: "From a quote to a signature. In one flow.", description: "Live prices, a polished proposal and a signature without swapping tools. Accepted quotes become orders automatically.", features: ["Live pricing", "Branded proposals", "Built-in signing"] },
  { id: "portal", category: "Customer & trade portals", title: "Your customers' own ordering desk.", description: "Their products, their prices and their previous orders. A simple place to buy again, without a phone call or an email.", features: ["Account pricing", "Repeat orders", "Live availability"] },
  { id: "operations", category: "Orders & operations", title: "Everyone knows what's happening next.", description: "Track orders, jobs and handovers from start to finish. Clear ownership, clear deadlines, and no hunting through spreadsheets.", features: ["Job tracking", "Team handovers", "Order status"] },
  { id: "invoices", category: "Invoices & automation", title: "Get paid. Without the Friday chase.", description: "Connect your accounts to the rest of the business. See what's paid, what's due and which reminders have already gone out.", features: ["Xero connected", "Payment tracking", "Automatic reminders"] },
  { id: "reporting", category: "Dashboards & reporting", title: "The whole business. A clearer picture.", description: "Sales, orders and cash flow together, using live data from the same system. Useful answers, without a day of copying numbers.", features: ["Live reporting", "Sales performance", "Cash-flow visibility"] },
  { id: "website", category: "Websites & shops", title: "A website that looks like you. And sells like you.", description: "Fast, mobile-first sites and shops, written and designed around how you actually sell. Connected to your system, so enquiries and orders arrive straight in.", features: ["Mobile-first design", "Enquiries straight in", "Connected to your system"] },
] as const;

export type PainId = "retyping" | "invoices" | "quotes" | "orders" | "reporting" | "tools";

export const pains: {
  id: PainId;
  chip: string;
  title: string;
  before: { who: string; time: string; msg: string }[];
  cost: string;
  fix: string;
  fixDetail: string;
}[] = [
  {
    id: "retyping",
    chip: "Typing it in 4 times",
    title: "The same customer lives in four different places.",
    before: [
      { who: "Jess (sales)", time: "09:14", msg: "Has anyone updated Hollis's new address? It's still the old one on the delivery sheet 🙃" },
      { who: "Dan (ops)", time: "09:31", msg: "I changed it in the CRM. Didn't know it was on the sheet too" },
      { who: "Priya (accounts)", time: "09:40", msg: "and it's wrong in Xero 😩" },
    ],
    cost: "≈ 6 hrs a week re-keying, plus the mistakes it causes",
    fix: "One customer record. Change it once, it's right everywhere.",
    fixDetail: "Sales, ops and accounts all read from the same place, so the delivery note, the invoice and the CRM can't disagree.",
  },
  {
    id: "invoices",
    chip: "Chasing invoices",
    title: "Friday afternoons spent chasing who's paid.",
    before: [
      { who: "Priya (accounts)", time: "16:02", msg: "Can someone check if Marlow & Co paid? Not showing in Xero yet??" },
      { who: "You", time: "16:05", msg: "I'll ring them Monday" },
      { who: "Priya (accounts)", time: "16:06", msg: "That's what we said last Monday x" },
    ],
    cost: "£18k+ sitting overdue, and a few awkward phone calls",
    fix: "Payments update themselves. Reminders send themselves.",
    fixDetail: "Connected to Xero both ways. When a payment lands, the deal updates. When it's late, a polite reminder goes out on your schedule, in your voice.",
  },
  {
    id: "quotes",
    chip: "Quotes take days",
    title: "Quotes take a day to build and live in someone's inbox.",
    before: [
      { who: "Customer", time: "11:20", msg: "Hi, just following up on the quote from last week?" },
      { who: "Jess (sales)", time: "14:48", msg: "Sorry! Waiting on pricing from Dan, then I'll pop it in a PDF and send it over for signing" },
    ],
    cost: "Slow quotes lose deals to whoever answers first",
    fix: "Quote, send and get it signed in about 3 minutes.",
    fixDetail: "Products and prices pulled from live data, a branded proposal generated in one click, and e-signed right inside the same system. No PandaDoc, no DocuSign.",
  },
  {
    id: "orders",
    chip: "Orders by phone & email",
    title: "Customers phone and email to order the same things every week.",
    before: [
      { who: "Email from Bramley Trade", time: "07:52", msg: "Morning, same as last time please but 40 instead of 30 of the oak ones. And can you confirm price? Thanks" },
      { who: "Dan (ops)", time: "08:30", msg: "Which oak ones 😅 we have 6" },
    ],
    cost: "Your best people stuck taking orders instead of selling",
    fix: "A trade portal where customers order and reorder themselves.",
    fixDetail: "Their prices, their order history, live stock. Orders drop straight into operations and invoicing with no one re-typing a thing.",
  },
  {
    id: "reporting",
    chip: "Month-end reporting",
    title: "Month-end means a day of copying numbers between screens.",
    before: [
      { who: "You", time: "Sun 21:10", msg: "Need the sales numbers for tomorrow's meeting. Which spreadsheet is the right one?" },
      { who: "Dan (ops)", time: "Sun 21:42", msg: "Sales_Tracker_v7_FINAL_actual.xlsx. But it's not updated since the 3rd" },
    ],
    cost: "Decisions made on gut feel and out-of-date numbers",
    fix: "Numbers you can trust, live, on your phone.",
    fixDetail: "Pipeline, revenue, overdue and orders on one screen that updates itself, because it's all the same system underneath.",
  },
  {
    id: "tools",
    chip: "Too many tools",
    title: "Nine subscriptions. Everyone uses about 20% of each.",
    before: [
      { who: "Bank feed", time: "1st", msg: "Salesforce £1,240 · DocuSign £180 · PandaDoc £290 · Outreach £410 · Monday £220 · Zapier £95 …" },
      { who: "You", time: "1st", msg: "Do we actually use half of these?" },
    ],
    cost: "Seat fees that go up every year, for tools that don't fit",
    fix: "One login. One system. Yours to keep.",
    fixDetail: "Built around how your team actually works, owned outright. No per-seat creep, no renewals, no 'that's on the enterprise plan'.",
  },
];

export const faqs = [
  {
    q: "What does no default actually do?",
    a: "We act as your in-house tech team. We review the tools, spreadsheets and manual processes your business runs on, then replace the messy parts with one custom system you own: CRM, quotes, e-signing, portals, invoicing links and reporting, all connected.",
  },
  {
    q: "Who is this for?",
    a: "Established UK businesses, usually 10 to 150 people and roughly £1m to £25m turnover, with no internal IT or dev team. Typically wholesale and distribution, trade suppliers, manufacturers, events, construction and professional services who have outgrown spreadsheets and off-the-shelf tools.",
  },
  {
    q: "Isn't custom software really expensive?",
    a: "It used to be. Modern tooling means we build in weeks what used to take a team months. Most clients spend less over two to three years than they would on their current stack of subscriptions, and they own the result outright.",
  },
  {
    q: "How long does it take?",
    a: "The first working piece usually lands in 3 to 6 weeks. We build in stages, starting with whatever hurts most, so you feel the difference early instead of waiting a year for a big launch.",
  },
  {
    q: "What if an off-the-shelf tool would do the job?",
    a: "Then we'll tell you, and point you to it. The first conversation is about whether this is genuinely right for you. We only build things that will make your life easier.",
  },
  {
    q: "Do we own the software and the data?",
    a: "Yes. The code, the data, all of it. No per-seat licence fees and no lock-in.",
  },
  {
    q: "Can it connect to Xero, Google Workspace or Microsoft 365?",
    a: "Yes. We keep the tools that genuinely work for you, like Xero for accounts, and connect them properly so data flows both ways without anyone re-typing it.",
  },
  {
    q: "What happens to our existing data?",
    a: "We migrate it: customers, products, deals, history. It gets cleaned up on the way across.",
  },
  {
    q: "What happens if something breaks or we need changes?",
    a: "You message us. Ongoing support and improvement is the whole point. We're part of your team, not a vendor you raise tickets with.",
  },
];

export const plans = [
  {
    name: "The Audit",
    price: "£1,500",
    amount: 1500,
    minPrice: false,
    unit: "one-off",
    blurb: "A proper look at every tool, spreadsheet and workaround. You get a clear map, the real costs, and a plan, even if you never hire us.",
    points: ["Sit-downs with your team", "Full software + cost review", "A written system plan", "Fee credited if you go ahead"],
  },
  {
    name: "The Build",
    price: "from £8k",
    amount: 8000,
    minPrice: true,
    unit: "per stage",
    blurb: "Fixed-scope stages, starting with whatever hurts most. You see it working in weeks, not quarters.",
    points: ["Fixed price per stage", "Data migration included", "Team training", "You own the code + data"],
    featured: true,
    tag: "Build in stages. Own the result.",
  },
  {
    name: "In-house Team",
    price: "from £2.5k",
    amount: 2500,
    minPrice: true,
    unit: "per month",
    blurb: "We become your tech team. Hosting, support, fixes and steady improvements as the business changes.",
    points: ["Hosting + monitoring", "Direct line to the builder", "Monthly improvements", "Cancel with 30 days' notice"],
  },
];

export const storyMeta = {
  headline: "It started with one company",
  datePublished: "2026-11-26",
};

export const privacy = {
  title: "Privacy",
  updated: "26 November 2026",
  intro: `${SITE.legalName} (“we”) is a UK business run by ${SITE.founder}. This page explains what we collect when you use no-default.com, and why.`,
  sections: [
    {
      title: "Who is responsible",
      points: [
        `${SITE.legalName} is the controller of personal data collected through this website.`,
        `Questions or requests: ${SITE.email}.`,
      ],
    },
    {
      title: "What we collect",
      points: [
        "If you use the contact forms, we receive your name, email address, and whatever you choose to tell us (company or pub name, team size, and notes).",
        "If you email us directly, we see whatever you send, including your email address.",
        "The site does not currently use advertising cookies or a third-party analytics cookie banner.",
      ],
    },
    {
      title: "Why we use it",
      points: [
        "To reply to an enquiry, book a chat, and decide whether we can help. That is a legitimate interest, and where you are asking us to quote or start work it is also a step towards a contract.",
        "We do not sell your details, and we do not use them for bulk marketing lists.",
      ],
    },
    {
      title: "How long we keep it",
      points: [
        "Enquiry emails are kept long enough to reply and for a reasonable follow-up. If we do not work together, we delete them when they are no longer useful, and at the latest within two years.",
        "If you become a customer, we keep the records needed to run the work and meet our legal duties (for example invoices).",
      ],
    },
    {
      title: "Who else sees it",
      points: [
        "Messages are sent to our mailbox using an email provider. We only share details with people who need them to reply to you.",
        "If a request of yours is required by law, we would have to comply.",
      ],
    },
    {
      title: "Your rights",
      points: [
        "You can ask for a copy of what we hold, ask us to correct it, or ask us to delete it. Email us and we will deal with it.",
        "You can complain to the Information Commissioner’s Office (ico.org.uk) if you are unhappy with how we handle your data.",
      ],
    },
  ],
};

// Pub & food business websites (/pubs-restaurants). Prices and terms are shared with JSON-LD and tests.
export const foodTerms = {
  monthly: 79,
  price: "£79",
  setupFee: 0,
  minimumMonths: 3,
  noticeDays: 30,
  ownershipMonths: 12,
  overdueDays: 14,
  priceLockMonths: 12,
  launchWeeks: 2,
} as const;

export const foodChat = {
  kicker: "Book a free chat",
  titleLead: "Tell us about",
  titleItal: "your place.",
  description: "A relaxed chat about your pub, café or restaurant and what you need online. You'll come away knowing exactly what we'd build and what it costs.",
  points: [
    "About 20 minutes, video or phone",
    "You talk, we mostly listen",
    "You'll know what we'd build and what it costs",
    "Honest answer if it's not a fit",
  ],
  note: `you'll speak to ${SITE.founderFirst}, not a call centre.`,
  kinds: ["Pub", "Café", "Restaurant", "Takeaway"],
  chips: [
    { id: "pdf", chip: "Menu is a PDF" },
    { id: "facebook", chip: "Facebook is our website" },
    { id: "hours", chip: "Hours keep changing" },
    { id: "bookings", chip: "Bookings by DM" },
    { id: "maps", chip: "Hard to find on Maps" },
    { id: "none", chip: "No website yet" },
  ],
  placeholder: "e.g. our menu is an old PDF and we're only on Facebook",
} as const;

export const foodHero = {
  kicker: "Pub & restaurant websites",
  title: "Your pub deserves a website as good as your food.",
  description: "We build the site and keep it up to date for you — text us a new special or a change of hours and it's live the same day.",
  facts: `${foodTerms.price}/month, no setup, live in about ${foodTerms.launchWeeks} weeks`,
  trust: "Run by Matt, the founder. You deal with him directly, not a call centre.",
};

export const foodProblems = [
  { icon: "pdf", title: "The menu is a PDF from last spring", detail: "Pinch, zoom, wait for it to download. Then the prices are wrong by the time they reach the bar.", quote: "Is the menu on here the current one?" },
  { icon: "social", title: "Facebook is doing the job of a website", detail: "Posts get buried, not everyone is on it, and it isn't where people look for a menu or opening hours.", quote: "Have you got a proper website?" },
  { icon: "phone", title: "“Are you open Sunday?”", detail: "The phone rings mid-service with questions your website should already answer.", quote: "Sorry, are you doing food tonight?" },
  { icon: "photo", title: "No photos of the food", detail: "People choose with their eyes. Without good photos, they pick the place down the road that has them.", quote: "What's the food actually like?" },
  { icon: "map", title: "Hard to find on Google Maps", detail: "Old hours, someone else's photos, or a profile nobody has claimed. Passing trade goes elsewhere.", quote: "Google said you were closed?" },
  { icon: "booking", title: "Bookings by DM and voicemail", detail: "Table requests scattered across Messenger, texts and the answerphone, and one always gets missed.", quote: "Did anyone get my booking for 8?" },
] as const;

export const foodIncluded = [
  { icon: "design", title: "Designed around your place", detail: "Your food, your room, your regulars. A site that looks like you, built to work on phones first." },
  { icon: "support", title: "Support & maintenance, completely hands-off", detail: "Hosting, security certificate, backups, your domain and email forwarding. We keep it all running, so there's nothing for you to renew or fix." },
  { icon: "updates", title: "Menu & hours updates by message", detail: "New specials, a price change, closed for a private party. Message us and we change it, usually the same working day." },
  { icon: "seo", title: "Local SEO", detail: "Page titles, descriptions and fast pages looked after, so nearby diners can find you." },
  { icon: "google", title: "Google Business Profile help", detail: "Set up or claimed, with the right hours, photos and menu link, so you show up properly on Maps." },
  { icon: "events", title: "Bookings & what's on", detail: "A booking or enquiry form that lands in your inbox, and a what's-on page for quiz night, live music and Christmas menus." },
] as const;

export const foodSteps = [
  { t: "Free chat", d: "Twenty minutes about your place, your menu and what's not working. No jargon, no pitch.", w: "Day 1" },
  { t: "We build it", d: `Send us your menu and a few photos (phone photos are fine). We design, write and set up everything, then you check it over. About ${foodTerms.launchWeeks} weeks once we have your menu, photos and access to your domain.`, w: `About ${foodTerms.launchWeeks} weeks` },
  { t: "Message us changes", d: "Specials, prices, hours, events. Send us a message and we update the site for you.", w: "Ongoing" },
];

const maxBuyout = (foodTerms.ownershipMonths - foodTerms.minimumMonths) * foodTerms.monthly;

export const foodPlans = [
  {
    name: "Hands-off website",
    monthly: foodTerms.monthly,
    price: foodTerms.price,
    unit: "per month",
    tag: "Everything included",
    blurb: "A great-looking website that we build, run and keep up to date for you. You run the pub; we handle the website.",
    points: [
      "Designed and built for you, phones first",
      "Hosting, security, backups, support & maintenance",
      "Unlimited menu, price & opening-hours changes",
      "Local SEO so nearby diners find you",
      "Google Business Profile set up and kept in step",
      "Booking or enquiry form & what's-on page",
      "Your own domain name, registered to you",
      "Email forwarding to the inbox you already use",
    ],
    featured: true,
  },
] as const;

export const foodFooter = {
  lead: "You run the pub.",
  payoff: "We'll run the website.",
  about: `${SITE.legalName} builds and looks after websites for UK pubs, cafés, restaurants and takeaways. ${foodTerms.price} a month, everything included, with no setup fee.`,
};

export const foodPlanTerms = [
  { title: "Nothing up front", detail: "No setup fee and no VAT to add." },
  { title: `${foodTerms.minimumMonths}-month minimum`, detail: `Then month to month, with ${foodTerms.noticeDays} days' notice.` },
  { title: "Price locked", detail: `${foodTerms.price} is fixed for your first ${foodTerms.priceLockMonths} months.` },
  { title: "Yours to keep", detail: `After ${foodTerms.ownershipMonths} monthly payments, the site is yours.` },
] as const;

export const foodFaqs = [
  {
    q: "How much does a pub or restaurant website cost?",
    a: `${foodTerms.price} a month, everything included, with no VAT to add. There is no setup fee: the design and build are included in the monthly price, so there is nothing to pay up front.`,
  },
  {
    q: "Is there a minimum term?",
    a: `Yes, ${foodTerms.minimumMonths} months. After that it is month to month, and you can cancel with ${foodTerms.noticeDays} days' notice.`,
    terms: "term",
  },
  {
    q: "Who owns the website?",
    a: `Your domain name, menus, photos and words are always yours, and we hand them back free whenever you leave. The website itself is licensed to you while you're with us, because we build it without charging up front. After ${foodTerms.ownershipMonths} monthly payments it's yours to keep or move, free. Leave before then and the site comes down, or you can buy it by paying the months left to reach ${foodTerms.ownershipMonths}.`,
    terms: "ownership",
  },
  {
    q: "Are domain and email included?",
    a: "One standard .co.uk, .uk or .com domain is included and registered to you, along with email forwarding, so info@yourpub.co.uk lands in the inbox you already use. Premium domains and proper mailboxes (Microsoft 365 or Google Workspace, about £6 per person a month) are passed on at cost.",
    terms: "domain-email",
  },
  {
    q: "What counts as an update?",
    a: "Menu, price and opening-hours changes, specials, events, photos and wording: unlimited small changes, usually live the same working day. New pages, a redesign or new features are quoted separately, so you always know before anything costs extra.",
    terms: "updates",
  },
  {
    q: "What does local SEO involve?",
    a: "We look after the local search basics: page titles, descriptions, your Google Business Profile and fast pages. Nobody can honestly guarantee rankings, but we make sure search engines have the right information.",
  },
  {
    q: "Do I need any tech skills?",
    a: "None. You don't log in to anything or learn a website builder. If you can send a text, you can update your website.",
  },
  {
    q: "How long until my website is live?",
    a: `Usually about ${foodTerms.launchWeeks} weeks once we have your menu, photos and access to your domain.`,
  },
  {
    q: "Can you move my existing website and email?",
    a: "Yes. We copy your email settings across before switching your domain over, so your email keeps working throughout. If a previous designer still holds your domain, we help you get it back; that can take a few weeks.",
  },
  {
    q: "Do you take the photos?",
    a: "Phone photos are fine, and we'll tell you what to shoot. Professional photography isn't included, but we can agree suitable stock images where you need them.",
  },
  {
    q: "Will it help us show up on Google Maps?",
    a: "We help set up or claim your Google Business Profile and keep its hours, photos and menu link in step with your website. You give us manager access, and Google's verification can take a few days or weeks. We can't promise rankings, but we make sure Google has the right information.",
  },
  {
    q: "How do I pay, and what if a payment is missed?",
    a: `Monthly by Direct Debit. If a payment is ${foodTerms.overdueDays} days overdue, the site is paused until the account is up to date.`,
    terms: "late-payment",
  },
  {
    q: "Will the price go up?",
    a: `${foodTerms.price} is fixed for your first ${foodTerms.priceLockMonths} months. After that, we give at least ${foodTerms.noticeDays} days' notice of any change.`,
    terms: "payment",
  },
  {
    q: "Who checks allergen and menu details?",
    a: "You do. We publish menu, allergen and price information exactly as you send it, and you check it before it goes live. Accuracy stays with you as the food business.",
    terms: "content",
  },
  {
    q: "Do you take a cut of our bookings?",
    a: "No. It's a flat monthly fee. Booking requests come straight to you, with no commission per cover.",
  },
] satisfies { q: string; a: string; terms?: FoodAgreementId }[];

export const foodAgreementUpdated = "24 November 2026";

export const foodAgreement = [
  {
    id: "included",
    title: "What's included",
    points: [
      "Design and build of your website, written and set up for you.",
      "Hosting, security certificate, backups, software updates, support and maintenance.",
      "Unlimited small updates (see Updates and fair use).",
      "Local SEO basics and help with your Google Business Profile.",
      "A booking or enquiry form and a what's-on page.",
      "One standard domain and email forwarding (see Domain and email).",
    ],
  },
  {
    id: "payment",
    title: "Payment and price",
    points: [
      `${foodTerms.price} a month, paid monthly in advance by Direct Debit. We're not VAT registered, so there's no VAT to add.`,
      `There is no setup fee. The build cost is spread across your monthly payments.`,
      `Your price is fixed for the first ${foodTerms.priceLockMonths} months. After that, we give at least ${foodTerms.noticeDays} days' notice of any change, and you can cancel before it applies.`,
    ],
  },
  {
    id: "term",
    title: "Minimum term and cancelling",
    points: [
      `The minimum term is ${foodTerms.minimumMonths} months from the day your site goes live.`,
      `After that, the plan rolls monthly. Cancel any time with ${foodTerms.noticeDays} days' notice by email.`,
      "Your site stays live until the end of your final paid month. Part months aren't refunded.",
    ],
  },
  {
    id: "ownership",
    title: "Who owns what",
    points: [
      "Your domain name, logo, menus, photos and words are yours from day one, and we return them free whenever you leave.",
      "The website's design and code are licensed to you while you're on the plan, because we build it without charging up front.",
      `After ${foodTerms.ownershipMonths} monthly payments, the website is yours. On request we hand over the files and help you move it, free.`,
      `If you leave before ${foodTerms.ownershipMonths} payments, the website comes down at the end of your final paid month. If you'd like to keep it, you can buy it by paying the months left to reach ${foodTerms.ownershipMonths} (at most £${maxBuyout} after the minimum term).`,
    ],
  },
  {
    id: "domain-email",
    title: "Domain and email",
    points: [
      "One standard .co.uk, .uk or .com domain is included, registered in your name, and renewed by us while you're on the plan.",
      "If you already have a domain, we use it. If a previous designer holds it, we help you get it back; that can take a few weeks and may delay launch.",
      "Email forwarding is included. Premium domains and mailboxes (such as Microsoft 365 or Google Workspace) are charged at cost, agreed with you first.",
      "When we switch your domain over, we copy your existing email settings first so your email keeps working.",
    ],
  },
  {
    id: "updates",
    title: "Updates and fair use",
    points: [
      "Small changes are unlimited: menus, prices, opening hours, specials, events, photos and wording.",
      "We aim to make small changes the same working day, and always within one working day.",
      "New pages, redesigns and new features aren't small changes. We quote for them first, and nothing is charged unless you agree.",
    ],
  },
  {
    id: "content",
    title: "Your content",
    points: [
      "You supply your menus, prices, photos and details, and check them before they go live.",
      "Allergen, dietary and price information is published as you supply it. Its accuracy stays your responsibility as the food business.",
      "Professional photography isn't included. Phone photos are fine, or we can agree suitable stock images.",
      "For Google Business Profile help, you give us manager access. Google's verification can take days or weeks.",
    ],
  },
  {
    id: "late-payment",
    title: "Late payment",
    points: [
      `If a payment is ${foodTerms.overdueDays} days overdue, we pause your site until the account is up to date.`,
      "Once you're up to date, we switch it back on straight away. Your content is never deleted because of a late payment.",
    ],
  },
] as const;

export type FoodAgreementId = (typeof foodAgreement)[number]["id"];
