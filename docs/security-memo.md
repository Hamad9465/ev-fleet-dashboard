# Security Memo

**Project:** EcoCharge Fleet Dashboard
**Team:** Hamad, Mayed

## 1. Cross-Site Scripting (XSS)

**Vulnerability:** Right now the vehicle names are hardcoded, but in the real product they would come from a database where people can add or edit cars. If someone saves a vehicle model with a script inside it and our page shows it using innerHTML, the browser would run that script.

**Potential Impact:** An attacker could run code on a manager's browser, steal their session, change what the dashboard shows (like fake battery levels) or send the manager to a fake login page.

**Mitigation:** We always show data using textContent instead of innerHTML, so text is shown as plain text and never runs as code. We already did this in fleet.js and calculator-ui.js. In the real version we would also check inputs on the server.

## 2. No Login or Access Control

**Vulnerability:** The dashboard has no login, so anyone who has the link can open it and see the whole fleet, including which cars are on trips.

**Potential Impact:** Outsiders could see company data about vehicles and drivers, and once real location data is added they could track where the cars are.

**Mitigation:** Add a login so only managers can see the dashboard, store passwords hashed with bcrypt, and serve everything over HTTPS so the data can't be read on the way.
