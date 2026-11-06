# EcoCharge Fleet Dashboard

ICS 432 Software Engineering group project
**Team:** Hamad (202319343), Mayed

A simple web prototype for EcoCharge Innovations that lets managers monitor a small fleet of electric vehicles. It has two features:

1. **Fleet Overview:** a table of 8 vehicles showing Vehicle ID, Model, Battery % and Status, plus summary cards at the top.
2. **Charging Cost Calculator:** pick a vehicle, type the charging hours, and it shows the cost using `Cost = hours × 7.5 kW × $0.15 per kWh`.

Built with plain HTML, CSS and JavaScript. No install needed.

## How to run the app

1. Download or clone this repo:
   ```
   git clone <repo link>
   ```
2. Open the `ev-fleet-dashboard` folder.
3. Double click `index.html` to open it in any browser (Chrome, Edge, Firefox).

That's it, there is no server or packages to install.

## How to run the tests

1. Open the `tests` folder.
2. Double click `test.html`.
3. The page shows every test with PASS or FAIL and a total at the top (it should say **12 of 12 tests passed**).

The tests only cover the cost calculation function `calculateChargingCost()` in `js/calculator.js`. They check:
* positive hours give the right cost (like 2 hours = $2.25)
* negative hours and 0 hours throw an error
* non numeric input like `"abc"`, `"5abc"`, empty input and `null` throw an error instead of giving a wrong cost

## Project structure

```
ev-fleet-dashboard/
├── index.html              main dashboard page
├── css/style.css           styling
├── js/
│   ├── fleet-data.js       static list of vehicles
│   ├── fleet.js            Feature A: builds the fleet table and summary cards
│   ├── calculator.js       Feature B: cost calculation function
│   └── calculator-ui.js    Feature B: connects the form to the function
├── tests/
│   ├── test.html           open this to run the tests
│   └── calculator.test.js  the unit tests
└── docs/
    ├── product-backlog.md
    ├── sprint-plan.md
    ├── sprint-retrospective.md
    ├── security-memo.md
    └── ethics-memo.md
```

## Code review note (bug we found and prevented)

In the first version of the calculator, the function used `parseFloat(hours)` to read the input. When we tested it we found two problems. Typing letters like `abc` showed **"$NaN"** as the cost, and typing something like `5abc` was quietly read as 5 hours, so the user got a cost even though their input was wrong.

We fixed it by only accepting real numbers (or text that is fully a number) and throwing a clear error for anything else, like "Charging duration must be a number." We also block 0, negative hours and anything over 24 hours. The unit tests in `tests/calculator.test.js` check all these cases so the bug can't come back without a test failing. The same note is also written as a comment above the function in `js/calculator.js`.

## Git workflow

We used GitHub for this project (our instructor said GitHub or GitLab is fine). On GitHub, merge requests are called **pull requests**, but they work the same way.

* `main` is the stable branch
* `feature/fleet-overview` built Feature A (Hamad), merged with a pull request
* `feature/cost-calculator` built Feature B (Mayed), merged with a pull request
* `docs/memos-and-readme` added the memos and finished the README, merged with a pull request

Commit messages follow the Conventional Commits style, like `feat: add fleet table` and `fix: reject non numeric charging duration`.

## Agile documents

All in the `docs` folder: product backlog, sprint plan, sprint retrospective, security memo and ethics memo.
