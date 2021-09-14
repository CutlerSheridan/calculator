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
const displayLength = 12;

// SETUP LOGIC START
createNumPad();

const btns = document.querySelectorAll("button");
btns.forEach(btn => btn.addEventListener("click", useCalc));
document.addEventListener("keydown", useCalc);
btns.forEach(btn => btn.addEventListener("touchstart", () => handleTouchUserStyle(btn)));
// release typed button without having to press another one
btns.forEach(btn => btn.addEventListener("transitionend", (e) => { removeKeyboardPress(e, btn); }));
// SETUP LOGIC END

// FUNCTIONS START
function useCalc(input) {
    handleTabUser(input);
    if (input.keyCode === 9) {
        return;
    }
    let inputClasses;
    let inputValue;
    btns.forEach(btn => btn.classList.remove("pressed-key"));

    if (input.type === "keydown") {
        let pressedBtn;
        switch (input.key) {
            case "Enter":
                input.preventDefault();
                pressedBtn = document.querySelector('button[value="="]');
                break;
            case "Backspace":
                pressedBtn = document.querySelector('button[value="<"]');
                break;
            case "r":
                pressedBtn = document.querySelector('button[value="rand"]');
                break;
            case "d":
                pressedBtn = document.querySelector('button[value="dark-mode"]');
                break;
            default:
                pressedBtn = document.querySelector(`button[value="${input.key}"]`);
                break;
        }
        if (!pressedBtn) {
            return;
        }
        pressedBtn.classList.add("pressed-key");
        inputClasses = pressedBtn.classList;
        inputValue = pressedBtn.value;
    } else {
        let pressedBtn;
        if (document.body.classList.contains("tab-user")) {
            pressedBtn = input.target;
        } else {
            pressedBtn = input.currentTarget;
        }
        inputClasses = pressedBtn.classList;
        inputValue = pressedBtn.value;
        if (inputClasses.contains("btn-two-step")) {
            pressedBtn.classList.add("pressed-key");
        }
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
        case inputClasses.contains("dark-mode-toggle"):
            toggleDarkMode();
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
        if (activeNum.length > displayLength) {
            activeNum = Number(activeNum).toFixed(activeNum.length - activeNum.indexOf(".") - 2).toString();
        }
    }
    if (activeNum.length > displayLength) {
        if (lastInputWasEquals) {
            activeNum = "Too long!";
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
    } else if (activeNum === "Infinity") {
        activeNum = "Can't ÷ by 0";
    } else if (activeNum === "NaN") {
        activeNum = "Not a number";
    }
    display.textContent = activeNum;
}
function removeKeyboardPress(e, pressedBtn) {
    if (!(pressedBtn.classList.contains("btn-two-step")) && e.propertyName === "box-shadow") { // playing around here for touch controls
        btns.forEach(btn => btn.classList.remove("pressed-key"));
    }
}
function handleTabUser(e) {
    if (e.type === "keydown" && e.keyCode === 9) {
        document.body.classList.add("tab-user");
    } else if (e.type === "click" || e.type === "touch") {
        document.body.classList.remove("tab-user");
    }
}

function toggleDarkMode() {
    const root = document.querySelector(":root");
    const rootStyle = getComputedStyle(root);
    const lightColors = { 
        background: "rgb(245,210,209)",
        primary: "rgb(54,42,42)",
        primaryLight: "rgb(180,150,150)"
    };
    const darkColors = {
        background: "rgb(54,42,42)",
        primary: "rgb(245,210,209)",
        primaryLight: "rgb(92,78,77)"
    };
    let colorsToUse;
    if (rootStyle.getPropertyValue("--clr-background") === lightColors.background) {
        colorsToUse = darkColors;//Object.assign({}, darkColors);
    } else {
        colorsToUse = Object.assign({}, lightColors);
    }
    root.style.setProperty("--clr-background", colorsToUse.background);
    root.style.setProperty("--clr-pri", colorsToUse.primary);
    root.style.setProperty("--clr-pri-light", colorsToUse.primaryLight);
}
function improveAccuracy(func) {
    func(activeNum);
    const adjustor = 10 ** (displayLength - 1);
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
    activeNum = Math.round(Math.random() * 200);
}
function createNumPad() {
    let numPadFragment = document.createDocumentFragment();
    for (let i = 9; i >= 0; i--) {
        const newNumBtn = createButton(`${i}`, ["calc-btn", "btn-num"]);
        numPadFragment.appendChild(newNumBtn);
    }
    const deleteBtn = createButton("←", "<", ["calc-btn", "btn-num"]);
    const decimalBtn = createButton(".", ["calc-btn", "btn-num"]);
    numPadFragment.childNodes[8].after(decimalBtn);
    numPadFragment.childNodes[8].after(deleteBtn);
    numPad.appendChild(numPadFragment);
    addGaps();
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
function addGaps() {
    const buttonsContainer = document.querySelector(".buttons-container");
    const gapSize = getComputedStyle(document.querySelector(":root")).getPropertyValue("--grid-gap-size");
    buttonsContainer.style.gap = gapSize;
    numPad.style.gap = gapSize;
}
// FUNCTIONS END