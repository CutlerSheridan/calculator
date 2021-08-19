let num1 = "";
let num2 = "";
let activeNum = "";
let twoStepOperator = "";
let lastInputWasEquals = false;

function clear() {
    num1 = "";
    num2 = "";
    activeNum = "";
    twoStepOperator = "";
    lastInputWasEquals = false;
    updateDisplay();
}

const numPad = document.querySelector(".num-pad");

// MAIN LOGIC START
createNumPad();

const numBtns = document.querySelectorAll(".btn-num");
numBtns.forEach(btn => btn.addEventListener("click", (e) => updateActiveNum(e.target.value)));

const oneStepBtns = document.querySelectorAll(".btn-one-step");
oneStepBtns.forEach(btn => btn.addEventListener("click", (e) => operateOneStepButton(e.target.value)));

const twoStepBtns = document.querySelectorAll(".btn-two-step");
twoStepBtns.forEach(btn => btn.addEventListener("click", (e) => operateTwoStepButton(e.target.value)));

// MAIN LOGIC END

// FUNCTIONS START
function updateActiveNum(newDigit){
    if (+newDigit > 0) {
        activeNum += newDigit;
    } else if (newDigit === "0" && activeNum.length > 0) {
        activeNum += newDigit;
    } else if (newDigit === "." && activeNum.indexOf(".") === -1) {
        activeNum += newDigit;
    } else if (newDigit === "<" && activeNum.length >= 1) {
        /*if (lastInputWasEquals) {
            activeNum = num1;
        }*/
        activeNum = activeNum.slice(0, activeNum.length - 1);
    }
    updateDisplay();
    console.log();
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
        //num1 = activeNum;
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
            add();
            break;
        case "-":
            subtract();
            break;
        case "*":
            multiply();
            break;
        case "/":
            divide();
            break;
        case "^":
            power();
            break;
    }
    updateDisplay();
    if (arguments[1] === "=") {
        num1 = activeNum;
        activeNum = num2;
        lastInputWasEquals = true;
        return;
    }
    num1 = activeNum;
    num2 = "";
}

const display = document.querySelector(".screen-text");
function updateDisplay() {
    if (activeNum) {
        display.textContent = activeNum;
    } else {
        display.textContent = 0;
    }
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
    const deleteBtn = createButton("<--", "<", ["calc-btn", "btn-num"]);
    const decimalBtn = createButton(".", ["calc-btn", "btn-num"]);
    numPadFragment.childNodes[8].after(decimalBtn);
    numPadFragment.childNodes[8].after(deleteBtn);
    numPad.appendChild(numPadFragment);
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