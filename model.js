class Timer {
    constructor () {
      this.isRunning = false;
      this.startTime = 0;
      this.overallTime = 0;
    }
  
    _getTimeElapsedSinceLastStart () {
      if (!this.startTime) {
        return 0;
      }
    
      return Date.now() - this.startTime;
    }
  
    start () {
      if (this.isRunning) {
        return console.error('Timer is already running');
      }
  
      this.isRunning = true;
  
      this.startTime = Date.now();
    }
  
    stop () {
      if (!this.isRunning) {
        return console.error('Timer is already stopped');
      }
  
      this.isRunning = false;
  
      this.overallTime = this.overallTime + this._getTimeElapsedSinceLastStart();
    }
  
    reset () {
      this.overallTime = 0;
  
      if (this.isRunning) {
        this.startTime = Date.now();
        return;
      }
  
      this.startTime = 0;
    }
  
    getTime () {
      if (!this.startTime) {
        return 0;
      }
  
      if (this.isRunning) {
        return this.overallTime + this._getTimeElapsedSinceLastStart();
      }
      
      return this.overallTime;
    }
  }


let interval;
let timer = new Timer();
let butpot;
function init(){
    let button = document.getElementById("5");

    let buttons = document.getElementsByClassName("button");

    for(let but of buttons){
        but.addEventListener("click", reacted);
        but.style.background = "red";
    }
    timer.reset();
    button.textContent = 3;
    interval = setInterval(countdown, 1000);

}

function countdown(){
    let button = document.getElementById("5");

    let counter = parseInt(button.textContent);
    let time = Math.floor((Math.random() * 1000) + 1);

    counter--;
    button.textContent = counter;
    if (counter == 0){
        button.textContent = "Go";
        clearInterval(interval);
        setTimeout(react, time);
    }
}

function react(){
    let id = Math.floor((Math.random() * 9) + 1);
    let but = document.getElementById(id);
    butpot = id;
    timer.start();
    but.style.background = "green";
}

function reacted(ev){
    let button = document.getElementById("5");
    let buttons = document.getElementsByClassName("button");
    let chosen;
    for(let but of buttons){
        if(but.id == ev.target.id){
            chosen = but;
            break;
        }
    }
    
    if(chosen.id == butpot){
        timer.stop();
        button.textContent = timer.getTime() + "ms";  
    }
    else{
        button.textContent = "Incorrect position";
    }

    setTimeout(function(){
      if(confirm("Play Again?")){
        init();
      }
    }, 1000);
    

}
