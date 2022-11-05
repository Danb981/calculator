const screen = document.querySelector(".screen");
const buttons = document.querySelectorAll("button");
buttons.forEach((button) => button.addEventListener("click", buttonClicked));

let bufferNum = "";
let operator = "";
let screenNum = "";
let overwrite = false;

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
        screenNum = add(x, y).toString();
    }
    else if(operator === '-'){
        screenNum = subtract(x, y).toString();
    }
    else if(operator === 'x'){
        screenNum = multiply(x, y).toString();
    }
    else if(operator === '÷'){
        screenNum = divide(x, y).toString();
    }
    bufferNum = "";
    operator = "";
}
function buttonClicked(e){
    let buttonText = e.target.innerText;
    if(!isNaN(buttonText) || buttonText === '.'){
        if(overwrite){
            overwrite = !overwrite;
            screenNum = "";
            screen.value = screenNum;
        }
        screenNum += buttonText;
    }
    else if(buttonText === '='){
        operate(bufferNum, screenNum, operator);
    }
    else if(buttonText === 'Clear'){
        bufferNum = "";
        operator = "";
        screenNum = "";
    }
    else if(buttonText === 'Delete'){
        screenNum = screenNum.slice(0, screenNum.length - 1);
    }
    else{ //operation click
        if(bufferNum != ""){
            operate(bufferNum, screenNum, operator);
            operator = buttonText;
            bufferNum = screenNum;
            overwrite = true;
        }
        else{
            bufferNum = screenNum;
            screenNum = "";
            operator = buttonText;
        }
    }
    screen.value = screenNum;
    console.log({bufferNum});
    console.log({operator});
    console.log({screenNum});
}