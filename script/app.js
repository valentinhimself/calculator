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

const buttons = document.querySelectorAll ('button');
buttons.forEach(button => button.addEventListener('click', pressKey));
display = document.querySelector('#current-operation');
let operator = '';
let currentNumber = '';

function pressKey () {
    passValue(this.value);
}

function passValue(input) {
    this.value = input;
    if (!operator) { addNumber (input) };

    function addNumber (input) {
        let numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
        transformDecimal(input);
        if (currentNumber.includes('.') && input === '.') {
            //do nothing
        }
        else if (numbers.includes(input) && !operator) {currentNumber += input;} 
        display.innerText = currentNumber;
    }

    function transformDecimal(input) {
        if (input === '.' && display.innerText === '' ) {
            currentNumber = '0.';
            display.innerText = currentNumber;
        }
    }
};



