//Defaults to medium setting when starting, at 6 squares
var numSquares = 6,
    colors = [],
    pickedColor,
    squares = document.querySelectorAll(".square"),
    squareVal = document.querySelectorAll(".squareVal"),
    colorDisplay = document.getElementById("colorDisplay"),
    messageDisplay = document.querySelector("#message"),
    h1 = document.querySelector("h1"),
    resetButton = document.querySelector("#reset"),
    modeButtons = document.querySelectorAll(".mode"),
    score = document.querySelector("#score"),
    gameScore = 0,
    wrongAudio = document.querySelector("#wrongAudio"),
    correctAudio = document.querySelector("#correctAudio"),
    soundBtn = document.querySelector(".sound");
init();

function init() {
  setupModeButtons();
  setupSquares();
  reset();
  soundControl();
}

//mode buttons event listeners
function setupModeButtons(){
  for(var i = 0; i < modeButtons.length; i++){
    //figure out how many squares to show//pick new colors//pick a new pickedColor//update page to reflect change
    modeButtons[i].addEventListener("click", function(){
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      modeButtons[2].classList.remove("selected");
      this.classList.add("selected");
      // squareVal[i].textContent = pickColor();
      this.textContent === "Easy" ? numSquares = 3 : this.textContent === "Medium" ? numSquares = 6 : numSquares = 9;
      reset();
    });
  }
};

//Mute sound effects, they can be quite annoying
function soundControl() {
  soundBtn.addEventListener("click", function() {
    if (wrongAudio.muted && correctAudio.muted) {
      this.innerHTML = "<i class='fa fa-volume-up' aria-hidden='true'></i>";
      !wrongAudio.muted;
      !correctAudio.muted;
    }
    else {
      this.innerHTML = "<i class='fa fa-volume-off' aria-hidden='true'></i>";
    }
    wrongAudio.muted = !wrongAudio.muted;
    correctAudio.muted = !correctAudio.muted;
  });
};

function setupSquares(){
  for(var i = 0; i < squares.length; i++){
    //add click listeners to squares
    squares[i].addEventListener("click", function(){
      //grab color of clicked square
      var clickedColor = this.style.background;
      wrongAudio.currentTime = 0;

      //compare color to pickedColor
      if(clickedColor === pickedColor){
        messageDisplay.textContent = "Correct!";
        resetButton.textContent = "Play Again?";
        changeColors(clickedColor);
        h1.style.background = clickedColor;
        correctAudio.play();
        score.classList.remove("wrong-score");
        score.classList.add("right-score");
        gameScore++;
        // window.setTimeout(function(){
        //   score.classList.remove('right-score','wrong-score');
        //   score.style.color = "black";
        //   score.setAttribute("transition", "color 1.2s ease");
        // }, 500);
        score.textContent = gameScore;
        if(gameScore >= 10) {
          alert("Got an eye for colors eh?!? Great job!");
          window.location.reload();
        }
        // squareVal[i].textContent = " ";
      }else{
        this.style.background = "#343434";
        // this.textContent = " ";
        messageDisplay.textContent = "Try Again";
        wrongAudio.play();
        score.classList.remove("right-score");
        score.classList.add("wrong-score");
        gameScore--;
        // window.setTimeout(function(){
        //   score.classList.remove('right-score','wrong-score');
        //   score.style.color = "black";
        //   score.setAttribute("transition", "color 1.2s ease");
        // }, 500);
        score.textContent = gameScore;
        if(gameScore <= -10) {
          alert("Go study before you play some more!");
          window.location.reload();
        }
      }
    });
      // squares[i].textContent = randomColor();
  }

};

function reset(){
  colors = generateRandomColors(numSquares);
  //pick a new random color from array
  pickedColor = pickColor();
  //change colorDisplay to match picked color
  colorDisplay.textContent = pickedColor;
  // squares.children.textContent = pickedColor;
  resetButton.textContent = "New Colors";
  messageDisplay.textContent = "";
  //change colors of squares
  for(var i = 0; i < squares.length; i++){
    // squareVal[i].textContent = pickedColor;
    squares[i].style.display="block";
    colors[i]? squares[i].style.background = colors[i] : squares[i].style.display="none";
  }
  h1.style.background = "steelblue";
};

function toggleScore() {
  window.setTimeout(function(){
    score.classList.remove('right-score','wrong-score');
    score.style.color = "black";
    score.setAttribute("transition", "color 1.2s ease");
  }, 500);
};
// easyBtn.addEventListener("click",function(){
//   hardBtn.classList.remove("selected");
//   easyBtn.classList.add("selected");
//   numSquares = 3;
//   colors = generateRandomColors(numSquares);
//   pickedColor = pickColor();
//   colorDisplay.textContent = pickedColor;
//   for(var i = 0; i < squares.length; i++){
//     if(colors[i]){
//       squares[i].style.background = colors[i];
//     }
//     else{
//       squares[i].style.display = "none";
//     }
//   }
// });
// hardBtn.addEventListener("click",function(){
//   hardBtn.classList.add("selected");
//   easyBtn.classList.remove("selected");
//   numSquares = 6;
//   colors = generateRandomColors(numSquares);
//   pickedColor = pickColor();
//   for(var i = 0; i < squares.length; i++){
//
//       squares[i].style.background = colors[i];
//
//       squares[i].style.display = "block";
//
//   }
// });

resetButton.addEventListener("click", function(){
  //generate new colors
  reset();
});

function changeColors(color){
  //loop through all squares
  for(var i = 0; i < squares.length; i++){
  //change each color to match given color
  squares[i].style.background = color;
  }
};

function pickColor(){
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
};

function generateRandomColors(num){
  //make an array
  var arr = [];
  //add num random colors to array
  for(var i = 0; i < num; i++){
    //get random color and push into arr
    arr.push(randomColor());
  }
  //return that array
  return arr;
}

function randomColor(){
  //pick a "red" from 0-255
  var r = Math.floor(Math.random() * 256);
  //pick a "green" from 0-255
  var g = Math.floor(Math.random() * 256);
  //pick a "blue" from 0-255
  var b = Math.floor(Math.random() * 256);

  return "rgb(" + r + ", " + g + ", " + b + ")";
}
