class Chronometer {
    constructor(initialTime = 10) {
      this.currentTime = initialTime;
      this.intervalId = null;
    }
    start(){
        const that = this;
        this.intervalId = setInterval(function(){
            that.currentTime--;
      }, 1000);
    }
  
    // arrow function
  /*   start(callback){
      this.intervalId = setInterval(() => {
        this.currentTime++;
      }, 1000);
    }  */
    
    getMinutes() {
      let minutes = Math.floor(this.currentTime / 60);
      return minutes;
    }
    getSeconds() {
      let seconds = (this.currentTime % 60);
      return seconds;
    }
    computeTwoDigitNumber(value) {
      if (value <= 9) {
        return "0" + value;
      } else return value+"";
    }
    stop() {
      clearInterval(this.intervalId);
    }

    reset() {
      return this.currentTime = 0;
    }
  
    split() {
      return this.computeTwoDigitNumber(this.getMinutes()) + ':' + this.computeTwoDigitNumber(this.getSeconds());
    }
  }