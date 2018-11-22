/*
 * Global Variables
 */

const icons = ['fa fa-diamond', 'fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-bolt', 'fa fa-cube', 'fa fa-cube', 'fa fa-leaf', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bicycle', 'fa fa-bomb', 'fa fa-bomb'];
const deck = document.querySelector(".deck");

let openCard = [];


// Initialize the Memory Game and create the cards


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

init();

//Click event on cards

let FClick = true;

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

let matchedCards = [];

function compare(currentCard, prevCard) {
    if (currentCard.innerHTML === prevCard.innerHTML) {
        //Cards Match
        currentCard.classList.add("match");
        prevCard.classList.add("match");
        matchedCards.push(currentCard, prevCard);
        openCard = [];

    } else {
        //Cards don't match
        setTimeout(function() {
            currentCard.classList.remove("open", "show", "disabled");
            prevCard.classList.remove("open", "show", "disabled");
        }, 500);
        openCard = [];
    }
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

//Check if the game is over
function gameOver() {
    if (matchedCards.length === icons.length) {
        stopTimer();
        showModal();
    }
}


//Moves

const movesBox = document.querySelector(".moves");
let moves = 0;
movesBox.innerHTML = `0 Moves`;

function addMoves() {
    moves++;
    movesBox.innerHTML = `${moves} Moves`;
    rating();
}

// Game Rating

const starsNum = document.querySelector(".starsNum");
let stars = 3;
starsNum.innerHTML = stars;

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


//Reseting the  game

function resetGame() {
    
    //reset all variables
    deck.innerHTML = "";
    openCard = [];
    matchedCards = [];
    moves = 0;
    movesBox.innerHTML = `0 Moves`;
    starsNum.innerHTML = 3;
    
    //reset timer
    resetTimer();
    //remove false from first click to start again
    FClick = true;
    
    //create new cards game
    init();
}

// Creating Reset Button
const resetB = document.querySelector(".restart");
resetB.addEventListener("click", function() {
    stopTimer();
    resetGame();
})

//Setting timer section

const timer = document.querySelector('.timer');
let currentTimer;
let min = 0;
let sec = 0;

function setTimer() {
    timer.innerHTML = `<i class='fa fa-clock-o'></i> ${min}:${sec}`;
    sec++;

    if (sec <= 9) {
        sec = '0' + sec;
    }
    if (sec === 60) {
        min++;
        sec = 0;
    }
}

function startTimer() {
    currentTimer = setInterval(setTimer, 1000);
}

function stopTimer() {
    clearInterval(currentTimer);
}

function resetTimer() {
    sec = 0;
    min = 0;
    timer.innerHTML = `<i class='fa fa-clock-o'></i> ${min}:${sec}`;
}

/*Creating Modal*/

const modalBox = document.querySelector('.modalBox');
const Message = document.querySelector('.Message');
const Replay = document.querySelector('.Replay');

function showModal() {
    modalBox.classList.remove("hide");
    Message.innerHTML = `
        <p>It took you ${moves} moves<br>
        and ${min}:${sec} minutes<br>
        to finish this game and your score is  ${stars} stars </p>
    `;
}

//Replay Button
Replay.addEventListener("click", function() {
    resetGame();
    hideModal();
})

function hideModal() {
    modalBox.classList.add("hide");
}
