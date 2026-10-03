# Calculator E2E Tests 🧪

[![Cypress Tests](https://github.com/lazovskih/calculator-e2e-tests/actions/workflows/cypress.yml/badge.svg)](https://github.com/lazovskih/calculator-e2e-tests/actions)
[![Cypress version](https://img.shields.io/badge/cypress-v15.16.0-brightgreen)](https://www.cypress.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An end-to-end (E2E) testing suite for the online calculator at [theonlinecalculator.com](https://www.theonlinecalculator.com/). This suite contains **84 tests** validating the user interface, basic operations, negative numbers, decimals, cumulative operations, and edge cases (e.g., division by zero).

🎬 **Watch the execution recording here:** [YouTube Demo](https://youtu.be/sg8KL5Mb-V4)

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

## 📂 Project Structure

```
calculator-e2e-tests/
├── .github/
│   └── workflows/
│       └── cypress.yml                 # GitHub Actions workflow configuration
├── cypress/
│   ├── PageObjects/
│   │   └── CalculatorPage.js           # Page Object for Calculator selectors and interactions
│   ├── e2e/
│   │   ├── 1_Initialization_&_UI_Tests.cy.js  # Initialization & Basic UI Spec
│   │   └── 2_Functional_Tests.cy.js           # Comprehensive math operations Spec
│   ├── fixtures/                       # Test fixture files
│   ├── support/                        # Cypress support files (commands, e2e config)
│   └── downloads/                      # Downloaded files
├── cypress.config.js                   # Cypress configuration
├── package.json                        # Node.js scripts and dependencies
└── README.md                           # Project documentation
```

---

## 📋 Test Coverage Details

The suite consists of **84 tests** split into two main spec files:

<details>
<summary><b>1. Initialization & UI Tests (8 tests)</b></summary>

* **1.1** Validate the default state of the calculator upon load.
* **1.2** Validate that pressing numbers buttons updates the display as expected.
* **1.3** Validate the calculator prevents entering more than one decimal point.
* **1.4** Validate how the calculator handles leading zeros.
* **1.5** Validate that pressing "CE" button clears only current entry.
* **1.6** Validate that a number can be set as negative and set back to positive.
* **1.7** Validate typing on the display with 'Equals' and 'Enter' buttons produce valid results.
* **1.8** Validate typing after 'Equals' and 'Enter' buttons produce valid results.
</details>

<details>
<summary><b>2. Functional Tests (76 tests)</b></summary>

* **2.1** Verify "add (sum)" operation with positive integers & decimal values.
* **2.2** Verify "add (sum)" operation with negative integers & decimal values.
* **2.3** Verify "cumulative add (sum)" operation with positive integers & decimal values.
* **2.4** Verify "cumulative add (sum)" operation with negative integers & decimal values.
* **2.5** Verify "subtract" operation with positive integers & decimal values.
* **2.6** Verify "subtract" operation with negative integers & decimal values.
* **2.7** Verify "cumulative subtract" operation with positive integers & decimal values.
* **2.8** Verify "cumulative subtract" operation with negative integers & decimal values.
* **2.9** Verify "multiply" operation with positive integers & decimal values.
* **2.10** Verify "multiply" operation with negative integers & decimal values.
* **2.11** Verify "cumulative multiply" operation with positive integers & decimal values.
* **2.12** Verify "cumulative multiply" operation with negative integers & decimal values.
* **2.13** Verify "divide" operation with positive integers & decimal values.
* **2.14** Verify "divide" operation with negative integers & decimal values.
* **2.15** Verify "cumulative divide" operation with positive integers & decimal values.
* **2.16** Verify "cumulative divide" operation with negative integers & decimal values.
* **2.17** Verify "invalid divide" operation with 'zero' as devizor values.
* **2.18** Verify "cumulative operations with invalid divide" operation with 'zero' as devizor values.
* **2.19** Verify "Multiple cumulative operations" operation with positive & negative integers & decimal values.
* **2.20** Verify "Multiple cumulative with equal operation" operation with positive & negative integers & decimal values.
* **2.21** Verify "Multiple operation result to last operand" operation with positive integers values.
* **2.22** Verify "Multiple operations" operation with not complete arguments values.
</details>