import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { CtaLink } from "@/components/site";
import { plans as defaultPlans } from "@/lib/content";
import { cn } from "@/lib/utils";

type Plan = { name: string; price: string; unit: string; blurb: string; points: readonly string[]; featured?: boolean; tag?: string };
type CtaTo = "/contact" | "/chat";

export function PricingPlans({ plans = defaultPlans, to = "/contact", footer }: { plans?: readonly Plan[]; to?: CtaTo; footer?: ReactNode }) {
  if (plans.length === 1 && plans[0]) return <SinglePlan plan={plans[0]} to={to} footer={footer} />;
  return (
    <div className={cn("grid gap-5", plans.length === 2 ? "mx-auto max-w-4xl md:grid-cols-2" : "md:grid-cols-3")}>
      {plans.map((plan) => (
        <article key={plan.name} className={cn("flex flex-col rounded-lg border border-ink p-6 text-ink lg:p-8", plan.featured ? "bg-ink text-paper" : "bg-card")}>
          <p className={cn("label mb-5 min-h-5", plan.featured ? "text-acid" : "text-muted-foreground")}>{plan.tag ?? plan.unit}</p>
          <h3 className="text-3xl">{plan.name}</h3>
          <p className="mt-6 font-display text-5xl leading-tight lg:text-6xl">{plan.price}</p>
          <p className={cn("mt-1 text-sm", plan.featured ? "text-paper/70" : "text-muted-foreground")}>{plan.unit}</p>
          <p className={cn("mt-6 leading-relaxed", plan.featured ? "text-paper/80" : "text-muted-foreground")}>{plan.blurb}</p>
          <ul className={cn("mb-8 mt-6 space-y-3 border-t pt-6 text-sm", plan.featured ? "border-paper/20" : "border-border")}>
            {plan.points.map((point) => <li key={point} className="flex gap-2.5"><Check className={cn("h-4 w-4 shrink-0", plan.featured ? "text-acid" : "text-signal")} />{point}</li>)}
          </ul>
          <CtaLink to={to} tone={plan.featured ? "acid" : "ghost"} size="sm" className="mt-auto w-full">Let's talk</CtaLink>
        </article>
      ))}
    </div>
  );
}

function SinglePlan({ plan, to, footer }: { plan: Plan; to: CtaTo; footer: ReactNode }) {
  return (
    <article className="card-hard overflow-hidden rounded-lg border border-ink bg-card text-ink">
      <div className="grid md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)]">
        <div className="flex flex-col bg-ink p-7 text-paper lg:p-10">
          {plan.tag && <p className="label text-acid">{plan.tag}</p>}
          <h3 className="mt-4 text-3xl lg:text-4xl">{plan.name}</h3>
          <p className="mt-8 flex items-baseline gap-2">
            <span className="font-display text-7xl leading-none lg:text-8xl">{plan.price}</span>
            <span className="text-paper/70">{plan.unit}</span>
          </p>
          <p className="mt-6 max-w-sm leading-relaxed text-paper/80">{plan.blurb}</p>
          <CtaLink to={to} tone="acid" size="lg" className="mt-8 w-full md:mt-auto">Book a free chat</CtaLink>
        </div>
        <div className="p-7 lg:p-10">
          <p className="label text-muted-foreground">What's included</p>
          <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {plan.points.map((point) => (
              <li key={point} className="flex gap-3 border-b border-border pb-4 leading-snug last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {footer && <div className="border-t border-ink bg-paper">{footer}</div>}
    </article>
  );
}
