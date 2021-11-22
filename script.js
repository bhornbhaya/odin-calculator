"use strict";
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    //allow user to add only single period
    if (number === "." && this.currentOperand.includes(".")) return;
    //append the numbers
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    //if the operand is clicked, stop the program
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "x":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    //add comma to number
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    //this.previousOperandTextElement.innerText = this.previousOperand;
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButtons = document.querySelector("[data-equals]");
const deleteButtons = document.querySelector("[data-delete]");
const allClearButtons = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButtons.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButtons.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButtons.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});

const toggleSwitch = document.getElementsByClassName(
  "calc__header__red-btn"
)[0];

const bgEl = document.body;
const headerEl = document.querySelector(".calc__header");
const screenEl = document.querySelector(".calc__screen");
const outerBoxEl = document.querySelector(".calc__outer-box");
const calcBoxEl = document.querySelector(".calc__box");
const btnContainer = document.querySelector(".calc__header__btn-container");
const btnsNum = document.querySelectorAll(".calc__box__button__num");
const deleteBtn = document.querySelector(".calc__box__button__del");
const resetBtn = document.querySelector(".calc__box__button__reset");
const equalBtn = document.querySelector(".calc__box__button__equal");

const changeToDefault = function () {
  toggleSwitch.classList.add("move-right-1");
  toggleSwitch.classList.remove("move-right-2");
  toggleSwitch.classList.remove("move-right-3");

  enableDefaultTheme();
};

const changeToLight = function () {
  toggleSwitch.classList.add("move-right-2");
  toggleSwitch.classList.remove("move-right-1");
  toggleSwitch.classList.remove("move-right-3");

  enableLightTheme();
};

const changeToPurple = function () {
  toggleSwitch.classList.add("move-right-3");
  toggleSwitch.classList.remove("move-right-1");
  toggleSwitch.classList.remove("move-right-2");

  enablePurpleTheme();
};

const enableDefaultTheme = function () {
  removeLightTheme();
  removePurpleTheme();

  for (let i = 0; i < btnsNum.length; i++) {
    btnsNum[i].classList.remove("num--light");
  }
};

const enableLightTheme = function () {
  removePurpleTheme();

  bgEl.classList.add("light-mode");
  headerEl.classList.add("light-mode");
  screenEl.classList.add("screen--light");
  outerBoxEl.classList.add("outer-box--light");
  calcBoxEl.classList.add("box--light");
  btnContainer.classList.add("btn-container--light");
  toggleSwitch.classList.add("btn--orange");

  deleteBtn.classList.add("del--light");
  resetBtn.classList.add("reset--light");
  equalBtn.classList.add("equal--light");

  for (let i = 0; i < btnsNum.length; i++) {
    btnsNum[i].classList.add("num--light");
  }
};

const enablePurpleTheme = function () {
  removeLightTheme();
  bgEl.classList.add("purple-mode");
  headerEl.classList.add("header--purple");
  btnContainer.classList.add("btn-container--purple");
  screenEl.classList.add("screen--purple");
  toggleSwitch.classList.add("blue--btn");
  outerBoxEl.classList.add("out-box--purple");
  calcBoxEl.classList.add("box--purple");

  deleteBtn.classList.add("del--purple");
  resetBtn.classList.add("reset--purple");
  equalBtn.classList.add("equal--purple");

  for (let i = 0; i < btnsNum.length; i++) {
    btnsNum[i].classList.add("num--purple");
  }
};

const removeLightTheme = function () {
  bgEl.classList.remove("light-mode");
  headerEl.classList.remove("light-mode");
  screenEl.classList.remove("screen--light");
  outerBoxEl.classList.remove("outer-box--light");
  calcBoxEl.classList.remove("box--light");
  btnContainer.classList.remove("btn-container--light");

  deleteBtn.classList.remove("del--light");
  resetBtn.classList.remove("reset--light");
  equalBtn.classList.remove("equal--light");
};

const removePurpleTheme = function () {
  bgEl.classList.remove("purple-mode");
  headerEl.classList.remove("header--purple");
  btnContainer.classList.remove("btn-container--purple");
  screenEl.classList.remove("screen--purple");
  toggleSwitch.classList.remove("blue--btn");
  outerBoxEl.classList.remove("out-box--purple");
  calcBoxEl.classList.remove("box--purple");

  deleteBtn.classList.remove("del--purple");
  resetBtn.classList.remove("reset--purple");
  equalBtn.classList.remove("equal--purple");

  for (let i = 0; i < btnsNum.length; i++) {
    btnsNum[i].classList.remove("num--purple");
  }
};
