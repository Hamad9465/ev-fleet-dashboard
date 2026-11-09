# Test Plan

**Project:** EcoCharge Fleet Dashboard
**Team:** Hamad, Mayed
**Written by:** Mayed

## 1. What we are testing

The assignment says to only unit test the cost calculation function, so all our unit tests are on `calculateChargingCost(hours)` in `js/calculator.js`. We picked this because it's the most important logic in the app. If it's wrong, a manager would get the wrong charging cost and could plan the budget wrong, and nobody would notice since the page still "works".

**Formula:** Cost = hours × 7.5 kW × $0.15 per kWh, which is the same as hours × $1.125. The result is rounded to 2 decimal places (cents).

**Rules the function follows:**
* Accepts a number, or text that is fully a number (because form inputs always come as text)
* Must be more than 0 hours
* Must be 24 hours or less (one full day, anything more is probably a typo)
* Anything else throws an error with a clear message, instead of returning a wrong number

## 2. How to run the tests

Open `tests/test.html` in any browser. The page runs all the tests and shows PASS or FAIL for each one, grouped by type, with the total at the top. We wrote our own small test helper (`test`, `expectEqual`, `expectThrows`) so nothing needs to be installed.

For error cases we don't only check that an error happens, we also check the error **message**. That way we know it failed for the right reason (like "must be a number" and not some other random error).

## 3. Test cases

| ID | Group | Input | Expected result | Actual | Status |
|----|-------|-------|-----------------|--------|--------|
| TC01 | Positive hours | `2` | $2.25 | $2.25 | Pass |
| TC02 | Positive hours | `4` | $4.50 | $4.50 | Pass |
| TC03 | Positive hours | `1` | $1.13 (1.125 rounded) | $1.13 | Pass |
| TC04 | Positive hours | `1.5` | $1.69 (1.6875 rounded) | $1.69 | Pass |
| TC05 | Positive hours | `0.5` | $0.56 | $0.56 | Pass |
| TC06 | Positive hours | `10` | $11.25 | $11.25 | Pass |
| TC07 | Text input | `"8"` | $9.00 | $9.00 | Pass |
| TC08 | Text input | `"2.5"` | $2.81 | $2.81 | Pass |
| TC09 | Text input | `" 6 "` (spaces) | $6.75 | $6.75 | Pass |
| TC10 | Boundary | `24` (max) | $27.00 | $27.00 | Pass |
| TC11 | Boundary | `24.01` | Error: can't be more than 24 hours | Error | Pass |
| TC12 | Boundary | `30` | Error: can't be more than 24 hours | Error | Pass |
| TC13 | Boundary | `0` | Error: must be more than 0 hours | Error | Pass |
| TC14 | Negative | `-3` | Error: must be more than 0 hours | Error | Pass |
| TC15 | Negative | `-0.5` | Error: must be more than 0 hours | Error | Pass |
| TC16 | Negative | `"-2"` | Error: must be more than 0 hours | Error | Pass |
| TC17 | Non numeric | `"abc"` | Error: must be a number | Error | Pass |
| TC18 | Non numeric | `"5abc"` | Error: must be a number | Error | Pass |
| TC19 | Non numeric | `""` (empty) | Error: must be a number | Error | Pass |
| TC20 | Non numeric | `"   "` (only spaces) | Error: must be a number | Error | Pass |
| TC21 | Non numeric | `null` | Error: must be a number | Error | Pass |
| TC22 | Non numeric | nothing passed (`undefined`) | Error: must be a number | Error | Pass |
| TC23 | Non numeric | `true` | Error: must be a number | Error | Pass |
| TC24 | Non numeric | `Infinity` | Error: must be a number | Error | Pass |

**Result: 24 of 24 tests passed.** A screenshot of the test page is in `docs/screenshots/unit-tests.png`.

## 4. Why we picked these cases

* **Positive hours (TC01 to TC06):** normal use. We included values that need rounding (1, 1.5, 0.5) because rounding is an easy place to make a mistake with money.
* **Text input (TC07 to TC09):** the form gives us text, not numbers, so the function has to handle `"8"` the same as `8`.
* **Boundaries (TC10 to TC13):** we test right on the limits (0 and 24) and just past them (24.01), since bugs usually happen at the edges.
* **Negative hours (TC14 to TC16):** the assignment asked for this. A negative cost makes no sense so it should be blocked.
* **Non numeric (TC17 to TC24):** also asked for in the assignment. TC17 and TC18 are the exact bug we found (see the code review note in the README).

## 5. Manual testing of the page

Unit tests only cover the function, so we also checked the page by hand in Chrome and Edge:

| What we did | Expected | Result |
|-------------|----------|--------|
| Opened `index.html` | Table shows 8 vehicles with ID, model, battery and status | Pass |
| Checked summary cards | Total 8, Available 3, Charging 2, On trip 3 | Pass |
| Checked battery colors | Green 70% and up, orange 30 to 69%, red under 30% | Pass |
| Clicked Calculate without picking a car | "Please choose a vehicle first." | Pass |
| Picked EV-102, typed 3.5, clicked Calculate | $3.94 with 26.25 kWh shown | Pass |
| Typed -2 | Red error message, no cost shown | Pass |
| Typed abc | Red error message, no cost shown | Pass |
| Made the window small (phone size) | Cards go to 2 columns, table scrolls sideways | Pass |

## 6. What we did not test

* The page layout and the fleet table have no automated tests (the assignment said to only unit test the cost function).
* No testing with a real database or real vehicle data, since the prototype uses a fixed list.
