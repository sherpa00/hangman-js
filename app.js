
const wordEl = document.getElementById("word");
const wrongWordsEl = document.getElementById("wrong-letters");

const popup = document.getElementById("popup-container");
const finalMesg = document.getElementById("final-message");
const playAgain  = document.getElementById("play-button");

const notification = document.getElementById("notification-container");
const lives = document.querySelector(".lives");

const words = ["money","computer","human","meat","teacup","hacker","ghost","father","mother","java","javascript","python","swift","coin","aeroplane","vechile","motorbike","notebook","island","kitchen","table","bedroom","programmng","telecommunication","reconnaissance","authorized","telephone","technicians"];

const selectedWord = words[Math.floor(Math.random() * words.length)];

const wrongLettersList = [];
const correctLetterList = [];
var totalLive = 13;

for (let i = 0; i < selectedWord.length; i++) {
    correctLetterList.push("_");
}

if (selectedWord.length >= 7) {
    for (let i = 0; i < 4; i++) {
        let rand = Math.floor(Math.random() * selectedWord.length);
        correctLetterList[rand] = selectedWord[rand];
    }
} else {
    for (let i = 0; i < 2; i++) {
        let rand = Math.floor(Math.random() * selectedWord.length);
        correctLetterList[rand] = selectedWord[rand];
    }
}

//function to display the word
function displayWord() {
    wordEl.innerHTML = correctLetterList.join("");

    //if word is correct show won popup
    if (selectedWord == wordEl.innerHTML) {
        showPopup("Congrats ! You Won.");
        document.querySelector("body").style.background = "lightgreen";

    }
}

//function to display wrong letter;
function displayWrongLetter() {
    wrongWordsEl.innerHTML = wrongLettersList;

    if (wrongLettersList.length >= 13) {
        showPopup("Unfortunately ! You Lost.")
        document.querySelector("body").style.background = "crimson";
    }
}

//adding the letter from user
document.addEventListener("keydown", (e) => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        let letter = e.key;

        for (let i = 0; i < selectedWord.length ; i++) {
            if (selectedWord[i] === letter) {
                correctLetterList[i] = letter;
            } else {
                if (wrongLettersList.indexOf(letter) < 0 && correctLetterList.indexOf(letter) < 0) {
                    wrongLettersList.push(letter);
                    totalLive -= 1;
                    lives.innerHTML = totalLive;
                    displayWrongLetter();
                }
            }
        }

        /*
        if (selectedWord.indexOf(letter) >= 0) {
            for (let i of selectedWord) {
                if (i === letter) {
                    correctLetterList[selectedWord.indexOf(letter)] = letter;
                    displayWord();
                }
            }
        } else {
            if (wrongLettersList.indexOf(letter) < 0) {
                wrongLettersList.push(letter);
                displayWrongLetter();
            }
        }
        */

        displayWord();
        displayWrongLetter();
    }
});


//sbow popup
function showPopup(msg) {
    finalMesg.innerHTML = msg;
    popup.style.top = "-300px";
}

//show notification of repeated letters
function showNotification() {
    notification.style.left = "0";
    setTimeout(() => {
        notification.style.left = "-1000px";
    },3000);
}

//play again btn function
playAgain.addEventListener("click",() => {
    location.reload();
})

displayWord();