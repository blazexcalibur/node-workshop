/*
Number guessing game!

Create a file called number-guessing-game.js.

In this file, re-write your number guessing game (from the basic javascript workshop) for the command line!

Instead of using prompt and alert, you will have to use capabilities from NodeJS and any external module. 
HINT: there is an npm library called prompt that can help you with that :)

Save/commit/push
*/

var prompt = require('prompt');
var request = require('request');

var randNum = Math.round(Math.random() * 10);
var guessHistory = [];
var guess = 0;

function numGuessGame() {
    prompt.get('guess', function(err, answers) {
        if (err) {
            console.log('there was an error');
        }
        else {
            console.log(answers.guess);
            
            
                if (Number(answers.guess) > randNum) {
                    console.log("Your guess is too high.  Please pick a smaller number.");
                    guessHistory.push(Number(answers.guess));
                    guess++;
                    if (guess === 4) {
                        console.log("The answer was " + randNum + " Your guesses were " + guessHistory)
                        return;
                    }
                    if (guess < 4) {
                        return numGuessGame();
                    }
                    else {
                        return;
                    }
                }
                if (Number(answers.guess) < randNum) {
                    console.log("Your guess is too low.  Please pick a bigger number.");
                    guessHistory.push(Number(answers.guess));
                    guess++;
                    if (guess === 4) {
                        console.log("The answer was " + randNum + " Your guesses were " + guessHistory)
                        return;
                    }
                    if (guess < 4) {
                        return numGuessGame();
                    }
                    else {
                        return;
                    }
                }
                if (Number(answers.guess) === randNum) {
                    console.log("You've guessed right!");
                    return;
                }
            }
        
    })
}
numGuessGame()
