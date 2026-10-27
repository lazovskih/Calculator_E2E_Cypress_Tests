import { CalculatorPage } from "../PageObjects/CalculatorPage.js";
import TestSet_01 from "../fixtures/TestData/01_addition.json";
import TestSet_02 from "../fixtures/TestData/02_subtraction.json";
import TestSet_03 from "../fixtures/TestData/03_multiplication.json";
import TestSet_04 from "../fixtures/TestData/04_division.json";
import TestSet_05 from "../fixtures/TestData/05_divide0.json";
import TestSet_06 from "../fixtures/TestData/06_cumulative.json";
import TestSet_07 from "../fixtures/TestData/07_squareroot.json";
import TestSet_08 from "../fixtures/TestData/08_pow2.json";
import TestSet_09 from "../fixtures/TestData/09_percent.json";
import TestSet_10 from "../fixtures/TestData/10_rounding.json";
import TestSet_11 from "../fixtures/TestData/11_memory.json";

const currentPage = new CalculatorPage();

beforeEach(() => {
  cy.env(["baseUrl"]).then(({ baseUrl }) => {
    cy.visit(baseUrl);
  });
});
// Iterate through all sets in TestData
for (let i = 0; i < 10; i++) {
  const operation = TestData[i].operation;

  context(operation, () => {
    for (let j = 0; j < TestData.length; j++) {
      const operation = TestData[j].suboperation;
      const dataValues = TestData[j].dataValues;

      describe(`2.${j + 1} Verify "${operation}" operation ${dataValues} values.`, () => {
        // Iterate through all test cases in the test set
        const testCases = TestData[j].testCases;

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
}
