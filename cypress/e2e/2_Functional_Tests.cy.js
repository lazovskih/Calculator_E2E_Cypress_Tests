import { calculatorPage } from "../PageObjects/calculatorPage.js";
import { testDataSets } from "../fixtures/testData.js";
const currentPage = new calculatorPage();

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
          it(`2.${setIndex + 1}.${groupIndex + 1}.${testIndex + 1} Validate results of "${group.suboperation}" ${group.dataValues} values.`, () => {
            // Click sequence of buttons for this test case
            for (const arg of testCase.args) {
              currentPage.clickButtons(arg);
            }

            // Verify the result on the display
            cy.get(currentPage.display.locator)
              .invoke("val")
              .then((actualResult) => {
                expect(actualResult, "Confirmed actual result is valid").to.equal(testCase.result);
              });
          });
        });
      });
    });
  });
});
