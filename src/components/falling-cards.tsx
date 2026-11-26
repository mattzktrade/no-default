import { useEffect, useRef, useState } from "react";
import { Cloud, Receipt, Sheet, Copy, FileSignature, MessageSquare, Columns3, Zap, FileText, ChartNoAxesCombined, Layers, Mail, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroCards, heroCopy } from "@/lib/content";

const icons = { cloud: Cloud, receipt: Receipt, sheet: Sheet, copy: Copy, sign: FileSignature, message: MessageSquare, columns: Columns3, bolt: Zap, file: FileText, chart: ChartNoAxesCombined, layers: Layers, mail: Mail };

function CardPile({ replay, onSettled, onStart }: { replay: number; onSettled: () => void; onStart: () => void }) {
  const arena = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = arena.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { onSettled(); return; }
    onStart();
    let disposed = false;
    let cleanup = () => {};
    void Promise.all([import("matter-js"), document.fonts.ready]).then(([{ default: Matter }]) => {
      if (disposed) return;
      const { Engine, Bodies, Composite, Constraint } = Matter;
      const engine = Engine.create({ gravity: { x: 0, y: 1.8 } });
      engine.enableSleeping = true;
      let nodes: HTMLElement[] = [];
      let bodies: ReturnType<typeof Bodies.rectangle>[] = [];
      let frame = 0;
      let last = 0;
      let accumulator = 0;
      const step = 1000 / 60;
      let sizes: { width: number; height: number }[] = [];
      let held: ReturnType<typeof Constraint.create> | undefined;
      let pointer: number | undefined;
      let revealed = false;
      let revealDeadline = performance.now() + 3200;
      let clearance = 0;
      const setup = () => {
        Composite.clear(engine.world, false);
        const exp = el.closest<HTMLElement>(".hero-experience");
        if (exp) exp.style.paddingTop = "";
        nodes = Array.from(el.querySelectorAll<HTMLElement>(".falling-card")).filter((node) => node.offsetWidth > 0);
        sizes = nodes.map((node) => ({ width: node.offsetWidth, height: node.offsetHeight }));
        const w = el.clientWidth;
        const h = el.clientHeight;
        const copy = el.closest(".opening-section")?.querySelector<HTMLElement>(".opening-copy");
        clearance = copy ? copy.getBoundingClientRect().bottom - el.getBoundingClientRect().top + 16 : h - 300;
        const createCards = () => sizes.map(({ width, height }, i) => {
          const x = width / 2 + ((i * 0.618 + 0.12) % 1) * Math.max(0, w - width);
          return Bodies.rectangle(x, -70 - i * 38, width, height, { chamfer: { radius: 7 }, restitution: 0.18, friction: 0.65, frictionAir: 0.008, angle: ((i % 5) - 2) * 0.13 });
        });
        const boundaries = (floor: number) => [Bodies.rectangle(w / 2, floor + 30, w + 200, 60, { isStatic: true }), Bodies.rectangle(-40, h / 2, 80, h * 8, { isStatic: true }), Bodies.rectangle(w + 40, h / 2, 80, h * 8, { isStatic: true })];
        // Measure the pile offscreen before the entrance, never move a landed pile.
        const preview = Engine.create({ gravity: { x: 0, y: 1.8 }, enableSleeping: true });
        const previewCards = createCards();
        Composite.add(preview.world, [...boundaries(h), ...previewCards]);
        for (let i = 0; i < 240; i++) Engine.update(preview, step);
        const padding = exp ? parseFloat(getComputedStyle(exp).paddingTop) : 300;
        const delta = previewCards.length ? Math.max(0, Math.min(padding - 180, Math.floor(Math.min(...previewCards.map((body) => body.bounds.min.y)) - clearance))) : 0;
        Composite.clear(preview.world, false);
        Engine.clear(preview);
        if (exp) exp.style.paddingTop = `${padding - delta}px`;
        bodies = createCards();
        Composite.add(engine.world, [...boundaries(h - delta), ...bodies]);
        nodes.forEach((node, i) => {
          const body = bodies[i];
          const size = sizes[i];
          if (body && size) node.style.transform = `translate3d(${body.position.x - size.width / 2}px,${body.position.y - size.height / 2}px,0) rotate(${body.angle}rad)`;
        });
        el.classList.add("is-animated");
        last = 0;
        accumulator = 0;
        revealed = false;
        revealDeadline = performance.now() + 3200;
      };
      const tick = (time: number) => {
        if (disposed) return;
        frame = 0;
        if (held || bodies.some((body) => !body.isSleeping) || !revealed) {
          accumulator += Math.min(last ? time - last : step, 50);
          while (accumulator >= step) { Engine.update(engine, step); accumulator -= step; }
          nodes.forEach((node, i) => {
            const b = bodies[i];
            const size = sizes[i];
            if (b && size) node.style.transform = `translate3d(${b.position.x - size.width / 2}px,${b.position.y - size.height / 2}px,0) rotate(${b.angle}rad)`;
          });
          if (!revealed && (bodies.every((body) => body.bounds.min.y > clearance) || time > revealDeadline)) { revealed = true; onSettled(); }
          last = time;
          frame = requestAnimationFrame(tick);
        }
      };
      const resume = () => { if (!frame) { last = 0; accumulator = 0; frame = requestAnimationFrame(tick); } };
      const position = (event: PointerEvent) => { const rect = el.getBoundingClientRect(); return { x: event.clientX - rect.left, y: event.clientY - rect.top }; };
      const down = (event: PointerEvent) => {
        const target = event.target instanceof Element ? event.target.closest<HTMLElement>(".falling-card") : null;
        if (!target || held) return;
        const body = bodies[nodes.indexOf(target)];
        if (!body) return;
        const point = position(event);
        Matter.Sleeping.set(body, false);
        held = Constraint.create({ pointA: point, bodyB: body, pointB: { x: point.x - body.position.x, y: point.y - body.position.y }, stiffness: 0.15, damping: 0.12 });
        Composite.add(engine.world, held);
        pointer = event.pointerId;
        el.setPointerCapture(event.pointerId);
        el.classList.add("is-dragging");
        resume();
      };
      const move = (event: PointerEvent) => { if (held && event.pointerId === pointer) held.pointA = position(event); };
      const up = () => { if (held) Composite.remove(engine.world, held); if (pointer !== undefined && el.hasPointerCapture(pointer)) el.releasePointerCapture(pointer); held = undefined; pointer = undefined; el.classList.remove("is-dragging"); };
      setup();
      frame = requestAnimationFrame(tick);
      let resizeTimer: ReturnType<typeof setTimeout>;
      let width = el.clientWidth;
      const observer = new ResizeObserver(() => { if (el.clientWidth === width) return; width = el.clientWidth; clearTimeout(resizeTimer); resizeTimer = setTimeout(() => { up(); setup(); resume(); }, 150); });
      observer.observe(el);
      el.addEventListener("pointerdown", down);
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerup", up);
      el.addEventListener("pointercancel", up);
      cleanup = () => { cancelAnimationFrame(frame); clearTimeout(resizeTimer); observer.disconnect(); Engine.clear(engine); Composite.clear(engine.world, false); el.removeEventListener("pointerdown", down); el.removeEventListener("pointermove", move); el.removeEventListener("pointerup", up); el.removeEventListener("pointercancel", up); };
    }).catch(() => { if (!disposed) onSettled(); });
    return () => { disposed = true; cleanup(); };
  }, [replay, onSettled, onStart]);
  return <div ref={arena} className="card-arena" aria-label="Disconnected tools and everyday admin piling up">
    {heroCards.map((card, i) => { const Icon = icons[card.icon]; return <div key={card.title} data-index={i} className={`falling-card falling-card--${card.tone}`}>
      <Icon aria-hidden className="falling-card-icon" />
      <div><p>{card.title}</p><span>{card.detail}</span></div>
    </div>; })}
  </div>;
}

export function FallingCards({ onSettled, onStart }: { onSettled: () => void; onStart: () => void }) {
  const [replay, setReplay] = useState(0);
  return <div className="hero-experience">
    <CardPile replay={replay} onSettled={onSettled} onStart={onStart} />
    <div className="hero-scene-caption"><span className="hero-status-dot" /><p>{heroCopy.mess}</p><span className="label">9 tools ≠ 1 system</span><Button variant="ghost" size="icon" aria-label="Drop the cards again" title="Drop the cards again" onClick={() => setReplay((n) => n + 1)}><RotateCcw /></Button></div>
  </div>;
}