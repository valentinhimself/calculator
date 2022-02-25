function operate (operator, num1, num2) {

    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    switch (operator) {
        case "+": 
            return add(num1, num2);
        case "-": 
            return subtract(num1, num2);
        case "*": 
            return multiply(num1, num2);
        case "/": 
            return divide(num1, num2);      
    }

    function add(num1, num2) {
        return num1 + num2;
    }

    function subtract(num1, num2) {
        return num1 - num2;
    }

    function multiply(num1, num2) {
        return num1 * num2;
    }

    function divide(num1, num2) {
        return num1/num2;
    }
}

const numbers = document.querySelectorAll ('.num');
const operators = document.querySelectorAll ('.operator');
const display = document.querySelector('#current-operation');
const topDisplay = document.querySelector ('#last-operation');
numbers.forEach(number => number.addEventListener('click', pressKey));
operators.forEach(operator => operator.addEventListener('click', pressKey))

let operator = '';
let currentNumber = '';
let firstNumber = '';
let secondNumber = '';

function pressKey () {
    //let numbers = ['1','2','3','4','5','6','7','8','9','0','.'];
    if (this.value)
    passValue(this.value);
}

function passValue(input) {
    this.value = input;
    addOperator (input);
    if (!operator) { addNumber (input) };

    function addNumber (input) {
        transformDecimal(input);
        if (currentNumber.includes('.') && input === '.') {//do nothing
    }
        else if (!operator) {currentNumber += input;} 
        display.innerText = currentNumber;
    }

    function addOperator (input) {
        const operators = ['/', '*', '+', '-'];
        firstNumber = currentNumber;
        //currentNumber = '';
        if (operators.includes(input)) {
            operator = input;
            topDisplay.innerText = firstNumber + operator;
        }
    }

    function transformDecimal(input) {
        if (input === '.' && display.innerText === '' ) {
            currentNumber = '0.';
            display.innerText = currentNumber;
        }
    }
};
