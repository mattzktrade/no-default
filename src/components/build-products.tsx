import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, BarChart3, Check, FileSignature, Globe, Package, Receipt, ShoppingBag, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HollisDemo, useHollisDemo } from "@/components/hollis-demo";
import type { DemoTab } from "@/lib/hollis-demo";
import { CtaLink, Kicker } from "@/components/site";
import { buildExamples } from "@/lib/content";

const productIcons = { crm: Users, quotes: FileSignature, portal: ShoppingBag, operations: Package, invoices: Receipt, reporting: BarChart3, website: Globe };

export function BuildProducts() {
  const [active, setActive] = useState(0);
  const [state, dispatch] = useHollisDemo();
  const navigate = (tab: DemoTab) => { const index = buildExamples.findIndex(example => example.id === tab); if (index >= 0) select(index); };
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const select = (index: number, focus = false) => {
    const next = (index + buildExamples.length) % buildExamples.length;
    setActive(next);
    tabs.current[next]?.scrollIntoView({ behavior: "instant", block: "nearest", inline: "nearest" });
    if (focus) tabs.current[next]?.focus({ preventScroll: true });
  };

  return <section className="build-section" aria-label="What we build">
    <div className="mx-auto max-w-7xl px-5 py-16 md:py-24">
      <Kicker n="02" className="text-paper/70">What we build</Kicker>
      <div className="mb-10 mt-6 grid gap-6 md:grid-cols-[1.3fr_1fr] md:items-end">
        <h2 className="section-title text-paper">Less admin.<br /><span className="ital text-acid">Better software.</span></h2>
        <div><p className="max-w-md text-lg leading-relaxed text-paper/80">CRMs, customer portals, quotes, websites, operations and reporting. Built around your business, connected in one system you own.</p><p className="mt-4 text-xs text-paper/60">Meet Hollis Interiors. One illustrative business. One connected system.</p></div>
      </div>
      <p className="mb-10 max-w-2xl border-l-2 border-acid pl-4 text-sm leading-relaxed text-paper/75"><strong className="text-acid">These are examples, not a menu.</strong> Every business is different, so we build whatever works for yours — if none of these fit, that's when we get interested.</p>
      <div className="showcase-tabs no-scrollbar" role="tablist" aria-label="Product examples">
        {buildExamples.map((example, index) => {
          const Icon = productIcons[example.id];
          return <Button key={example.id} ref={(element) => { tabs.current[index] = element; }} variant="ghost" role="tab" id={`product-tab-${example.id}`} aria-controls={`product-panel-${example.id}`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} className="showcase-tab" onClick={() => select(index)} onKeyDown={(event) => {
            const next = event.key === "ArrowRight" ? active + 1 : event.key === "ArrowLeft" ? active - 1 : event.key === "Home" ? 0 : event.key === "End" ? buildExamples.length - 1 : null;
            if (next !== null) { event.preventDefault(); select(next, true); }
          }}><Icon /><span>{example.category}</span><span className="showcase-tab-number" aria-hidden="true">0{index + 1}</span></Button>;
        })}
      </div>
      <div className="showcase-stage">
        {(() => {
          const example = buildExamples[active];
          if (!example) return null;
          return <article id={`product-panel-${example.id}`} role="tabpanel" aria-labelledby={`product-tab-${example.id}`} tabIndex={0} className="showcase-panel">
            <div className="showcase-copy" key={example.id}>
              <p className="showcase-index" aria-hidden="true">{String(active + 1).padStart(2, "0")}<span> / {String(buildExamples.length).padStart(2, "0")}</span></p>
              <h3>{example.title}</h3>
              <p className="showcase-description">{example.description}</p>
              <ul className="showcase-features">{example.features.map(feature => <li key={feature}><Check />{feature}</li>)}</ul>
              {example.id === "website" && <p className="mt-6 text-sm text-paper/80">Run a pub, café or restaurant? <Link to="/pubs-restaurants" className="font-semibold text-acid underline underline-offset-4">See websites for food businesses →</Link></p>}
            </div>
            <div className="showcase-preview"><div className="showcase-preview-label"><span className="hero-status-dot" />Hollis Interiors<span>Built by no default.</span></div><div className="product-display"><HollisDemo active={example.id} state={state} dispatch={dispatch} navigate={navigate} /></div></div>
          </article>;
        })()}
      </div>
      <div className="showcase-pagination">
        <div className="showcase-progress" aria-hidden="true">{buildExamples.map((example, index) => <span key={example.id} className={active === index ? "is-active" : ""} />)}</div>
        <span className="showcase-count">{String(active + 1).padStart(2, "0")} / {String(buildExamples.length).padStart(2, "0")}</span>
        <Button variant="ghost" size="icon" className="showcase-arrow" aria-label="Previous product example" title="Previous example" onClick={() => select(active - 1)}><ArrowLeft /></Button>
        <Button variant="ghost" size="icon" className="showcase-arrow" aria-label="Next product example" title="Next example" onClick={() => select(active + 1)}><ArrowRight /></Button>
      </div>
      <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-paper/20 pt-8"><p className="max-w-lg text-lg text-paper/80">Start with the bit that hurts most. Connect the rest as you grow.</p><CtaLink to="/contact" tone="acid">Talk about your system</CtaLink></div>
    </div>
  </section>;
}