// script.js

document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.button');

    let currentInput = '';
    let previousInput = '';
    let operation = null;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (value === 'C') {
                currentInput = '';
                previousInput = '';
                operation = null;
                updateDisplay('');
            } else if (value === '=') {
                if (currentInput && previousInput && operation) {
                    currentInput = operate(previousInput, currentInput, operation);
                    previousInput = '';
                    operation = null;
                    updateDisplay(currentInput);
                }
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (currentInput) {
                    if (previousInput && operation) {
                        currentInput = operate(previousInput, currentInput, operation);
                    }
                    previousInput = currentInput;
                    currentInput = '';
                    operation = value;
                    updateDisplay(previousInput + ' ' + value);
                }
            } else {
                currentInput += value;
                updateDisplay(currentInput);
            }
        });
    });

    function updateDisplay(value) {
        display.textContent = value;
    }

    function operate(a, b, operation) {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (operation) {
            case '+':
                return (a + b).toString();
            case '-':
                return (a - b).toString();
            case '*':
                return (a * b).toString();
            case '/':
                return (a / b).toString();
            default:
                return '';
        }
    }
});
