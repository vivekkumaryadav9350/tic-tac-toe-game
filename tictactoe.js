let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new-btn");
let msg = document.querySelector("#msg");
let msgContainer = document.querySelector(".msg-container");
let audio = document.querySelector("#clickAudio");
let submit = document.querySelector(".btnn");
let winSound = document.querySelector("#winSound");
let popUp = document.querySelector("#popUp");
let line = document.querySelector("#winLines");




let player1Name = "";
let player2Name = "";
submit.addEventListener("click", () => {
  player1Name = player1.value || "Player 1";
  player2Name = player2.value || "Player 2";
});





function playaudio() {
  submit.addEventListener("click", () => {
    audio.currentTime = 0;
    audio.play();
  });

  resetBtn.addEventListener("click", () => {
    audio.currentTime = 0;
    audio.play();
  });

  newGameBtn.addEventListener("click", () => {
    audio.currentTime = 0;
    audio.play();
  });
}

playaudio();





let turnO = true;

const winPatterns = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];



boxes.forEach((box) => {
  box.addEventListener("click", () => {

    if(turnO){
      box.innerText = "O";
      turnO = false;
    }
    else{
      box.innerText = "X";
      turnO = true;
    }

    box.disabled = true;
    popUp.currentTime = 0;
    popUp.play();

    checkWinner();

  });
});



const checkWinner = () => {

  for (let pattern of winPatterns) {

    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if(pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val){

      if(pattern.toString() === "0,1,2") showLine("row1");
      if(pattern.toString() === "3,4,5") showLine("row2");
      if(pattern.toString() === "6,7,8") showLine("row3");

      if(pattern.toString() === "0,3,6") showLine("col1");
      if(pattern.toString() === "1,4,7") showLine("col2");
      if(pattern.toString() === "2,5,8") showLine("col3");

      if(pattern.toString() === "0,4,8") showLine("diag1");
      if(pattern.toString() === "2,4,6") showLine("diag2");

      showWinner(pos1Val);
      return;

    }
  }
};



const showWinner = (winner) => {

  let winnerName;

  if(winner === "O"){
    winnerName = player1Name;
  }
  else{
    winnerName = player2Name;
  }

  msg.innerText = `🎉 Congratulations ${winnerName},you won the game!buddy`;

  msgContainer.classList.remove("hide");

  disableBoxes();
  winSound.play();

};



const disableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};


const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};



const resetGame = () => {

  turnO = true;

  enableBoxes();

  msgContainer.classList.add("hide");

  line.style.display = "none";

  winSound.pause();
  player1.value = "";
   player2.value = "";

};


function showLine(type){

  line.style.display = "block";
  line.style.left = "0";

  switch(type){

    case "row1":
      line.style.top = "10vmin";
      line.style.transform = "rotate(0deg)";
      break;

    case "row2":
      line.style.top = "30vmin";
      line.style.transform = "rotate(0deg)";
      break;

    case "row3":
      line.style.top = "50vmin";
      line.style.transform = "rotate(0deg)";
      break;

    case "col1":
      line.style.top = "30vmin";
      line.style.left = "-20vmin";
      line.style.transform = "rotate(90deg)";
      break;

    case "col2":
      line.style.top = "30vmin";
      line.style.left = "0";
      line.style.transform = "rotate(90deg)";
      break;

    case "col3":
      line.style.top = "30vmin";
      line.style.left = "20vmin";
      line.style.transform = "rotate(90deg)";
      break;

    case "diag1":
      line.style.top = "30vmin";
      line.style.transform = "rotate(45deg)";
      break;

    case "diag2":
      line.style.top = "30vmin";
      line.style.transform = "rotate(-45deg)";
      break;
  }
}


resetBtn.addEventListener("click", resetGame);

newGameBtn.addEventListener("click", resetGame);
