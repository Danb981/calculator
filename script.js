const screen = document.querySelector(".screen");
const buttons = document.querySelectorAll("button");
buttons.forEach((button) => button.addEventListener("click", buttonClicked));
window.addEventListener('keydown', keyPressed);

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
function operate(x, y, op){
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
    screenNum = (Math.round(screenNum * 100) / 100).toString();

    screen.value = screenNum;
    operator = "";
    bufferNum = "";
}

function buttonClicked(e){
    let buttonText = e.target.innerText;
    if(!isNaN(buttonText) || buttonText === '.'){
        if(overwrite){
            bufferNum = screenNum;
            screenNum = "";
            screen.value = screenNum;
            overwrite = false;
        }
        else if(buttonText === '.' && screenNum.includes('.')){
            buttonText = '';
        }
        screenNum = screenNum.concat(buttonText);
        screen.value = screenNum;
    }
    else if(buttonText === 'Clear'){
        bufferNum = "";
        operator = "";
        screenNum = "";
        screen.value = screenNum;
    }
    else if(buttonText === 'Delete'){
        screenNum = screenNum.slice(0, screenNum.length - 1);
        screen.value = screenNum;
    }
    else if(buttonText === '='){
        if(bufferNum != "" || bufferNum == 0 && !overwrite){
            operate(bufferNum, screenNum, operator);
        }
    }
    else{ 
        if(bufferNum != "" || bufferNum == 0 && !overwrite){
            operate(bufferNum, screenNum, operator);
            operator = buttonText;
            overwrite = true;
        }
        else if(!overwrite){
            bufferNum = screenNum;
            overwrite = true;
        }
        operator = buttonText;
    }
}

function keyPressed(e){
    buttons.forEach(button => {
        if(e.key == button.innerText){
            button.click();
        }
        else if(e.key == "Enter" && button.innerText == "="){
            button.click();
        }
        else if(e.key == "/" && button.innerText == "÷"){
            button.click();
        }
        else if(e.key == "*" && button.innerText == "x"){
            button.click();
        }
        else if(e.key == "Backspace" && button.innerText == "Delete"){
            button.click();
        }
        else if(e.key == "Escape" && button.innerText == "Clear"){
            button.click();
        }
    });
}