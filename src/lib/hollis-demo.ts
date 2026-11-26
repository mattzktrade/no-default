export type DemoTab = "crm" | "quotes" | "portal" | "operations" | "invoices" | "reporting" | "website";
export const hollis = { name: "Hollis Interiors", host: "hollisinteriors.co.uk", customer: "Bramley Trade", contact: "Rachel Ashworth", email: "rachel@bramley.example", address: "18 Station Road, Sheffield, S3 8AG", owner: "Sarah Jones", period: "October 2026" };
export const demoProducts = [
  { id: "oak-1200", name: "Oak shelf · 1200mm", sku: "OAK-1200", price: 99, stock: 212, kind: "shelf" },
  { id: "oak-900", name: "Oak shelf · 900mm", sku: "OAK-0900", price: 84, stock: 96, kind: "shelf-small" },
  { id: "brass", name: "Brass bracket set", sku: "BR-SET", price: 14, stock: 1040, kind: "bracket" },
];
export const money = (amount: number) => new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 2 }).format(amount);
export function totals(quantities: number[]) {
  const subtotal = Math.round(quantities.reduce((sum, qty, i) => sum + qty * (demoProducts[i]?.price ?? 0), 0) * 100) / 100;
  const vat = Math.round(subtotal * 20) / 100;
  return { subtotal, vat, total: subtotal + vat };
}
export type DemoOrder = { id: string; invoice: string; quantities: number[]; status: "Picking" | "Dispatched"; paid: boolean; source: "Quote Q-1042" | "Trade portal" };
export type DemoEnquiry = { name: string; email: string; message: string };
export type DemoState = { quoteAccepted: boolean; orders: DemoOrder[]; enquiries: DemoEnquiry[]; basket: number[]; reminder: boolean };
export const initialDemo: DemoState = { quoteAccepted: false, orders: [{ id: "ORD-2083", invoice: "INV-2083", quantities: [10, 5, 10], status: "Dispatched", paid: true, source: "Trade portal" }], enquiries: [], basket: [0, 0, 0], reminder: false };
export type DemoAction = { type: "acceptQuote" } | { type: "quantity"; index: number; delta: number } | { type: "placeOrder" } | { type: "dispatch" | "pay"; id: string } | { type: "enquiry"; enquiry: DemoEnquiry } | { type: "remind" } | { type: "reset" };
export function demoReducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case "acceptQuote": return state.quoteAccepted ? state : { ...state, quoteAccepted: true, orders: [...state.orders, { id: "ORD-2084", invoice: "INV-2084", quantities: [40, 0, 80], status: "Picking", paid: false, source: "Quote Q-1042" }] };
    case "quantity": return { ...state, basket: state.basket.map((qty, i) => i === action.index ? Math.max(0, Math.min(demoProducts[i]?.stock ?? 0, qty + action.delta)) : qty) };
    case "placeOrder": {
      if (!state.basket.some(qty => qty > 0)) return state;
      const next = Math.max(2084, ...state.orders.map(order => Number(order.id.slice(4)))) + 1;
      return { ...state, basket: [0, 0, 0], orders: [...state.orders, { id: `ORD-${next}`, invoice: `INV-${next}`, quantities: [...state.basket], status: "Picking", paid: false, source: "Trade portal" }] };
    }
    case "dispatch": return { ...state, orders: state.orders.map(order => order.id === action.id ? { ...order, status: "Dispatched" } : order) };
    case "pay": return { ...state, orders: state.orders.map(order => order.id === action.id && order.status === "Dispatched" ? { ...order, paid: true } : order) };
    case "enquiry": return { ...state, enquiries: [...state.enquiries, action.enquiry] };
    case "remind": return { ...state, reminder: true };
    case "reset": return { ...initialDemo, basket: [0, 0, 0], orders: [...initialDemo.orders], enquiries: [] };
  }
}