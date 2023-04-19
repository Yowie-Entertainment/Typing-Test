// these create variables that represent the divs / objects in the HTML.
// These can be changed manipulated using javascript
const mainMenu = document.querySelector(".main-menu");
const clickableArea = document.querySelector(".clickable-area");
const message = document.querySelector(".clickable-area .message");
const endScreen = document.querySelector(".end-screen");

//initize variables
let timer;
let greenDisplayed;
let timeNow;
let waitingForStart;
let waitingForGreen;
let scores;

//the starting screen that is called initially
const init = () => {
    greenDisplayed = false;
    waitingForStart = false;
    waitingForGreen = false;
    scores = [];
};

init();

//function that sets the green screen
const setGreenColor = () => {
    //.style changes the css of the variable
    clickableArea.style.backgroundColor = "#32cd32";
    //.innerHTML actually changes the div text
    message.innerHTML = "CLICK NOWWWW";
    message.style.color = "#111";
    greenDisplayed = true;
    //starts "timer"
    timeNow = Date.now();
}

const startGame = () => {
    clickableArea.style.backgroundColor = "#c1121f";
    message.innerHTML = "Wait for green color";
    message.style.color = "#fff";


    let randomNumber = Math.floor(Math.random() * 2000 + 1500);
    timer = setTimeout(setGreenColor, randomNumber);
    waitingForStart = false;
    waitingForGreen = true;
    console.log(randomNumber);
};

mainMenu.addEventListener("click", () => {
    mainMenu.classList.remove("active");
    startGame();
});

const endGame = () => {
    endScreen.classList.add("active");
    clearTimeout(timer);

    let total = 0;
    scores.forEach((s) => {
        total += s;
    })

    let averageScore = Math.round(total / scores.length);
    console.log("Total" + total);
    console.log("average score: " + averageScore)
};

const displayReactionTime = (rt) => {
    clickableArea.style.backgroundColor = "#faf0ca";
    message.innerHTML = `<div class='reaction-time-text'>${rt} ms</div>Click to continue.`;
    greenDisplayed = false;
    waitingForStart = true;
    scores.push(rt);
    console.log("scores " + scores)

    if (scores.length >= 5) {
        endGame();
    }
}

const displayTooSoon = () => {
    clickableArea.style.backgroundcolor = "#faf0ca";
    message.innerHTML = "Too soon. Click to contuneu";
    message.style.color = "#111";
    waitingForStart = true;
    clearTimeout(timer);
}

clickableArea.addEventListener("click", () => {
    if (greenDisplayed) {
        let clickTime = Date.now();
        let reactionTime = clickTime - timeNow;
        console.log("reaction time " + reactionTime);
        displayReactionTime(reactionTime);
        return;
    }

    if (waitingForStart) {
        startGame();
        return;
    }

    if (waitingForGreen) {
        displayTooSoon();
    }
});