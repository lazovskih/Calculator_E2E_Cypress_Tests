// Original implementation copied from https://www.theonlinecalculator.com/ in 2026-10-26.
// The only change is to replace "Not a Number" with "Invalid input"
let is_Number = !1,
  is_Decimal = !1,
  is_Operator = !1,
  is_Constant = !1,
  is_Executed = !1;
let Value = " ",
  aValue = " ",
  Operator = "",
  a,
  b,
  r,
  t,
  Value_1_set = !1,
  Value_1 = 0,
  Operator_1 = 0,
  Value_2_set = !1,
  Value_2 = 0,
  Operator_2 = 0;

function numberWithCommas(c) {
  c = c.toString().split(".");
  c[0] = c[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return c.join(".");
}

function removeCommas(c) {
  return c.toString().replaceAll(",", "");
}

function displayValue(c) {
  document.calculator.display.value = numberWithCommas(c);
}

function enterValue(c) {
  "" === document.calculator.display.value && (document.calculator.display.value = " ");
  if (
    !(
      "Not a Number" === document.calculator.display.value ||
      ("0" === document.calculator.display.value && "0" === c) ||
      is_Constant ||
      ("." === c && is_Decimal)
    )
  ) {
    document.calculator.clearButton.value = "CE";
    if (is_Operator || is_Executed || is_Constant) (resetFlags(), "." === c ? ((Value = "0."), (is_Decimal = !0)) : (Value = c));
    else if ((resetFlags(), "." === c && " " === document.calculator.display.value)) ((Value = "0."), (is_Decimal = !0));
    else if (
      ((Value = "0" === document.calculator.display.value && "." !== c ? c : Value + c),
      (TestDecimal = "" + Value),
      "." === c || -1 !== TestDecimal.indexOf("."))
    )
      is_Decimal = !0;
    is_Number = !0;
    displayValue(Value.trim());
  }
}

function display_backspace() {
  Value = Value.substring(0, Value.length - 1);
  displayValue(Value.trim());
}

function enterOperator(c) {
  const display = document.calculator.display;
  if (!display.value || display.value === " ") {
    display.value = " ";
    return;
  }
  // Guard against all error states
  const errorValues = ["Not a Number", "Invalid input", "Div by 0"];
  if (errorValues.includes(display.value.trim())) {
    return;
  }
  Operator = c;
  // Case 1: Switching operator before entering second number (e.g. "5 +" -> "-")
  if (is_Operator && Value_1_set && !Value_2_set) {
    Operator_1 = Operator;
    return;
  }
  // Case 2: Chaining calculation (e.g. "5 + 3" -> pressing "+" or "=")
  if (Value_1_set && !Value_2_set) {
    Value_2 = removeCommas(display.value);
    Operator_2 = Operator;
    Value_2_set = true;
    execute();
    displayValue(aValue);
    return;
  }
  // Case 3: First operator in a calculation
  resetValues();
  Value_1 = removeCommas(display.value);
  Operator_1 = Operator;
  Value_1_set = true;
  resetFlags();
  is_Operator = true;
}

function execute() {
  const val_1 = parseFloat(Value_1);
  const val_2 = parseFloat(Value_2);
  const Oper = Operator_1;
  let ans = "";

  switch (Oper) {
    case "+":
      ans = val_1 + val_2;
      break;
    case "-":
      ans = val_1 - val_2;
      break;
    case "*":
      ans = val_1 * val_2;
      break;
    case "/":
      ans = val_2 === 0 ? "Div by 0" : val_1 / val_2;
      break;
    default:
      ans = val_2;
      break;
  }

  Value = ans;

  // Handle error strings or NaN
  if (typeof ans === "string" || isNaN(ans)) {
    resetValues();
    resetFlags();
    aValue = ans;
    return;
  }

  Operator = Operator_2;

  // Round to 10 decimal places if precision exceeds 10 places
  if (decimalPlaces(ans) > 10) {
    aValue = parseFloat(Math.round10(ans, -10));
  } else {
    aValue = parseFloat(ans);
  }

  if (Operator_2 === "=") {
    resetValues();
    resetFlags();
    is_Executed = true;
  } else {
    // Chaining next operation (e.g., 2 + 3 + ...)
    resetValues();
    Value_1 = ans;
    Operator_1 = Operator;
    Value_1_set = true;
    resetFlags();
    is_Operator = true;
  }
}

function display_clear() {
  "" === document.calculator.display.value && (document.calculator.display.value = " ");
  "AC" === document.calculator.clearButton.value ||
  " " === document.calculator.display.value ||
  "Not a Number" === document.calculator.display.value ||
  ("CE" === document.calculator.clearButton.value && is_Constant && !Value_1_set)
    ? (resetFlags(),
      resetValues(),
      (Value = " "),
      (Operator = ""),
      displayValue(Value.trim()),
      (document.calculator.clearButton.value = "AC"))
    : "CE" === document.calculator.clearButton.value &&
      ((document.calculator.clearButton.value = "AC"), is_Operator || ((Value = " "), displayValue(Value.trim())));
}

function memory_plus() {
  "" === document.calculator.display.value && (document.calculator.display.value = " ");
  " " !== document.calculator.display.value &&
    ((a = parseFloat(document.calculator.memory.value)),
    (b = parseFloat(removeCommas(document.calculator.display.value))),
    (t = a + b),
    (document.calculator.memory.value = t));
}

function memory_minus() {
  "" === document.calculator.display.value && (document.calculator.display.value = " ");
  " " !== document.calculator.display.value &&
    ((a = parseFloat(document.calculator.memory.value)),
    (b = parseFloat(removeCommas(document.calculator.display.value))),
    (t = a - b),
    (document.calculator.memory.value = t));
}

function memory_recall() {
  Value = document.calculator.memory.value;
  displayValue(Value.trim());
  resetFlags();
  is_Constant = !0;
}

function memory_clear() {
  document.calculator.memory.value = 0;
}

function func(c) {
  "" === document.calculator.display.value && (document.calculator.display.value = " ");
  if (" " !== document.calculator.display.value || "pi" === c)
    ((val = removeCommas(Value)),
      "squareroot" === c
        ? (Value = Math.sqrt(val))
        : "square" === c
          ? (Value = Math.pow(val, 2))
          : "cuberoot" === c
            ? (Value = Math.cbrt(val))
            : "cube" === c
              ? (Value = Math.pow(val, 3))
              : "pi" === c
                ? (Value = Math.PI)
                : "r0" === c
                  ? ((val = parseFloat(removeCommas(document.calculator.display.value))),
                    (Value = Math.round10(val, 0)),
                    (Value = Value.toFixed(0)))
                  : "r2" === c
                    ? ((val = parseFloat(removeCommas(document.calculator.display.value))),
                      (Value = Math.round10(val, -2)),
                      (Value = Value.toFixed(2)))
                    : "percent" === c
                      ? (Value = !Value_1_set || ("+" !== Operator_1 && "-" !== Operator_1) ? val / 100 : (val / 100) * Value_1)
                      : "negate" === c && (Value = -val),
      resetFlags(),
      (is_Constant = !0),
      isNaN(Value)
        ? displayValue("Invalid input")
        : ((aValue = Value),
          "r0" !== c &&
            "r2" !== c &&
            (aValue = 10 < decimalPlaces(Value) ? parseFloat(Math.round10(Value, -10)) : parseFloat(Value)),
          displayValue(aValue)));
}

function resetFlags() {
  is_Executed = is_Method = is_Constant = is_Operator = is_Decimal = is_Number = !1;
}

function resetValues() {
  Operator_2 = Operator_1 = Value_2 = Value_1 = "";
  Value_2_set = Value_1_set = !1;
}

function decimalPlaces(c) {
  return (c = ("" + c).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/))
    ? Math.max(0, (c[1] ? c[1].length : 0) - (c[2] ? +c[2] : 0))
    : 0;
}

function decimalAdjust(c, d, e) {
  if ("undefined" === typeof e || 0 === +e) return Math[c](d);
  d = +d;
  e = +e;
  if (isNaN(d) || "number" !== typeof e || 0 !== e % 1) return NaN;
  if (0 > d) return -decimalAdjust(c, -d, e);
  d = d.toString().split("e");
  d = Math[c](+(d[0] + "e" + (d[1] ? +d[1] - e : -e)));
  d = d.toString().split("e");
  return +(d[0] + "e" + (d[1] ? +d[1] + e : e));
}

Math.round10 ||
  (Math.round10 = function (c, d) {
    return decimalAdjust("round", c, d);
  });
Math.floor10 ||
  (Math.floor10 = function (c, d) {
    return decimalAdjust("floor", c, d);
  });
Math.ceil10 ||
  (Math.ceil10 = function (c, d) {
    return decimalAdjust("ceil", c, d);
  });

window.addEventListener("keydown", checkKeyPressed, !1);

function checkKeyPressed(c) {
  switch (c.keyCode) {
    case 108:
    case 110:
    case 194:
    case 190:
      enterValue(".");
      break;
    case 48:
    case 96:
      enterValue("0");
      break;
    case 49:
    case 97:
      enterValue("1");
      break;
    case 50:
    case 98:
      enterValue("2");
      break;
    case 51:
    case 99:
      enterValue("3");
      break;
    case 52:
    case 100:
      enterValue("4");
      break;
    case 53:
    case 101:
      enterValue("5");
      break;
    case 54:
    case 102:
      enterValue("6");
      break;
    case 55:
    case 103:
      enterValue("7");
      break;
    case 56:
      if (c.shiftKey) {
        enterOperator("*");
        break;
      }
    case 104:
      enterValue("8");
      break;
    case 57:
    case 105:
      enterValue("9");
      break;
    case 107:
      enterOperator("+");
      break;
    case 109:
    case 189:
    case 173:
      enterOperator("-");
      break;
    case 106:
    case 170:
      enterOperator("*");
      break;
    case 111:
    case 191:
      enterOperator("/");
      break;
    case 187:
      if (c.shiftKey) {
        enterOperator("+");
        break;
      }
    case 13:
    case 61:
      if (c.shiftKey) {
        enterOperator("+");
        break;
      }
      enterOperator("=");
      break;
    case 27:
    case 46:
    case 12:
      display_clear();
      break;
    case 8:
      display_backspace();
  }
  c.preventDefault();
}
