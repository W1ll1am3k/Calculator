class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {      
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {        
        if (operation === '√') {
            this.computeSquareRoot();
            return;
        }
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case 'x':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            case '^':
                computation = Math.pow(prev, current);
                break;
            case '%':
                computation = (prev / 100) * current;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    computeSquareRoot() {       
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        const result = Math.sqrt(current);
        this.previousOperand = `√${current}`;
        this.currentOperand = result;
        this.operation = undefined;
    }
    
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        if (this.operation != null) {
            if (this.operation === '√') {
                this.previousOperandTextElement.innerText = this.previousOperand;
            } else {
                this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
            }
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }
}

function insertPi() {
    calculator.appendNumber(3.141592653589);
    calculator.updateDisplay();
}

const numberButtons = document.querySelectorAll('.button-number');
const operationButtons = document.querySelectorAll('.button-operation');
const deleteButton = document.querySelector('#delete');
const allClearButton = document.querySelector('#all-clear');
const equalsButton = document.querySelector('#equals');
const piButton = document.querySelector('#pi');

const previousOperandTextElement = document.querySelector('.result2nd');
const currentOperandTextElement = document.querySelector('.result');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.value);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.value);
        calculator.updateDisplay();
    });
});

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

piButton.addEventListener('click', () => {
    insertPi();
});
