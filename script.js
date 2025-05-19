const btnContainer = document.querySelector(".btnContainer");

const inpBtns = [["C", "⌫", "%", "\u00F7"], 
                ["7", "8", "9", "\u00D7"], 
                ["4", "5", "6", "-"], 
                ["1", "2", "3", "+",],
                [".", "0", "="]];

console.log(inpBtns);
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