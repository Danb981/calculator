const screen = document.querySelector(".screen");
const buttons = document.querySelectorAll("button");
buttons.forEach((button) => button.addEventListener("click", buttonClicked));

let bufferNum;
let operator;
let screenNum = "";

function add(x, y){
    return +x + +y;
}
function subtract(x, y){
    return x - y;
}
function multiply(x, y){
    return x * y;
}
function divide(x, y){
    return x / y;
}
function operate(x, y, operator){
    if(operator === '+'){
        screenNum = add(x, y);
    }
    else if(operator === '-'){
        screenNum = subtract(x, y);
    }
    else if(operator === 'x'){
        screenNum = multiply(x, y);
    }
    else if(operator === '÷'){
        screenNum = divide(x, y);
    }
}
function buttonClicked(e){
    let buttonText = e.target.innerText;
    if(!isNaN(buttonText) || buttonText === '.'){
        screenNum += buttonText;
    }
    else if(buttonText === '='){
        operate(bufferNum, screenNum, operator);
    }
    else{
        bufferNum = screenNum;
        screenNum = "";
        operator = buttonText;
    }
    screen.value = screenNum;
}