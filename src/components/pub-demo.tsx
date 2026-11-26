import { useId, useReducer, useRef, useState, type Dispatch, type RefObject } from "react";
import { ArrowRight, CalendarDays, Car, Check, Clock, Dog, LockKeyhole, MapPin, Minus, Monitor, Phone, Plus, Smartphone } from "lucide-react";
import { bookingDays, bookingTimes, eventsFor, hoursFor, initialPub, isSoldOut, maxGuests, menuCourses, menuSections, pounds, pub, pubMenu, pubPages, pubReducer, type BookingDay, type MenuSection, type PubAction, type PubPage, type PubState } from "@/lib/pub-demo";
import { cn } from "@/lib/utils";
import interior from "@/assets/pub-interior.jpg";
import roast from "@/assets/pub-roast.jpg";
import quiz from "@/assets/pub-quiz.jpg";
import music from "@/assets/pub-acoustic.jpg";

const eventImages = { quiz, music, roast };
type SiteProps = { state: PubState; dispatch: Dispatch<PubAction>; page: PubPage; go: (page: PubPage, day?: BookingDay) => void; bookDay: BookingDay };

function Home({ state, go }: SiteProps) {
  const today = hoursFor(state).find((row) => row.day === pub.today);
  return <>
    <section className="pd-hero">
      <img src={interior} loading="lazy" width={1280} height={720} alt="The bar and fireplace at The Hare & Lantern" />
      <div>
        <p className="pd-eyebrow">Free house · {pub.town}</p>
        <h4>Proper food,<br /><em>by the fire.</em></h4>
        <p>Sunday roasts, local cask ales and a quiz every Thursday. Dogs and muddy boots welcome.</p>
        <div className="pd-actions">
          <button type="button" onClick={() => go("book")}>Book a table<ArrowRight size={13} /></button>
          <button type="button" onClick={() => go("menu")}>See the menu</button>
        </div>
      </div>
    </section>
    <div className="pd-strip">
      <span><Clock size={12} /><b>Open today</b> {today?.hours}</span>
      <span><CalendarDays size={12} /><b>Kitchen</b> till 9pm</span>
      <span><Dog size={12} /><b>Dogs</b> welcome</span>
    </div>
    <section className="pd-section">
      <div className="pd-head"><div><p className="pd-eyebrow">This week</p><h5>What's on at the Hare.</h5></div><button type="button" className="pd-quiet" onClick={() => go("events")}>All events<ArrowRight size={12} /></button></div>
      <div className="pd-cards">
        {eventsFor(state).slice(0, 3).map((event) => (
          <button type="button" key={event.id} className="pd-card" onClick={() => (event.bookDay ? go("book", event.bookDay) : go("events"))}>
            {event.image ? <img src={eventImages[event.image]} loading="lazy" width={1152} height={864} alt="" /> : <span className="pd-card-blank" aria-hidden="true">{event.day.slice(0, 3)}</span>}
            <span className="pd-card-body"><small>{event.day} · {event.time}</small><strong>{event.title}</strong><span>{event.detail}</span></span>
          </button>
        ))}
      </div>
    </section>
    <section className="pd-split">
      <img src={roast} loading="lazy" width={1152} height={864} alt="Roast beef with Yorkshire pudding, roast potatoes and gravy" />
      <div>
        <p className="pd-eyebrow">From the kitchen</p>
        <h5>Sunday is <em>roast day.</em></h5>
        <p>Sirloin of beef, slow-roast pork or a proper nut roast, with Yorkshires the size of your head. Served 12–5pm.</p>
        <button type="button" className="pd-primary" onClick={() => go("book", "Sun")}>Book Sunday lunch<ArrowRight size={13} /></button>
      </div>
    </section>
  </>;
}

function Menu({ state }: SiteProps) {
  const id = useId();
  const [section, setSection] = useState<MenuSection>("food");
  const current = menuSections.find((s) => s.id === section);
  const courses = menuCourses.filter((course) => course.section === section);
  return <section className="pd-section">
    <p className="pd-eyebrow">Menu · updated this week</p>
    <h5 className="pd-h-lg">Food & drink</h5>
    <div className="pd-chips" role="group" aria-label="Menu section">
      {menuSections.map((s) => <button type="button" key={s.id} aria-pressed={section === s.id} onClick={() => setSection(s.id)}>{s.label}</button>)}
    </div>
    <p className="pd-sub">{current?.note}</p>
    <div className="pd-courses">
      {courses.map((course) => (
        <section key={course.id} className="pd-course" aria-labelledby={`${id}-${course.id}`}>
          <div className="pd-course-head">
            <h6 id={`${id}-${course.id}`}>{course.label}</h6>
            {course.note && <p>{course.note}</p>}
          </div>
          <ul className="pd-menu">
            {pubMenu.filter((item) => item.course === course.id).map((item) => {
              const soldOut = isSoldOut(state, item.id);
              return <li key={item.id} className={cn(soldOut && "is-sold-out")}>
                <div><strong>{item.name}</strong>{item.tags?.map((tag) => <span key={tag} className="pd-tag">{tag}</span>)}{soldOut && <span className="pd-sold">Sold out today</span>}</div>
                <b>{pounds(item.price)}</b>
                <small>{item.detail}</small>
              </li>;
            })}
          </ul>
        </section>
      ))}
    </div>
    <p className="pd-note">V vegetarian · GF gluten-free · Allergen info: just ask the team.</p>
  </section>;
}

function Events({ state, go }: SiteProps) {
  return <section className="pd-section">
    <p className="pd-eyebrow">What's on</p>
    <h5 className="pd-h-lg">Every week at the Hare</h5>
    <ul className="pd-events">
      {eventsFor(state).map((event) => (
        <li key={event.id} className={cn(event.id === "curry" && "is-new")}>
          <span className="pd-event-day">{event.day.slice(0, 3)}<small>{event.time}</small></span>
          <div><strong>{event.title}{event.id === "curry" && <span className="pd-tag">New</span>}</strong><small>{event.detail}</small></div>
          {event.bookDay && <button type="button" className="pd-quiet" onClick={() => go("book", event.bookDay)}>{event.id === "quiz" ? "Book a quiz table" : "Book"}<ArrowRight size={12} /></button>}
        </li>
      ))}
    </ul>
    <p className="pd-note">Private hire and Christmas parties: ask us about the back room.</p>
  </section>;
}

function Book({ state, dispatch, go, bookDay }: SiteProps) {
  const id = useId();
  const [name, setName] = useState("");
  const [guests, setGuests] = useState(bookDay === "Thu" ? 4 : 2);
  const [day, setDay] = useState<BookingDay>(bookDay);
  const [time, setTime] = useState<string>(bookDay === "Thu" ? "20:00" : bookDay === "Sun" ? "12:30" : "19:30");
  const [note, setNote] = useState(bookDay === "Thu" ? "Quiz team" : "");
  const [sent, setSent] = useState(false);
  if (sent) {
    const last = state.bookings.at(-1);
    return <section className="pd-section"><div className="pd-success" role="status"><Check /><div>
      <strong>Thanks{last ? `, ${last.name}` : ""}. Request received.</strong>
      <p>Table for {last?.guests} on {last?.day} at {last?.time}. The team will text to confirm. Demo only: no booking was made.</p>
      <button type="button" className="pd-quiet" onClick={() => go("home")}>Back to the homepage<ArrowRight size={12} /></button>
    </div></div></section>;
  }
  return <section className="pd-section">
    <p className="pd-eyebrow">Book a table</p>
    <h5 className="pd-h-lg">Come and see us.</h5>
    <p className="pd-sub">Requests go straight to the team. Bigger group? Call {pub.phone}.</p>
    <form className="pd-form" onSubmit={(e) => { e.preventDefault(); dispatch({ type: "book", booking: { name, guests, day, time, note } }); setSent(true); }}>
      <label htmlFor={`${id}-name`}>Your name<input id={`${id}-name`} value={name} onChange={(e) => setName(e.target.value)} required placeholder="Sam Taylor" autoComplete="off" /></label>
      <div className="pd-field"><span>Guests</span><div className="pd-stepper">
        <button type="button" aria-label="Fewer guests" disabled={guests <= 1} onClick={() => setGuests(guests - 1)}><Minus size={13} /></button>
        <span aria-live="polite">{guests}</span>
        <button type="button" aria-label="More guests" disabled={guests >= maxGuests} onClick={() => setGuests(guests + 1)}><Plus size={13} /></button>
      </div></div>
      <div className="pd-field"><span>Day</span><div className="pd-chips" role="group" aria-label="Day">{bookingDays.map((d) => <button type="button" key={d} aria-pressed={day === d} onClick={() => setDay(d)}>{d}</button>)}</div></div>
      <div className="pd-field"><span>Time</span><div className="pd-chips" role="group" aria-label="Time">{bookingTimes.map((t) => <button type="button" key={t} aria-pressed={time === t} onClick={() => setTime(t)}>{t}</button>)}</div></div>
      <label htmlFor={`${id}-note`}>Anything we should know?<textarea id={`${id}-note`} value={note} onChange={(e) => setNote(e.target.value)} placeholder="High chair, dog, birthday…" rows={2} /></label>
      <button type="submit" className="pd-primary">Request table<ArrowRight size={13} /></button>
    </form>
  </section>;
}

function Find({ state }: SiteProps) {
  return <section className="pd-section pd-find">
    <div>
      <p className="pd-eyebrow">Find us</p>
      <h5 className="pd-h-lg">On Church Lane, by the green.</h5>
      <p className="pd-sub"><MapPin size={12} /> {pub.address}</p>
      <div className="pd-map" aria-label="Map showing The Hare & Lantern on Church Lane" role="img"><span className="pd-map-road pd-map-road--a" /><span className="pd-map-road pd-map-road--b" /><span className="pd-map-green">The green</span><span className="pd-map-pin"><MapPin size={16} /></span></div>
      <p className="pd-note"><Car size={12} /> Free car park behind the pub · <Dog size={12} /> Dogs welcome in the bar</p>
    </div>
    <div>
      <p className="pd-eyebrow">Opening hours</p>
      <dl className="pd-hours">
        {hoursFor(state).map((row) => <div key={row.day} className={cn(row.day === pub.today && "is-today")}><dt>{row.label}{row.day === pub.today && <small>Today</small>}</dt><dd>{row.hours}</dd></div>)}
      </dl>
      <p className="pd-note"><Phone size={12} /> {pub.phone}</p>
    </div>
  </section>;
}

const pages = { home: Home, menu: Menu, events: Events, book: Book, find: Find };

function PubSite(props: SiteProps & { scrollRef: RefObject<HTMLDivElement | null> }) {
  const { state, page, go, scrollRef } = props;
  const Page = pages[page];
  return <div className="pd-site" ref={scrollRef}>
    {state.applied.includes("late") && <div className="pd-banner">Open till midnight this Friday for the match</div>}
    <div className="pd-nav">
      <button type="button" className="pd-logo" onClick={() => go("home")} aria-label={`${pub.name} home`}>Hare & Lantern<small>{pub.town}</small></button>
      <nav aria-label={`${pub.name} website`}>{pubPages.map((p) => <button type="button" key={p.id} aria-pressed={page === p.id} onClick={() => go(p.id)}>{p.label}</button>)}</nav>
      <button type="button" className="pd-nav-book" onClick={() => go("book")}>Book a table</button>
    </div>
    <Page key={`${page}-${props.bookDay}`} {...props} />
    <footer className="pd-footer"><div><strong>The Hare & Lantern</strong><span>{pub.address}</span></div><small>© 2026 The Hare & Lantern · Illustrative business</small></footer>
    <div className="pd-actionbar"><button type="button" aria-label={`Call ${pub.name}`}><Phone size={14} />Call</button><button type="button" onClick={() => go("book")}><CalendarDays size={14} />Book</button><button type="button" onClick={() => go("find")}><MapPin size={14} />Find us</button></div>
  </div>;
}

function useDevice() {
  const [page, setPage] = useState<PubPage>("home");
  const [bookDay, setBookDay] = useState<BookingDay>("Fri");
  const scrollRef = useRef<HTMLDivElement>(null);
  const go = (next: PubPage, day?: BookingDay) => {
    setPage(next);
    if (day) setBookDay(day);
    scrollRef.current?.scrollTo({ top: 0 });
  };
  return { page, bookDay, go, scrollRef };
}

const noop = () => {};

/** Static, non-interactive laptop and phone showing the example pub. PubDemo below is the accessible version. */
export function PubDevicePreview({ className }: { className?: string }) {
  const desktopRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const shared = { state: initialPub, dispatch: noop, page: "home" as const, go: noop, bookDay: "Fri" as const };
  return <div className={cn("food-hero-devices", className)} aria-hidden="true" inert>
    <div className="food-hero-laptop">
      <div className="food-hero-laptop-lid">
        <span className="food-hero-camera" />
        <div className="food-hero-laptop-screen">
          <PubSite {...shared} scrollRef={desktopRef} />
        </div>
      </div>
      <div className="food-hero-laptop-base" />
    </div>
    <div className="food-hero-mobile">
      <div className="pd-phone-frame"><div className="pd-phone-screen"><span className="pd-phone-notch" /><div className="pd-phone-status"><span>9:41</span><span>5G</span></div><PubSite {...shared} scrollRef={phoneRef} /></div></div>
    </div>
  </div>;
}

export function PubDemo() {
  const [state, dispatch] = useReducer(pubReducer, initialPub);
  const [view, setView] = useState<"phone" | "desktop">("phone");
  const desktop = useDevice();
  const phone = useDevice();
  const path = pubPages.find((p) => p.id === desktop.page)?.path;
  return <div className="pd-stage" data-view={view}>
    <div className="pd-switch" role="group" aria-label="Preview device">
      <button type="button" aria-pressed={view === "phone"} onClick={() => setView("phone")}><Smartphone size={14} />Phone</button>
      <button type="button" aria-pressed={view === "desktop"} onClick={() => setView("desktop")}><Monitor size={14} />Desktop</button>
    </div>
    <div className="pd-devices">
      <div className="pd-desktop">
        <p className="pd-device-label"><span className="hero-status-dot" />On a laptop</p>
        <div className="hd-window">
          <div className="hd-browser"><LockKeyhole size={12} /><span>{pub.host}{path}</span><span className="hd-badge">Interactive demo</span></div>
          <div className="pd-shell"><PubSite state={state} dispatch={dispatch} {...desktop} /></div>
          <div className="hd-status"><span><span className="hero-status-dot" />Illustrative pub · Same menu on every screen</span></div>
        </div>
      </div>
      <div className="pd-phone">
        <p className="pd-device-label"><span className="hero-status-dot" />On a phone</p>
        <div className="pd-phone-frame"><div className="pd-phone-screen"><span className="pd-phone-notch" aria-hidden="true" /><div className="pd-phone-status" aria-hidden="true"><span>9:41</span><span>5G</span></div><PubSite state={state} dispatch={dispatch} {...phone} /></div></div>
      </div>
    </div>
    <p className="pd-disclaimer">Illustrative business. No bookings or payments are sent.</p>
  </div>;
}
