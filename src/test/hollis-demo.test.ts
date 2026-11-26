import { describe, expect, it } from 'vitest';
import { demoReducer, initialDemo, totals } from '../lib/hollis-demo';

describe('connected Hollis demo', () => {
  it('accepts a quote once and creates its linked order with matching amounts', () => {
    const accepted = demoReducer(initialDemo, { type: 'acceptQuote' });
    expect(accepted.orders.find(order => order.id === 'ORD-2084')?.source).toBe('Quote Q-1042');
    expect(totals(accepted.orders[1]?.quantities ?? [])).toEqual({ subtotal: 5080, vat: 1016, total: 6096 });
    expect(demoReducer(accepted, { type: 'acceptQuote' }).orders).toHaveLength(2);
  });
  it('shares a placed portal basket with operations and invoicing', () => {
    const basket = demoReducer(initialDemo, { type: 'quantity', index: 0, delta: 2 });
    const placed = demoReducer(basket, { type: 'placeOrder' });
    const order = placed.orders[1];
    expect(order?.quantities).toEqual([2, 0, 0]);
    expect(placed.basket).toEqual([0, 0, 0]);
    expect(demoReducer(initialDemo, { type: 'placeOrder' }).orders).toHaveLength(1);
  });
  it('dispatches the same order before allowing its invoice to be paid', () => {
    const accepted = demoReducer(initialDemo, { type: 'acceptQuote' });
    expect(demoReducer(accepted, { type: 'pay', id: 'ORD-2084' }).orders[1]?.paid).toBe(false);
    const dispatched = demoReducer(accepted, { type: 'dispatch', id: 'ORD-2084' });
    expect(dispatched.orders[1]?.invoice).toBe('INV-2084');
    expect(demoReducer(dispatched, { type: 'pay', id: 'ORD-2084' }).orders[1]?.paid).toBe(true);
  });
  it('delivers a website enquiry to the shared customer workspace', () => {
    const enquiry = { name: 'Rachel', email: 'rachel@example.com', message: '40 shelves please' };
    expect(demoReducer(initialDemo, { type: 'enquiry', enquiry }).enquiries).toEqual([enquiry]);
  });
});