const mainMenu = document.querySelector(".main-menu");
const clickableArea = document.querySelector(".clickable-area");
const message = document.querySelector(".clickable-area .message");


let timer;
let greenDisplayed;
let timeNow;

const init = () => {
    greenDisplayed = false;
};

init();

const setGreenColor = () => {
    clickableArea.style.backgroundColor = "#32cd32";
    message.innerHTML = "CLICK NOWWWW";
    message.style.color = "#111";
    greenDisplayed = true;
    timeNow = Date.now();
}

const startGame = () => {
    clickableArea.style.backgroundColor = "#c1121f";
    message.innerHTML = "Wait for green color";
    message.style.color = "#fff";


    let randomNumber = Math.floor(Math.random() * 3500 + 2000);
    timer = setTimeout(setGreenColor, randomNumber);
    
    console.log(randomNumber)
};

mainMenu.addEventListener("click", () => {
    mainMenu.classList.remove("active");
    startGame();
});

const displayReactionTime = (rt) => {
    clickableArea.style.backgroundColor = "#faf0ca";
    message.innerHTML = `<div class='reaction-time-text'>${rt} ms</div>Click to continue.
    `;
    greenDisplayed = false;
}

clickableArea.addEventListener("click", () => {
    if (greenDisplayed) {
        let clickTime = Date.now();
        let reactionTime = clickTime - timeNow;
        console.log("reaction time " + reactionTime);
        displayReactionTime(reactionTime);
        return;
    }
});