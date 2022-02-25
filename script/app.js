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
operators.forEach(operator => operator.addEventListener('click', pressKey));
window.addEventListener('keydown', pressKey); 

let operator = '';
let currentNumber = ''; // used as temporary variable
let firstNumber = '';
let secondNumber = '';
let allowedChars = ['1','2','3','4','5','6','7','8','9','0','.','=','+','-','*','/'];

function isValidKey (e) {
    /*the function checks if a key stroke is allowed within the calculator
    this is to avoid inappropriate inputs for this app
    returns true/false*/
    return allowedChars.includes(e.key);
}

function pressKey (e) {
    /*the functions reads the Number at click/keystroke
    if it is a mouseclick, then use value of the buttons pressed
    else if it is a key stroke, then return the value of the key pressed
    pass one of the above into the next function  */

    if (e.key === undefined) {
        passValue(this.value);
    }
    else {
        if (isValidKey (e)) passValue (e.key); 
    }
}

function passValue(input) {
    this.value = input;
    let numbers = ['1','2','3','4','5','6','7','8','9','0','.']
    if (numbers.includes(input)) {
        !firstNumber ? addNumber1(input) : addNumber2(input);
    }
    else {addOperator (input);}

    function addNumber1 (input) {
        if (!oneDecimal(input)) { //do nothing instead of adding more decimal points
            currentNumber += input;
            transformDecimal(input); // if the first character is ".", then add "0" in front of it.
            display.innerText = currentNumber;
        } 
    }

    function addNumber2 (input) {
        if (!oneDecimal(input)) {
            secondNumber += input;
            currentNumber = secondNumber;
            display.innerText = currentNumber;
        }
    }

    function oneDecimal (input) {
        //check if decimal point already exists in the currentNumber and do not add any more if so
        if (currentNumber.includes('.') && input === '.') {
            return true;
        } 
    }

    function addOperator (input) {
//        const operators = ['/', '*', '+', '-'];
//        if (operators.includes(input)) {
            operator = input;
            firstNumber = currentNumber;
            topDisplay.innerText = firstNumber + operator;
 //       }
    }

    function transformDecimal(input) {
        if (input === '.' && display.innerText === '' ) {
            currentNumber = '0.';
            display.innerText = currentNumber;
        }
    }
};
