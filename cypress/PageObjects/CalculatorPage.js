export class CalculatorPage {
  constructor() {
    // Generate number buttons dynamically as object properties
    for (let i = 0; i < this.buttons.length; i += 2) {
      this[`button_${this.buttons[i]}`] = {
        name: this.buttons[i],
        locator: `input[name="${this.buttons[i]}"]`,
        value: this.buttons[i + 1],
      };
    }
  }
  
  buttons = [ "zeroButton", "0", "oneButton", "1", "twoButton", "2", "threeButton", "3", "fourButton", "4", "fiveButton", "5",
    "sixButton", "6", "sevenButton", "7", "eightButton", "8", "nineButton", "9", "decimalButton", ".", "addButton", "+", "subtractButton", "−",
    "multiplyButton", "×", "divideButton", "÷", "calculateButton", "=", "clearButton", "AC", "negateButton", "+/-",
    "squarerootButton", "√x", "percentButton", "%", "piButton", "π", "squareButton", "x²", "round2Button","R2", "round0Button", "R0",
    "memoryClearButton","MC", "memoryRecallButton", "MR", "memoryPlusButton", "M+", "memoryMinusButton", "M-", "clearButton", "CE"
  ];

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
    if (isNaN(Number(buttonValue))) {
      // Handle negative button
      buttonValue = buttonValue == "!" ? "+/-" : buttonValue;
    }
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

    const isNumber = Number(buttons.replaceAll(",","").replace("!",""));
    const isSpecial = isNaN(isNumber); // && buttons.length === 2;

if(buttons.includes("-") && !isNaN(isNumber)){
      buttons = buttons.replace("-", "") + "!";
    }

    if (isSpecial) {
      // Handle non-number buttons
      const locator = this.getButton(buttons);
      locators.push(locator);
      console.log('------ Special: ' + buttons + ' | locator: ' + locator); // TODO: remove
    } 

    if(!isNaN(isNumber)) {
      const buttonsArr = buttons.replaceAll(",", "").split("");
      for (const button of buttonsArr) {
        const locator = this.getButton(button);
        locators.push(locator);
        console.log('------ Number ' + button + ' | locator: ' + locator); // TODO: remove
      }
    }

    cy.wrap(locators).each((locator) => {
      cy.get(locator).first().click();
    });
  }
}