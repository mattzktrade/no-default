import { describe, expect, it } from "vitest";
import { eventsFor, hoursFor, initialPub, isSoldOut, menuCourses, pubMenu, pubReducer } from "../lib/pub-demo";

describe("Hare & Lantern demo", () => {
  it("applies each owner update once and reflects it in the menu, hours and events", () => {
    const beef = pubReducer(initialPub, { type: "update", id: "beef" });
    expect(isSoldOut(beef, "beef")).toBe(true);
    expect(pubReducer(beef, { type: "update", id: "beef" }).applied).toEqual(["beef"]);
    const late = pubReducer(beef, { type: "update", id: "late" });
    expect(hoursFor(late).find((row) => row.day === "fri")?.hours).toBe("12pm – 12am");
    const curry = pubReducer(late, { type: "update", id: "curry" });
    expect(eventsFor(curry)[0]?.id).toBe("curry");
  });

  it("groups the menu into courses inside each section", () => {
    expect(menuCourses.filter((course) => course.section === "food").map((course) => course.label)).toEqual(["Starters", "Sandwiches", "Mains", "Sides", "Desserts", "Little ones"]);
    expect(menuCourses.filter((course) => course.section === "sunday").map((course) => course.label)).toEqual(["Roasts", "On the side", "Puddings"]);
    expect(menuCourses.filter((course) => course.section === "drinks").map((course) => course.label)).toEqual(["Cask & draught", "Wine", "Gin", "Soft & hot"]);
    for (const item of pubMenu) {
      expect(menuCourses.find((course) => course.id === item.course)?.section).toBe(item.section);
    }
    expect(pubMenu.find((item) => item.id === "beef")?.course).toBe("roasts");
  });

  it("records valid booking requests and ignores incomplete ones", () => {
    const booking = { name: " Sam ", guests: 4, day: "Thu" as const, time: "20:00", note: "Quiz team" };
    expect(pubReducer(initialPub, { type: "book", booking }).bookings).toEqual([{ ...booking, name: "Sam" }]);
    expect(pubReducer(initialPub, { type: "book", booking: { ...booking, name: "  " } }).bookings).toHaveLength(0);
    expect(pubReducer(initialPub, { type: "book", booking: { ...booking, guests: 0 } }).bookings).toHaveLength(0);
  });
});
