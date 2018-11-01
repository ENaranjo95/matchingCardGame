const char = ['one', 'one', 'two', 'two', 'three', 'three', 'four', 'four', 'five', 'five'];
const restart = document.getElementById('restart')
const cards = document.getElementsByClassName('card')
const cardArray = Array.from(cards)

restart.addEventListener('click', function(){
  newGame.restart()
});

cardArray.forEach(function(el, i){
  el.addEventListener("click",function(e){
    if(newGame.gameState.timeoutID !== null){
      e.stopPropagation()
    }else{
      if(newGame.gameState[i].value === 'one'){
        this.style.backgroundImage = 'url(img/yugi.jpg)';
      }
      if(newGame.gameState[i].value  === 'two'){
        this.style.backgroundImage = 'url(img/kaiba.jpeg)';
      }
      if(newGame.gameState[i].value  === 'three'){
        this.style.backgroundImage = 'url(img/dark.jpg)';
      }
      if(newGame.gameState[i].value  === 'four'){
        this.style.backgroundImage = 'url(img/blue.jpg)';
      }
      if(newGame.gameState[i].value  === 'five'){
        this.style.backgroundImage = 'url(img/puzzle.jpg)';
      }
      if(newGame.gameState.prev === null){
        newGame.gameState.prev = i
      }else{
        newGame.gameState.timeoutID = setTimeout( newGame.match, 2000, newGame.gameState.prev, i)
      }
    }
  })
});

class Matching {
  constructor(){
    this.gameState = {}
  }
  startGame(){
    this.gameState['prev'] = null
    this.gameState['timeoutID'] = null
    const arr = this.shuffle(char)
    cardArray.forEach( (el, i) => {
      this.gameState[`${i}`] = {
        "value": arr[i],
        "matched": false
      }
    });
    console.log(this.gameState)
  }

  match(prev, i){
    console.log(this.gameState)
    if(this.gameState[`${prev}`].value === this.gameState[`${i}`].value){
      this.gameState[`${prev}`].matched = true
      this.gameState[`${i}`].matched = true
      console.log(this.gameState)
    }else{
      cards[prev].style.backgroundImage = 'url(../images/cover.jpeg)';
      cards[i].style.backgroundImage = 'url(../images/cover.jpeg)';
    }
    this.gameState.prev = null
    this.gameState.timeoutID = null
  }

  shuffle(arr){
    let currentIndex = arr.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = arr[currentIndex];
      arr[currentIndex] = arr[randomIndex];
      arr[randomIndex] = temporaryValue;
    }
    return arr;
  }

  restart(){
    cardArray.forEach(function(el){
      el.style.backgroundImage = 'url(img/back.jpeg)';
    });
    this.gameState = {}
    this.gameState.prevCard = null
    this.startGame()
  }
}

let newGame = new Matching
console.log(newGame)
newGame.startGame()
