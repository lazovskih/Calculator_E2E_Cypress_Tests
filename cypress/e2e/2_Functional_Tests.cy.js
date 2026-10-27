import { CalculatorPage } from "../PageObjects/CalculatorPage.js";
import TestData from "../fixtures/TestData_short_memory.json";

const currentPage = new CalculatorPage();

beforeEach(() => {
  cy.env(["baseUrl"]).then(({ baseUrl }) => {
    cy.visit(baseUrl);
  });
});

context("2.	Simple math operation tests", () => {
  // Iterate through all sets in TestData
  for (let n = 0; n < TestData.length; n++) {
    const operation = TestData[n].suboperation;
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
          for (let arg of args) {
            currentPage.clickButtons(arg);
          }

          // Verify the result on the display
          cy.get(currentPage.display.locator)
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
