// Unit tests for calculateChargingCost()
// Open tests/test.html in a browser to run them.

const results = [];

function test(name, fn) {
  try {
    fn();
    results.push({ name: name, passed: true });
  } catch (error) {
    results.push({ name: name, passed: false, message: error.message });
  }
}

function expectEqual(actual, expected) {
  if (actual !== expected) {
    throw new Error("Expected " + expected + " but got " + actual);
  }
}

function expectThrows(fn) {
  let threw = false;
  try {
    fn();
  } catch (error) {
    threw = true;
  }
  if (!threw) {
    throw new Error("Expected an error but nothing was thrown");
  }
}

// ---- positive hours ----
test("2 hours costs $2.25", function () {
  expectEqual(calculateChargingCost(2), 2.25);
});

test("4 hours costs $4.50", function () {
  expectEqual(calculateChargingCost(4), 4.5);
});

test("1.5 hours costs $1.69 (rounded to cents)", function () {
  expectEqual(calculateChargingCost(1.5), 1.69);
});

test("text that is a number like \"8\" works ($9.00)", function () {
  expectEqual(calculateChargingCost("8"), 9);
});

test("24 hours (the max) costs $27.00", function () {
  expectEqual(calculateChargingCost(24), 27);
});

// ---- negative or zero hours ----
test("negative hours (-3) throws an error", function () {
  expectThrows(function () { calculateChargingCost(-3); });
});

test("0 hours throws an error", function () {
  expectThrows(function () { calculateChargingCost(0); });
});

// ---- non numeric input ----
test("text \"abc\" throws an error", function () {
  expectThrows(function () { calculateChargingCost("abc"); });
});

test("mixed text \"5abc\" throws an error", function () {
  expectThrows(function () { calculateChargingCost("5abc"); });
});

test("empty input throws an error", function () {
  expectThrows(function () { calculateChargingCost(""); });
});

test("null throws an error", function () {
  expectThrows(function () { calculateChargingCost(null); });
});

test("more than 24 hours throws an error", function () {
  expectThrows(function () { calculateChargingCost(30); });
});

// ---- show results on the page ----
function showTestResults() {
  const list = document.getElementById("test-list");
  const summary = document.getElementById("test-summary");
  let passedCount = 0;

  results.forEach(function (r) {
    const item = document.createElement("li");
    item.className = r.passed ? "pass" : "fail";
    item.textContent = (r.passed ? "PASS  " : "FAIL  ") + r.name + (r.passed ? "" : "  (" + r.message + ")");
    list.appendChild(item);
    if (r.passed) passedCount++;
  });

  summary.textContent = passedCount + " of " + results.length + " tests passed";
  summary.className = passedCount === results.length ? "all-pass" : "some-fail";
}

if (typeof document !== "undefined") {
  showTestResults();
}
