'use strict';

const checkButton = document.querySelector(".check");

let randomNumber = Math.floor(Math.random()*20);
const body = document.querySelector("body");
const message = document.querySelector(".message");
const againButton = document.querySelector(".again");
console.log(randomNumber);
const score = document.querySelector(".score");
const highestScore = document.querySelector(".highscore");
const scoreDictionary = {
    "Score": score.textContent,
    "Highscore": highestScore.textContent,
}
const input = document.querySelector(".guess");
againButton.addEventListener("click",function(){
    score.textContent = "20";
    highestScore.textContent = "0";
    input.value = "";
    message.textContent = "Start guessing"
    document.body.style.backgroundColor = "#222";
    randomNumber = Math.floor(Math.random()*20);
})
checkButton.addEventListener("click", function() {
    console.log("clicked");
    document.body.style.backgroundColor = "#222";
    const userNumber = parseInt(input.value);
    console.log(userNumber);
    if (isNaN(userNumber)) {
        alert("Please enter valid number");

    } else if(userNumber <1) {
        alert("Please enter valid number");
    }
    else if (userNumber > 20){
        alert("Please enter valid number");
    }
    else if (userNumber === randomNumber) {
        message.textContent = "You Win!";
        console.log(scoreDictionary.Score)
        if (scoreDictionary.Highscore < scoreDictionary.Score) {
            scoreDictionary.Highscore = scoreDictionary.Score;
            highestScore.textContent = scoreDictionary.Highscore;
        }
        document.body.style.backgroundColor = "green";
        randomNumber = Math.floor(Math.random()*20);

    } else if (userNumber> randomNumber) {
        message.textContent = "Too High!";
        scoreDictionary.Score -= 1
        score.textContent = scoreDictionary.Score;
    } else if (userNumber < randomNumber) {
        message.textContent = "Too Low!";
        scoreDictionary.Score -= 1
        score.textContent = scoreDictionary.Score;
    }
})
