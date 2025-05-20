const inputBtns = Array.from(document.querySelectorAll(".num, .operators"));

const current = document.querySelector(".current");
const history = document.querySelector(".history");

let inputStr = "";

function operate(ins){
    const inputArr = ins.split(" ");
    const evaluate = {
        "+": (a, b) => +a + +b,
        "-": (a, b) => a - b,
        "*": (a, b) => a * b,
        "/": (a, b) => a / b === Infinity?"you can't do that": a / b,
        "%": (a, b) => a % b,
    }
    
    let op = inputArr[1];
    let i = inputArr.length;

    if(i > 5){
        while(i > 5){
            let temp = evaluate[op](inputArr[0], inputArr[2]);
            inputArr.splice(0, 3, temp);
            i -= 2;
        }
    }
    else if(i < 5){
        return "enter correct input";
    }
    inputStr = "";
    let result = evaluate[op](inputArr[0], inputArr[2])

    return +(result)?result.toFixed(2): result;

}

function computeInput(){
    let currentValue = this.textContent;

    if(Number.isInteger(+currentValue)){
        inputStr += currentValue;
        current.textContent = inputStr;
    }
    else if(currentValue === "c"){
        inputStr = "";
        current.textContent = inputStr;
        history.textContent = ""
    }
    else if(currentValue === "⌫"){
        inputStr = inputStr.slice(0, inputStr.length - 1);
        current.textContent = inputStr;
    }
    else if(currentValue === "."){
        if(inputStr.split(" ").length >= 3){
            inputStr.split(" ")[2].includes(".")?inputStr: inputStr += currentValue;
        }
        else{
            inputStr.includes(".")?inputStr: inputStr += currentValue;
        }
        current.textContent = inputStr;
    }
    else{
        inputStr += ` ${currentValue} `;
        current.textContent = inputStr;

        if(currentValue === "="){
            history.textContent = inputStr;
            let result = operate(inputStr);
            current.textContent = result; 
            
        }
    }
}   

inputBtns.forEach(btn => btn.addEventListener("click", computeInput));


Event.prototype.click = function(){
    console.log(this);
    this.computeInput();
}

const keyOp = {
    "=": "Enter",
    "⌫": "Backspace",
}


window.addEventListener("keydown", (e) => {
    inputBtns.forEach(btn =>{
        console.log(e.key, btn.dataset.operators);
        if(Number.isInteger(+btn.textContent) && e.key === btn.dataset.num){
            btn.click();
        }
        else if(e.key === keyOp[btn.dataset.operator] || btn.dataset.operator === e.key){
            console.log(e.key)
            btn.click();
        }
    })
});