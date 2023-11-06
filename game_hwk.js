// on page load -> generate game board;
window.onload = () => {
    console.log("Page Loaded");
    setRandomTileOrder(12);
    setTiles();
};

// global variable
let i = 0;
let clicks;
let timeScore;

/* start button initiates game and starts counter
   initiates game start on button press */
const startButton = document.getElementById("startGame");
startButton.addEventListener("click", startGame);

function startGame() {
    tiles.forEach(tile => tile.addEventListener("click", displayTile));
    resetTiles();
    startButton.disabled = true;
    console.log(randomOrderArray);
    startTimer();
}

// end button stops the game
document.getElementById('endGame').addEventListener("click", endGame);

function endGame() {
    const endTimer = () => {
        timeScore = document.getElementById("timer").innerText;
        console.log(timeScore);
        clearInterval(timer);
    };
    randomOrderArray = [];
    startButton.innerText = "New Game";
    startButton.disabled = false;
    endTimer();
    calculateScore();
}

// createRandom number function
const randomOrderArray = [];
const setRandomTileOrder = (numberOfTiles) => {
    while (randomOrderArray.length < numberOfTiles) {
        let randomNum = Math.round(Math.random() * (numberOfTiles - 1)) + 1;

        if (!randomOrderArray.includes(randomNum)) {
            randomOrderArray.push(randomNum);
        }
    }
};

// Set tiles variable for use throughout code
const tiles = document.querySelectorAll(".gametile");

const setTiles = () => {
    tiles.forEach(tile => {
        tile.innerHTML = randomOrderArray[i];
        i++;

        if (tile.innerText < 3) {
            tile.innerHTML = rocket;
            tile.setAttribute("icon", "rocket");
        } else if (tile.innerHTML < 5) {
            tile.innerHTML = bacteria;
            tile.setAttribute("icon", "bacteria");
        } else if (tile.innerHTML < 7) {
            tile.innerHTML = cocktail;
            tile.setAttribute("icon", "cocktail");
        } else if (tile.innerHTML < 9) {
            tile.innerHTML = football;
            tile.setAttribute("icon", "football");
        } else if (tile.innerHTML < 11) {
            tile.innerHTML = pizza;
            tile.setAttribute("icon", "pizza");
        } else if (tile.innerHTML < 13) {
            tile.innerHTML = kiwi;
            tile.setAttribute("icon", "kiwi");
        } else {
            console.log("Error: too many tiles");
        }
    });
};

// Timer Function -> starts timer when game is started and when game is completed or game is canceled.
let count;
let timer;

const startTimer = () => {
    clearInterval(timer); // clears timer before timer starts. This fixes the issue if the timer is triggered again when already running.
    count = 0;
    timer = setInterval(() => {
        count++;
        document.getElementById("timer").firstChild.innerText = count;

        // end timer when timer reaches 60. This displays "Game Over".
        if (count === 60) {
            clearInterval(timer);
            document.getElementById("timer").firstChild.innerText = "Game Over";
        }
    }, 1000);
};

const football = `<i class="fas fa-football-ball"></i>`;
const mask = `<i class="fas fa-ufo"></i>`;
const pizza = `<i class="fas fa-pizza-slice"></i>`;
const lightning = `<i class="far fa-bolt"></i>`;
const bulb = `<i class="fal fa-lightbulb"></i>`;
const rocket = `<i class="fas fa-rocket"></i>`;
const bacteria = `<i class="fas fa-bacterium"></i>`;
const kiwi = `<i class="fas fa-kiwi-bird"></i>`;
const cocktail = `<i class="fas fa-cocktail"></i>`;

let selectedTile = '';
let tileIcon;
const tileIcons = [];
const tileIds = [];

tiles.forEach(tile => tile.addEventListener("click", displayTile));
let n = 0;

const displayTile = (e) => {
    e.target.classList.remove("hideTile");
    e.target.classList.add("displayTile");

    tileIcon = e.target.getAttribute("icon");
    tileIcons.push(tileIcon);
    const tileId = e.target.getAttribute("id");
    tileIds.push(tileId);

    countMoves();

    if (tileIcons.length % 2 === 0) {
        checkMatch(tileIcons, tileIds, n);
        n = n + 2;
    }
};

const checkMatch = (tileIcons, tileIds, n) => {
    console.log(n);
    console.log(n + 1);
    if (tileIcons[n] !== tileIcons[n + 1]) {
        console.log("no match");
        setTimeout(() => {
            document.getElementById(tileIds[n + 1]).classList.remove("displayTile");
            document.getElementById(tileIds[n]).classList.remove("displayTile");
        }, 1000);
    } else {
        console.log("match");
        console.log(n);
        document.getElementById(tileIds[n]).style.backgroundColor = "green";
        document.getElementById(tileIds[n + 1]).style.backgroundColor = "green";
        document.getElementById(tileIds[n]).setAttribute("guess", "correct");
        document.getElementById(tileIds[n + 1]).setAttribute("guess", "correct");
        document.getElementById(tileIds[n]).removeEventListener("click", displayTile);
        document.getElementById(tileIds[n + 1]).removeEventListener("click", displayTile);
    }
};

const countMoves = () => {
    clicks = n;
    document.getElementById("clicks").firstChild.innerHTML = clicks;
};

const resetTiles = () => {
    tiles.forEach(tile => {
        tile.style.backgroundColor = "#44445a";
        tile.removeAttribute("state");
        tile.classList.remove("hideTile");
        tile.classList.remove("displayTile");
    });
};
