// Sample records for the illustrative pub site on /pubs-restaurants. Browser-only: nothing is sent or stored.
export const pub = {
  name: "The Hare & Lantern",
  town: "Ashwell Green",
  host: "hareandlantern.co.uk",
  address: "12 Church Lane, Ashwell Green",
  phone: "01632 960 418",
  today: "fri" as PubDay,
};

export type PubPage = "home" | "menu" | "events" | "book" | "find";
export const pubPages: { id: PubPage; label: string; path: string }[] = [
  { id: "home", label: "Home", path: "/" },
  { id: "menu", label: "Menu", path: "/menu" },
  { id: "events", label: "What's on", path: "/whats-on" },
  { id: "book", label: "Book", path: "/book" },
  { id: "find", label: "Find us", path: "/find-us" },
];

export type PubDay = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
export const pubHours: { day: PubDay; label: string; hours: string }[] = [
  { day: "mon", label: "Monday", hours: "Closed" },
  { day: "tue", label: "Tuesday", hours: "12pm – 11pm" },
  { day: "wed", label: "Wednesday", hours: "12pm – 11pm" },
  { day: "thu", label: "Thursday", hours: "12pm – 11pm" },
  { day: "fri", label: "Friday", hours: "12pm – 11pm" },
  { day: "sat", label: "Saturday", hours: "11am – 11pm" },
  { day: "sun", label: "Sunday", hours: "12pm – 10pm" },
];

export type MenuSection = "food" | "sunday" | "drinks";
export const menuSections: { id: MenuSection; label: string; note: string }[] = [
  { id: "food", label: "Food", note: "Served Tue–Sat, 12–2:30pm & 5:30–9pm" },
  { id: "sunday", label: "Sunday roasts", note: "Served Sundays, 12–5pm · Booking recommended" },
  { id: "drinks", label: "Drinks", note: "Cask on rotation · wine by the glass · ask at the bar" },
];

export type MenuCourse = "starters" | "mains" | "sandwiches" | "sides" | "desserts" | "little" | "roasts" | "extras" | "puddings" | "cask" | "wine" | "soft" | "gin";
export const menuCourses: { id: MenuCourse; section: MenuSection; label: string; note?: string }[] = [
  { id: "starters", section: "food", label: "Starters" },
  { id: "sandwiches", section: "food", label: "Sandwiches", note: "Lunchtime, 12–2:30pm · white or brown bloomer, with crisps" },
  { id: "mains", section: "food", label: "Mains" },
  { id: "sides", section: "food", label: "Sides" },
  { id: "desserts", section: "food", label: "Desserts" },
  { id: "little", section: "food", label: "Little ones", note: "Under 12s · includes a glass of squash" },
  { id: "roasts", section: "sunday", label: "Roasts", note: "Roast potatoes, seasonal veg, a Yorkshire and gravy" },
  { id: "extras", section: "sunday", label: "On the side" },
  { id: "puddings", section: "sunday", label: "Puddings" },
  { id: "cask", section: "drinks", label: "Cask & draught", note: "Halves available" },
  { id: "wine", section: "drinks", label: "Wine" },
  { id: "gin", section: "drinks", label: "Gin" },
  { id: "soft", section: "drinks", label: "Soft & hot" },
];

export const pubMenu: { id: string; section: MenuSection; course: MenuCourse; name: string; detail: string; price: number; tags?: string[] }[] = [
  { id: "soup", section: "food", course: "starters", name: "Soup of the day", detail: "Crusty bloomer, salted butter", price: 7.5, tags: ["V"] },
  { id: "whitebait", section: "food", course: "starters", name: "Devilled whitebait", detail: "Lemon, tartare, brown bread", price: 8 },
  { id: "pate", section: "food", course: "starters", name: "Chicken liver pâté", detail: "Toast, red onion chutney", price: 8.5 },
  { id: "prawns", section: "food", course: "starters", name: "Prawn cocktail", detail: "Marie Rose, little gem, brown bread", price: 9 },
  { id: "camembert", section: "food", course: "starters", name: "Baked camembert", detail: "Rosemary, honey, crusty bread · to share", price: 13.5, tags: ["V"] },
  { id: "pie", section: "food", course: "mains", name: "Steak & ale pie", detail: "Buttery mash, greens, proper gravy", price: 17.5 },
  { id: "fish", section: "food", course: "mains", name: "Beer-battered haddock", detail: "Chips, mushy peas, tartare", price: 16.5 },
  { id: "scampi", section: "food", course: "mains", name: "Wholetail scampi", detail: "Chips, garden peas, tartare", price: 15.5 },
  { id: "burger", section: "food", course: "mains", name: "Lantern burger", detail: "Smoked cheddar, onion jam, skin-on fries", price: 15.5 },
  { id: "sausage", section: "food", course: "mains", name: "Sausage & mash", detail: "Pork & leek sausages, onion gravy", price: 15 },
  { id: "ham", section: "food", course: "mains", name: "Ham, egg & chips", detail: "Home-cooked ham, two eggs, piccalilli", price: 14.5 },
  { id: "risotto", section: "food", course: "mains", name: "Wild mushroom risotto", detail: "Parmesan, crispy sage", price: 14.5, tags: ["V", "GF"] },
  { id: "ham-sand", section: "food", course: "sandwiches", name: "Ham & piccalilli", detail: "Home-cooked ham", price: 8.5 },
  { id: "cheese-sand", section: "food", course: "sandwiches", name: "Mature cheddar & chutney", detail: "Pickle on the side", price: 8, tags: ["V"] },
  { id: "fish-sand", section: "food", course: "sandwiches", name: "Fish finger", detail: "Tartare, little gem", price: 9.5 },
  { id: "chips", section: "food", course: "sides", name: "Chips", detail: "Sea salt", price: 4, tags: ["V", "GF"] },
  { id: "rings", section: "food", course: "sides", name: "Onion rings", detail: "Beer batter", price: 4.5, tags: ["V"] },
  { id: "greens", section: "food", course: "sides", name: "Buttered greens", detail: "Seasonal", price: 4, tags: ["V", "GF"] },
  { id: "bread", section: "food", course: "sides", name: "Bread & butter", detail: "Bloomer, salted butter", price: 3.5, tags: ["V"] },
  { id: "toffee", section: "food", course: "desserts", name: "Sticky toffee pudding", detail: "Vanilla ice cream", price: 7, tags: ["V"] },
  { id: "crumble", section: "food", course: "desserts", name: "Bramley apple crumble", detail: "Proper custard", price: 7, tags: ["V"] },
  { id: "brownie", section: "food", course: "desserts", name: "Warm chocolate brownie", detail: "Salted caramel ice cream", price: 7, tags: ["V"] },
  { id: "cheese", section: "food", course: "desserts", name: "British cheese", detail: "Three cheeses, chutney, crackers", price: 11, tags: ["V"] },
  { id: "kids-fish", section: "food", course: "little", name: "Fish & chips", detail: "Peas or beans", price: 8 },
  { id: "kids-sausage", section: "food", course: "little", name: "Sausage & mash", detail: "Gravy", price: 8 },
  { id: "kids-toast", section: "food", course: "little", name: "Beans on toast", detail: "White or brown", price: 5.5, tags: ["V"] },
  { id: "beef", section: "sunday", course: "roasts", name: "Roast sirloin of beef", detail: "Horseradish", price: 19.5 },
  { id: "pork", section: "sunday", course: "roasts", name: "Slow-roast pork belly", detail: "Crackling, apple sauce", price: 18 },
  { id: "chicken", section: "sunday", course: "roasts", name: "Roast chicken", detail: "Stuffing, bread sauce", price: 17.5 },
  { id: "nut", section: "sunday", course: "roasts", name: "Nut roast", detail: "Veggie gravy", price: 16, tags: ["V"] },
  { id: "little", section: "sunday", course: "roasts", name: "Little roast", detail: "Half portion for under-12s", price: 9.5 },
  { id: "yorkie", section: "sunday", course: "extras", name: "Extra Yorkshire pudding", detail: "On its own", price: 1.5, tags: ["V"] },
  { id: "cauli", section: "sunday", course: "extras", name: "Cauliflower cheese", detail: "Enough for the table", price: 4.5, tags: ["V"] },
  { id: "roasties", section: "sunday", course: "extras", name: "Extra roast potatoes", detail: "Goose fat", price: 3.5, tags: ["GF"] },
  { id: "sun-toffee", section: "sunday", course: "puddings", name: "Sticky toffee pudding", detail: "Vanilla ice cream", price: 7, tags: ["V"] },
  { id: "sun-crumble", section: "sunday", course: "puddings", name: "Bramley apple crumble", detail: "Custard", price: 7, tags: ["V"] },
  { id: "ice", section: "sunday", course: "puddings", name: "Ice cream", detail: "Two scoops · vanilla, chocolate or strawberry", price: 4.5, tags: ["V", "GF"] },
  { id: "bitter", section: "drinks", course: "cask", name: "Lantern Bitter", detail: "House cask · 3.8% · pint", price: 4.6 },
  { id: "pale", section: "drinks", course: "cask", name: "Ashwell Pale", detail: "Guest cask · 4.2% · pint", price: 5.2 },
  { id: "porter", section: "drinks", course: "cask", name: "Guest porter", detail: "Cask · 4.6% · pint", price: 5.4 },
  { id: "lager", section: "drinks", course: "cask", name: "Lager", detail: "Pint", price: 5.2 },
  { id: "cider", section: "drinks", course: "cask", name: "Local cider", detail: "Pint", price: 5 },
  { id: "wine", section: "drinks", course: "wine", name: "House red or white", detail: "175ml", price: 6.5 },
  { id: "wine-large", section: "drinks", course: "wine", name: "House red or white", detail: "250ml", price: 8.5 },
  { id: "prosecco", section: "drinks", course: "wine", name: "Prosecco", detail: "125ml", price: 7 },
  { id: "bottle", section: "drinks", course: "wine", name: "House red or white", detail: "Bottle", price: 22 },
  { id: "gnt", section: "drinks", course: "gin", name: "House gin & tonic", detail: "Lemon", price: 7 },
  { id: "local-gin", section: "drinks", course: "gin", name: "Ashwell gin & tonic", detail: "Fever-Tree, orange or lime", price: 8.5 },
  { id: "presse", section: "drinks", course: "soft", name: "Elderflower pressé", detail: "Bottle", price: 3.2 },
  { id: "soda", section: "drinks", course: "soft", name: "Lime & soda", detail: "Pint glass", price: 2 },
  { id: "mixer", section: "drinks", course: "soft", name: "Coke, lemonade or juice", detail: "Bottle or carton", price: 3.2 },
  { id: "tea", section: "drinks", course: "soft", name: "Pot of tea", detail: "Breakfast or Earl Grey", price: 2.8 },
  { id: "coffee", section: "drinks", course: "soft", name: "Americano", detail: "Double shot", price: 3 },
  { id: "flatwhite", section: "drinks", course: "soft", name: "Flat white", detail: "Two shots", price: 3.4 },
];

export type PubEvent = { id: string; day: string; time: string; title: string; detail: string; bookDay?: BookingDay; image?: "quiz" | "music" | "roast" };
export const baseEvents: PubEvent[] = [
  { id: "quiz", day: "Thursday", time: "8pm", title: "Quiz night", detail: "Teams up to 6 · £1 a head · Bar tab for the winners", bookDay: "Thu", image: "quiz" },
  { id: "music", day: "Saturday", time: "9pm", title: "Live acoustic", detail: "Local musicians by the fire · Free entry", image: "music" },
  { id: "roast", day: "Sunday", time: "12–5pm", title: "Sunday roasts", detail: "Beef, pork or nut roast · Book ahead", bookDay: "Sun", image: "roast" },
];

export type PubUpdateId = "beef" | "late" | "curry";
export const pubUpdates: { id: PubUpdateId; message: string; reply: string }[] = [
  { id: "beef", message: "Beef's all gone for today, can you mark it sold out?", reply: "Done. The beef roast shows as sold out on the menu." },
  { id: "late", message: "We're open till midnight this Friday for the match 🍻", reply: "Done. Friday now says 12pm – 12am, with a note on the homepage." },
  { id: "curry", message: "Can you add curry night? Wednesdays from 6.", reply: "Done. Curry night is on the What's on page." },
];

export const bookingDays = ["Thu", "Fri", "Sat", "Sun"] as const;
export type BookingDay = (typeof bookingDays)[number];
export const bookingTimes = ["12:30", "18:00", "19:30", "20:00"] as const;
export type PubBooking = { name: string; guests: number; day: BookingDay; time: string; note: string };

export type PubState = { applied: PubUpdateId[]; bookings: PubBooking[] };
export const initialPub: PubState = { applied: [], bookings: [] };
export type PubAction = { type: "update"; id: PubUpdateId } | { type: "book"; booking: PubBooking } | { type: "reset" };

export const maxGuests = 12;

export function pubReducer(state: PubState, action: PubAction): PubState {
  switch (action.type) {
    case "update":
      return state.applied.includes(action.id) ? state : { ...state, applied: [...state.applied, action.id] };
    case "book": {
      const { booking } = action;
      if (!booking.name.trim() || booking.guests < 1 || booking.guests > maxGuests) return state;
      return { ...state, bookings: [...state.bookings, { ...booking, name: booking.name.trim() }] };
    }
    case "reset":
      return { applied: [], bookings: [] };
  }
}

export const isSoldOut = (state: PubState, id: string) => id === "beef" && state.applied.includes("beef");

export function hoursFor(state: PubState) {
  return pubHours.map((row) => (row.day === "fri" && state.applied.includes("late") ? { ...row, hours: "12pm – 12am" } : row));
}

export function eventsFor(state: PubState): PubEvent[] {
  if (!state.applied.includes("curry")) return baseEvents;
  return [{ id: "curry", day: "Wednesday", time: "6pm", title: "Curry night", detail: "Curry, rice & a pint · £15" }, ...baseEvents];
}

export const pounds = (amount: number) => new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", minimumFractionDigits: amount % 1 ? 2 : 0 }).format(amount);
