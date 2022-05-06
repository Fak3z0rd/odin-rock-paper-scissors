let availablePlays = ["Rock", "Paper", "Scissors"];

function computerPlay() {
    return availablePlays[Math.floor(Math.random() * 3)];
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return 0;
    }

    if (playerSelection === "rock") {
        if (computerSelection === "scissors") {
            return 1;
        } else if (computerSelection === "paper") {
            return -1;
        }
    } else if (playerSelection === "paper") {
        if (computerSelection === "scissors") {
            return -1;
        } else if (computerSelection === "rock") {
            return 1;
        }
    } else if (playerSelection === "scissors") {
        if (computerSelection === "rock") {
            return -1;
        } else if (computerSelection === "paper") {
            return 1;
        }
    }
}

function game() {
    let playerPoints = 0;
    let computerPoints = 0;
    for (let i = 0; i < 5; i++) {
        const playerSelection = prompt("Choose your move: Rock, Paper or Scissors").toLowerCase();
        const computerSelection = computerPlay().toLowerCase();
        let result = playRound(playerSelection, computerSelection);
        if (result == 1) {
            playerPoints++;
            console.log(`Round ${i + 1}: You Win! ${playerSelection} beats ${computerSelection}`);
        } else if (result == -1) {
            computerPoints++;
            console.log(`Round ${i + 1}: You Lose! ${computerSelection} beats ${playerSelection}`);
        } else {
            console.log(`Round ${i + 1}: It's a draw! ${computerSelection} equals ${playerSelection}`);
        }
    }

    if (playerPoints > computerPoints) {
        console.log("Game Over: Player wins");
    } else if (computerPoints > playerPoints) {
        console.log("Game Over: Computer wins");
    } else {
        console.log("Game Over: It's a Draw");
    }
}

game();
