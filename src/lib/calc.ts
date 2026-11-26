export const HOURLY_COST = 22; // average loaded UK admin hourly cost (£)
export const WORK_WEEKS = 46;

/** Rough yearly cost of a messy tool stack: subscriptions + time lost to manual work. */
export function messCost({ toolsPerMonth, people, hoursPerWeek }: { toolsPerMonth: number; people: number; hoursPerWeek: number }) {
  const subscriptions = toolsPerMonth * 12;
  const hoursPerYear = people * hoursPerWeek * WORK_WEEKS;
  const time = hoursPerYear * HOURLY_COST;
  return { subscriptions, time, hoursPerYear, total: subscriptions + time };
}
