var openedCards = [];
var deck = document.querySelector('.deck');
var timer = document.querySelector('.timer');
var stars = [...document.querySelectorAll('.fa-star')];
var moves = 0;
var starsNo = 3;
var time = 0;
var minutes = 0;
var seconds = 0;
var timerValue = 0;
var matchedCards = 0;
var timerOn = false;

/*
 * Create a list that holds all of your cards
 */
var cardList = [...document.querySelectorAll('.deck li')];
startGame();

document.querySelector('.fa-repeat').addEventListener('click',resetGame);

/*
 * Display the cards on the page
 *  - shuffle the list of cards using the provided "shuffle" method below
 *  - loop through each card and create its HTML
 *  - add each card's HTML to the page
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
deck.addEventListener('click',function() {
 var card = event.target;
 if (validClick(card)){
   if (timerOn == false) {
     timerOn = true;
     startTimer();
   }
   addToOpenCards(card);
   moves++;
   document.querySelector('.moves').innerHTML = moves;
 }
 if (openedCards.length == 2){
   checkMatch();
 }
 if (moves == 20 || moves == 40){
   reduceStar();
 }
 if (matchedCards == (cardList.length/2)){
   youWin();
 }
});

function startGame() {
  shuffle(cardList);
  for (card of cardList){
    deck.appendChild(card);
  }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function validClick(card) {
  return (card.classList.contains('card') && !card.classList.contains('open') && openedCards.length <= 2);
}

function addToOpenCards(card) {
  card.classList.add('open','show');
  openedCards.push(card);
}

function checkMatch() {
  if (openedCards[0].innerHTML === openedCards[1].innerHTML) {
    openedCards[0].classList.add('match', 'animated', 'bounce');
    openedCards[1].classList.add('match', 'animated', 'bounce');
    clearOpenedCards();
    matchedCards++;
  }
  else {
    openedCards[0].classList.add('unmatch', 'animated', 'shake');
    openedCards[1].classList.add('unmatch', 'animated', 'shake');
    setTimeout(function () {
      openedCards[0].classList.remove('open', 'show', 'unmatch', 'animated', 'shake');
      openedCards[1].classList.remove('open', 'show', 'unmatch', 'animated', 'shake');
      clearOpenedCards();
    },500);
  }
}

function clearOpenedCards() {
  openedCards = [];
}

function reduceStar() {
  starsNo--;
  for (star of stars){
    if (star.style.display != 'none'){
      star.style.display = 'none';
      break;
    }
  }
}
function startTimer() {
  timerValue = setInterval(function() {
    time++;
    minutes = Math.floor(time/60);
    seconds = Math.floor(time%60);
    if (seconds<10){
      timer.innerHTML = `${minutes}:0${seconds}`;
    }
    else{
       timer.innerHTML = `${minutes}:${seconds}`;
    }
  },1000);
}

function resetGame() {
  moves = 0;
  time = 0;
  minutes = 0;
  seconds = 0;
  document.querySelector('.moves').innerHTML = 0;
  document.querySelector('.timer').innerHTML = '00:00';
  for (card of cardList) {
    card.className = 'card';
  }
  for (star of stars) {
    star.style.display = '';
  }
  stopTimer();
  startGame();
}

function stopTimer() {
  clearInterval(timerValue);
  timerOn = false;
}


var modal = document.querySelector('.modal');
var closeButton = document.querySelector('.close');
var replayButton = document.querySelector('.replay');

function youWin() {
  stopTimer();
  document.querySelector('.totalMoves').innerHTML = `Moves: ${moves}`;
  document.querySelector('.totalStars').innerHTML = `Stars: ${starsNo}`;
  document.querySelector('.totalTime').innerHTML = "Time: "+ document.querySelector('.timer').innerHTML;
  toggleModal();
}

function toggleModal() {
    modal.classList.toggle('show-modal');
}

closeButton.addEventListener('click', function() {
  toggleModal();
});

replayButton.addEventListener('click', function() {
  toggleModal();
  resetGame();
})
