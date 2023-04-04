const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let count = 0;

cards.forEach(card => card.addEventListener('click', flipCard));

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
  count++;

  if(count == 8 ){
    start();
    stop();
    document.getElementById('cong').style.display='block'  
  }
  
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
    card.classList.add('flip');
  });
  flipCards();
})();

function flipCards() {
  cards.forEach(card => {
    setTimeout(() => {
      card.classList.remove('flip');  
    }, 2000);
  });
}



const start = () => {
  setTimeout(function() {
      confetti.start()
  }, 100);
};


const stop = () => {
  setTimeout(function() {
      confetti.stop()
  }, 200000); 
};

