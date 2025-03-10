const gameBoard = document.querySelector("#gameboard");
const infoDisplay = document.querySelector('#info');
let turn = "circle";

const startCells = [
    "", "", "",
    "", "", "",
    "", "", ""
]

infoDisplay.textContent = "Circle goes First"

function createBoard() { 
    startCells.forEach((_cell,index)=>{
        const cellElement = document.createElement("div")
        cellElement.classList.add("square")
        cellElement.id = index;
        cellElement.addEventListener("click",addMark)
        gameBoard.append(cellElement);
    })
}
createBoard()

function addMark(e) {
    const turnDisplay = document.createElement("div");
    turnDisplay.classList.add(turn)
    e.target.append(turnDisplay);
    turn = turn === "circle" ? "cross" : "circle";
    infoDisplay.textContent  = "It is now " + turn + "\'s turn."; 
    e.target.removeEventListener("click", addMark);
    checkScore()
}

function checkScore() {
    const squares = document.querySelectorAll(".square")
    const winCombo = [
        [0,1,2], [3,4,5], [6,7,8],  //horizontals
        [0,3,6], [1,4,7], [2,5,8],  //verticals
        [0,4,8], [2,4,6]    //diagonal
    ]
    winCombo.forEach(array => {
        const circleWins = array.every(cell =>  squares[cell].firstChild?.classList.contains("circle"))
        if(circleWins){
            infoDisplay.textContent = "Circle Wins!"
            squares.forEach(square=> square.replaceWith(square.cloneNode(true)))
        }
    })
    winCombo.forEach(array => {
        const crossWins = array.every(cell =>  squares[cell].firstChild?.classList.contains("cross"))
        if(crossWins){
            squares.forEach(square=> square.replaceWith(square.cloneNode(true)))
            infoDisplay.textContent = "Cross Wins!"
        }
    })
}