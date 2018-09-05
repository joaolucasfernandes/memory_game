/*
* Creating the cardlist
*/
let cardList = [
    "fa fa-diamond", "fa fa-diamond",
    "fa fa-paper-plane-o", "fa fa-paper-plane-o",
    "fa fa-anchor","fa fa-anchor",
    "fa fa-bolt","fa fa-bolt",
    "fa fa-cube", "fa fa-cube",
    "fa fa-leaf", "fa fa-leaf",
    "fa fa-bicycle", "fa fa-bicycle",
    "fa fa-bomb", "fa fa-bomb"
];

/**
 * Initializing variables. This includes: opened cards, matched cards, moves counter, moves counter on the screen and the board that the cards are disposed.
 */
let opened = [];
let matched = [];
let moves = 0;
const movesCounter = document.querySelector('.moves');
const board = document.querySelector(".deck");
const starHTML = '<li><i class="fa fa-star"></i></li>';
const starsContainer = document.querySelector('.stars');

/**
 * Starting the game and shuffling the cards.
 */
function startGame(){
    activateResetFeature();
    shuffledCards = shuffle(cardList);
    for(let i = 0; i < shuffledCards.length; i++){
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `<i class="${shuffledCards[i]}"></i>` ;
        board.appendChild(card);
        clickOnCards(card);   
    }
}

/**
 * Rating function 
 */
function rating(moves){
   if(moves <= 10 && matched.length >= 2){
       createStar();
   }
}

/**
 * Structure to add stars to the star counter
 */
function createStar(){
    const structure = document.createElement('li');
    structure.innerHTML = '<i class="fa fa-star"></i>';
    starsContainer.appendChild(structure);
}

/**
 * Adding events when clicking on the cards
 */
function clickOnCards(card){
    card.addEventListener("click", function(){

        const currentCard = this;
        const previousCard = opened[0];

        if(opened.length === 1){
            
            card.classList.add("open", "show", "disable-card");
            opened.push(this);
            compareCards(currentCard, previousCard);

        }else{
            currentCard.classList.add("open", "show", "disable-card");
            opened.push(this);
        }
    }); 
}

/**
 * Comparing two opened cards
 */
function compareCards(currentCard, previousCard){
 
    if(currentCard.innerHTML === previousCard.innerHTML){
        
        currentCard.classList.add("match");
        previousCard.classList.add("match");
        matched.push(currentCard, previousCard);
        opened = [];
        checkGameEnding();

    }else{
        
        // wait 500 milliseconds to close the card after a mismatch
        setTimeout(function(){
            currentCard.classList.remove("open", "show", "disable-card");
            previousCard.classList.remove("open", "show","disable-card");
        }, 150);
        
        opened = [];

    }

    addMove();
}

/**
 * Check if the game has ended
 */
function checkGameEnding(){
    if(matched.length === cardList.length){
        alert("Game Over!!");
        restartGame();
    }
}

/**
 * Adding moves to the moves counter
 */
function addMove(){
    moves++;
    movesCounter.innerHTML = moves;
    rating(moves);
}

/**
 * Restarting the game and reseting all related data
 */
function restartGame(){
    board.innerHTML = "";
    starsContainer.innerHTML = "";
    startGame();
    matched = [];
    moves = 0;
    movesCounter.innerHTML = "0";    
}

/**
 * Activating "restart game" feature and adding events to restart button
 */
function activateResetFeature(){
    resetBtn = document.querySelector('.restart');
    resetBtn.addEventListener('click', function(){
        restartGame();
    });
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

startGame();