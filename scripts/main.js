let num1 = "";
let num2 = "";
let activeNum = "";
let onFirstNum = true;
let displayNum = 0;

function clear() {
    num1 = "";
    num2 = "";
    activeNum = "";
    onFirstNum = true;
    updateDisplay();
}

const numPad = document.querySelector(".num-pad");

// MAIN LOGIC START
createNumPad();

const numBtns = document.querySelectorAll(".btn-num");
numBtns.forEach(btn => btn.addEventListener("click", (e) => updateActiveNum(e.target.value)));

const oneStepBtns = document.querySelectorAll(".btn-one-step");
oneStepBtns.forEach(btn => btn.addEventListener("click", (e) => tester(e.target.value)));


// MAIN LOGIC END

// FUNCTIONS START
// add listeners to buttons that first store a string of
// numbers, then a word/symbol is stored for the operator, then
// another string of numbers, then the next operator calculates
// maybe with a function that runs every time any operator is called
// and num2 is not undefined? then set num1 = result and num2 to ""
// and then the equals operator just always spits out result

function updateActiveNum(newDigit){
    if (+newDigit > 0) {
        activeNum += newDigit;
    } else if (newDigit === "0" && activeNum.length > 0) {
        activeNum += newDigit;
    } else if (newDigit === "." && activeNum.indexOf(".") === -1) {
        activeNum += newDigit;
    } else if (newDigit === "<" && activeNum.length >= 1) {
        activeNum = activeNum.slice(0, activeNum.length - 1);
    }
    updateDisplay();
    console.log(activeNum);
    let tester = "0";
    if (+tester) {
        console.log(true);
    } else {
        console.log(false);
    }
}

function tester(input) {
    if (input === "c") {
        clear();
    }
}

const display = document.querySelector(".screen-text");
function updateDisplay() {
    if (activeNum) {
        display.textContent = activeNum;
    } else {
        display.textContent = 0;
    }
}

// ugh this prob will make more sense to pass nums as parameters
function add() {return num1 + num2;}
function subtract() {return num1 - num2;}
function multiply() {return num1 * num2;}
function divide() {return num1 / num2;}

function invert() {return num1 * -1;}
function percent() {return num1 / 100;}
function power() {return num1 ** num2;}
function factorial(num) {
    if (num > 1) {
        return num * factorial(num - 1);
    } else {
        return 1;
    }
}
//function clear()
//function delete()
//function equals()

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