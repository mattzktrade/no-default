import { describe, expect, it } from "vitest";
import { foodAgreement, foodChat, foodFaqs, foodHero, foodIncluded, foodPlans, foodPlanTerms, foodTerms } from "../lib/content";

const answers = foodFaqs.map((f) => f.a).join(" ");
const terms = foodAgreement.flatMap((s) => s.points).join(" ");

describe("pub & food website pricing", () => {
  it("offers one plan at £79 a month", () => {
    expect(foodPlans.map((plan) => [plan.monthly, plan.price, plan.unit])).toEqual([[79, "£79", "per month"]]);
  });

  it("has no setup fee, a 3-month minimum, ownership after 12 payments and a 12-month price lock", () => {
    expect(foodTerms.setupFee).toBe(0);
    expect(foodTerms.minimumMonths).toBe(3);
    expect(foodTerms.ownershipMonths).toBe(12);
    expect(foodTerms.priceLockMonths).toBe(12);
    const planTerms = foodPlanTerms.map((t) => `${t.title} ${t.detail}`).join(" ");
    expect(planTerms).toContain("No setup fee");
    expect(planTerms).toContain("3-month minimum");
    expect(planTerms).toContain("fixed for your first 12 months");
    expect(planTerms).toContain("After 12 monthly payments");
  });

  it("states the same price and terms in the FAQ answers", () => {
    expect(answers).toContain("£79 a month");
    expect(answers).toContain("no setup fee");
    expect(answers).toContain("3 months");
    expect(answers).toContain("After 12 monthly payments");
    expect(answers).toContain("fixed for your first 12 months");
  });

  it("covers domain, email, ownership and late payment in both the FAQs and the terms", () => {
    for (const text of [answers, terms]) {
      expect(text).toContain("domain");
      expect(text).toContain("forwarding");
      expect(text).toContain("12 monthly payments");
      expect(text).toContain("14 days overdue");
    }
  });

  it("keeps the hero description free of web jargon", () => {
    expect(foodHero.description).not.toMatch(/\bSEO\b|\bblog/i);
    expect(foodChat.description).not.toMatch(/\bSEO\b|\bblog/i);
    expect(foodHero.facts).toBe(`${foodTerms.price}/month, no setup, live in about ${foodTerms.launchWeeks} weeks`);
  });

  it("does not include writing blog posts", () => {
    const offering = [
      foodPlans[0].points.join(" "),
      foodIncluded.map((item) => `${item.title} ${item.detail}`).join(" "),
      foodFaqs.map((f) => `${f.q} ${f.a}`).join(" "),
      terms,
    ].join(" ");
    expect(offering).not.toMatch(/blog/i);
  });

  it("links FAQ answers only to terms sections that exist", () => {
    const ids = new Set<string>(foodAgreement.map((s) => s.id));
    for (const f of foodFaqs) if ("terms" in f && f.terms) expect(ids.has(f.terms)).toBe(true);
  });
});
