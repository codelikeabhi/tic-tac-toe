const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");
const winningStreakX = document.querySelector("[data-winnerX]");
const winningStreak0 = document.querySelector("[data-winner0]");
const tieGame = document.querySelector("[data-tie]");

let currentPlayer;
let gameGrid;
let winX = 0;
let win0 = 0;
let tie = 0;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function initGame( ){
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];

    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText =   `Current Player - ${currentPlayer}`;
    winningStreakX.innerText = `${winX}`;
    winningStreak0.innerText = `${win0}`;
    tieGame.innerText = `${tie}`;
}

initGame( );

boxes.forEach((box, index) => {
    box.addEventListener("click", ( ) => {
        handleClick(index);
    })
});

function swapTurn( ){
    if(currentPlayer === "X"){
        currentPlayer = "0";
    } else{
        currentPlayer = "X";
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver( ){
    let winner = "";

    winningPositions.forEach((position) => {
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")  && (gameGrid[position[0]] === gameGrid[position[1]])  && (gameGrid[position[1]] === gameGrid[position[2]])){

            if(gameGrid[position[0]] === "X"){
                winner = "X";
                winX++;
                winningStreakX.innerText = `${winX}`;
            } else{
                winner = "0";
                win0++;
                winningStreak0.innerText = `${win0}`;
            }

            //disable pointer event
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    if(winner != ""){
        gameInfo.innerText = `Winner Player - ${winner}`;
        newGameBtn.classList.add("active");
        return;
    }

    let fillCount = 0;
    gameGrid.forEach((box) =>{
        if(box !== ""){
            fillCount++;
        }
    });

    //whether the game is tie
    if(fillCount === 9){
        gameInfo.innerText = "Game Tied!";
        tie++;
        tieGame.innerText = `${tie}`;
        newGameBtn.classList.add("active");
    }
}

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";

        //swap player
        swapTurn( );

        //check whether game is over or not
        checkGameOver( );
    }
}

newGameBtn.addEventListener("click", initGame);