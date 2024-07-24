document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let currentInput = '';
    let currentOperator = '';
    let firstOperand = null;
    let waitingForSecondOperand = false;

    document.querySelectorAll('.key').forEach(key => {
        key.addEventListener('click', () => {
            handleInput(key.dataset.key);
        });
    });

    document.querySelectorAll('.operator').forEach(operator => {
        operator.addEventListener('click', () => {
            handleOperator(operator.dataset.key);
        });
    });

    document.querySelector('.clear').addEventListener('click', clearCalculator);

    document.querySelector('.calculate').addEventListener('click', calculate);

    function handleInput(key) {
        if (key === '.' && currentInput.includes('.')) return;
        if (currentInput === '0' && key !== '.') {
            currentInput = '';
        }
        currentInput += key;
        updateDisplay();
    }

    function handleOperator(operator) {
        const inputValue = parseFloat(currentInput);

        if (firstOperand === null) {
            firstOperand = inputValue;
        } else if (currentOperator) {
            const result = operate(firstOperand, inputValue, currentOperator);
            display.textContent = result;
            firstOperand = result;
        }

        currentOperator = operator;
        currentInput = '';
        waitingForSecondOperand = true;
    }

    function operate(a, b, operator) {
        switch (operator) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                return a / b;
            default:
                return b;
        }
    }

    function calculate() {
        const inputValue = parseFloat(currentInput);
        if (currentOperator && !waitingForSecondOperand) {
            const result = operate(firstOperand, inputValue, currentOperator);
            display.textContent = result;
            firstOperand = result;
            currentInput = '';
        }
        waitingForSecondOperand = false;
    }

    function clearCalculator() {
        display.textContent = '0';
        currentInput = '';
        currentOperator = '';
        firstOperand = null;
        waitingForSecondOperand = false;
    }

    function updateDisplay() {
        display.textContent = currentInput;
    }
});
