const btnContainer = document.querySelector(".btnContainer");

const inpBtns = [["c", "⌫", "%", "/"], 
                ["7", "8", "9", "*"], 
                ["4", "5", "6", "-"], 
                ["1", "2", "3", "+",],
                [".", "0", "="]];

for(let i = 0; i < inpBtns.length; i++){
    const div = document.createElement("div");

    for(let j = 0; j < inpBtns[i].length; j++){
        const btns = document.createElement("button");
        btns.textContent = `${inpBtns[i][j]}`;

        if(Number.isInteger(+inpBtns[i][j])){
            btns.classList.add("num");
            btns.dataset.num = inpBtns[i][j];
        }
        else{
            btns.classList.add("operators");
            btns.dataset.operator = inpBtns[i][j];
        }

        div.appendChild(btns);
    }
    div.classList.add(`row`);
    btnContainer.appendChild(div);
}

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
            inputStr = "";
        }
    }
}   

inputBtns.forEach(btn => btn.addEventListener("click", computeInput));


Event.prototype.click = function(){
}

const keyOp = {
    "=": "Enter",
    "⌫": "Backspace",
}


window.addEventListener("keydown", (e) => {
    inputBtns.forEach(btn =>{
        let num = btn.dataset.num;
        let op = btn.dataset.operator;

        if(num && e.key === num){
            btn.click();
            btn.classList.add("active");
            setTimeout(() => btn.classList.remove("active"), 100);

        }
        else if(op && (e.key === keyOp[op] || op === e.key)){
            btn.click();
            btn.classList.add("active");
            setTimeout(() => btn.classList.remove("active"), 100);

        }
    });
});