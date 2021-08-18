let num1 = "0";
let num2 = "";

const numPad = document.querySelector(".num-pad");

// MAIN LOGIC START
let numPadFragment = document.createDocumentFragment();
for (let i = 9; i >= 0; i--) {
    const newNumBtn = document.createElement("button");
    newNumBtn.classList.add("calc-btn");
    newNumBtn.classList.add("btn-num");
    newNumBtn.value = i;
    newNumBtn.textContent = i;
    numPadFragment.appendChild(newNumBtn);
}
const deleteBtn = document.createElement("button");
deleteBtn.classList.add("calc-btn");
deleteBtn.textContent = "<--";
const decimalBtn = document.createElement("button");
decimalBtn.classList.add("calc-btn");
decimalBtn.textContent = ".";
numPadFragment.childNodes[8].after(decimalBtn);
numPadFragment.childNodes[8].after(deleteBtn);
numPad.appendChild(numPadFragment);

// MAIN LOGIC END

// FUNCTIONS START
// add listeners to buttons that first store a string of
// numbers, then a word/symbol is stored for the operator, then
// another string of numbers, then the next operator calculates
// maybe with a function that runs every time any operator is called
// and num2 is not undefined? then set num1 = result and num2 to ""
// and then the equals operator just always spits out result

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
// FUNCTIONS END