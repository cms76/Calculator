let operand1 = null; // Global variable to store the first operand
let lastOperator = "+"; // Global variable to store the last operator
let isResult = false; // Flag to check if the last operation was a result

function clearDisplay() {
    // Clears the display
    document.getElementById('display').value = '';
    operand1 = null; // Reset the first operand
}

function appendToDisplay(char) {
    const display = document.getElementById('display');
    if (char == '.')
    {
        if (display.value.includes('.')) {
            return; // Do not append if a dot already exists
        }
    }
    // if a new number is pressed after a result, reset the display
    if (isResult) {
        clearDisplay();
        isResult = false; // Reset the result flag
    }
    // Appends a character to the display, ensuring the value is no longer than 10 characters
    const operators = ['+', '-', ':', 'x'];
    if (operators.some(op => display.value.includes(op))) {
        // Save the value before the operator to operand1 and clear the display
        let newOperand = display.value.split(' ')[0];
        if (operand1 === null) {
            operand1 = newOperand; 
        }            
        display.value = '';
    }
    if (display.value.length < 10) {
        display.value += char;
    }
}

function doOperation(operator) {
    // reset the is Result flag
    isResult = false;
    // Handles operations (e.g., +, -, x, :)
    const display = document.getElementById('display');
    const operators = ['+', '-', ':', 'x'];
    if (!operators.some(op => display.value.includes(op))) {
        if (operand1 === null) {
            operand1 = display.value; // Store the first operand
        }
        else {
            operand1 = calculate(operand1, display.value, lastOperator);
        }
            
        display.value += ` ${operator} `;
        lastOperator = operator; // Store the last operator
    }
}

function calculateResult() {
    if (operand1 === null) {
        operand1 = 0; // Default to 0 if no operand is set        
    }
    let result = 0; // Initialize result
    //if the display contains an operator the result is already stored in operand1
    const operators = ['+', '-', ':', 'x'];
    if (operators.some(op => display.value.includes(op))) {
        result = operand1; // The result is already stored in operand1
    }
    else
    {
        const display = document.getElementById('display');
        let operand2 = display.value.split(' ')[0];
        result = calculate(operand1, operand2, lastOperator);
    }   

    result = result.toString().slice(0, 10); // Truncate the result to 10 characters
    display.value = result; // Display the truncated result
    operand1 = 0; // Reset operand1 - the result is stored in display
    lastOperator = "+"; // Reset the operator
    isResult = true; // Set the result flag
}

function calculate(operand1, operand2, operator) {
    // Performs the calculation based on the operator
    operand1 = parseFloat(operand1);
    operand2 = parseFloat(operand2);
    let result;

    switch (operator) {
        case '+':
            result = operand1 + operand2;
            break;
        case '-':
            result = operand1 - operand2;
            break;
        case 'x':
            result = operand1 * operand2;
            break;
        case ':':
            if (operand2 === 0) {
                alert("Cannot divide by zero");
                return;
            }
            result = operand1 / operand2;
            break;
        default:
            alert("Invalid operator");
            return;
    }

    return result;
}
