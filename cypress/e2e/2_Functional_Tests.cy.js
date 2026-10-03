import { CalculatorPage } from "../PageObjects/CalculatorPage.js";
import TestData from "../fixtures/TestData.json";

const currentPage = new CalculatorPage();

beforeEach(() => {
  cy.env(["baseUrl"]).then(({ baseUrl }) => {
    cy.visit(baseUrl);
  });
});

context("2.	Functional Tests", () => {
  // Iterate through all sets in TestData
  for (let n = 0; n < TestData.length; n++) {
    const operation = TestData[n].operation;
    const dataValues = TestData[n].dataValues;

    describe(`2.${n + 1} Verify "${operation}" operation ${dataValues} values.`, () => {
      // Iterate through all test cases in the test set
      const testCases = TestData[n].testCases;

      for (let test = 0; test < testCases.length; test++) {
        // Get the args from the test set
        const args = testCases[test].args;
        const expectedResult = testCases[test].result;
        it.only(`2.${n + 1}.${test + 1} Validate correct results of "${operation}" ${dataValues} values.`, () => {
          // Iterate through all args in set
          for (let i = 0; i < args.length; i++) {
            // Check if number is negative add "!" sign at the end as indicator to press the negate button at the end
            if (args[i].includes("-")) {
              args[i] = args[i].replace("-", "") + "!";
            }
            currentPage.clickButtons(args[i]);
          }

          // Click the "equal" button
          cy.get(currentPage.button_calculate.locator).click();

          // Verify the result on the display
          cy.get(currentPage.results.locator)
            .invoke("val")
            .then((actualResult) => {
              // Confirm actual result is equal to expected result
              expect(expectedResult, "Confirmed actual result is equal to expected result").to.equal(actualResult);
            });
        });
      }
    });
  }
});
