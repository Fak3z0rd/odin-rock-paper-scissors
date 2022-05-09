let availablePlays = ["rock", "paper", "scissors"];
let availablePlaysIcon = {
    rock: "fa-regular fa-hand-back-fist",
    paper: "fa-regular fa-hand",
    scissors: "fa-regular fa-hand-scissors",
};
let playerPoints = 0;
let computerPoints = 0;
let totalGames = 0;
let totalTies = 0;
const resultDiv = document.querySelector("#result");
const score = document.querySelector("#score");
const displayPlayerSelection = document.querySelector("#player");
const displayComputerSelection = document.querySelector("#computer");
const modal = document.getElementById("modal");
const $retry = document.getElementById("btn-retry");
const $gameOver = document.getElementById("finalresult");
const $totalGames = document.getElementById("totalgames");
const $totalTies = document.getElementById("totalties");

function computerPlay() {
    return availablePlays[Math.floor(Math.random() * availablePlays.length)].toLowerCase();
}

function playerPlay(e) {
    return e.target.attributes.name.value;
}

function displaySelection(playerSelection, computerSelection, result) {
    if (result === 1) {
        displayPlayerSelection.className = "btn btn-success";
        displayComputerSelection.className = "btn btn-danger";
    } else if (result === -1) {
        displayPlayerSelection.className = "btn btn-danger";
        displayComputerSelection.className = "btn btn-success";
    } else {
        displayPlayerSelection.className = "btn btn-warning";
        displayComputerSelection.className = "btn btn-warning";
    }
    displayComputerSelection.innerHTML = `<i class="${availablePlaysIcon[computerSelection]}"></i>`;
    displayPlayerSelection.innerHTML = `<i class="${availablePlaysIcon[playerSelection]}"></i>`;
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        totalTies++;
        return 0;
    }

    if (playerSelection === "rock") {
        if (computerSelection === "scissors") {
            playerPoints++;
            return 1;
        } else if (computerSelection === "paper") {
            computerPoints++;
            return -1;
        }
    } else if (playerSelection === "paper") {
        if (computerSelection === "scissors") {
            computerPoints++;
            return -1;
        } else if (computerSelection === "rock") {
            playerPoints++;
            return 1;
        }
    } else if (playerSelection === "scissors") {
        if (computerSelection === "rock") {
            computerPoints++;
            return -1;
        } else if (computerSelection === "paper") {
            playerPoints++;
            return 1;
        }
    }
}

function checkResult(result) {
    if (result == 1) {
        resultDiv.textContent = `You won this round`;
        score.children[0].children[0].textContent = playerPoints;
    } else if (result == -1) {
        resultDiv.textContent = `Computer won this round`;
        score.children[1].children[0].textContent = computerPoints;
    } else {
        resultDiv.textContent = `It's a draw!`;
    }
}

function checkGameOver() {
    if (playerPoints === 5 || computerPoints === 5) {
        if (playerPoints > computerPoints) {
            $gameOver.textContent = "Game Over: You win";
        } else if (computerPoints > playerPoints) {
            $gameOver.textContent = "Game Over: Computer wins";
        }
        return true;
    }
    return false;
}

$retry.addEventListener("click", () => {
    playerPoints = 0;
    computerPoints = 0;
    totalGames = 0;
    totalTies = 0;
    score.children[0].children[0].textContent = playerPoints;
    score.children[1].children[0].textContent = computerPoints;
    resultDiv.textContent = "";
    modal.close();
});

let retry = () => {
    $totalGames.textContent = `Total Games: ${totalGames}`;
    $totalTies.textContent = `Total Ties: ${totalTies}`;
    modal.showModal();
};

const buttons = document.querySelectorAll(".choices");
buttons.forEach((button) => {
    button.addEventListener(
        "click",
        (e) => {
            totalGames++;
            let playerSelection = playerPlay(e);
            let computerSelection = computerPlay();
            let result = playRound(playerSelection, computerSelection);
            displaySelection(playerSelection, computerSelection, result);
            checkResult(result);
            let $checkGameOver = checkGameOver();
            if ($checkGameOver) {
                retry();
            }
        },
        { capture: true }
    );
});
