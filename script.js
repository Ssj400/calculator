let buttons = document.querySelectorAll(".button.displays");
let buttonsOperator = document.querySelectorAll(".operation");
let output = document.querySelector(".output p");
let equal = document.querySelector("#equal");
let ac = document.querySelector(".button.deleteAll");
let eliminate = document.querySelector(".button.delete");
let negative = document.querySelector(".negative");
let operators = "+-x÷^"
let operation = '';
let operatorClicked = false;
let operationNegative;
let operationNegative2;

let add = (a, b) => {
    return a + b;
}

let subtract = (a, b) => {
    return a - b;
}

let multiply = (a, b) => {
    return a * b;
}

let divide = (a, b) => {
    return (a / b).toFixed(4);
}

let power = (a, b) => {
    return a ** b;
}

let operate = (a, operator, b) => {
    if (operator == '+') {
        return add(a, b);
    } else if (operator == '-') {
        return subtract(a, b);
    } else if (operator == 'x') {
        return multiply(a, b);
    } else if (operator == '÷') {
        return divide(a, b);
    } else if (operator == '^') {
        return power(a, b);
    }
}

let detectOperation = (str) => {
    let arr = str.split("");
    let operator = arr.find((item) => operators.includes(item));
    let firstNumber;

    if (arr.indexOf(operator) == 0) {
        arr.shift();
        operator = arr.find((item) => operators.includes(item));
        firstNumber = arr.slice(0, arr.findIndex((item) => item == operator))
            .join('');
        firstNumber *= -1;
    } else {
        firstNumber = arr.slice(0, arr.findIndex((item) => item == operator))
            .join('');
    }



    secondNumber = arr.slice(arr.findIndex((item) => item == operator) + 1)
        .join("");


    if (operate(Number(firstNumber), operator, Number(secondNumber)) !== undefined) {

        let result = operate(Number(firstNumber), operator, Number(secondNumber));

        if (Number.isNaN(result) || Number.isNaN(output.textContent)) {
            console.log(result)
            return output.textContent = 'Error';
        } else if (result > 10 ** 12) {
            return output.textContent = 'Too big';
        }
        return output.textContent = result;
    }

}


buttons.forEach((item) => {
    item.addEventListener('click', () => {
        if (output.textContent.length < 12) {
            output.textContent += item.textContent;
            operation = output.textContent;
        }
    })
})

buttonsOperator.forEach((item) => {
    item.addEventListener('click', () => {

        if (operators.includes(operation)) {
            operation = '';
            output.textContent = '';
            return;
        }

        if (operatorClicked == true) {
            let newOperation = operation.split("")
            operation = newOperation.pop();
            output.textContent = `${detectOperation(newOperation.join(''))}${operation}`;
            operation = output.textContent;
        }
        operatorClicked = true;
    })
})

equal.addEventListener('click', () => {
    detectOperation(operation);
    operatorClicked = false;
})

ac.addEventListener('click', () => {
    output.textContent = '';
    operation = '';
    operatorClicked = false;
})

eliminate.addEventListener('click', () => {
    if (operators.includes(output.textContent.substring(output.textContent.length - 2, output.textContent.length - 1))) {
        operatorClicked = false;
    }
    output.textContent = output.textContent.substring(0, output.textContent.length - 1);
    operation = output.textContent;
})

negative.addEventListener('click', () => {
    let arrOperation = String(operation).split('');
    let operator = arrOperation.find((item) => operators.includes(item));
    let arrOfOperators = arrOperation.filter((item) => operators.includes(item))

    if (operator == undefined || arrOperation.findIndex((item) => item == operator) == 0 && arrOfOperators.length == 1) {

        operation *= -1;
        output.textContent = operation;

    } else if (operator == arrOperation[0]){

        arrOperation.shift();
        operator = arrOperation.find((item) => operators.includes(item));
        operationNegative2 = arrOperation.splice(arrOperation.indexOf(operator) + 1);
        arrOperation.push(operationNegative2.join('') * -1);
        arrOperation.unshift("-");
        operation = arrOperation.join('');
        output.textContent = operation;

    } else {

        operationNegative = arrOperation.splice(arrOperation.indexOf(operator) + 1)
        arrOperation.push(operationNegative.join('') * -1);
        operation = arrOperation.join('');
        output.textContent = operation;

    }
})