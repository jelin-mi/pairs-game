window.addEventListener("load", function () {
  const playButton = document.querySelector("#play");

  const startButton = document.querySelector("#start");
  const gameOverButton = document.querySelector("#over");
  const winButton = document.querySelector("#win");

  const splashScreen = document.querySelector("#splash-screen");
  const gameScreen = document.querySelector("#game-screen");
  const gameOverScreen = document.querySelector("#gameover");
  const winScreen = document.querySelector("#win-screen");

  playButton.addEventListener("click", function () {
    splashScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
  });

  startButton.addEventListener("click", function () {
    startButton.classList.add("hidden");
    gameOverButton.classList.add("hidden");
    winButton.classList.add("hidden");
    gameScreen.classList.remove("hidden");
  });

  gameOverButton.addEventListener("click", function () {
    gameScreen.classList.add("hidden");
    gameOverScreen.classList.remove("hidden");
  });

  winButton.addEventListener("click", function () {
    gameScreen.classList.add("hidden");
    winScreen.classList.remove("hidden");
  });

});

const sylvester = generateCard (1, "sylvester", "./img/sylvester.png");
const tweety = generateCard (1, "tweety", "./img/tweety.png");
const minnie = generateCard (2, "minnie", "./img/minnie.png");
const mickey = generateCard (2, "mickey", "./img/mickey.png");

/* console.log(sylvester); */

function generateCard(partnerId, name, image) {
  return {
    partnerId: partnerId,
    name: name,
    image: image
  }; 
}

/* console.log(sylvester); */

class Game {
  constructor(time, score) {
    this.cards = [];
    this.timeRemaining = time;
    this.scoreCounting = score;
    this.time = document.querySelector(".time span");
    this.score = document.querySelector(".score span");
  }

  prepareCards(){
    /* this.cards.push(sylvester, tweety, minnie, mickey); */
    /* const listCards = document.querySelector("#cards"); */
    this.cards.forEach(function(e){
      const parent = document.querySelector("#cards");
      const card = document.createElement('div');
      div.innerHTML = 
      <div id="card-1" class="card visible">
        <div class="flip-card-inner">
          <div class="card-front card-look">
            <img src="e./img/sylvester.png" />
          </div>
          <div class="card-back card-look">
            <img src="e./img/back.png" />
          </div>
        </div>
      </div>
      parent.appendChild(card);
    });


    this.cards.document.createElement("sylvester")
    div.appendChild(document.createTextNode('Hello world!'))


  };
  
  startTimer(){}

  updateScore(){}

  flipCard(){
    let cardFront = document.querySelector("card-front");
    let cardBack = document.querySelector("card-back");

    cardFront.addEventListener('click', function() {
      cardFront.classList.remove("visible");
      cardBack.classList.add("visible");
    });
    cardBack.addEventListener('click', function() {
      cardFront.classList.add("visible");
      cardBack.classList.remove("visible");
    });
  }

  isMatch(){}
}

console.log(prepareCards());


/* gameOver()
victory() */



