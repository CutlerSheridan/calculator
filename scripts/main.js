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
    if ((+newDigit > 0) ||
        (newDigit === "0" && activeNum.length > 0) ||
        (newDigit === "." && (activeNum.indexOf(".") === -1 || lastInputWasEquals))) {
        if (lastInputWasEquals) {
            clear();
        }
        activeNum += newDigit;
    } else if (newDigit === "<") {
        if (lastInputWasEquals) {
            console.log("If (lastInputWasEquals) start");
            console.log(`original num1, activeNum, num2: ${num1}, ${activeNum}, ${num2}`);
            activeNum = num1.toString();
            console.log(`new num1, activeNum, num2: ${num1}, ${activeNum}, ${num2}`);
            //lastInputWasEquals = false;
            console.log(`activeNum length: ${activeNum.length}`);
            console.log("if (lastinputwasequals) end");
        }
        if (activeNum.length >= 1) {
            activeNum = activeNum.slice(0, activeNum.length - 1);
            console.log(`sliced activeNum: ${activeNum}`);
            if (lastInputWasEquals) {
                num1 = activeNum;
            }
        }
    }
    updateDisplay();
    console.log(`final num1, activeNum, num2: ${num1}, ${activeNum}, ${num2}`);
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
    console.log(`activeNum length at start of updateDisplay() = ${activeNum.length}`);
    if (activeNum.indexOf(".") != -1) {
        while (activeNum.lastIndexOf("0") === activeNum.length - 1 && lastInputWasEquals) {
            activeNum = activeNum.slice(0, activeNum.length - 2);
        }
        if (activeNum.length > 12) {
            activeNum = Number(activeNum).toFixed(activeNum.length - activeNum.indexOf(".") - 2).toString();
        }
    }
    console.log(`activeNum length right before if = ${activeNum.length}`);
    if (activeNum.length > 12) {
        console.log(`lastInputWasEquals = ${lastInputWasEquals}`);
        if (lastInputWasEquals) {
            activeNum = "Result too long";
            console.log("if is caught");
        } else {
            activeNum = activeNum.slice(0, activeNum.length - 1);
            console.log("else is caught");
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
    console.log(`adjusted add equals: ${activeNum}`);
}
function add() {activeNum =  +num1 + +num2; console.log(`add equals: ${activeNum};`)}
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