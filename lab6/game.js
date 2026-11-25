// ===== Game data =====
let gameStarted = false;   // becomes true after Start Game
let wins = 0, losses = 0, draws = 0;  // scores
let results = [];          // stores "Win", "Lose" or "Draw" for every round

// ===== Start the game: validate the name =====
function startGame() {
  let name = document.getElementById("playerName").value.trim();
  if (name === "") {                       // empty name -> alert and stop
    alert("Please enter your name.");
    return;
  }
  document.getElementById("welcome").innerHTML = "Welcome, " + name + "!";
  document.getElementById("startTime").innerHTML = "Game started: " + new Date();
  gameStarted = true;                      // allow the game to start
}

// ===== Computer picks a random choice from the array =====
function getComputerChoice() {
  let choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * 3)];   // random index 0, 1 or 2
}

// ===== Play one round =====
function playRound(playerChoice) {
  if (!gameStarted) {                      // game not started yet
    alert("Click Start Game first.");
    return;
  }
  let computerChoice = getComputerChoice();
  let outcome;

  // Decide the winner with if...else
  if (playerChoice === computerChoice) {
    outcome = "Draw";
  } else if ((playerChoice === "rock" && computerChoice === "scissors") ||
             (playerChoice === "scissors" && computerChoice === "paper") ||
             (playerChoice === "paper" && computerChoice === "rock")) {
    outcome = "Win";
  } else {
    outcome = "Lose";
  }

  // Change the image src for both players
  document.getElementById("playerImg").src = playerChoice + ".png";
  document.getElementById("computerImg").src = computerChoice + ".png";

  // Show the result, change its colour and update the score
  let resultBox = document.getElementById("result");
  if (outcome === "Win") {
    wins++;
    resultBox.innerHTML = "You win!";
    resultBox.style.color = "green";
  } else if (outcome === "Lose") {
    losses++;
    resultBox.innerHTML = "You lose!";
    resultBox.style.color = "red";
  } else {
    draws++;
    resultBox.innerHTML = "It's a draw!";
    resultBox.style.color = "grey";
  }
  document.getElementById("wins").innerHTML = wins;
  document.getElementById("losses").innerHTML = losses;
  document.getElementById("draws").innerHTML = draws;

  // Store the result and add a new row to the history table
  results.push(outcome);
  document.getElementById("historyBody").innerHTML +=
    "<tr><td>" + results.length + "</td><td>" + playerChoice + "</td><td>" +
    computerChoice + "</td><td>" + outcome + "</td></tr>";
}

// ===== Summary: count wins with a for loop =====
function showSummary() {
  let rounds = results.length;
  if (rounds === 0) {
    document.getElementById("summary").innerHTML = "No rounds played yet.";
    return;
  }
  let winCount = 0;
  for (let i = 0; i < rounds; i++) {       // loop through every stored result
    if (results[i] === "Win") {
      winCount++;
    }
  }
  let percent = Math.round((winCount / rounds) * 100);   // rounded win percentage
  document.getElementById("summary").innerHTML =
    "You played " + rounds + " rounds and won " + percent + "%";
}

// ===== Reset everything back to the beginning =====
function resetGame() {
  wins = 0; losses = 0; draws = 0;
  results = [];                                          // empty the array
  document.getElementById("wins").innerHTML = 0;
  document.getElementById("losses").innerHTML = 0;
  document.getElementById("draws").innerHTML = 0;
  document.getElementById("historyBody").innerHTML = ""; // clear history rows
  document.getElementById("result").innerHTML = "";      // clear result message
  document.getElementById("summary").innerHTML = "";

  // Also reset the player name, welcome message and start time
  document.getElementById("playerName").value = "";     // empty the name box
  document.getElementById("welcome").innerHTML = "";    // clear "Welcome, <name>!"
  document.getElementById("startTime").innerHTML = "";  // clear the start time
  gameStarted = false;                                  // must click Start Game again

  // Put both images back to the default picture
  document.getElementById("playerImg").src = "rock.jpg";
  document.getElementById("computerImg").src = "rock.jpg";
}