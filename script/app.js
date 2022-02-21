    //TO DO: add keyboard functionality 
    
//initiateCalculator ();

 //   function initiateCalculator () {
    const clear = document.querySelector ('#clear')
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
    