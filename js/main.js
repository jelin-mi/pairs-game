window.addEventListener("load", function () {
  const playButton = document.querySelector("#play");
  const startButton = document.querySelector("#start");
  const playAgainButton = document.querySelector("#play-again");
  const splashScreen = document.querySelector("#splash-screen");
  const gameScreen = document.querySelector("#game-screen");
  const gameOverScreen = document.querySelector("#gameover");
  const winScreen = document.querySelector("#win-screen");

  // Create cards - card name = image name (line 45)
  const sylvester = generateCard (1, "sylvester");
  const tweety = generateCard (1, "tweety");
  /* const coyote = generateCard (2, "coyote");
  const roadrunner = generateCard (2, "roadrunner");
  const bunny = generateCard (3, "bunny");
  const cazador = generateCard (3, "cazador");
  const marvin_marciano = generateCard (4, "marvin_marciano");
  const pato_lucas = generateCard (4, "pato_lucas");
  const speedy_gonzalez = generateCard (5, "speedy_gonzalez");
  const slowpoke = generateCard (5, "slowpoke"); */

  // Create game instance
  let game = new Game([sylvester, tweety], new Chronometer());
  

  // Switch among different screens
  playButton.addEventListener("click", function () {
    splashScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
  // Start GAME 
    
  });

  startButton.addEventListener("click", function () {
    startButton.classList.add("hidden");
    gameScreen.classList.remove("hidden");

    game.prepareCards();





  });

  playAgainButton.addEventListener("click", function () {
    winScreen.classList.add("hidden"); 
//  HOW TO RESET THE CARDS ??
//  HOW TO RESET THE TIME ??     
    
    gameScreen.classList.remove("hidden");
    startButton.classList.remove("hidden");
    game = new Game ([sylvester, tweety], new Chronometer());
    game.prepareCards();
    // location.reload(); --> refresh the entire page
    // clearInterval(game);
  });
    // reload();
});


function generateCard(partnerId, name) {
  return {
    partnerId: partnerId,
    name: name,
    image: `../img/${name}.png`
  }; 
}

class Game {
  constructor(cards = [],chrono, counter = 10) {
    this.cards = cards;
    this.counter = counter;
    this.intervalId = null;
    this.selectedCard = null;
    this.solvedPairs = [];
    this._shuffle();
    this.chrono = chrono

  }

  printTime() {
    setInterval(() => {
      const min = this.chrono.getMinutes();
      const sec = this.chrono.getSeconds();
      console.log(min, sec);
    
    }, 1000);
  }
  
  prepareCards(){
    this.chrono.start();
    this.printTime();
    const parent = document.querySelector("#cards");
    parent.innerHTML = "";
    this.cards.forEach((item) => {  
      
      const cardHTML = document.createElement("div");
      
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
        const frontCard = cardHTML.querySelector(".card-front");
        const backCard = cardHTML.querySelector(".card-back");
        frontCard.classList.remove("hidden");
        backCard.classList.add("hidden");
         
        if (this.solvedPairs.includes(item.partnerId)){
          console.log("CARD ALREADY SOLVED");
          return;
        }
        console.log(item.partnerId);

        if (!!this.selectedCard){
        const selectedCardDOM = document.querySelector(`#${this.selectedCard.name}`);
        const frontSelectedCard = selectedCardDOM.querySelector(".card-front");
        const backCSelectedCard = selectedCardDOM.querySelector(".card-back");
        
          if(item.partnerId === this.selectedCard.partnerId){ 
            console.log("YOU FOUND THE PAIR");
            this.solvedPairs.push(item.partnerId);

            setTimeout(function(){
              frontCard.classList.add("solved");   
              frontSelectedCard.classList.add("solved");
            }, 1000);
            this.selectedCard = null; 

            // MOVE TO THE WIN SCREEN
            if (this.solvedPairs.length == (this.cards.length/2)) {
              const gameScreen = document.querySelector("#game-screen");
              const winScreen = document.querySelector("#win-screen");
              setTimeout(function(){
                winScreen.classList.remove("hidden");
                gameScreen.classList.add("hidden");
              }, 2000);
              console.log("WINNER");
              clearInterval(this.intervalId); // resetear el timer
            }

          } else {
            console.log("YOU FAILED");

            this.selectedCard = null;
            setTimeout(function(){
              frontCard.classList.add("hidden");
              backCard.classList.remove("hidden");
              frontSelectedCard.classList.add("hidden");
              backCSelectedCard.classList.remove("hidden");
            }, 1000);
          }

        } else {
          this.selectedCard = item;
        }
      });
      parent.appendChild(cardHTML);
    });
  }

  _shuffle() {
    let currentIndex = this.cards.length,  randomIndex;
  
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [this.cards[currentIndex], this.cards[randomIndex]] = [
       this.cards[randomIndex], this.cards[currentIndex]];
    }
  }
  
  // startCountDown(){
  //   // when click on start button --> start counting the Time down, starting at 60 seconds.
  //   // when counter = 0, show Gameover screen

  //   const that = this;
  //   const startButton = document.querySelector("#start");

  //   this.intervalId = setInterval(function(){
  //     const id = document.querySelector("#countdown");
  //     id.innerHTML = that.counter;

  //     startButton.addEventListener('click', () => {  
  //         that.counter--;
  //     });

  //     if(that.counter <= 9){
  //       "0" + that.counter;
  //     } else that.counter+"";

  //     if (that.counter === 0){
  //       const gameScreen = document.querySelector("#game-screen");
  //       const gameOverScreen = document.querySelector("#gameover");
  //       gameOverScreen.classList.remove("hidden");
  //       gameScreen.classList.add("hidden");
  //     }

  //   }, 1000);


  // }


}