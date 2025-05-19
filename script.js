const inputBtns = Array.from(document.querySelectorAll(".num, .operators"));

const current = document.querySelector(".current");
const history = document.querySelector(".history");

let inputStr = "";

function operate(ins){
    console.log(ins);
    const inputArr = ins.split(" ");
    console.log(inputArr);
    const evaluate = {
        "+": (a, b) => +a + +b,
        "-": (a, b) => a - b,
        "×": (a, b) => a * b,
        "÷": (a, b) => a / b === Infinity?"you can't do that": a / b,
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
    return evaluate[op](inputArr[0], inputArr[2]);

}

function computeInput(){
    let currentValue = this.textContent;

    if(Number.isInteger(+currentValue)){
        inputStr += currentValue;
        current.textContent = inputStr;
    }
    else if(currentValue === "C"){
        inputStr = "";
        current.textContent = inputStr;
        history.textContent = ""
    }
    else if(currentValue === "⌫"){
        inputStr = inputStr.slice(0, inputStr.length - 1);
        current.textContent = inputStr;
    }
    else if(currentValue === "."){
        inputStr.includes(".")?inputStr: inputStr += currentValue;
        current.textContent = inputStr;
    }
    else{
        inputStr += ` ${currentValue} `;
        current.textContent = inputStr;

        if(currentValue === "="){
            let result = operate(inputStr); 
            current.textContent = result; 
            history.textContent = inputStr;
        }
    }
}   

inputBtns.forEach(btn => btn.addEventListener("click", computeInput));