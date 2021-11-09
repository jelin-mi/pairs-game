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

  // Create game instance
  const game = new Game([sylvester, tweety, minnie, mickey]);
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
  constructor(cards = [], time = 60, score = 0) {
    this.cards = cards;
    this.timeRemaining = time;    // this needs to be added to the game
    this.scoreCounting = score;    // this needs to be added to the game
    this.time = document.querySelector(".time span");     // this needs to be added to the game
    this.score = document.querySelector(".score span");     // this needs to be added to the game: every click adds 1 to the Score
    this.selectedCard = null;    // typeof = Object
    this.solvedPairs = [];    //[8, 1, 2,...] list of partnerId
    this._shuffle();
  }
  
  prepareCards(){
    this.cards.forEach((item) => {    // item represents one item (object) in array of Cards
      const parent = document.querySelector("#cards");
      const cardHTML = document.createElement("div");
      
      //Add a name as an Id for the cardHTML, so we can differentiate the cards
      cardHTML.id = item.name;
      // console.log(`This is item: ${item}`);   // --> [object Object]
      // console.log(`This is item.name: ${item.name}`);   // --> sylvester
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
        //Get DOM element that corresponds to the item
        const frontCard = cardHTML.querySelector(".card-front");
        const backCard = cardHTML.querySelector(".card-back");
        frontCard.classList.remove("hidden");
        backCard.classList.add("hidden");
         
        //Check if the clicked card (item) is already solved. --> If it's solved, return
        if (this.solvedPairs.includes(item.partnerId)){
          console.log("CARD ALREADY SOLVED");
          return;
        }
        // NEXT STEP --> Add 1 point to this.score
        
        console.log(item.partnerId);

        if (!!this.selectedCard){ // Check if selectedCard exists, if it is not empty = there is already 1 card with which one I can do a comparison - if there is a match or not
        //GET DOM elemenet that corresponds to  selectedCard
        const selectedCardDOM = document.querySelector(`#${this.selectedCard.name}`);
        console.log(`this is this.selectedCard.name: ${this.selectedCard.name}`);
        console.log(`this is an item name: ${item.name}`);
        const frontSelectedCard = selectedCardDOM.querySelector(".card-front");
        const backCSelectedCard = selectedCardDOM.querySelector(".card-back");
        
          // item is the second (actual) card I am clicking on
          // compare actual card (item) with the first card I added to selectedCard (the card looking for a pair)
          if(item.partnerId === this.selectedCard.partnerId){ 
            console.log("you found the pair");
            // when 2 cards match - you found the partner
            this.solvedPairs.push(item.partnerId);
            
            setTimeout(function(){
              frontCard.classList.add("solved");     // add class to the item = white bg for the moment
              frontSelectedCard.classList.add("solved");
            }, 1000);
            
            this.selectedCard = null; 
            
            // reset the cards, so I can compare another 2 cards I will click on (new selection)
          } else {
            console.log("you failed");
            // when 2 cards do not match - you did not find the partner

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

  _shuffle() {
    let currentIndex = this.cards.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [this.cards[currentIndex], this.cards[randomIndex]] = [
        this.cards[randomIndex], this.cards[currentIndex]];
    }
  }
  // Randomize items in array this.cards
  // randomCards(){




  //   this.cards.forEach(() => {
  //     let randomCard = this.cards[Math.floor(Math.random() * this.cards.length-1)];
  //     });

  //     console.log(randomCard);
  //     return randomCard;
  //   // let itemRandom = this.cards[Math.floor(Math.random(item) * this.cards.length)];
  //   // let item = this.cards(itemRandom);
  // }

   /*  for (let i = this.cards.length - 1; i > 0; i--) {
      const randomCard = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[randomCard]] = [this.cards[randomCard], this.cards[i]];
    } */
    /* 
    this.cards = this.cards.map((card, index) => {
      card.style.order = index;
  }); */
    /* const randomCard = this.cards[Math.floor(Math.random() * this.cards.length-1)]; */
   //  this.cards.sort();
    
  

 /*  shuffleCards(cardsArray) {
    for (let i = cardsArray.length - 1; i > 0; i--) {
        const randIndex = Math.floor(Math.random() * (i + 1));
        [cardsArray[i], cardsArray[randIndex]] = [cardsArray[randIndex], cardsArray[i]];
    }
    cardsArray = cardsArray.map((card, index) => {
        card.style.order = index;
    }); */


  

  startTimer(){}
  

  /*
  gameOver()
  victory()
  
  ADD PLAY AGAIN BUTTON
  */
  
}







