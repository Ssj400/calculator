let buttons = document.querySelectorAll(".button.displays")
let output = document.querySelector(".output p")

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
    } else if (operator == '/') {
        return divide(a, b);
    }
}


buttons.forEach((item) => {
    item.addEventListener('click', () => {
        if (output.textContent.length < 12) {
            output.textContent += item.textContent;
        } 
    })
})

