import { useState } from "react";
import { Check, Minus } from "lucide-react";
import { pains, type PainId } from "@/lib/content";
import { messCost } from "@/lib/calc";
import { solutionScreens } from "@/components/mockups";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/* ---------- Pain explorer: pick your headache, see the fix ---------- */

function Chat({ id }: { id: PainId }) {
  const p = pains.find((x) => x.id === id);
  if (!p) return null;
  return (
    <div className="rounded-3xl border border-dashed border-ink/30 bg-paper p-4">
      <p className="label mb-3 text-muted-foreground">Sound familiar? · the team chat</p>
      <ul className="space-y-2.5">
        {p.before.map((m, i) => (
          <li key={i} className={cn("rise max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[15px] leading-snug", m.who === "You" ? "ml-auto rounded-br-sm bg-ink text-paper" : "rounded-bl-sm bg-card ring-1 ring-border")} style={{ animationDelay: `${i * 120}ms` }}>
            <p className={cn("text-[11px] font-semibold", m.who === "You" ? "text-paper/60" : "text-signal")}>{m.who} · {m.time}</p>
            {m.msg}
          </li>
        ))}
      </ul>
      <p className="mt-4 flex items-start gap-2 text-sm font-semibold text-signal"><Minus className="mt-0.5 h-4 w-4 shrink-0" />{p.cost}</p>
    </div>
  );
}

export function PainExplorer() {
  const [id, setId] = useState<PainId>("retyping");
  const [fixed, setFixed] = useState(false);
  const p = pains.find((x) => x.id === id);
  const Screen = solutionScreens[id];
  if (!p) return null;

  return (
    <div>
      <div className="no-scrollbar -mx-5 flex snap-x gap-2 overflow-x-auto px-5 pb-2" role="tablist" aria-label="Common problems">
        {pains.map((x) => (
          <Button
            key={x.id}
            variant="ghost"
            role="tab"
            aria-selected={x.id === id}
            onClick={() => { setId(x.id); setFixed(false); }}
            className={cn("h-auto shrink-0 snap-start rounded-full border border-ink px-4 py-2.5 text-sm font-semibold transition", x.id === id ? "bg-ink text-paper hover:bg-ink hover:text-paper" : "bg-card hover:bg-acid")}
          >
            {x.chip}
          </Button>
        ))}
      </div>

      <h3 key={id} className="rise mt-8 w-full text-balance font-display text-4xl leading-[1.05] tracking-normal md:text-6xl">{p.title}</h3>

      {/* Mobile: toggle between before / after. Desktop: side by side. */}
      <div className="mt-6 inline-flex rounded-full border border-ink bg-card p-1 md:hidden" role="group" aria-label="Before or after">
        {[false, true].map((v) => (
          <Button variant="ghost" key={String(v)} aria-pressed={fixed === v} onClick={() => setFixed(v)} className={cn("h-auto rounded-full px-5 py-2 text-sm font-semibold transition", fixed === v && (v ? "bg-acid" : "bg-ink text-paper hover:bg-ink hover:text-paper"))}>
            {v ? <Check /> : <Minus />}{v ? "The fix" : "The problem"}
          </Button>
        ))}
      </div>

      <div className="mt-6 grid gap-6 md:mt-8 md:grid-cols-2 md:items-start md:gap-10">
        <div className={cn("min-w-0", fixed && "hidden md:block")} key={`b-${id}`}>
          <p className="mb-4 flex items-center gap-2 border-b border-ink/20 pb-3 text-sm font-semibold"><Minus className="h-4 w-4" />The problem<span className="ml-auto text-xs font-normal text-muted-foreground">Before</span></p>
          <Chat id={id} />
        </div>
        <div className={cn("min-w-0", !fixed && "hidden md:block")} key={`a-${id}`}>
          <p className="mb-4 flex items-center gap-2 border-b border-signal/30 pb-3 text-sm font-semibold text-signal"><Check className="h-4 w-4" />The fix<span className="ml-auto text-xs font-normal text-muted-foreground">With no default.</span></p>
          <div className="rise relative">
            <Screen />
          </div>
          <p className="mt-5 text-xl font-semibold leading-snug">{p.fix}</p>
          <p className="mt-2 text-muted-foreground">{p.fixDetail}</p>
        </div>
      </div>

      {!fixed && (
        <Button variant="ghost" onClick={() => setFixed(true)} className="mt-6 h-auto w-full rounded-full border border-ink bg-acid py-3.5 font-semibold shadow-[var(--shadow-hard)] md:hidden">
          Show me the fix →
        </Button>
      )}
    </div>
  );
}

/* ---------- Cost of the mess calculator ---------- */

function Range({ label, value, min, max, step, onChange, fmt }: { label: string; value: number; min: number; max: number; step: number; onChange: (n: number) => void; fmt: (n: number) => string }) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-4">
        <span className="font-medium">{label}</span>
        <span className="font-display text-2xl tabular-nums">{fmt(value)}</span>
      </span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="mt-3 h-3 w-full cursor-pointer accent-signal" />
    </label>
  );
}

const gbp = (n: number) => "£" + Math.round(n).toLocaleString("en-GB");

export function CostCalculator() {
  const [toolsPerMonth, setTools] = useState(1800);
  const [people, setPeople] = useState(6);
  const [hoursPerWeek, setHours] = useState(4);
  const r = messCost({ toolsPerMonth, people, hoursPerWeek });

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_1.1fr] md:gap-10">
      <div className="space-y-8 rounded-3xl border border-ink bg-card p-6">
        <Range label="Monthly software spend" value={toolsPerMonth} min={200} max={8000} step={100} onChange={setTools} fmt={gbp} />
        <Range label="People doing manual admin" value={people} min={1} max={40} step={1} onChange={setPeople} fmt={(n) => String(n)} />
        <Range label="Hours each lose per week" value={hoursPerWeek} min={1} max={15} step={1} onChange={setHours} fmt={(n) => `${n} hrs`} />
        <p className="text-xs text-muted-foreground">Time costed at £22/hr over 46 working weeks. A rough guide, not a quote.</p>
      </div>
      <div className="grain flex flex-col justify-between rounded-3xl bg-ink p-6 text-paper md:p-10" aria-live="polite">
        <div>
          <p className="label text-acid">What the mess costs you a year</p>
          <p className="mt-4 font-display text-6xl tabular-nums md:text-8xl">{gbp(r.total)}</p>
          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-paper/15 pt-5">
            <div><p className="font-display text-3xl tabular-nums">{gbp(r.subscriptions)}</p><p className="label mt-1 text-paper/60">subscriptions</p></div>
            <div><p className="font-display text-3xl tabular-nums">{r.hoursPerYear.toLocaleString("en-GB")} hrs</p><p className="label mt-1 text-paper/60">of people's time</p></div>
          </div>
        </div>
        <p className="hand mt-8 text-3xl text-acid md:text-4xl">…and that's before the mistakes.</p>
      </div>
    </div>
  );
}

/* ---------- Comparison ---------- */

const rows = [
  ["Built around how you work", [false, "sometimes", true, true]],
  ["You own it outright", [false, true, true, true]],
  ["No per-seat fees", [false, true, true, true]],
  ["Someone who stays to support it", ["tickets", "rarely", true, true]],
  ["Has run one inside a real business", ["—", "rarely", "maybe", true]],
  ["Cost", ["creeps up yearly", "£50k+ up front", "£45k+ salary", "staged, fixed"]],
] as const;
const cols = ["Off-the-shelf SaaS", "Dev agency", "Hiring a developer", "no default"];

export function Comparison() {
  const [col, setCol] = useState(3);
  const cell = (v: boolean | string) => (v === true ? <Check className="mx-auto h-5 w-5" /> : v === false ? <Minus className="mx-auto h-5 w-5 opacity-40" /> : <span className="text-sm">{v}</span>);
  return (
    <>
      {/* Mobile: pick one to compare against */}
      <div className="md:hidden">
        <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5">
          {cols.slice(0, 3).map((c, i) => (
            <button key={c} onClick={() => setCol(i)} className={cn("shrink-0 rounded-full border border-ink px-4 py-2 text-sm font-semibold", col === i ? "bg-ink text-paper" : "bg-card")}>vs {c}</button>
          ))}
        </div>
        <div className="mt-4 overflow-hidden rounded-3xl border border-ink bg-card">
          <div className="grid grid-cols-[1.4fr_1fr_1fr] bg-muted text-center text-xs font-bold">
            <span />
            <span className="p-3">{col === 3 ? cols[0] : cols[col]}</span>
            <span className="bg-acid p-3">no default</span>
          </div>
          {rows.map(([l, v]) => (
            <div key={l} className="grid grid-cols-[1.4fr_1fr_1fr] items-center border-t border-border text-center">
              <span className="p-3 text-left text-sm font-medium">{l}</span>
              <span className="p-3 text-muted-foreground">{cell(v[col === 3 ? 0 : col] ?? "—")}</span>
              <span className="bg-acid/40 p-3 font-semibold">{cell(v[3])}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Desktop table */}
      <table className="hidden w-full overflow-hidden rounded-3xl border border-ink bg-card md:table">
        <thead>
          <tr className="bg-muted text-sm">
            <th />
            {cols.map((c, i) => <th key={c} className={cn("p-4 font-bold", i === 3 && "bg-acid font-display text-xl")}>{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map(([l, v]) => (
            <tr key={l} className="border-t border-border text-center">
              <td className="p-4 text-left font-medium">{l}</td>
              {v.map((x, i) => <td key={i} className={cn("p-4", i === 3 ? "bg-acid/40 font-semibold" : "text-muted-foreground")}>{cell(x)}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
