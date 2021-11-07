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
  const back = generateCard (3, "back");

  // Create game instance
  const game = new Game([sylvester, tweety, minnie, mickey, back]);
  
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
    this.selectedCard = null;
    this.solvedPairs = []; //[21, 1, 2,....] list of partnerId
  }

  prepareCards(){

    this.cards.forEach((item) => {
      const parent = document.querySelector("#cards");
      const cardHTML = document.createElement("div");
      //Add name as an Id for the cardHTML
      cardHTML.id = item.name;
  

      cardHTML.innerHTML = `
      <div data-id="${item.partnerId}" class="card visible">
        <div class="flip-card-inner" >
          <div class="card-front card-look hidden">
            <img src="${item.image}" />
          </div>
          <div class="card-back card-look ">
            <img src="../img/back.png" />
          </div>
        </div>
      </div>`;



      cardHTML.addEventListener('click',  ()=>{
        const frontCard = cardHTML.querySelector(".card-front");
        const backCard = cardHTML.querySelector(".card-back");
        frontCard.classList.remove("hidden");
        backCard.classList.add("hidden");

        if (!!this.selectedCard){
          if(item.partnerId === this.selectedCard.partnerId){
            // when 2 cards match - you found the partner
            this.solvedPairs.push(item.partnerId);
            this.selectedCard = null;
          } else {
            // when 2 cards do match - you did not find the partner

            //Get name of selectedCard to look for a Div with the same Id (div id = name)
            let selectedName = this.selectedCard.name;
            this.selectedCard = null;
            // set Timeout to show the answer and hide it again
            setTimeout(function(){

              frontCard.classList.add("hidden")
              backCard.classList.remove("hidden");
              //Get DOM element that corresponds to the selectedCard object
              const tweety = document.querySelector(`#${selectedName}`);
              
              const frontCardTweety = tweety.querySelector(".card-front");
              const backCardTweety = tweety.querySelector(".card-back");

              //Hide DOM element that corresponds to the selectedCard object
              frontCardTweety.classList.add("hidden");
              backCardTweety.classList.remove("hidden");

              //reset selectedCard
              

            }, 1000);
            
          }
        } else {
          this.selectedCard = item; // first click - if there is no selected Card, add this card (item) to selectedCard variable 
        }
       
      });

      parent.appendChild(cardHTML);
    });
  }
  isMatch(card){
    this.selectedCard = card;
    console.log(card)
  }
  randomCards(){}

  startTimer(){}

  updateScore(){}

 /*  flipCard(){
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
  } */

  
}



/* gameOver()
victory() */



