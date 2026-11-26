import { describe, expect, it } from "vitest";
import { messCost } from "@/lib/calc";

describe("messCost", () => {
  it("adds yearly subscriptions to yearly time cost at £22/hr over 46 weeks", () => {
    const r = messCost({ toolsPerMonth: 1000, people: 2, hoursPerWeek: 5 });
    expect(r.subscriptions).toBe(12000);
    expect(r.hoursPerYear).toBe(460);
    expect(r.total).toBe(12000 + 460 * 22);
  });
});
