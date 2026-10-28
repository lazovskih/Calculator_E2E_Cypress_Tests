import { CalculatorPage } from "../PageObjects/CalculatorPage.js";
import TestSet_01 from "../fixtures/TestData/01_addition.json";
import TestSet_02 from "../fixtures/TestData/02_subtract.json";
import TestSet_03 from "../fixtures/TestData/03_multiply.json";
import TestSet_04 from "../fixtures/TestData/04_division.json";
import TestSet_05 from "../fixtures/TestData/05_divide0.json";
import TestSet_06 from "../fixtures/TestData/06_cumulative.json";
import TestSet_07 from "../fixtures/TestData/07_squareroot.json";
import TestSet_08 from "../fixtures/TestData/08_pow2.json";
import TestSet_09 from "../fixtures/TestData/09_percent.json";
import TestSet_10 from "../fixtures/TestData/10_rounding.json";
import TestSet_11 from "../fixtures/TestData/11_memory.json";

const currentPage = new CalculatorPage();

const testDataSets = [
  TestSet_01,
  TestSet_02,
  TestSet_03,
  TestSet_04,
  TestSet_05,
  TestSet_06,
  TestSet_07,
  TestSet_08,
  TestSet_09,
  TestSet_10,
  TestSet_11,
];

beforeEach(() => {
  cy.env(["baseUrl"]).then(({ baseUrl }) => {
    cy.visit(baseUrl);
  });
});

// Iterate through each test file dataset
testDataSets.forEach((set, setIndex) => {
  context(`2.${setIndex + 1}. ${set.operation}`, () => {
    set.data.forEach((group, groupIndex) => {
      describe(`2.${setIndex + 1}.${groupIndex + 1} Verify "${group.suboperation}" operation ${group.dataValues} values.`, () => {
        group.testCases.forEach((testCase, testIndex) => {
          it(`2.${setIndex + 1}.${groupIndex + 1}.${testIndex + 1} Validate correct results of "${group.suboperation}" ${group.dataValues}.`, () => {
            // Click sequence of buttons for this test case
            for (const arg of testCase.args) {
              currentPage.clickButtons(arg);
            }

            // Verify the result on the display
            cy.get(currentPage.display.locator)
              .invoke("val")
              .then((actualResult) => {
                expect(actualResult, "Confirmed actual result is equal to expected result").to.equal(testCase.result);
              });
          });
        });
      });
    });
  });
});
