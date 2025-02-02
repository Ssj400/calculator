let buttons = document.querySelectorAll(".button.displays");
let output = document.querySelector(".output p");
let equal = document.querySelector("#equal");
let ac = document.querySelector(".button.deleteAll");
let eliminate = document.querySelector(".button.delete");
let operators = "+-x÷"
let operation;

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
    return a/b;
}

let operate = (a, operator, b) => {
    if (operator == '+') {
        return add(a,b);
    } else if (operator == '-') {
        return subtract(a,b);
    } else if (operator == 'x') {
        return multiply(a,b);
    } else if (operator == '÷') {
        return divide(a, b);
    }
}

let detectOperation = (str) => {
    let arr = str.split("");
    let operator = arr.find((item) => operators.includes(item));
    let firstNumber = arr.slice(0, arr.findIndex((item) => item == operator));
    let secondNumber = arr.slice(arr.findIndex((item) => item == operator) + 1);
    output.textContent = operate(Number(firstNumber.join('')), operator, Number(secondNumber.join('')));
}   


buttons.forEach((item) => {
    item.addEventListener('click', () => {
        if (output.textContent.length < 12) {
            output.textContent += item.textContent;
            operation = output.textContent;
        } 
    })
})

equal.addEventListener('click', () => {
    detectOperation(operation);
})

ac.addEventListener('click', () => {
    output.textContent = '';
    operation = '';
})

eliminate.addEventListener('click', () => {
    output.textContent = output.textContent.substring(0, output.textContent.length -1);
    operation = output.textContent;
})