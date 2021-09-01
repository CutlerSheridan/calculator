let num1 = "";
let num2 = "";
let activeNum = "";
let twoStepOperator = "";
let lastInputWasEquals = false;
let darkModeIsOn = false;

function clear() {
    num1 = "";
    num2 = "";
    activeNum = "";
    twoStepOperator = "";
    lastInputWasEquals = false;
    updateDisplay();
}
const numPad = document.querySelector(".num-pad");

// SETUP LOGIC START
createNumPad();

const btns = document.querySelectorAll("button");
btns.forEach(btn => btn.addEventListener("click", useCalc));
document.addEventListener("keydown", useCalc);
// SETUP LOGIC END

// FUNCTIONS START
function useCalc(input) {
    let inputClasses;
    let inputValue;
    console.log(input);
    if (input.type === "keydown") {
        let pressedBtn;
        if (input.key === "Enter") {
            input.preventDefault();
            pressedBtn = document.querySelector('button[value="="]');
        } else if (input.key === "Backspace") {
            pressedBtn = document.querySelector('button[value="<"]');
        } else {
            pressedBtn = document.querySelector(`button[value="${input.key}"]`);
        }
        inputClasses = pressedBtn.classList;
        inputValue = pressedBtn.value;
    } else {
        inputClasses = input.target.classList;
        inputValue = input.target.value;
    }
    switch (true) {
        case inputClasses.contains("btn-num"):
            updateActiveNum(inputValue);
            break;
        case inputClasses.contains("btn-one-step"):
            operateOneStepButton(inputValue);
            break;
        case inputClasses.contains("btn-two-step"):
            operateTwoStepButton(inputValue);
            break;
    }
}
function updateActiveNum(newDigit){
    if ((+newDigit > 0) ||
        (newDigit === "0" && activeNum.length > 0) ||
        (newDigit === "." && (activeNum.indexOf(".") === -1 || lastInputWasEquals))) {
        if (lastInputWasEquals) {
            clear();
        }
        activeNum += newDigit;
    } else if (newDigit === "<") {
        if (lastInputWasEquals) {
            activeNum = num1.toString();
        }
        if (activeNum.length >= 1) {
            activeNum = activeNum.slice(0, activeNum.length - 1);
            if (lastInputWasEquals) {
                num1 = activeNum;
            }
        }
    }
    updateDisplay();
}
function operateTwoStepButton(input) {
    if (lastInputWasEquals) {
        twoStepOperator = "";
        activeNum = num1;
    }
    if (twoStepOperator) {
        num2 = activeNum;
        equals(twoStepOperator);
    }

    twoStepOperator = input;
    num1 = activeNum;
    activeNum = "";
    lastInputWasEquals = false;
}

function operateOneStepButton(input) {
    if (input === "%" || input === "+/-" || input === "!" || input === "rand") {
        if (lastInputWasEquals) {
            activeNum = num1;
            twoStepOperator = "";
        }
        equals(input);
        updateDisplay();
        num2 = activeNum;
        lastInputWasEquals = false;
        return;
    }
    if (twoStepOperator) {
        num2 = activeNum;
        equals(twoStepOperator, input);
    }
    
    if (input != "=") {
        equals(input);
    }
}

function equals(operator) {
    switch (operator) {
        case "c":
            clear();
            break;
        case "%":
            percent();
            return;
        case "+/-":
            invert();
            return;
        case "!":
            activeNum = factorial(activeNum);
            return;
        case "rand":
            random();
            return;
        case "+":
            improveAccuracy(add);
            break;
        case "-":
            improveAccuracy(subtract);
            break;
        case "*":
            improveAccuracy(multiply);
            break;
        case "/":
            improveAccuracy(divide);
            break;
        case "^":
            power();
            break;
    }
    if (arguments[1] === "=") {
        lastInputWasEquals = true;
        updateDisplay();
        num1 = activeNum;
        activeNum = num2;
        return;
    }
    updateDisplay();
    num1 = activeNum;
    num2 = "";
}

const display = document.querySelector(".screen-text");
function updateDisplay() {
    activeNum = activeNum.toString();
    if (activeNum.indexOf(".") != -1) {
        while (activeNum.lastIndexOf("0") === activeNum.length - 1 && lastInputWasEquals) {
            activeNum = activeNum.slice(0, activeNum.length - 2);
        }
        if (activeNum.length > 12) {
            activeNum = Number(activeNum).toFixed(activeNum.length - activeNum.indexOf(".") - 2).toString();
        }
    }
    if (activeNum.length > 12) {
        if (lastInputWasEquals) {
            activeNum = "Result too long";
        } else {
            activeNum = activeNum.slice(0, activeNum.length - 1);
        }
    }
    if (activeNum[0] === "0") {
        activeNum = activeNum.slice(1, activeNum.length);
    }

    if (!activeNum) {
        display.textContent = 0;
        return
    }
    if (activeNum === "Infinity") {
        activeNum = "Cannot divide by 0";
    }
    display.textContent = activeNum;
}

function improveAccuracy(func) {
    func(activeNum);
    const adjustor = 10 ** 9;
    activeNum = Math.round(activeNum * adjustor) / adjustor;
}
function add() {activeNum =  +num1 + +num2;}
function subtract() {activeNum = +num1 - +num2;}
function multiply() {activeNum = +num1 * +num2;}
function divide() {activeNum = +num1 / +num2;}

function invert() {activeNum = activeNum * -1;}
function percent() {activeNum = activeNum / 100;}
function power() {activeNum =  num1 ** num2;}
function factorial(num) {
    if (num > 1) {
        return num * factorial(num - 1);
    } else {
        return 1;
    }
}
function random() {
    activeNum = Math.round(Math.random() * 1000);
}

function createNumPad() {
    let numPadFragment = document.createDocumentFragment();
    for (let i = 9; i >= 0; i--) {
        const newNumBtn = createButton(`${i}`, ["calc-btn", "btn-num"]);
        numPadFragment.appendChild(newNumBtn);
    }
    const deleteBtn = createButton("<—", "<", ["calc-btn", "btn-num"]); // that first param uses an em-dash
    const decimalBtn = createButton(".", ["calc-btn", "btn-num"]);
    numPadFragment.childNodes[8].after(decimalBtn);
    numPadFragment.childNodes[8].after(deleteBtn);
    numPad.appendChild(numPadFragment);

    const buttonsContainer = document.querySelector(".buttons-container");
    const gapSize = getComputedStyle(document.querySelector(":root")).getPropertyValue("--grid-gap-size");
    buttonsContainer.style.gap = gapSize;
    numPad.style.gap = gapSize;
}

function createButton(btnName) {
    const newBtn = document.createElement("button");
    newBtn.textContent = btnName;
    if (arguments.length > 1 && typeof arguments[1] === "string") {
        newBtn.value = arguments[1];
    } else {
        newBtn.value = btnName;
    }
    const finalParam = arguments[arguments.length - 1];
    if (arguments.length > 1 && typeof finalParam != "string") {
        for (let i = 0; i < finalParam.length; i++) {
            newBtn.classList.add(finalParam[i]);
        }
    }
    return newBtn;
}
// FUNCTIONS END