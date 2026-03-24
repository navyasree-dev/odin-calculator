const display = document.getElementById('display');
let firstNumber = '';
let secondNumber = '';
let operator = '';
let resultDisplayed = false;

function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { 
    if (b === 0) { alert("Can't divide by 0!"); return 0; }
    return a / b; 
}

function operate(op, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch(op) {
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '*': return multiply(a, b);
        case '/': return divide(a, b);
    }
}

document.querySelectorAll('.digit').forEach(btn => {
    btn.addEventListener('click', () => {
        if(resultDisplayed) {
            display.textContent = '';
            firstNumber = '';
            secondNumber = '';
            operator = '';
            resultDisplayed = false;
        }
        display.textContent += btn.textContent;
    });
});

document.querySelector('.decimal').addEventListener('click', () => {
    if(!display.textContent.includes('.')) {
        display.textContent += '.';
    }
});

document.querySelectorAll('.operator').forEach(opBtn => {
    opBtn.addEventListener('click', () => {
        if(!firstNumber) {
            firstNumber = display.textContent;
            operator = opBtn.textContent;
            display.textContent = '';
        } else if(firstNumber && operator && display.textContent) {
            secondNumber = display.textContent;
            firstNumber = operate(operator, firstNumber, secondNumber);
            display.textContent = '';
            operator = opBtn.textContent;
        } else {
            operator = opBtn.textContent;
        }
    });
});

document.querySelector('.equals').addEventListener('click', () => {
    if(firstNumber && operator && display.textContent) {
        secondNumber = display.textContent;
        let result = operate(operator, firstNumber, secondNumber);
        display.textContent = Math.round(result * 1000) / 1000;
        resultDisplayed = true;
        firstNumber = display.textContent;
        operator = '';
    }
});

document.querySelector('.clear').addEventListener('click', () => {
    display.textContent = '';
    firstNumber = '';
    secondNumber = '';
    operator = '';
    resultDisplayed = false;
});

document.querySelector('.backspace').addEventListener('click', () => {
    display.textContent = display.textContent.slice(0, -1);
});
