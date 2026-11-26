import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { foodFooter, SITE } from "@/lib/content";
import { isFoodChrome } from "@/lib/seo";
import { Button } from "@/components/ui/button";

export const btn = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      tone: {
        ink: "bg-ink text-paper border border-ink hover:bg-signal hover:border-signal",
        acid: "bg-acid text-ink border border-ink shadow-[var(--shadow-hard)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none",
        signal: "bg-signal text-paper border border-signal hover:bg-ink hover:border-ink",
        ghost: "border border-ink text-ink hover:bg-ink hover:text-paper",
        paper: "bg-paper text-ink border border-paper hover:bg-acid hover:border-acid",
      },
      size: { md: "h-12 px-6 text-base", lg: "h-14 px-7 text-lg", sm: "h-10 px-4 text-sm" },
    },
    defaultVariants: { tone: "ink", size: "md" },
  },
);

type CtaTo = "/" | "/story" | "/solutions" | "/pricing" | "/pubs-restaurants" | "/contact" | "/chat" | "/guides" | "/privacy" | "/terms";

export function CtaLink({
  to,
  children,
  className,
  ...v
}: { to: CtaTo; children: ReactNode; className?: string } & VariantProps<typeof btn>) {
  const content = (
    <>
      {children}
      <ArrowUpRight className="h-5 w-5" aria-hidden />
    </>
  );
  return <Link to={to} className={cn(btn(v), className)}>{content}</Link>;
}

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={cn("reveal", inView && "in", className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function Kicker({ n, children, className }: { n?: string; children: ReactNode; className?: string }) {
  return (
    <p className={cn("label flex items-center gap-3 text-muted-foreground", className)}>
      {n && <span className="grid h-6 min-w-6 place-items-center rounded-full border border-current px-1.5">{n}</span>}
      {children}
    </p>
  );
}

/** Hand-drawn scribble note, like a margin annotation. */
export function Note({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("hand inline-block text-3xl text-signal md:text-4xl", className)}>{children}</span>;
}

const nav = [
  { to: "/solutions", label: "What we fix" },
  { to: "/story", label: "Our story" },
  { to: "/pricing", label: "Pricing" },
  { to: "/guides", label: "Guides" },
] as const;

const foodNav = [
  { hash: "example", label: "Example site" },
  { hash: "pricing", label: "Pricing" },
  { hash: "faq", label: "FAQ" },
] as const;

const foodPaths = isFoodChrome;

/** Bold lettering logo: "no" then "default". */
export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("inline-flex items-baseline font-display text-[1.6rem] leading-none", className)} style={{ fontWeight: 900, fontVariationSettings: '"wdth" 125', letterSpacing: "-0.06em" }} aria-label="no default home">
      <span>no</span>
      <span className="ml-[0.26em]">default</span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  useEffect(() => {
    const on = () => {
      const y = window.scrollY;
      setScrolled((was) => (was ? y > 8 : y > 32));
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const solid = scrolled || open;
  const food = foodPaths(path);
  const mobileLink = "rise border-b border-paper/15 py-5 font-display text-5xl";

  return (
    <>
      <header className="pointer-events-none sticky top-0 z-40 h-20 md:h-24 [overflow-anchor:none]">
        <div className={cn("pointer-events-auto border-b transition-[height,background-color,border-color,box-shadow] duration-300", solid ? "h-16 border-border bg-background/90 shadow-[0_8px_30px_-20px_var(--ink)] backdrop-blur-md" : "h-20 md:h-24 border-transparent bg-transparent")}>
          <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-5">
            <Logo />
            <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
              {food
                ? foodNav.map((n) => (
                    <Link key={n.hash} to="/pubs-restaurants" hash={n.hash} activeOptions={{ includeHash: true }} className="text-sm font-medium underline-offset-8 hover:underline">
                      {n.label}
                    </Link>
                  ))
                : nav.map((n) => (
                    <Link key={n.to} to={n.to} className="text-sm font-medium underline-offset-8 hover:underline" activeProps={{ className: "underline decoration-signal decoration-2" }}>
                      {n.label}
                    </Link>
                  ))}
              <CtaLink to={food ? "/chat" : "/contact"} size="sm">Book a chat</CtaLink>
            </nav>
            <Button variant="ghost" size="icon" className="h-11 w-11 rounded-full border border-ink md:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 top-16 z-30 flex flex-col bg-ink px-5 pb-10 pt-8 text-paper md:hidden">
          {food ? (
            <>
              {foodNav.map((n, i) => (
                <Link key={n.hash} to="/pubs-restaurants" hash={n.hash} activeOptions={{ includeHash: true }} onClick={() => setOpen(false)} className={mobileLink} style={{ animationDelay: `${i * 50}ms` }}>
                  {n.label}
                </Link>
              ))}
              <Link to="/chat" className={mobileLink} style={{ animationDelay: `${foodNav.length * 50}ms` }}>Book a chat</Link>
            </>
          ) : (
            [{ to: "/", label: "Home" }, ...nav, { to: "/contact", label: "Book a chat" }].map((n, i) => (
              <Link key={n.to} to={n.to} className={mobileLink} style={{ animationDelay: `${i * 50}ms` }}>
                {n.label}
              </Link>
            ))
          )}
          <p className="hand mt-auto text-3xl text-acid">no sales pitch, promise.</p>
          <a href={`mailto:${SITE.email}`} className="label mt-2 text-paper/70">{SITE.email}</a>
        </div>
      )}

    </>
  );
}

export function Footer() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  if (foodPaths(path)) return <FoodFooter />;
  return (
    <footer className="grain bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-5 py-16">
        <p className="font-display text-5xl md:text-8xl">
          Stop renting software<br />that <span className="ital text-acid">doesn't fit.</span>
        </p>
        <div className="mt-12 grid gap-10 border-t border-paper/15 pt-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="max-w-sm text-paper/70">{SITE.legalName}. Custom business systems and an in-house tech team for UK businesses that have outgrown spreadsheets and off-the-shelf tools.</p>
          </div>
          <ul className="space-y-3">
            {nav.map((n) => <li key={n.to}><Link to={n.to} className="hover:text-acid">{n.label}</Link></li>)}
            <li><Link to="/pubs-restaurants" className="hover:text-acid">Pub & restaurant websites</Link></li>
            <li><Link to="/contact" className="hover:text-acid">Contact</Link></li>
            <li><Link to="/terms" className="hover:text-acid">Website plan terms</Link></li>
            <li><Link to="/privacy" className="hover:text-acid">Privacy</Link></li>
          </ul>
          <div>
            <a href={`mailto:${SITE.email}`} className="hover:text-acid">{SITE.email}</a>
            <p className="label mt-3 text-paper/50">Based in the UK · Working UK-wide</p>
          </div>
        </div>
        <p className="label mt-12 text-paper/40">© {new Date().getFullYear()} {SITE.legalName}</p>
      </div>
    </footer>
  );
}

function FoodFooter() {
  return (
    <footer className="grain bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-5 py-16">
        <p className="font-display text-5xl md:text-8xl">
          {foodFooter.lead}<br /><span className="ital text-acid">{foodFooter.payoff}</span>
        </p>
        <div className="mt-12 grid gap-10 border-t border-paper/15 pt-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="max-w-sm text-paper/70">{foodFooter.about}</p>
          </div>
          <div>
            <p className="label text-paper/50">Pub websites</p>
            <ul className="mt-4 space-y-3">
              {foodNav.map((n) => <li key={n.hash}><Link to="/pubs-restaurants" hash={n.hash} activeOptions={{ includeHash: true }} className="hover:text-acid">{n.label}</Link></li>)}
              <li><Link to="/terms" className="hover:text-acid">Plan terms</Link></li>
              <li><Link to="/privacy" className="hover:text-acid">Privacy</Link></li>
            </ul>
          </div>
          <div>
            <p className="label text-paper/50">Get in touch</p>
            <a href={`mailto:${SITE.email}`} className="mt-4 block hover:text-acid">{SITE.email}</a>
            <Link to="/chat" className="mt-2 block hover:text-acid">Contact form</Link>
            <p className="mt-3 text-sm text-paper/60">Run by {SITE.founderFirst}, the founder. Based in the UK, working UK-wide.</p>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 text-paper/40">
          <p className="label">© {new Date().getFullYear()} {SITE.legalName}</p>
          <Link to="/" className="text-sm hover:text-acid">We also build custom business systems →</Link>
        </div>
      </div>
    </footer>
  );
}
