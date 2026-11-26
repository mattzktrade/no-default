import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { btn, Kicker, Note } from "@/components/site";
import { foodChat, SITE } from "@/lib/content";
import { mailtoHref, sendEnquiry } from "@/lib/enquiry";
import { breadcrumbLd, pageHead } from "@/lib/seo";
import { cn } from "@/lib/utils";

const title = "Book a free chat | Pub & restaurant websites | no default";
const description = foodChat.description;

export const Route = createFileRoute("/chat")({
  head: () =>
    pageHead({
      title,
      description,
      path: "/chat",
      ogTitle: `${foodChat.titleLead} ${foodChat.titleItal}`,
      jsonLd: breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Pub & restaurant websites", path: "/pubs-restaurants" },
        { name: "Book a chat", path: "/chat" },
      ]),
    }),
  component: Chat,
});

function Chat() {
  const [kind, setKind] = useState<string>("");
  const [picked, setPicked] = useState<string[]>([]);
  const [form, setForm] = useState({ name: "", pub: "", email: "", note: "", honeypot: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const toggle = (c: string) => setPicked((p) => (p.includes(c) ? p.filter((x) => x !== c) : [...p, c]));

  const payload = {
    funnel: "food" as const,
    name: form.name,
    email: form.email,
    organisation: form.pub,
    note: form.note,
    kind,
    hurts: picked,
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await sendEnquiry({ data: { ...payload, honeypot: form.honeypot } });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const field = "mt-2 h-14 w-full rounded-2xl border border-ink bg-card px-4 text-base outline-none focus:bg-acid/30";

  return (
    <main className="overflow-x-clip">
      <section className="grain mx-auto grid max-w-7xl gap-12 px-5 pb-24 pt-10 md:grid-cols-[1fr_1.1fr] md:pt-20">
        <div>
          <Kicker className="rise">{foodChat.kicker}</Kicker>
          <h1 className="rise mt-6 text-[3.4rem] leading-[0.9] md:text-[6.5rem]">{foodChat.titleLead} <span className="ital text-signal">{foodChat.titleItal}</span></h1>
          <p className="rise mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">{foodChat.description}</p>
          <ul className="mt-8 space-y-3 text-lg">
            {foodChat.points.map((x) => (
              <li key={x} className="flex gap-3"><Check className="mt-1 h-5 w-5 shrink-0 text-signal" />{x}</li>
            ))}
          </ul>
          <Note className="mt-8 -rotate-3">{foodChat.note}</Note>
        </div>

        {status === "sent" ? (
          <div className="card-hard space-y-4 p-6 md:p-8">
            <h2 className="font-display text-4xl">Got it.</h2>
            <p className="text-lg text-muted-foreground">I'll read it and come back to you at {form.email}.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="card-hard relative space-y-8 p-6 md:p-8">
            <fieldset>
              <legend className="font-display text-2xl">What kind of place?</legend>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {foodChat.kinds.map((s) => (
                  <button type="button" key={s} onClick={() => setKind(s)} aria-pressed={kind === s} className={cn("h-12 rounded-xl border border-ink text-sm font-semibold", kind === s ? "bg-ink text-paper" : "bg-background")}>{s}</button>
                ))}
              </div>
            </fieldset>
            <fieldset className="border-b border-border pb-7">
              <legend className="font-display text-2xl">What's not working?</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {foodChat.chips.map((p) => {
                  const on = picked.includes(p.chip);
                  return (
                    <button type="button" key={p.id} onClick={() => toggle(p.chip)} aria-pressed={on} className={cn("rounded-full border border-ink px-4 py-2.5 text-sm font-semibold transition", on ? "bg-ink text-paper" : "bg-background hover:bg-acid")}>{p.chip}</button>
                  );
                })}
              </div>
            </fieldset>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block font-medium">Your name<input required autoComplete="name" className={field} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
              <label className="block font-medium">Pub name<input autoComplete="organization" className={field} value={form.pub} onChange={(e) => setForm({ ...form, pub: e.target.value })} /></label>
            </div>
            <label className="block font-medium">Email<input required type="email" autoComplete="email" inputMode="email" className={field} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
            <label className="block font-medium">Anything else? <span className="text-muted-foreground">(optional)</span>
              <textarea rows={3} className={cn(field, "h-auto py-3")} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder={foodChat.placeholder} />
            </label>
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>Website<input tabIndex={-1} autoComplete="off" value={form.honeypot} onChange={(e) => setForm({ ...form, honeypot: e.target.value })} /></label>
            </div>
            {status === "error" && (
              <p className="text-sm text-signal">
                Couldn't send from the site. Email{" "}
                <a className="underline" href={mailtoHref(payload)}>{SITE.email}</a>{" "}
                instead, or try again.
              </p>
            )}
            <button type="submit" disabled={status === "sending"} className={cn(btn({ tone: "acid", size: "lg" }), "w-full")}>
              {status === "sending" ? "Sending…" : "Send it over"} <ArrowUpRight className="h-5 w-5" />
            </button>
            <p className="text-center text-sm text-muted-foreground">Or email <a className="underline" href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
          </form>
        )}
      </section>
    </main>
  );
}
