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

---

## Appendix: extra detail (not part of the 200 word memo)

### Risk rating

We rated each risk by how likely it is and how bad it would be, once the prototype is turned into a real product with real data.

| Risk | Likelihood | Impact | Overall | OWASP Top 10 (2021) category |
|------|-----------|--------|---------|------------------------------|
| Cross-Site Scripting (XSS) | Medium | High | **High** | A03 Injection |
| No login or access control | High | High | **High** | A01 Broken Access Control, A07 Identification and Authentication Failures |

### Example of the XSS attack

If someone saved this as a vehicle model in the database:
```
<img src="x" onerror="alert(document.cookie)">
```
and the page used `innerHTML` to show it, the browser would try to load the broken image, fail, and run the code inside `onerror`. In a real attack it would send the cookie to the attacker instead of showing an alert. Because we use `textContent`, the page just shows that text as plain characters and nothing runs.

### Where we already handled this in our code

| File | What we did |
|------|-------------|
| `js/fleet.js` | Every table cell uses `textContent` and `createElement`, never `innerHTML` with data inside it |
| `js/calculator-ui.js` | The result and error messages are shown with `textContent` |
| `js/calculator.js` | The hours input is checked strictly (only real numbers between 0 and 24), so bad input never gets used in the calculation |

### Other attack vectors we considered

Our two main risks are in the memo, but we also looked at other common attacks and checked if they apply to our app.

| Attack | Does it apply now? | What could happen in the real product | How we would stop it |
|--------|-------------------|---------------------------------------|----------------------|
| **SQL injection** | No, there's no database yet | Once vehicles are stored in a database, if the server builds a query by gluing in what the user typed, someone could type `' OR '1'='1` in a search box to see every record, or `'; DROP TABLE vehicles; --` to delete the table | Use parameterized queries (prepared statements) so user input is always treated as data, never as part of the SQL command. Also give the app's database account only the permissions it needs. |
| **HTML injection** (the family XSS belongs to) | Only if data comes from users, which is why we already use `textContent` | Fake content or links shown on the dashboard, like a fake "log in again" box | Same as XSS: `textContent`, and check inputs on the server |
| **CSRF** (Cross-Site Request Forgery) | No, the prototype has no login and no buttons that save or change data | Once managers log in and the dashboard can change things (like marking a car as available or changing the price per kWh), a bad website could make a logged in manager's browser send that request without them knowing | Add a secret CSRF token to every form that changes data and check it on the server, and set the session cookie to `SameSite=Lax` or `Strict` so other sites can't send it |
| **Data sent without HTTPS** (man in the middle) | No, the app runs from a file on your computer | Someone on the same Wi-Fi could read or change the fleet data or steal a login on the way | Serve the site only over HTTPS and turn on HSTS so browsers never use plain HTTP |
| **Clickjacking** | Low, nothing on the page changes data | Our page loaded in an invisible frame on another site to trick a manager into clicking | Send the `X-Frame-Options: DENY` header (or `frame-ancestors 'none'` in a Content Security Policy) |
| **Data can be seen in the browser** | Yes, but it's fake data | Anyone can open `js/fleet-data.js` and read the fleet list | Real data should come from a server and only be sent to logged in managers (fixed by risk 2) |
| **Outdated libraries** | No, we don't use any libraries | A known bug in a library could be used against us | Keep dependencies updated and check them with `npm audit` once we add any |

### Security analysis techniques we used

We checked our code in two ways. **Static analysis** means looking at the code without running it. **Dynamic analysis** means running the app and attacking it on purpose to see what happens.

#### Static analysis

**1. Manual code review.** We searched every file in `js/` for functions that are known to be risky:

| Searched for | Found | Safe? |
|--------------|-------|-------|
| `innerHTML` | 1 time: `tbody.innerHTML = "";` in `fleet.js` | Yes, it only clears the table with an empty string, no data goes in |
| `outerHTML`, `insertAdjacentHTML`, `document.write` | 0 | Yes |
| `eval(`, `new Function` | 0 | Yes |
| `textContent` | 10 times | This is the safe way, used for every value we show |

**2. Linting with ESLint.** We ran [ESLint](https://eslint.org/) on all our JavaScript with the recommended rules plus Mozilla's [`eslint-plugin-no-unsanitized`](https://github.com/mozilla/eslint-plugin-no-unsanitized), which flags unsafe uses of `innerHTML` and similar. We also turned on rules that block `eval`, `setTimeout` with code as text, `new Function`, and `==` instead of `===`. The setup is in `eslint.config.js` in the repo.

* **Result on our code: 0 problems.**
* To make sure the tool actually works, we made a test copy of `fleet.js` that used `innerHTML` for the vehicle ID and model. ESLint caught both lines straight away (`Unsafe assignment to innerHTML`, lines 35 and 39). So a 0 on our real code means something.

#### Dynamic analysis

**1. XSS attack test page.** We made `tests/security-test.html`, which loads our real `fleet.js` but feeds it fake vehicles with attack code hidden in the ID, model and status. If any attack runs, it sets a flag. Open the page in a browser to run it.

| Attack payload | Where we hid it | Our code | Unsafe test copy |
|----------------|-----------------|----------|------------------|
| `<script>...</script>` | Vehicle ID | Did not run, shown as text | Added to the page as HTML |
| `<img src=x onerror=...>` | Model | Did not run, shown as text | **Ran** |
| `<svg onload=...>` | Model | Did not run, shown as text | **Ran** |
| `"><img src=x onerror=...>` (breaking out) | Status | Did not run, shown as text | Did not run (status still used `textContent`) |
| Any HTML elements added to the table? | Whole table | 0 found | 3 found |
| **Total** | | **5 of 5 passed** | **1 of 5 passed** |

A screenshot of the result is in `docs/screenshots/security-test.png`.

**2. Input fuzzing on the calculator.** Fuzzing means throwing strange or broken input at a feature to see if it breaks. Our 24 unit tests do this for the cost function: letters, mixed text like `5abc`, empty input, only spaces, `null`, `true`, `Infinity`, negative numbers and values just past the 24 hour limit. All 24 pass, and none of them can make the page show a wrong cost, a negative cost or "$NaN". We also tried the same inputs by hand on the real page.

**3. What we'd add once the app is hosted.** A scan with [ZAP](https://www.zaproxy.org/) (the free OWASP scanner), which crawls a live site and tries attacks like XSS, SQL injection and missing security headers automatically. We also could check the browser DevTools Network tab to make sure every request uses HTTPS. These need a real server, so they don't apply to the prototype yet.

#### Summary of results

| Check | Type | Result |
|-------|------|--------|
| Manual code review for risky functions | Static | No unsafe uses found |
| ESLint with `no-unsanitized` | Static | 0 problems (and it caught the unsafe test copy) |
| XSS attack test page | Dynamic | 5 of 5 passed |
| Input fuzzing through unit tests | Dynamic | 24 of 24 passed |
| ZAP scan | Dynamic | Planned for when the app is hosted |

### References

* OWASP Top 10 (2021): https://owasp.org/Top10/
* OWASP Cross Site Scripting Prevention Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html
* OWASP SQL Injection Prevention Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html
* OWASP Cross-Site Request Forgery Prevention Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html
* ESLint: https://eslint.org/
* eslint-plugin-no-unsanitized (Mozilla): https://github.com/mozilla/eslint-plugin-no-unsanitized
* ZAP: https://www.zaproxy.org/
