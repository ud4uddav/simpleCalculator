// Find the display and every calculator button once, when the page loads.
const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");

// Add one click listener to each button.
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const { action, value } = button.dataset;

    if (action === "clear") clearDisplay();
    else if (action === "delete") deleteLast();
    else if (action === "calculate") calculate();
    else appendToDisplay(value);
  });
});

// Add a number, decimal point, or operator to the current expression.
function appendToDisplay(value) {
  // A fresh number replaces the initial 0 (but an operator may follow it).
  if (display.value === "0" && /[0-9.]/.test(value)) display.value = value;
  else if (display.value === "Error") display.value = value;
  else display.value += value;
}

// Reset the calculator to its starting value.
function clearDisplay() {
  display.value = "0";
}

// Remove the final character; never leave the display blank.
function deleteLast() {
  display.value = display.value.slice(0, -1) || "0";
}

// Calculate only expressions made from numbers, decimal points, and basic operators.
function calculate() {
  const expression = display.value;
  const isSafeExpression = /^[0-9+\-*/%.\s]+$/.test(expression);

  if (!isSafeExpression) {
    display.value = "Error";
    return;
  }

  try {
    // Function evaluates the validated arithmetic expression, such as "12 / 3".
    const result = Function(`"use strict"; return (${expression})`)();
    display.value = Number.isFinite(result) ? String(result) : "Error";
  } catch {
    // Incomplete expressions, such as "5 +", arrive here.
    display.value = "Error";
  }
}
