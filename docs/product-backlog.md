# Product Backlog

**Project:** EcoCharge Fleet Dashboard (Prototype)
**Team:** Hamad, Mayed
**Product Owner (for this project):** Hamad
**Scrum Master (for this project):** Mayed

## How we estimated

We used **story points** with the Fibonacci numbers (1, 2, 3, 5, 8). The points show how big or hard a story is compared to the others, not exact hours. A 1 is something tiny like changing a color, a 5 is a full feature with logic and testing.

For priority we used **MoSCoW**:
* **Must:** the prototype doesn't work without it (the assignment asks for it)
* **Should:** important and makes it much better, but it could work without it
* **Could:** nice to have if there's time
* **Won't (this sprint):** good idea for later, not now

## Backlog summary

| ID | User Story | Priority | Points | Sprint |
|----|------------|----------|--------|--------|
| US1 | As a manager, I want to see a list of all EVs and their battery levels so I can know which ones are ready to use. | Must | 3 | Sprint 1 |
| US2 | As a manager, I want to see the status of each vehicle (Available, Charging, On Trip) so I know where every car is at right now. | Must | 2 | Sprint 1 |
| US3 | As a manager, I want to pick a vehicle and enter how many hours it will charge so I can see the estimated charging cost. | Must | 5 | Sprint 1 |
| US4 | As a manager, I want to get a clear error message if I type something wrong in the calculator so I don't get a wrong cost. | Must | 3 | Sprint 1 |
| US5 | As a manager, I want to see a quick count of how many cars are available, charging and on trip so I can understand the fleet at one look. | Should | 2 | Sprint 1 |
| US6 | As a manager, I want low battery cars to stand out with a different color so I can notice them fast. | Should | 1 | Sprint 1 |
| US7 | As a manager, I want the dashboard to work on my phone so I can check the fleet when I'm away from my desk. | Could | 2 | Sprint 1 |
| US8 | As a manager, I want to filter or sort the fleet list by status or battery so I can find cars quicker. | Could | 3 | Future |
| US9 | As a manager, I want to see each vehicle on a live map so I know where it is. | Won't | 8 | Future (needs privacy review, see ethics memo) |
| US10 | As a manager, I want to log in with my own account so only managers can see the fleet data. | Won't | 5 | Future (see security memo) |
| US11 | As a manager, I want the battery and status to update by itself so I don't have to refresh the page. | Won't | 8 | Future (needs a real backend) |

**Sprint 1 total:** 18 points (US1 to US7)

## Acceptance criteria

These are the checks we used to decide if a story is actually done.

### US1: Fleet list with battery levels
* The page shows between 5 and 10 vehicles (we used 8)
* Each row shows the Vehicle ID, Model and Battery %
* Battery is a whole number between 0 and 100
* The data comes from one place (`js/fleet-data.js`) so it's easy to change

### US2: Vehicle status
* Each row shows one status: Available, Charging or On Trip
* Each status has its own color badge so they're easy to tell apart

### US3: Charging cost calculator
* The dropdown lists every vehicle from the fleet list
* The user can type the charging hours, decimals are allowed (like 2.5)
* Clicking Calculate shows the cost using hours × 7.5 kW × $0.15
* The cost is shown in dollars with 2 decimal places
* The result also shows the energy used in kWh so the manager can see how it was worked out

### US4: Clear error messages
* Empty, negative, zero or non numeric hours show a red error message
* No cost is shown when the input is wrong (no "$NaN" or negative costs)
* Clicking Calculate without picking a vehicle asks the user to choose one
* Unit tests cover all of these cases and pass

### US5: Summary counts
* Four cards at the top show total vehicles, available, charging and on trip
* The numbers are counted from the fleet data, not typed in by hand, so they stay correct if the data changes

### US6: Low battery highlight
* Battery bar is green at 70% and above, orange from 30% to 69% and red below 30%

### US7: Works on phone
* On a small screen the summary cards go into 2 columns
* The table can scroll sideways instead of breaking the page

## Why some stories were left for later

* **US8 (filter and sort):** with only 8 cars it's easy to see everything, so it wasn't worth it for a prototype.
* **US9 (live map):** needs real location data, which brings up privacy problems that we discuss in the ethics memo. We'd want to solve those first.
* **US10 (login):** there's no real data yet, but it's the first thing we'd add before using real data (see the security memo).
* **US11 (live updates):** needs a server and a database, the assignment said the data should be static.
