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

let operator = '';
let currentNumber = ''; // used as temporary variable
let firstNumber = '';
let secondNumber = '';
let allowedChars = ['1','2','3','4','5','6','7','8','9','0','.','+','-','*','/','='];

const numbers = document.querySelectorAll ('.num');
const operators = document.querySelectorAll ('.operator');
const display = document.querySelector('#current-operation');
const topDisplay = document.querySelector ('#last-operation');
const clearBtn = document.querySelector ('#clear');
const backspace = document.querySelector ('#backspace');
const equality = document.querySelector ('.equality');
equality.addEventListener ('click', calculateOnEquality);
numbers.forEach(number => number.addEventListener('click', pressKey));
operators.forEach(operator => operator.addEventListener('click', pressKey));
window.addEventListener('keydown', pressKey); 
display.innerText = '0';

clearBtn.addEventListener('click', clearAll);
backspace.addEventListener('click', applyBackspace);

function clearAll () {
    firstNumber = '';
    secondNumber = '';
    currentNumber = '';
    operator = '';
    topDisplay.innerText = '';
    display.innerText = 0;
}

function resetOnBackspace () {
    /* reset on backspace after equality only*/
    if (topDisplay.innerText.includes("=")) {
        clearAll (); 
    }
}

function applyBackspace () {
    /*reset the app after equality;
    or remove the last character in the string if there is no equality;
    when the string is empty, show '0' */
    if (topDisplay.innerText.includes("=")) resetOnBackspace();
    else {
        currentNumber = currentNumber.toString().slice(0,-1);
        !currentNumber ? display.innerText = '0' : display.innerText = currentNumber;
        if (firstNumber && topDisplay.innerText.includes(operator)) {
            secondNumber = currentNumber;
        }
    }
}

function isValidInput (e) {
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

    if (e.key === undefined) passValue(this.value);
    
    else if (e.key == "Delete") clearAll();
    
    else if (e.key == "Backspace") applyBackspace ();

    else if (firstNumber && secondNumber && e.key === '=' || e.key === 'Enter') {
        if (e.key === 'Enter') e.preventDefault(); // prevent selecting the last clicked button on "enter"
        calculateOnEquality();
    }
    
    else {
        if (isValidInput (e)) passValue (e.key); 
    }
}

function passValue(input) {
    this.value = input;
    let numbers = ['1','2','3','4','5','6','7','8','9','0','.'];
    resetVariables (input);
    if (numbers.includes(input)) {
        !firstNumber ? addNumber1(input) : addNumber2(input);
    }
    else {addOperator (input)};

    function resetVariables (input='') {
        /* resets everything if a number is selected after equality without operators first */
        if (topDisplay.innerText.includes("=") && numbers.includes(input)) {
            clearAll (); 
        }
    }

    function addNumber1 (input) {
        if (!alreadyHasDecimal(input)) { 
            currentNumber += input;
            transformDecimal(input); // if the first character is ".", then add "0" in front of it.
            display.innerText = currentNumber;
        } 
    }

    function addNumber2 (input) {
        if (!alreadyHasDecimal(input)) {
            secondNumber == '0' ? secondNumber = input : secondNumber += input;
            currentNumber = secondNumber;
            display.innerText = currentNumber;
        }
    }

    function alreadyHasDecimal (input) {
        //check if decimal point already exists in the currentNumber and do not add any more if so
        if (currentNumber.toString().includes('.') && input === '.') {
            return true;
        } 
    }

    function addOperator (input) {
        defaultToZero ();
        const operators = ['/', '*', '+', '-']; 

        if (operators.toString().includes(input)) {
            if (!secondNumber) { //!secondNumber prevent reassigning operator and firstNumber when inputing secondNumber;
                operator = input;
                firstNumber = currentNumber;
                topDisplay.innerText = firstNumber + operator;
            }

            else if (topDisplay.innerText.includes('=')) {
                secondNumber = '';
                operator = input;
                topDisplay.innerText = `${currentNumber}${operator}`
            }

            else { // (else if secondNumber)
                calculateOnOperator(); 
                secondNumber = ''; // reset second number 
                operator = input;
                topDisplay.innerText = `${currentNumber}${operator}`                
            }
        }
    }

    function transformDecimal(input) {
        if (input === '.' && display.innerText === '0' ) {
            currentNumber = '0.';
            display.innerText = currentNumber;
        }
    }
};

    function defaultToZero () {
        if (!currentNumber) {currentNumber = '0'} //in case of hitting an operator before selecting the first number
    }

    function calculateOnOperator () {
        currentNumber = operate (operator, firstNumber, secondNumber);
        display.innerText = currentNumber;
        firstNumber=currentNumber;
    }

    function calculateOnEquality () {
        if (secondNumber) {
            currentNumber = operate (operator, firstNumber, secondNumber);
            topDisplay.innerText = `${firstNumber}${operator}${secondNumber}=`
            display.innerText = currentNumber;
            firstNumber=currentNumber;
        }
    }

//    TO DO: fix bug for futher calculations when the result is 0
//    TO DO: Rounding and limiting number of digits on the screen;
