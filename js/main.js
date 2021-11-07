window.addEventListener("load", function () {

  
  const playButton = document.querySelector("#play");

  const startButton = document.querySelector("#start");
  const gameOverButton = document.querySelector("#over");
  const winButton = document.querySelector("#win");

  const splashScreen = document.querySelector("#splash-screen");
  const gameScreen = document.querySelector("#game-screen");
  const gameOverScreen = document.querySelector("#gameover");
  const winScreen = document.querySelector("#win-screen");

  // Create cards - card name = image name
  const sylvester = generateCard (1, "sylvester");
  const tweety = generateCard (1, "tweety");
  const minnie = generateCard (2, "minnie");
  const mickey = generateCard (2, "mickey");

  // Create game instance
  const game = new Game([sylvester, tweety, minnie, mickey]);
  
  playButton.addEventListener("click", function () {
    splashScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    // Start GAME 
    game.prepareCards();
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


function generateCard(partnerId, name) {
  return {
    partnerId: partnerId,
    name: name,
    image: `../img/${name}.png`
  }; 
}

/* console.log(sylvester); */

class Game {
  constructor(cards=[],time=60, score=0 ) {
    this.cards = cards;
    this.timeRemaining = time;
    this.scoreCounting = score;
    this.time = document.querySelector(".time span");
    this.score = document.querySelector(".score span");
  }

  prepareCards(){

    /* const listCards = document.querySelector("#cards"); */
    console.log(this.cards);
    this.cards.forEach(function(item){
      const parent = document.querySelector("#cards");
      const card = document.createElement("div");
      console.log("HERE", item.name);

      card.innerHTML = `
      <div data-id="${item.partnerId}" class="card visible">
        <div class="flip-card-inner">
          <div class="card-back card-look">
            <img src="${item.image}" />
          </div>
          <div class="card-front card-look">
            <img src="../img/back.png" />
          </div>
        </div>
      </div>`;
      parent.appendChild(card);
    });
  }
  
  randomCards(){}

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



/* gameOver()
victory() */



