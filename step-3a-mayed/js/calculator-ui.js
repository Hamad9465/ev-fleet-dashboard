// Feature B: connects the calculator form to calculateChargingCost()

const vehicleSelect = document.getElementById("vehicle-select");
const hoursInput = document.getElementById("hours-input");
const calcForm = document.getElementById("calc-form");
const resultBox = document.getElementById("calc-result");

// fill the dropdown with the cars from the fleet list
fleet.forEach(function (car) {
  const option = document.createElement("option");
  option.value = car.id;
  option.textContent = car.id + " (" + car.model + ")";
  vehicleSelect.appendChild(option);
});

function showResult(message, isError) {
  resultBox.textContent = message;
  resultBox.className = isError ? "result error" : "result success";
}

calcForm.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from reloading

  const car = fleet.find(function (c) {
    return c.id === vehicleSelect.value;
  });
  if (!car) {
    showResult("Please choose a vehicle first.", true);
    return;
  }

  try {
    const cost = calculateChargingCost(hoursInput.value);
    const hours = Number(hoursInput.value);
    const energy = hours * CHARGER_POWER_KW;
    showResult(
      "Estimated cost for " + car.id + ": $" + cost.toFixed(2) +
      " (" + hours + " h × " + CHARGER_POWER_KW + " kW = " + energy.toFixed(2) + " kWh)",
      false
    );
  } catch (error) {
    showResult(error.message, true);
  }
});
