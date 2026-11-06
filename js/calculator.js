// Feature B: Charging cost logic
// Cost = hours * 7.5 kW * $0.15 per kWh (fixed values given in the assignment)

const CHARGER_POWER_KW = 7.5;
const PRICE_PER_KWH = 0.15;
const MAX_CHARGING_HOURS = 24;

// Code review note: the first version used parseFloat(hours), so "abc" gave
// a cost of "$NaN" and "5abc" was quietly read as 5 hours. Now we only accept
// real numbers (or text that is fully a number) and throw a clear error if not.
// The unit tests in tests/calculator.test.js check these cases.
function calculateChargingCost(hours) {
  let value = hours;

  if (typeof value === "string") {
    value = value.trim() === "" ? NaN : Number(value);
  }

  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error("Charging duration must be a number.");
  }
  if (value <= 0) {
    throw new Error("Charging duration must be more than 0 hours.");
  }
  if (value > MAX_CHARGING_HOURS) {
    throw new Error("Charging duration can't be more than " + MAX_CHARGING_HOURS + " hours.");
  }

  const cost = value * CHARGER_POWER_KW * PRICE_PER_KWH;
  return Math.round(cost * 100) / 100; // round to 2 decimal places (cents)
}
