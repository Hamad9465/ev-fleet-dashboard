// ESLint setup we used for static analysis (checking the code without running it).
// To run it (needs Node.js): npm install eslint @eslint/js eslint-plugin-no-unsanitized globals
// then: npx eslint js tests/calculator.test.js
const js = require("@eslint/js");
const globals = require("globals");
const nounsanitized = require("eslint-plugin-no-unsanitized");

module.exports = [
  js.configs.recommended,
  nounsanitized.configs.recommended, // flags unsafe innerHTML, outerHTML, insertAdjacentHTML, document.write
  {
    files: ["js/**/*.js", "tests/**/*.js"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "script",
      globals: {
        ...globals.browser,
        // our files share these through <script> tags
        fleet: "readonly",
        calculateChargingCost: "readonly",
        CHARGER_POWER_KW: "readonly",
        PRICE_PER_KWH: "readonly",
        MAX_CHARGING_HOURS: "readonly"
      }
    },
    rules: {
      "no-eval": "error",           // never run text as code
      "no-implied-eval": "error",   // no setTimeout("code as text")
      "no-new-func": "error",       // no new Function("code")
      "eqeqeq": "error",            // always === so "5" == 5 tricks don't happen
      "no-unused-vars": ["error", { "vars": "local" }],
      "no-redeclare": ["error", { "builtinGlobals": false }]
    }
  }
];
