// Feature B: Charging cost logic
// Cost = hours * 7.5 kW * $0.15 per kWh (fixed values given in the assignment)

const CHARGER_POWER_KW = 7.5;
const PRICE_PER_KWH = 0.15;

function calculateChargingCost(hours) {
  const value = parseFloat(hours);

  if (value < 0) {
    throw new Error("Charging duration can't be negative.");
  }

  const cost = value * CHARGER_POWER_KW * PRICE_PER_KWH;
  return Math.round(cost * 100) / 100; // round to 2 decimal places (cents)
}
