window.addEventListener("load", function () {
  const playButton = document.querySelector("#play");
  const startButton = document.querySelector("#start");
  const gameOverButton = document.querySelector("#over");
  const winButton = document.querySelector("#win");

  const splashScreen = document.querySelector("#splash-screen");
  const gameScreen = document.querySelector("#game-screen");
  const gameOverScreen = document.querySelector("#gameover");
  const winScreen = document.querySelector("#win-screen");

  // Create cards - card name = image name (line 56)
  const sylvester = generateCard (1, "sylvester");
  const tweety = generateCard (1, "tweety");
  const minnie = generateCard (2, "minnie");
  const mickey = generateCard (2, "mickey");
  const back = generateCard (3, "back");

  // Create game instance
  const game = new Game([sylvester, tweety, minnie, mickey, back]);
  /* console.log(sylvester); */
  
  // Switch among different screens
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


class Game {
  constructor(cards=[],time=60, score=0) {
    this.cards = cards;
    this.timeRemaining = time;
    this.scoreCounting = score;
    this.time = document.querySelector(".time span");
    this.score = document.querySelector(".score span");
    this.selectedCard = null; // typeof = Object
    this.solvedPairs = []; //[21, 1, 2,....] list of partnerId
  }
  
  prepareCards(){
    this.cards.forEach((item) => {    // item represents one item (object) in array of Cards
      const parent = document.querySelector("#cards");
      const cardHTML = document.createElement("div");
      
      //Add name as an Id for the cardHTML
      cardHTML.id = item.name;
      cardHTML.classList.add("card");

      cardHTML.innerHTML = `
        <div class="flip-card-inner" >
          <div class="card-front card-look hidden">
            <img src="${item.image}" />
          </div>
          <div class="card-back card-look ">
            <img src="../img/back.png" />
          </div>
        </div>
      `;

      cardHTML.addEventListener('click', () => {
        //GET DOM element that corresponds to item//
        const frontCard = cardHTML.querySelector(".card-front");
        const backCard = cardHTML.querySelector(".card-back");
        frontCard.classList.remove("hidden");
        backCard.classList.add("hidden");
        ////////
         
        //Check if clicked card (item) is already solved.
        // If its solved, return
        if (this.solvedPairs.includes(item.partnerId)){
          console.log("CARD ALREADY SOLVED");
          return;
        }
        //TODO: Add 1 point to this.score
        
        console.log(item.partnerId);

        //
        if (!!this.selectedCard){ // Check if selectedCard exists, if it is not empty
           //GET DOM elemenet that corresponds to  selectedCard
        const selectedCardDOM = document.querySelector(`#${this.selectedCard.name}`);
              
        const frontSelectedCard = selectedCardDOM.querySelector(".card-front");
        const backCSelectedCard = selectedCardDOM.querySelector(".card-back");
        //
          // item is the second (actual) card I am clicking on
          // compare actual card (item) with the first card I added to selectedCard (card looking for a pair)
          if(item.partnerId === this.selectedCard.partnerId){ 
            console.log("you found the pair");
            // when 2 cards match - you found the partner
            this.solvedPairs.push(item.partnerId);
            frontCard.classList.add("solved"); // add class to the item
            frontSelectedCard.classList.add("solved");
            this.selectedCard = null; // reset the cards, so I can compare another 2 cards I will click on (new selection)
          } else {
            console.log("you failed");
            // when 2 cards do not match - you did not find the partner

            //Get name of selectedCard to look for a Div with the same Id (div id = name) ???
           // let selectedName = this.selectedCard.name; // selectedName para no pelearse con this en la línea 118
            this.selectedCard = null;
            // set Timeout to show the answer and hide it again
            setTimeout(function(){

              frontCard.classList.add("hidden");
              backCard.classList.remove("hidden");
              //Get DOM element that corresponds to the selectedCard object

              //Hide DOM element that corresponds to the selectedCard object
              frontSelectedCard.classList.add("hidden");
              backCSelectedCard.classList.remove("hidden");

              //reset selectedCard

            }, 1000);
            
          }
        } else {
          this.selectedCard = item; // first click - if there is no selected Card, add this card (item) to selectedCard variable --> so then I will be able to compare it with the second Card I will click on.
        }
       
      });

      parent.appendChild(cardHTML);
    });
  }


  randomCards(){
    // Math.floor(Math.random())
    // Randomize items in array this.cards
  }
  

  startTimer(){}
  

  /*
  gameOver()
  victory() */
  
}







