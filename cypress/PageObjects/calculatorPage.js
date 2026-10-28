import { buttons } from "./buttons";
export class calculatorPage {
  constructor() {
    // Generate number buttons dynamically as object properties
    for (let i = 0; i < buttons.length; i += 2) {
      this[`button_${buttons[i]}`] = {
        name: buttons[i],
        locator: `input[name="${buttons[i]}"]`,
        value: buttons[i + 1],
      };
    }
  }
  display = {
    locator: "input[name='display']",
    value: " ",
  };
  /**
   * Returns the locator for a button based on its name or value.
   * @param {string} buttonValue - The name or value of the button to get the locator for.
   * @returns {string} - The locator string for the button.
   */
  getButton(buttonValue) {
    buttonValue = buttonValue == "!" ? "+/-" : buttonValue;
    return Object.values(this).find((prop) => prop.value === buttonValue)?.locator;
  }
  /**
   * Clicks the buttons on the calculator based on the provided string.
   * @param {string} buttons - string with button values
   */
  clickButtons(buttons) {
    const locators = [];
    // let addNegateButton = false;
    buttons = buttons.trim().replace(" ", "");

    const isNumber = Number(buttons.replaceAll(",", "").replace("!", ""));
    const isSpecial = isNaN(isNumber);

    if (buttons.includes("-") && !isNaN(isNumber)) {
      buttons = buttons.replace("-", "") + "!";
    }

    if (isSpecial) {
      // Handle non-number buttons
      const locator = this.getButton(buttons);
      locators.push(locator);
    }

    if (!isNaN(isNumber)) {
      // Handle number buttons
      const buttonsArr = buttons.replaceAll(",", "").split("");
      for (const button of buttonsArr) {
        const locator = this.getButton(button);
        locators.push(locator);
      }
    }

    cy.wrap(locators).each((locator) => {
      cy.get(locator).first().click();
    });
  }
}
