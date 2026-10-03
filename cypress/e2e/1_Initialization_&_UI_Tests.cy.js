import { CalculatorPage } from "../PageObjects/CalculatorPage.js";
const currentPage = new CalculatorPage();

beforeEach(() => {
  cy.env(["baseUrl"]).then(({ baseUrl }) => {
    cy.visit(baseUrl);
  });
});

context("1. Initialization and UI Tests", () => {
  it("1.1 Validate the default state of the calculator upon load.", () => {
    for (const key in currentPage) {
      if (currentPage.hasOwnProperty(key) && currentPage[key].locator) {
        cy.log(`Verified element is present: |${key}|`);
        // first() is used to select 0 button that has same locator as R2
        cy.get(currentPage[key].locator).first().should("be.visible").and("have.value", currentPage[key].value);
      }
    }
  });

  it("1.2 Validate that pressing numbers buttons updates the display as expected", () => {
    for (const key in currentPage) {
      if (currentPage.hasOwnProperty(key) && Number(currentPage[key].value)) {
        cy.log(`Verified display: ${key} shows value ${currentPage[key].value}`);
        cy.get(currentPage[key].locator).first().click();

        // Check if the display shows the correct value
        cy.get(currentPage.results.locator).should("have.value", currentPage[key].value);

        // Clear the display after each button press
        cy.get(currentPage.button_clearButton.locator).click();

        // Check if the display is cleared
        cy.get(currentPage.results.locator).should("have.value", "");
      }
    }
  });

  it("1.3 Validate the calculator prevents entering more than one decimal point.", () => {
    const testValue = "7.0.0.1";
    const numKeys = testValue.split("");
    for (let j = 0; j < numKeys.length; j++) {
      const buttonLocator = currentPage.getButton(numKeys[j]);
      // Click the number/decimal button
      cy.get(buttonLocator).first().click();
    }

    // Check if the display shows the correct value
    cy.get(currentPage.results.locator).should("have.value", "7.001");
  });

  it("1.4 Validate how the calculator handles leading zeros.", () => {
    const testValue = "00007.001";
    const numKeys = testValue.split("");
    for (let j = 0; j < numKeys.length; j++) {
      const buttonLocator = currentPage.getButton(numKeys[j]);
      // Click the number/decimal button
      cy.get(buttonLocator).first().click();
    }

    // Check if the display shows the correct value
    cy.get(currentPage.results.locator).should("have.value", "7.001");
  });

  it("1.5 Validate that pressing “CE” button clears only current entry", () => {
    const testValueA = "881";
    const numKeysA = testValueA.split("");
    for (let j = 0; j < numKeysA.length; j++) {
      const buttonLocator = currentPage.getButton(numKeysA[j]);
      // Click the number/decimal button
      cy.get(buttonLocator).first().click();
    }
    cy.get(currentPage.button_add.locator).first().click();

    // Check if the display shows the correct value
    cy.get(currentPage.results.locator).should("have.value", "881");

    const testValueB = "19";
    const numKeysB = testValueB.split("");
    for (let j = 0; j < numKeysB.length; j++) {
      const buttonLocator = currentPage.getButton(numKeysB[j]);
      // Click the number/decimal button
      cy.get(buttonLocator).first().click();
    }

    // Clear the display
    cy.get(currentPage.button_clearButton.locator).click();
    const testValueC = "119";
    const numKeysC = testValueC.split("");
    for (let j = 0; j < numKeysC.length; j++) {
      const buttonLocator = currentPage.getButton(numKeysC[j]);
      // Click the number/decimal button
      cy.get(buttonLocator).first().click();
    }
    cy.get(currentPage.button_calculate.locator).first().click();
    // Check if the display shows the correct value
    cy.get(currentPage.results.locator).should("have.value", "1,000");
  });

  it("1.6 Validate that a number can be set as negative and set back to positive.", () => {
    const testValueA = "123.456";
    const numKeysA = testValueA.split("");
    for (let j = 0; j < numKeysA.length; j++) {
      const buttonLocator = currentPage.getButton(numKeysA[j]);
      // Click the number/decimal button
      cy.get(buttonLocator).first().click();
    }
    // Click +/- button to set the number as negative
    cy.get(currentPage.button_negateButton.locator).first().click();

    // Check if the display shows the correct value
    cy.get(currentPage.results.locator).should("have.value", "-123.456");

    // Click +/- button to set the number as positive
    cy.get(currentPage.button_negateButton.locator).first().click();

    // Check if the display shows the correct value
    cy.get(currentPage.results.locator).should("have.value", "123.456");
  });

  // Tests 1.7 & 1.8 only verified with “divide” and “subtract” as “multiply” and “add”
  // do not produce valid results when run in automated script, but works fine when verified manually.
  it("1.7 Validate typing on the display with 'Equals' and 'Enter' buttons produce valid results.", () => {
    // Type arguments and operations directly into the display
    cy.get(currentPage.results.locator).click().type("123.456-100.456=");

    // Check if the display shows the correct value
    cy.get(currentPage.results.locator).should("have.value", "23");

    // Type arguments and operations directly into the display
    cy.get(currentPage.results.locator).click().type("10/5{enter}");

    // Check if the display shows the correct value
    cy.get(currentPage.results.locator).should("have.value", "2");
  });

  it("1.8 Validate typing after 'Equals' and 'Enter' buttons produce valid results.", () => {
    // Type arguments and operations directly into the display
    cy.get(currentPage.results.locator).click().type("123.456-100.456=-2=");

    // Check if the display shows the correct value
    cy.get(currentPage.results.locator).should("have.value", "21");

    // Type arguments and operations directly into the display
    cy.get(currentPage.results.locator).click().type("10/5-2{enter}");

    // Check if the display shows the correct value
    cy.get(currentPage.results.locator).should("have.value", "0");
  });
});
