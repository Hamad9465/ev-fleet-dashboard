# Sprint Plan (Sprint 1)

**Sprint length:** 2 weeks
**Sprint goal:** Build a working prototype with the fleet overview and the charging cost calculator, with tests and documentation.
**Team:** Hamad, Mayed
**Stories in this sprint:** US1 to US7 (18 story points, see `product-backlog.md`)

## Roles

| Person | Scrum role | Main work |
|--------|-----------|-----------|
| Hamad | Product Owner | Feature A (fleet overview), README, ethics and security memos |
| Mayed | Scrum Master | Feature B (cost calculator), unit tests, test plan |
| Both | Development Team | Code reviews on each other's pull requests, retrospective, demo video |

Since we're only 2 people, we both also worked as developers.

## Sprint timeline

| When | What |
|------|------|
| Day 1 | Sprint planning: wrote the backlog, picked the stories, split the tasks |
| Days 2 to 5 | Hamad builds Feature A on `feature/fleet-overview` |
| Day 5 | Pull request for Feature A, Mayed reviews and merges |
| Days 6 to 9 | Mayed builds Feature B on `feature/cost-calculator` |
| Day 9 | Pull request for Feature B, Hamad reviews and merges |
| Days 10 to 12 | Documents, memos, extra tests and README |
| Day 13 | Sprint review: go through every acceptance criteria together |
| Day 14 | Sprint retrospective and demo video |

We planned to check in with each other every 2 or 3 days on WhatsApp (what did you do, what's next, anything blocking you).

## Feature A: Static Fleet Overview (branch: `feature/fleet-overview`)

| # | Task | Story | Assigned to | Estimate | Status |
|---|------|-------|-------------|----------|--------|
| A1 | Set up GitHub repo, add teammate, write first README | Setup | Hamad | 1 h | Done |
| A2 | Write product backlog and sprint plan | Setup | Hamad | 2 h | Done |
| A3 | Create basic HTML structure and page layout | US1 | Hamad | 1.5 h | Done |
| A4 | Add CSS styling for the dashboard | US1, US7 | Hamad | 2 h | Done |
| A5 | Create static fleet data (8 vehicles) in a JS array | US1, US2 | Hamad | 0.5 h | Done |
| A6 | Show the fleet table with ID, model, battery and status | US1, US2 | Hamad | 2 h | Done |
| A7 | Add battery bar colors and status badges | US6 | Hamad | 1 h | Done |
| A8 | Add summary cards (total, available, charging, on trip) | US5 | Hamad | 1 h | Done |
| A9 | Open pull request and get it reviewed by Mayed | Review | Hamad | 0.5 h | Done |

## Feature B: Charging Cost Calculator (branch: `feature/cost-calculator`)

| # | Task | Story | Assigned to | Estimate | Status |
|---|------|-------|-------------|----------|--------|
| B1 | Write the cost function (hours × 7.5 kW × $0.15) | US3 | Mayed | 1 h | Done |
| B2 | Add the calculator form (vehicle dropdown and hours input) | US3 | Mayed | 1.5 h | Done |
| B3 | Show the result or an error message on the page | US3, US4 | Mayed | 1 h | Done |
| B4 | Fix input validation for empty and non numeric values | US4 | Mayed | 1 h | Done |
| B5 | Write unit tests for the cost function | US4 | Mayed | 2 h | Done |
| B6 | Open pull request and get it reviewed by Hamad | Review | Mayed | 0.5 h | Done |

## Documentation and extra testing

| # | Task | Assigned to | Estimate | Status |
|---|------|-------------|----------|--------|
| D1 | Write security memo and security analysis | Hamad | 2 h | Done |
| D2 | Write ethics memo | Hamad | 1.5 h | Done |
| D3 | Finish README with run steps and code review note | Hamad | 2 h | Done |
| D4 | More test cases, test plan, XSS security test page and ESLint setup | Mayed | 3.5 h | Done |
| D5 | Take screenshots for the README | Hamad | 0.5 h | Done |
| D6 | Write sprint retrospective together | Hamad, Mayed | 1 h | Done |
| D7 | Record the 5 minute demo video | Hamad, Mayed | 1.5 h | Done |

## Workload split

| Person | Tasks | Estimated hours |
|--------|-------|-----------------|
| Hamad | A1 to A9, D1, D2, D3, D5 + half of D6, D7 | 18.75 h |
| Mayed | B1 to B6, D4 + half of D6, D7 | 11.75 h |

Hamad's side ended up bigger because he also did the setup and planning tasks. In the next sprint we would balance this better (see the retrospective).

## Definition of Done

A task only counts as Done when all of these are true:
1. The code works when you open `index.html` in Chrome or Edge, with no errors in the browser console
2. It meets the acceptance criteria of its user story
3. It's on its own branch and merged into `main` with a pull request
4. The other teammate reviewed and approved the pull request
5. Commit messages follow our format (`feat:`, `fix:`, `test:`, `docs:`, `refactor:`)
6. If it touches the cost function, all unit tests in `tests/test.html` still pass
