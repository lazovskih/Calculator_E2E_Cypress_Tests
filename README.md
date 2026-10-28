# Calculator E2E Tests 🧪

[![Cypress Tests](https://github.com/lazovskih/calculator-e2e-tests/actions/workflows/cypress.yml/badge.svg)](https://github.com/lazovskih/calculator-e2e-tests/actions)
[![Cypress version](https://img.shields.io/badge/cypress-v15.16.0-brightgreen)](https://www.cypress.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An end-to-end (E2E) testing suite for a prototype of the online calculator published at [theonlinecalculator.com](https://www.theonlinecalculator.com/).

Calculator application files (`index.html`, `app.js`, `style.css`) are stored and executed locally to avoid redundant network calls, eliminate external dependencies, and accurately mimic the actual deployment.

Please note that the calculator logic is provided "as is" for demonstration and testing purposes, and its mathematical accuracy is not guaranteed.

This suite contains **118 automated tests** validating the user interface, basic mathematical operations, negative numbers, decimals, cumulative operations, special functions (square, square root, percentage, rounding, memory), and edge cases (e.g., division by zero).

🎬 **Watch the execution recording here:** [YouTube Demo: https://youtu.be/bnQtMrYxUKE](https://youtu.be/bnQtMrYxUKE)

---

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (Node 18+ or 20+ recommended).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/lazovskih/calculator-e2e-tests.git
   cd calculator-e2e-tests
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

---

## 🛠 Running the Tests

### Headless Mode (CLI)

Run the entire test suite headlessly:

```bash
# Run using the default browser
npm test

# Run specifically on Chrome
npm run cy:run:chrome

# Run specifically on Firefox
npm run cy:run:firefox
```

### Interactive Mode (Cypress App)

To open the Cypress Test Runner UI and run tests interactively:

```bash
# Open interactive UI
npm run cy:open

# Open on a specific browser
npm run cy:open:chrome
npm run cy:open:firefox
npm run cy:open:edge
```

---

## 🤖 CI/CD Integration

This project has **GitHub Actions** set up to automatically execute tests on code modifications.

- **Trigger:** Triggers on any `push` to any branch, on `pull_request` targeting `main` or `master`, or via manual trigger (`workflow_dispatch`).
- **Artifacts:**
  - **Screenshots:** Captured and uploaded automatically upon test failure.
  - **Videos:** Always recorded and uploaded as test artifacts for every run.
- **Workflow configuration:** Defined in [.github/workflows/cypress.yml](.github/workflows/cypress.yml).

---

## 📊 Data-Driven Testing

The functional test suite is **purely data-driven**. All datasets are externalized into structured JSON files located in `cypress/fixtures/TestData/`.

The test runner dynamically iterates through each fixture file and runs all defined test cases sequentially. The suite is easily extensible: adding more tests or edge cases only requires saving valid, structured data in the corresponding JSON file—no test script modifications needed.

---

## 📂 Project Structure

```
calculator-e2e-tests/
├── .github/
│   └── workflows/
│       └── cypress.yml                       # GitHub Actions CI/CD workflow configuration
├── cypress/
│   ├── PageObjects/
│   │   └── calculatorPage.js                 # Page Object for Calculator selectors and interactions
│   ├── e2e/
│   │   ├── 1_Initialization_&_UI_Tests.cy.js # Initialization & UI Spec (10 tests)
│   │   └── 2_Functional_Tests.cy.js          # Data-driven functional tests (108 tests)
│   ├── fixtures/                             # Test fixture files
│   │   ├── 01_addition.json                  # Test data for addition
│   │   ├── 02_subtraction.json               # Test data for subtraction
│   │   ├── 03_multiplication.json            # Test data for multiplication
│   │   ├── 04_division.json                  # Test data for division
│   │   ├── 05_divisionbyzero.json            # Test data for division by zero
│   │   ├── 06_cumulative.json                # Test data for cumulative operations
│   │   ├── 07_squareroot.json                # Test data for square root
│   │   ├── 08_pow2.json                      # Test data for power of 2
│   │   ├── 09_percentage.json                # Test data for percentage
│   │   ├── 10_rounding.json                  # Test data for rounding
│   │   └── 11_memory.json                    # Test data for memory functions
│   └── support/
│       ├── commands.js                       # Custom Cypress commands
│       └── e2e.js                            # Cypress support configuration
├── app.js                                    # Calculator application logic
├── cypress.config.js                         # Cypress configuration
├── index.html                                # Calculator HTML markup
├── style.css                                 # Calculator styling
├── package.json                              # Dependencies and test scripts
└── README.md                                 # Project documentation
```

---

## 📋 Test Coverage Details

The suite consists of **118 tests** split into two main spec files:

<details>
<summary><b>1. Initialization & UI Tests (10 tests)</b></summary>

- **1.1** Validate the default state of the calculator upon load.
- **1.2** Validate that pressing numbers buttons updates the display as expected.
- **1.3** Validate the calculator prevents entering more than one decimal point.
- **1.4** Validate how the calculator handles leading zeros.
- **1.5** Validate that pressing "CE" button clears only current entry.
- **1.6** Validate that a number can be set as negative and set back to positive.
- **1.7** Validate typing on the display with 'Equals' and 'Enter' buttons produce valid results.
- **1.8** Validate typing after 'Equals' and 'Enter' buttons produce valid results.
- **1.9** Validate click on π button produces valid result.
- **1.10** Validate button AC changes to CE after first button press.
</details>

<details>
<summary><b>2. Functional Tests (109 tests)</b></summary>

- **2.1 Addition:** Validates addition and cumulative addition with positive and negative integers and decimals.
- **2.2 Subtraction:** Validates subtraction and cumulative subtraction with positive and negative integers and decimals.
- **2.3 Multiplication:** Validates multiplication and cumulative multiplication with positive and negative integers and decimals.
- **2.4 Division:** Validates division and cumulative division with positive and negative integers and decimals.
- **2.5 Division by Zero:** Validates error handling (`Div by 0`) for standalone and cumulative division by zero.
- **2.6 Cumulative & Chained Operations:** Validates multi-operator chained calculations, intermediate equals (`=`), consecutive operator overrides, and incomplete arguments.
- **2.7 Square Root:** Validates square root calculation for positive decimals and error handling (`Invalid input`) for negative values.
- **2.8 Power of 2 (Square):** Validates squaring (`x²`) on positive/negative integers, decimals, and large numbers.
- **2.9 Percentage:** Validates percentage calculations combined with addition and subtraction across integers and decimals.
- **2.10 Rounding:** Validates display rounding to 2 decimal places (`R2`) and rounding to the nearest integer (`R0`).
- **2.11 Memory Functions:** Validates memory operations (`M+`, `M-`, `MR`, `MC`) with positive and negative values.
</details>

---

## 🌐 Target Application

- **Original:** [theonlinecalculator.com](https://www.theonlinecalculator.com/)
- **Local Implementation:** Prototype hosted locally (`index.html`, `app.js`, `style.css`) to ensure deterministic and fast execution
- **Purpose:** QA automation practice with Cypress E2E

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
