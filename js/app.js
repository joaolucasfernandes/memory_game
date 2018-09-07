/**
 * Initializing variables
 */
let opened = [],
    matched = [],
    moves = 0,
    hours,minutes,seconds,
    totalTime = 0,
    firstMove = true,
    increment,
    ranking = 3,
    cardList = [
        "fa fa-diamond", "fa fa-diamond",
        "fa fa-paper-plane-o", "fa fa-paper-plane-o",
        "fa fa-anchor","fa fa-anchor",
        "fa fa-bolt","fa fa-bolt",
        "fa fa-cube", "fa fa-cube",
        "fa fa-leaf", "fa fa-leaf",
        "fa fa-bicycle", "fa fa-bicycle",
        "fa fa-bomb", "fa fa-bomb"
    ];

const movesCounter = document.querySelector('.moves'),
    board = document.querySelector(".deck"),
    starHTML = '<li><i class="fa fa-star"></i></li>',
    starsContainer = document.querySelector('.stars'),
    secondsOnTheScreen = document.querySelector("#seconds"),
    minutesOnTheScreen = document.querySelector("#minutes"),
    hoursOnTheScreen   = document.querySelector("#hours"),
    proRank = 10,
    mediumRank = 16,
    noobRank = 20; 

/**
 * @description Starting the game and shuffling the cards.
 */
function startGame(){
    activateResetFeature();
    createStar(3);
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
 * @description Structure to add stars to the star counter
 * @param {number} numberOfStars 
 */
function createStar(numberOfStars){
    starsContainer.innerHTML = "";
    for(var i = 0; i < numberOfStars; i++){
        const structure = document.createElement('li');
        structure.innerHTML = starHTML;
        starsContainer.appendChild(structure);
    }
}

/**
 * @description Adding events when clicking on the cards, like compare, changing CSS, and more...
 * @param {Element} card 
 */
function clickOnCards(card){
    card.addEventListener("click", function(){

        const currentCard = this;
        const previousCard = opened[0];

        if(firstMove){
            timerStart();
            firstMove = false;
        }

        if(opened.length === 1){
            card.classList.add("open", "show", "disable-card", "animated", "wobble");
            opened.push(this);
            compareCards(currentCard, previousCard);

        }else{
            currentCard.classList.add("open", "show", "disable-card", "animated", "wobble");
            opened.push(this);
        }
    }); 
}

/**
 * @description Comparing two opened cards
 * @param {Element} currentCard 
 * @param {Element} previousCard 
 */
function compareCards(currentCard, previousCard){
 
    if(currentCard.innerHTML === previousCard.innerHTML){
        
        currentCard.classList.add("match", "animated", "rubberBand");
        previousCard.classList.add("match", "animated","rubberBand");
        matched.push(currentCard, previousCard);
        opened = [];
        checkGameEnding();

    }else{
        
        setTimeout(function(){
            currentCard.classList.remove("open", "show", "disable-card", "animated", "wobble");
            previousCard.classList.remove("open", "show","disable-card", "animated", "wobble");
        }, 350);
        
        opened = [];

    }

    addMove();
}

/**
 * @description Check if the game has ended
 */
function checkGameEnding(){
    if(matched.length === cardList.length){
        setTimeout(function () {
            finishGame(moves, setRank(moves));
        }, 500);
    }
}

/**
 * @description Adding moves to the moves counter
 */
function addMove(){
    moves++;
    movesCounter.innerHTML = moves;
    setRank(moves);
}

/**
 * @description Restarting the game and reseting all related data
 */
function restartGame(){
    board.innerHTML = "";
    starsContainer.innerHTML = "";
    startGame();
    matched = [];
    moves = 0;
    movesCounter.innerHTML = "0";    
    hoursOnTheScreen.innerHTML = "00";
    minutesOnTheScreen.innerHTML = "00";
    secondsOnTheScreen.innerHTML = "00";
    stopTimer();
    firstMove = true;
    hours = 0;
    minutes = 0;
    seconds = 0;
    totalTime = 0;
}

/**
 * @description Set the rank of the player and create the correspondent stars
 * @param {number} moves 
 */
function setRank(moves) {
	if (moves > proRank && moves < mediumRank) {
		createStar(2);
		ranking = 2;
	} else if ((moves > mediumRank && moves < noobRank) || (moves > noobRank)) {
		createStar(1);
		ranking = 1;
	}
	return ranking;
};

/**
 * @description Finish the game and show the end game modal
 * @param {number} moves 
 * @param {number} score 
 */
function finishGame(moves, score) {
    stopTimer();
	swal({
		allowEscapeKey: false,
		allowOutsideClick: false,
		title: 'Congratulations! You Won!',
		text: 'With ' + moves + ' Moves and ' + score + ' Stars in ' + totalTime + ' seconds!',
		type: 'success',
		confirmButtonColor: '#02ccba',
		confirmButtonText: 'Play again!'
	}).then(function (isConfirm) {
		if (isConfirm) {
			restartGame();
		}
	})
}

/**
 * @description Activating "restart game" feature and adding events to restart button
 */
function activateResetFeature(){
    resetBtn = document.querySelector('.restart');
    resetBtn.addEventListener('click', function(){
        restartGame();
    });
}

/**
 * @description Start the timer
 */
function timerStart() {

    increment = setInterval(function() {

        totalTime += 1;

        calculateTime(totalTime);

        secondsOnTheScreen.innerHTML = seconds < 10 ? "0" + seconds : seconds;
        minutesOnTheScreen.innerHTML = minutes < 10 ? "0" + minutes : minutes;
        hoursOnTheScreen.innerHTML   = hours < 10 ? "0" + hours : hours;

    }, 1000);
   
}

/** 
 * @description Calculate time
 */
function calculateTime(totalTime) {
    hours   = Math.floor( totalTime / 60 / 60);
    minutes = Math.floor( (totalTime / 60) % 60);
    seconds = totalTime % 60;
}

/**
 * @description Stop the timer
 */
function stopTimer() {
    // Stop Timer
    clearInterval(increment);
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