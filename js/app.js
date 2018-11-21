/*
 * Global Variables
 */
const icons = ['fa fa-diamond', 'fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-bolt', 'fa fa-cube', 'fa fa-cube', 'fa fa-leaf', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bicycle', 'fa fa-bomb', 'fa fa-bomb'];
const deck = document.querySelector(".deck");
const resetB = document.querySelector(".restart");
const movesContainer = document.querySelector(".moves");
const timer = document.querySelector('.timer');
const Message = document.querySelector('.Message');
const starsNumber = document.querySelector(".starsNumber");
let stars = 3;
let openCard = [];
let matchedCards = [];
let moves = 0;
let currentTimer;
let minute = 0;
let second = 0;
let FClick = true;




//Initialize game and create the cards

function init() {
    shuffle(icons);

    for (let i = 0; i < icons.length; i++) {
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `<i class="${icons[i]}"></i>`;
        deck.appendChild(card);
        click(card);
    }
}



//Click event on cards
function click(card) {

    card.addEventListener("click", function() {
        if (FClick) {
            startTimer();
            FClick = false;
        }
        const currentCard = this;
        const prevCard = openCard[0];
        //check if there is any card selected 
        if (openCard.length === 1) {
            //open card
            card.classList.add("open", "show", "disabled");
            openCard.push(this);
            compare(currentCard, prevCard);
            addMoves();
        } else {
            //No open card
            card.classList.add("open", "show", "disabled");
            openCard.push(this);
        }
    });
}

//Compare the 2 cards that are selected
// if the cards do match, lock the cards in the open position 
//if the cards do not match, remove the cards from the list and hide the card's symbol
function compare(currentCard, prevCard) {
    if (currentCard.innerHTML === prevCard.innerHTML) {
        //Cards Match
        currentCard.classList.add("match");
        prevCard.classList.add("match");
        matchedCards.push(currentCard, prevCard);
        openCard = [];
        //check if the game it is finished
        //gameOver();

    } else {
        //Cards don't match
        setTimeout(function() {
            currentCard.classList.remove("open", "show", "disabled");
            prevCard.classList.remove("open", "show", "disabled");
        }, 500);
        openCard = [];
    }
}

//check if the game is over
function gameOver() {
    if (matchedCards.length === icons.length) {
        stopTimer();
        showModal();
    }
}

//moves
movesContainer.innerHTML = `0 Moves`;

function addMoves() {
    moves++;
    movesContainer.innerHTML = `${moves} Moves`;
    rating();
}

//Rating
starsNumber.innerHTML = stars;

function rating() {
    if (moves < 20) {
        stars = 3;
    } else if (moves < 25) {
        stars = 2;
    } else {
        stars = 1;
    }
    starsNumber.innerHTML = stars;
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Reset game
function resetG() {
    //reset all variables
    deck.innerHTML = "";
    openCard = [];
    matchedCards = [];
    moves = 0;
    movesContainer.innerHTML = `0 Moves`;
    starsNumber.innerHTML = 3;
    //reset timer
    resetTimer();
    //remove false from first click to start again
    FClick = true;
    //create new cards game
    init();
}

//Reset Button
resetB.addEventListener("click", function() {
    stopTimer();
    resetG();
})

//Setting timer section
function setTimer() {
    timer.innerHTML = `<i class='fa fa-clock-o'></i> ${minute}:${second}`;
    second++;

    if (second <= 9) {
        second = '0' + second;
    }
    if (second === 60) {
        minute++;
        second = 0;
    }
}

function startTimer() {
    currentTimer = setInterval(setTimer, 1000);
}

function stopTimer() {
    clearInterval(currentTimer);
}

function resetTimer() {
    second = 0;
    minute = 0;
    timer.innerHTML = `<i class='fa fa-clock-o'></i> ${minute}:${second}`;
}


// Initialize the Memory Game
init();
