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
display.innerText = '0';

let operator = '';
let currentNumber = ''; // used as temporary variable
let firstNumber = '';
let secondNumber = '';
let allowedChars = ['1','2','3','4','5','6','7','8','9','0','.','=','+','-','*','/'];

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

    if (e.key === undefined) {
        passValue(this.value);
    }
    else {
        if (isValidInput (e)) passValue (e.key); 
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
        if (!alreadyHasDecimal(input)) { 
            currentNumber += input;
            transformDecimal(input); // if the first character is ".", then add "0" in front of it.
            display.innerText = currentNumber;
        } 
    }

    function addNumber2 (input) {
        if (!alreadyHasDecimal(input)) {
            secondNumber += input;
            currentNumber = secondNumber;
            display.innerText = currentNumber;
        }
    }

    function alreadyHasDecimal (input) {
        //check if decimal point already exists in the currentNumber and do not add any more if so
        if (currentNumber.includes('.') && input === '.') {
            return true;
        } 
    }

    function addOperator (input) {
//        const operators = ['/', '*', '+', '-'];
//        if (operators.includes(input)) {
//        }
        if (!currentNumber) {currentNumber = '0'}
            operator = input;
            firstNumber = currentNumber;
            topDisplay.innerText = firstNumber + operator;

    }

    function transformDecimal(input) {
        if (input === '.' && display.innerText === '0' ) {
            currentNumber = '0.';
            display.innerText = currentNumber;
        }
    }
};


/*     const clear = document.querySelector ('#clear')
    const deletion = document.querySelector ('#delete')
    const numbers = document.querySelectorAll ('.num');
    const operators = document.querySelectorAll ('.operator');
    const equality = document.querySelector ('.equality');
    let mainDisplay = document.querySelector("#current-operation");
    let topDisplay = document.querySelector("#last-operation");

    let firstNumber = '';
    let secondNumber = '';
    let operator = '';
    let result = 0;
    let temp = 0;
    mainDisplay.innerText = 0;


    clear.addEventListener ('click', clearAll);
    numbers.forEach(number => number.addEventListener('click', setNumbers));
    operators.forEach(operator => operator.addEventListener('click', selectOperator));
    equality.addEventListener('click', operate);
    deletion.addEventListener ('click', deleteNumber);
 
 //   window.addEventListener ('keydown', enableKeyboard); 
 //
 //   function enableKeyboard(e) {
 //       if (e.key >= 0 && e.key <= 9) console.log(e.key)
 //   }

    function deleteNumber () {
        mainDisplay.innerText.length == 1 ? mainDisplay.innerText = 0 
        : mainDisplay.innerText = mainDisplay.innerText.slice(0,-1);
        updateOnDeletion ();
    }

    function updateOnDeletion () {
        if (topDisplay.innerText.includes(`${operator}`)) {
            secondNumber.length <= 1 ? secondNumber = '' : secondNumber = secondNumber.slice(0,-1)
        }
    }

    function clearAll () {
        firstNumber = '';
        secondNumber = '';
        operator = '';
        result = 0;
        topDisplay.innerText = '';
        mainDisplay.innerText = 0;
    }

    function setNumbers (e) {
        fixVariables () // for 2nd and subsequent operations;
        if (allowOnePoint(e)) {
            //do nothing
        }
        else {
            !firstNumber ? setFirstNumber(e) : setSecondNumber(e);
        }

    }
    function setFirstNumber(e) {
        if (mainDisplay.innerText.length <= 9) {
            mainDisplay.innerText == '0' ? mainDisplay.innerText = e.target.value : mainDisplay.innerText += e.target.value;
        }
    }

    function selectOperator (e) {
        if (topDisplay.innerText.includes("=")) {
            resetSecondNumber();
        }
        convertInvalidNumbers ();

        if (secondNumber == '') {
            firstNumber = mainDisplay.innerText;
            operator = e.target.value;
            topDisplay.innerText = mainDisplay.innerText + e.target.value;
        }
        else {
            operate(); //performs calculation when an operator is selected a second time
            selectOperator (e); // reassigns secondNumber that is otherwise is reset on equality
            };
    }

    function setSecondNumber(e) {
        if (secondNumber.length <= 9) {
            !secondNumber ? secondNumber = e.target.value : secondNumber += e.target.value;
            mainDisplay.innerText = secondNumber;
        }
    }
    function operate() {
        if (secondNumber != "") {
            switch (operator) {
                 case "+":
                     result = parseFloat (firstNumber) + parseFloat(secondNumber);
                     break;
                 case "-":
                     result = firstNumber - secondNumber;
                     break
                 case "*":
                     result =  firstNumber * secondNumber;
                     break;
                 case "/":
                     result =  firstNumber / secondNumber;
                     break;
            }
        result = parseFloat(parseFloat(result).toFixed(8)); // first parseFloat to remove trailing zeroes
        equalDisplay();
        }
    }

    function operateOnSecondEquality() {
        if (secondNumber != "") {
            switch (operator) {
                 case "+":
                     result = parseFloat (firstNumber) + parseFloat(secondNumber);
                     break;
                 case "-":
                     result = firstNumber - secondNumber;
                     break
                 case "*":
                     result =  firstNumber * secondNumber;
                     break;
                 case "/":
                     result =  firstNumber / secondNumber;
                     break;
            }
            result = parseFloat(parseFloat(result).toFixed(8)); // first parseFloat to remove trailing zeroes
            clearAtEpsilon();
        }
    }

    function equalDisplay() {
        if (!topDisplay.innerText.includes("=")) {
            topDisplay.innerText += `${secondNumber}=`;
            mainDisplay.innerText = result;    
        }
        else {
            temp = result;
            firstNumber = temp;
            topDisplay.innerText = `${firstNumber}${operator}${secondNumber}=`;
            operateOnSecondEquality();
            mainDisplay.innerText = result; 
        }
    }

    function resetSecondNumber() {
        secondNumber = '';
    }

    function fixVariables () {
        if (topDisplay.innerText.includes("=")) {
            clearAll (); 
        }
    }

    function allowOnePoint (e) {
        return mainDisplay.innerText.includes('.') && e.target.value == '.'
    }

    function convertInvalidNumbers () {
        let validNumber = (mainDisplay.innerText == '.') ? false : true;
        if (!validNumber) {mainDisplay.innerText = 0;}
    }

    function clearAtEpsilon() {
        let epsilon = 0.00000001;
        if (mainDisplay.innerText <= epsilon) {
            clearAll ();
            }
    }
    */