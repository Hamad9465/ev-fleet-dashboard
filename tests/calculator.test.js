// Unit tests for calculateChargingCost()
// Open tests/test.html in a browser to run them.
// Each test has an ID (TC01, TC02...) that matches docs/test-plan.md

const results = [];
let currentGroup = "";

function group(name) {
  currentGroup = name;
}

function test(id, name, fn) {
  try {
    fn();
    results.push({ id: id, group: currentGroup, name: name, passed: true });
  } catch (error) {
    results.push({ id: id, group: currentGroup, name: name, passed: false, message: error.message });
  }
}

function expectEqual(actual, expected) {
  if (actual !== expected) {
    throw new Error("Expected " + expected + " but got " + actual);
  }
}

// checks that the function throws AND that the error message is the one we expect,
// so we know it failed for the right reason and the user sees a clear message
function expectThrows(fn, expectedMessage) {
  let threw = false;
  try {
    fn();
  } catch (error) {
    threw = true;
    if (expectedMessage && error.message.indexOf(expectedMessage) === -1) {
      throw new Error("Wrong error message: \"" + error.message + "\"");
    }
  }
  if (!threw) {
    throw new Error("Expected an error but nothing was thrown");
  }
}

const NOT_A_NUMBER = "must be a number";
const NOT_POSITIVE = "must be more than 0";
const TOO_LONG = "can't be more than 24";

// ---- 1. positive hours ----
group("Positive hours (valid input)");

test("TC01", "2 hours costs $2.25", function () {
  expectEqual(calculateChargingCost(2), 2.25);
});

test("TC02", "4 hours costs $4.50", function () {
  expectEqual(calculateChargingCost(4), 4.5);
});

test("TC03", "1 hour costs $1.13 (1.125 rounded to cents)", function () {
  expectEqual(calculateChargingCost(1), 1.13);
});

test("TC04", "1.5 hours costs $1.69 (1.6875 rounded to cents)", function () {
  expectEqual(calculateChargingCost(1.5), 1.69);
});

test("TC05", "0.5 hours (30 min) costs $0.56", function () {
  expectEqual(calculateChargingCost(0.5), 0.56);
});

test("TC06", "10 hours costs $11.25", function () {
  expectEqual(calculateChargingCost(10), 11.25);
});

// ---- 2. input typed into the form (always comes as text) ----
group("Text input from the form");

test("TC07", "text \"8\" works ($9.00)", function () {
  expectEqual(calculateChargingCost("8"), 9);
});

test("TC08", "decimal text \"2.5\" works ($2.81)", function () {
  expectEqual(calculateChargingCost("2.5"), 2.81);
});

test("TC09", "spaces around the number \" 6 \" still work ($6.75)", function () {
  expectEqual(calculateChargingCost(" 6 "), 6.75);
});

// ---- 3. boundaries ----
group("Boundary values");

test("TC10", "24 hours (the max) is allowed and costs $27.00", function () {
  expectEqual(calculateChargingCost(24), 27);
});

test("TC11", "24.01 hours (just over the max) throws an error", function () {
  expectThrows(function () { calculateChargingCost(24.01); }, TOO_LONG);
});

test("TC12", "30 hours throws an error", function () {
  expectThrows(function () { calculateChargingCost(30); }, TOO_LONG);
});

test("TC13", "0 hours throws an error", function () {
  expectThrows(function () { calculateChargingCost(0); }, NOT_POSITIVE);
});

// ---- 4. negative hours ----
group("Negative hours");

test("TC14", "negative hours (-3) throws an error", function () {
  expectThrows(function () { calculateChargingCost(-3); }, NOT_POSITIVE);
});

test("TC15", "small negative (-0.5) throws an error", function () {
  expectThrows(function () { calculateChargingCost(-0.5); }, NOT_POSITIVE);
});

test("TC16", "negative as text (\"-2\") throws an error", function () {
  expectThrows(function () { calculateChargingCost("-2"); }, NOT_POSITIVE);
});

// ---- 5. non numeric input ----
group("Non numeric input");

test("TC17", "text \"abc\" throws an error (this was the $NaN bug)", function () {
  expectThrows(function () { calculateChargingCost("abc"); }, NOT_A_NUMBER);
});

test("TC18", "mixed text \"5abc\" throws an error (used to be read as 5)", function () {
  expectThrows(function () { calculateChargingCost("5abc"); }, NOT_A_NUMBER);
});

test("TC19", "empty input throws an error", function () {
  expectThrows(function () { calculateChargingCost(""); }, NOT_A_NUMBER);
});

test("TC20", "only spaces \"   \" throws an error", function () {
  expectThrows(function () { calculateChargingCost("   "); }, NOT_A_NUMBER);
});

test("TC21", "null throws an error", function () {
  expectThrows(function () { calculateChargingCost(null); }, NOT_A_NUMBER);
});

test("TC22", "undefined (nothing passed) throws an error", function () {
  expectThrows(function () { calculateChargingCost(); }, NOT_A_NUMBER);
});

test("TC23", "true (a boolean) throws an error", function () {
  expectThrows(function () { calculateChargingCost(true); }, NOT_A_NUMBER);
});

test("TC24", "Infinity throws an error", function () {
  expectThrows(function () { calculateChargingCost(Infinity); }, NOT_A_NUMBER);
});

// ---- show results on the page ----
function showTestResults() {
  const list = document.getElementById("test-list");
  const summary = document.getElementById("test-summary");
  let passedCount = 0;
  let lastGroup = "";

  results.forEach(function (r) {
    if (r.group !== lastGroup) {
      const heading = document.createElement("li");
      heading.className = "group";
      heading.textContent = r.group;
      list.appendChild(heading);
      lastGroup = r.group;
    }
    const item = document.createElement("li");
    item.className = r.passed ? "pass" : "fail";
    item.textContent = (r.passed ? "PASS  " : "FAIL  ") + r.id + "  " + r.name + (r.passed ? "" : "  (" + r.message + ")");
    list.appendChild(item);
    if (r.passed) passedCount++;
  });

  summary.textContent = passedCount + " of " + results.length + " tests passed";
  summary.className = passedCount === results.length ? "all-pass" : "some-fail";
}

if (typeof document !== "undefined") {
  showTestResults();
}
