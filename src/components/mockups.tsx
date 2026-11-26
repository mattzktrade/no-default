import { useEffect, useState } from "react";
import { ArrowUpRight, Bell, Check, CheckCircle2, Clock, FileSignature, Mail, MapPin, Phone, RotateCcw, Search, Sparkles, Zap } from "lucide-react";
import type { PainId } from "@/lib/content";
import { cn } from "@/lib/utils";

/*
 * "The fix" screens for the headache explorer. Each is a focused product
 * moment — one workflow, resolved — with a small, optional interaction and an
 * automation log, so they read differently from the full Hollis demo app.
 */

type Tone = "soft" | "good" | "warn" | "blue";

const Pill = ({ children, tone = "soft" }: { children: React.ReactNode; tone?: Tone }) => (
  <span className={cn("fx-pill", `fx-pill-${tone}`)}>{children}</span>
);

function Frame({ path, title, meta, action, children, log }: { path: string; title: string; meta?: string; action?: React.ReactNode; children: React.ReactNode; log: { t: string; m: string }[] }) {
  return (
    <div className="fx-window">
      <div className="fx-bar">
        <span className="fx-mark">H</span>
        <span className="fx-path">{path}</span>
        <span className="fx-search"><Search />Search<kbd>⌘K</kbd></span>
        <span className="fx-avatar" aria-hidden="true">SP</span>
      </div>
      <div className="fx-head">
        <div className="min-w-0">
          {meta && <p className="fx-meta">{meta}</p>}
          <p className="fx-title">{title}</p>
        </div>
        {action}
      </div>
      <div className="fx-body">{children}</div>
      <div className="fx-log" aria-label="Automation log">
        <p className="fx-log-label"><Zap />Happened automatically</p>
        <ul>{log.map((l) => <li key={l.m}><time>{l.t}</time><span>{l.m}</span></li>)}</ul>
      </div>
    </div>
  );
}

function useSequence(length: number, run: boolean, ms = 420) {
  const [n, setN] = useState(length);
  useEffect(() => {
    if (!run) return;
    setN(0);
    let i = 0;
    const id = setInterval(() => { i += 1; setN(i); if (i >= length) clearInterval(id); }, ms);
    return () => clearInterval(id);
  }, [run, length, ms]);
  return n;
}

export function CustomerRecord() {
  const [run, setRun] = useState(0);
  const targets = [["CRM record", "Customers"], ["Delivery notes", "Operations"], ["Xero contact", "Accounts"], ["Trade portal", "Portal"]];
  const done = useSequence(targets.length, run > 0);
  return (
    <Frame path="app / customers / hollis-interiors" meta="Trade account · since 2021" title="Hollis Interiors Ltd"
      action={<button type="button" className="fx-btn" onClick={() => setRun((r) => r + 1)}><RotateCcw />Update address</button>}
      log={[{ t: "09:14", m: "Jess changed the delivery address" }, { t: "09:14", m: "Synced to 4 places · nobody retyped it" }]}>
      <div className="fx-card">
        <div className="fx-row"><MapPin /><span className="flex-1"><s className="text-muted-foreground">12 Mill Lane, S1 2AB</s><br /><strong>Unit 4, Kelham Yard, Sheffield S3 8RY</strong></span><Pill tone="blue">New</Pill></div>
        <div className="fx-row"><Phone /><span>0114 496 0832</span></div>
        <div className="fx-row"><Mail /><span className="truncate">orders@hollisinteriors.co.uk</span></div>
      </div>
      <p className="fx-sub">One change, updated everywhere</p>
      <ul className="fx-grid2">
        {targets.map(([n, s], i) => (
          <li key={n} className={cn("fx-sync", i < done && "is-done")}>
            <span><strong>{n}</strong><small>{s}</small></span>
            {i < done ? <CheckCircle2 className="text-moss" /> : <span className="fx-spinner" aria-label="Syncing" />}
          </li>
        ))}
      </ul>
    </Frame>
  );
}

export function InvoiceChaser() {
  const rows = [
    { c: "Marlow & Co", n: "INV-2291", a: "£4,820.00", s: "Paid", t: "good" as Tone, d: "Matched in Xero 07:12" },
    { c: "Bramley Trade", n: "INV-2288", a: "£2,140.50", s: "Reminder 1", t: "blue" as Tone, d: "3 days overdue · sent 09:00" },
    { c: "Oak & Pine Ltd", n: "INV-2279", a: "£9,600.00", s: "Due Fri", t: "soft" as Tone, d: "Friendly nudge queued" },
    { c: "Northgate Hotels", n: "INV-2270", a: "£1,385.00", s: "Needs a call", t: "warn" as Tone, d: "14 days · assigned to Priya" },
  ];
  return (
    <Frame path="app / invoices" meta="Week 44 · Xero connected" title="Who's paid, who's next"
      action={<Pill tone="good"><span className="fx-dot" />Live</Pill>}
      log={[{ t: "07:12", m: "Marlow & Co payment matched from bank feed" }, { t: "09:00", m: "3 polite reminders sent, in your tone" }]}>
      <div className="fx-stats">
        {[["Paid this week", "£23.4k", "good"], ["Overdue", "£3.5k", "warn"], ["Auto-chased", "11", "blue"]].map(([l, v, t]) => (
          <div key={l}><small>{l}</small><strong className={`fx-num-${t}`}>{v}</strong></div>
        ))}
      </div>
      <div className="fx-meter" aria-label="72% of this month collected"><span style={{ width: "72%" }} /></div>
      <p className="fx-caption">72% of October collected · 11 days earlier than September</p>
      <ul className="fx-list">
        {rows.map((r) => (
          <li key={r.n}>
            <span className="fx-initial">{r.c[0]}</span>
            <span className="min-w-0 flex-1"><strong className="block truncate">{r.c}</strong><small>{r.n} · {r.d}</small></span>
            <span className="text-right"><strong className="block tabular-nums">{r.a}</strong><Pill tone={r.t}>{r.s}</Pill></span>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

export function QuoteSign() {
  const [signed, setSigned] = useState(true);
  return (
    <Frame path="app / quotes / Q-1042" meta="Oak & Pine Ltd · sent 14:48" title="Spring range restock"
      action={signed ? <Pill tone="good"><FileSignature />Signed</Pill> : <Pill tone="blue"><Clock />Viewed</Pill>}
      log={signed ? [{ t: "14:51", m: "Signed 3 minutes after sending" }, { t: "14:51", m: "Order ORD-2081 created · deposit invoice raised" }] : [{ t: "14:48", m: "Quote sent with your branding" }, { t: "14:49", m: "Rachel opened it on her phone" }]}>
      <table className="fx-table">
        <thead><tr><th>Item</th><th>Qty</th><th>Total</th></tr></thead>
        <tbody>
          {[["Oak shelf unit 1200mm", "40", "£3,960.00"], ["Brass bracket set", "80", "£1,120.00"], ["Delivery · Sheffield", "1", "£85.00"]].map(([a, b, c]) => (
            <tr key={a}><td>{a}</td><td>×{b}</td><td>{c}</td></tr>
          ))}
        </tbody>
      </table>
      <div className="fx-total"><span>Subtotal £5,165.00 · VAT £1,033.00</span><strong>£6,198.00</strong></div>
      <div className={cn("fx-sign", signed && "is-signed")}>
        {signed ? <>
          <p className="hand fx-signature">R. Ashworth</p>
          <p className="fx-caption">Rachel Ashworth · Director · 14:51 · IP verified</p>
        </> : <p className="fx-caption">Awaiting signature…</p>}
        <button type="button" className="fx-btn" onClick={() => setSigned((s) => !s)}>{signed ? <><RotateCcw />Replay</> : <><FileSignature />Sign as Rachel</>}</button>
      </div>
    </Frame>
  );
}

export function TradePortal() {
  const [added, setAdded] = useState(false);
  const items = [
    { n: "Oak shelf unit 1200mm", p: 99, s: "212 in stock", q: 40, last: 30 },
    { n: "Oak shelf unit 900mm", p: 84, s: "96 in stock", q: 0, last: 0 },
    { n: "Brass bracket set", p: 14, s: "1,040 in stock", q: 80, last: 60 },
  ];
  const total = added ? items.reduce((sum, i) => sum + i.p * i.q, 0) : 0;
  return (
    <Frame path="trade.hollisinteriors.co.uk" meta="Signed in as Bramley Trade" title="Morning, Bramley."
      action={<Pill tone="blue">Your trade prices</Pill>}
      log={added ? [{ t: "07:52", m: "Order placed from the portal · no email needed" }, { t: "07:52", m: "Stock reserved and dispatch booked for Thu" }] : [{ t: "Mon", m: "Last order 12 Mar · 30 + 60 units" }]}>
      <button type="button" className={cn("fx-reorder", added && "is-done")} onClick={() => setAdded((a) => !a)}>
        {added ? <><Check />Reordered · 40 shelves, 80 brackets</> : <><RotateCcw />Reorder last order, with this week's quantities</>}
      </button>
      <ul className="fx-list">
        {items.map((i) => (
          <li key={i.n}>
            <span className="fx-product" aria-hidden="true"><span /></span>
            <span className="min-w-0 flex-1"><strong className="block truncate">{i.n}</strong><small className="text-moss">{i.s}</small></span>
            <span className="text-right"><strong className="block tabular-nums">£{i.p.toFixed(2)}</strong><small>{added ? `qty ${i.q}` : i.last ? `last ${i.last}` : "—"}</small></span>
          </li>
        ))}
      </ul>
      <div className="fx-total"><span>{added ? "Delivery Thursday · on account" : "Basket empty"}</span><strong>£{(total * 1.2).toLocaleString("en-GB", { minimumFractionDigits: 2 })}</strong></div>
    </Frame>
  );
}

export function Dashboard() {
  const ranges = { "30d": [38, 52, 44, 61, 58, 72, 80, 76, 88, 94, 86, 100], "12m": [55, 48, 60, 64, 58, 70, 66, 74, 81, 78, 90, 96] };
  const [range, setRange] = useState<keyof typeof ranges>("30d");
  const bars = ranges[range];
  return (
    <Frame path="app / overview" meta="Monday 08:02 · ready before the meeting" title="Morning, Sarah."
      action={<div className="fx-seg" role="group" aria-label="Date range">{(Object.keys(ranges) as (keyof typeof ranges)[]).map((r) => <button key={r} type="button" aria-pressed={range === r} onClick={() => setRange(r)}>{r}</button>)}</div>}
      log={[{ t: "08:00", m: "Monthly report built from live orders & Xero" }, { t: "08:01", m: "Sent to directors · zero spreadsheets opened" }]}>
      <div className="fx-stats fx-stats-2">
        {[["Revenue", range === "30d" ? "£184,220" : "£1.94m", "+12%"], ["Pipeline", "£412k", "+£38k"], ["Orders", range === "30d" ? "612" : "6,980", "34% via portal"], ["Overdue", "£3.5k", "↓ 81%"]].map(([l, v, d]) => (
          <div key={l}><small>{l}</small><strong className="tabular-nums">{v}</strong><em><ArrowUpRight />{d}</em></div>
        ))}
      </div>
      <div className="fx-chart" aria-label="Revenue trend">
        {bars.map((b, i) => <span key={`${range}-${i}`} className={cn(i === bars.length - 1 && "is-now")} style={{ height: `${b}%`, animationDelay: `${i * 30}ms` }} />)}
      </div>
      <p className="fx-caption"><Sparkles className="inline h-3 w-3 text-signal" /> Trade portal orders up 22% since launch</p>
    </Frame>
  );
}

export function OneLogin() {
  const tools = [["Salesforce", 1240], ["PandaDoc", 290], ["DocuSign", 180], ["Outreach", 410], ["Monday", 220], ["Zapier", 95], ["Typeform", 70], ["Canva teams", 110], ["Trello", 60]] as const;
  const [off, setOff] = useState<number>(tools.length);
  const saved = tools.slice(0, off).reduce((s, [, p]) => s + p, 0);
  return (
    <Frame path="app / settings / billing" meta="One login · 14 people" title="Everything, in one place"
      action={<button type="button" className="fx-btn" onClick={() => setOff((o) => (o >= tools.length ? 0 : tools.length))}>{off ? "Show before" : "Switch over"}</button>}
      log={[{ t: "Mar", m: "Data moved from 9 tools · nothing lost" }, { t: "Now", m: "New starters get one login on day one" }]}>
      <ul className="fx-tools">
        {tools.map(([n, p], i) => (
          <li key={n} className={cn(i < off && "is-off")}><span>{n}</span><small>£{p}/mo</small></li>
        ))}
      </ul>
      <div className="fx-saving">
        <span><small>Subscriptions</small><strong>{off ? "9 → 1" : "9 tools"}</strong></span>
        <span className="text-right"><small>Saved every month</small><strong className="tabular-nums">£{saved.toLocaleString("en-GB")}</strong></span>
      </div>
      <p className="fx-caption"><Bell className="inline h-3 w-3" /> £0 per-seat fees · owned by the business</p>
    </Frame>
  );
}

export const solutionScreens: Record<PainId, () => React.JSX.Element> = {
  retyping: CustomerRecord,
  invoices: InvoiceChaser,
  quotes: QuoteSign,
  orders: TradePortal,
  reporting: Dashboard,
  tools: OneLogin,
};
