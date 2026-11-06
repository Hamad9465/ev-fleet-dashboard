// Feature A: Static Fleet Overview
// Builds the fleet table and the small summary cards from the fleet array.

function getBatteryLevel(battery) {
  if (battery >= 70) return "high";
  if (battery >= 30) return "medium";
  return "low";
}

function getStatusClass(status) {
  // turns "On Trip" into "on-trip" so we can style it in CSS
  return "status-" + status.toLowerCase().replace(" ", "-");
}

function renderSummary(vehicles) {
  const counts = { Available: 0, Charging: 0, "On Trip": 0 };
  vehicles.forEach(function (car) {
    if (counts[car.status] !== undefined) counts[car.status]++;
  });

  document.getElementById("count-total").textContent = vehicles.length;
  document.getElementById("count-available").textContent = counts["Available"];
  document.getElementById("count-charging").textContent = counts["Charging"];
  document.getElementById("count-trip").textContent = counts["On Trip"];
}

function renderFleetTable(vehicles) {
  const tbody = document.getElementById("fleet-body");
  tbody.innerHTML = "";

  vehicles.forEach(function (car) {
    const row = document.createElement("tr");

    const idCell = document.createElement("td");
    idCell.textContent = car.id; // textContent, not innerHTML, so no HTML can be injected
    idCell.className = "vehicle-id";

    const modelCell = document.createElement("td");
    modelCell.textContent = car.model;

    const batteryCell = document.createElement("td");
    const bar = document.createElement("div");
    bar.className = "battery-bar";
    const fill = document.createElement("div");
    fill.className = "battery-fill " + getBatteryLevel(car.battery);
    fill.style.width = car.battery + "%";
    bar.appendChild(fill);
    const percent = document.createElement("span");
    percent.className = "battery-text";
    percent.textContent = car.battery + "%";
    batteryCell.appendChild(bar);
    batteryCell.appendChild(percent);

    const statusCell = document.createElement("td");
    const badge = document.createElement("span");
    badge.className = "status " + getStatusClass(car.status);
    badge.textContent = car.status;
    statusCell.appendChild(badge);

    row.appendChild(idCell);
    row.appendChild(modelCell);
    row.appendChild(batteryCell);
    row.appendChild(statusCell);
    tbody.appendChild(row);
  });
}

renderSummary(fleet);
renderFleetTable(fleet);
