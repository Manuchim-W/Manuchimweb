let score = JSON.parse(localStorage.getItem("score"));


if (score === null) {
  score = {
    Wins: 0,
    Loses: 0,
    Ties: 0,
  };
}

let isAutoPlaying = false
let intervalId

//const autoPlay =()=>{

//}

document.querySelector('.auto').addEventListener('click',()=>{
  autoPlay(),Change()
})

document.querySelector('.reset').addEventListener('click',()=>{
  Reset()
})


function question(){
  let quest = document.querySelector('.Question')

  quest.innerHTML = `
  <p>Are you sure you want to reset the score?</p>
  <button class="yes-button">Yes</button> 
  <button class="no-button">No</button>
  `
}

document.querySelector('.yes-button').addEventListener('click',()=>{
  Reset()
})

document.querySelector('.no-button').addEventListener('click',()=>{
  Reset()
})


console.log(document.querySelector('.reset').addEventListener('click',()=>{
  question()
}))

function hideReset(){
  document.querySelector('.Question').innerHTML =""
}

function Reset(){
  score.Wins=0
  score.Loses=0
  score.Ties=0
  localStorage.removeItem('score')
  updateScoreElement()
  console.log('Game has been reset!')
}

function autoPlay(){
  if(!isAutoPlaying){
    intervalId=setInterval(()=>{
      const playerMove = pickComputerMove();
      playGame(playerMove)
    }, 1000);
    isAutoPlaying = true


    } else{
      clearInterval(intervalId)
      isAutoPlaying = false
    }  
}

function Change(){
  let Stop = document.querySelector('.auto')
    if(Stop.innerHTML === 'Auto Play'){
        Stop.innerHTML = 'Stop Play'
    } else{
      Stop.innerHTML = 'Auto Play'
    }
}

updateScoreElement();

document.querySelector('.js-rock-button')
  .addEventListener('click', () =>{
    playGame('Rock')
  })

  document.querySelector('.js-paper-button')
  .addEventListener('click', () =>{
    playGame('Paper')
  })
  
  document.querySelector('.js-scissors-button')
  .addEventListener('click', () =>{
    playGame('Scissors')
  })  


  document.body.addEventListener('keydown',(event)=>{
    if(event.key === 'r'){
      playGame('Rock')
    } else if (event.key === 'p'){
      playGame('Paper')
    } else if (event.key === 's'){
      playGame('Scissors')
    } else if (event.key ==='Backspace'){
      Reset()
    } else if(event.key === 'a'){
      autoPlay(),Change()
    }
  })
function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = "";
  if (playerMove === "Scissors") {
    if (computerMove === "Rock") {
      result = "You Lose.";
    } else if (computerMove === "Paper") {
      result = "You Win.";
    } else if (computerMove === "Scissors") {
      result = "Tie.";
    }
  } else if (playerMove === "Paper") {
    if (computerMove === "Rock") {
      result = "You Win.";
    } else if (computerMove === "Paper") {
      result = "Tie.";
    } else if (computerMove === "Scissors") {
      result = "You Lose.";
    }
  } else if (playerMove === "Rock") {
    if (computerMove === "Rock") {
      result = "Tie.";
    } else if (computerMove === "Paper") {
      result = "You Lose.";
    } else if (computerMove === "Scissors") {
      result = "You Win.";
    }
  }

  if (result === "You Win.") {
    score.Wins += 1;
  } else if (result === "You Lose.") {
    score.Loses += 1;
  } else if (result === "Tie.") {
    score.Ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();

  document.querySelector(".js-result").innerHTML = result;

  document.querySelector(
    ".js-moves"
  ).innerHTML = `You <img class="pict" src="/Emoji/${playerMove}-emoji.png" />
<img class="pict" src="/Emoji/${computerMove}-emoji.png" />
Computer`;
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.Wins}, Losses: ${score.Loses}, Ties: ${score.Ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = "";

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "Rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "Paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "Scissors";
  }

  return computerMove;
}



