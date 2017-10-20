$(document).ready(function() {

	var wins = 0;
    var losses = 0;

	function hangGame() {

    var hangmanGame = {

        words: ["elephant", "walrus", "two dogs", "fox", "salamander", "cat", "dog", "condor", "ardvark", "ant eater", "fruit bat"],
        alphabet: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
        // words: ["two dogs"],

        wordInPlay: null,
        lettersOfTheWord: [],
        editedLettersOfWord: [],
        matchedLetters: [],
        guessedLetters: [],
        guessesLeft: 0,
        totalGuesses: 0,
        letterGuessed: null,
        
        filledInLetters: 0,
        gameComplete: false,

        setUpGame: function() {
            console.log("run game set up");

            $(".on-complete").hide();

            $(".guessed-letters").empty();
            this.gameComplete = false;
            // console.log(this.gameComplete);
            this.guessesLeft = 0;
            this.totalGuesses = 0;
            this.matchedLetters = [];
            this.guessedLetters = [];
            this.filledInLetters = 0;
            this.lettersOfTheWord = [];
            this.editedLettersOfWord = [];

            //selects a word from the answer array.
            this.wordInPlay = this.words[Math.floor(Math.random() * this.words.length)];

            // splits the word puts it into an array.
            this.lettersOfTheWord = this.setUpWordArray(this.wordInPlay);

            //setUpArrayForAnswer function removes redundant letters, since in hangman, letteres only need to be guess once. Helps comparing later.
            this.editedLettersOfWord = this.setUpArrayForAnswer(this.lettersOfTheWord);
            console.log(this.lettersOfTheWord);

            //converts word to dashes to be displayed.
            this.constructWordView();

            //constructs number of guesses the users gets, based on letters in word. Guesses < 12, or it would be to easy for user to force through game
            this.setGuesses();



        },

        // splits the word puts it into an array.
        setUpWordArray: function(word) {


            return word.split("");
        },

        //converts word to dashes to be displayed.
        constructWordView: function() {


            var publicWord = "";

            for (var i = 0; i < this.lettersOfTheWord.length; i++) {
                if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) !== -1 && this.lettersOfTheWord[i] !== " ") {
                    publicWord += this.lettersOfTheWord[i];
                } else if (this.lettersOfTheWord[i] === " ") {
                    publicWord += " ";
                } else {
                    publicWord += "_";
                }
            }

            $(".public-word").html(publicWord);

        },


        // checks the user input against key press
        rightGuess: function(letter) {

            if (this.matchedLetters.indexOf(letter) === -1) {

                this.matchedLetters.push(letter);
            } else {
                console.log("already played letter!");
            }
            // this.checkResults();




        },

        wrongGuess: function(letter) {
            

            if (this.guessedLetters.indexOf(letter) === -1 && this.alphabet.indexOf(letter) !== -1) {
                this.guessedLetters.push(letter);
                this.guessesLeft--;
                // this.checkResults();
            } else {
                console.log("already played letter!");

            }

        },

        verifyInputofUser: function(letter) {

            if (this.lettersOfTheWord.indexOf(letter) !== -1) {

                this.rightGuess(letter);
            } else {
                this.wrongGuess(letter);
            }

            // this.checkForProperInput(letter.key);

            // this.checkResults();
        },

        setGuesses: function() {

            var origLength = this.lettersOfTheWord.length

            if (this.lettersOfTheWord.indexOf(" ")) {

                origLength--;
            }


            if (origLength > 6) {

                this.totalGuesses = 11;
                this.guessesLeft = this.totalGuesses;

            } else {

                this.totalGuesses = origLength + 5;
                this.guessesLeft = this.totalGuesses;

            }

        },

        checkResults: function() {

            if (this.guessesLeft === 0) {
            	this.gameComplete = true;
            	losses ++;
                console.log(" game lost!");
                // this.setUpGame();
                this.finishGameFunction();
            } else if (this.matchedLetters.length === this.editedLettersOfWord.length) {
                console.log("game won! ");
                this.gameComplete = true;
                wins++;
                // this.setUpGame();
                this.finishGameFunction();
            }

        },

        displayGame: function() {

            var guessString = "";
            if (this.guessedLetters) {
                guessString = this.guessedLetters[0];

                for (var i = 1; i < this.guessedLetters.length; i++) {
                    guessString += ", " + this.guessedLetters[i];
                }
            }


            $(".guesses-left").empty();

            if (guessString) {
                $(".guessed-letters").html("Letters Guessed: " + guessString);
            }

            $(".guesses-left").append("Guesses Left: " + this.guessesLeft);
            // $(".guessed-letters").html(this.guessedLetters);
            // for (var i = 0; i < this.guessedLetters.length ; i++) {
            // 	$(".guessed-letters").append( " " + this.guessedLetters[i])
            // }

            $(".wins").html("Wins: " + wins);
            $(".losses").html("Losses: " + losses);

        },

        setUpArrayForAnswer: function(arr) {

            var i;
            var len = arr.length;
            var out = [];
            var obj = {};


            for (i = 0; i < len; i++) {
                obj[arr[i]] = 0;
            }
            for (i in obj) {

                if (i !== " ") {
                    out.push(i);
                }
            }

            return out;

        },

        finishGameFunction: function() { 	

        	$(".on-complete").show();

        	var publicWord = "";

            for (var i = 0; i < this.lettersOfTheWord.length; i++) {
                
                    publicWord += this.lettersOfTheWord[i];
                } 

                console.log("finishGameFunction");
            
            $(".public-word").html(publicWord);

            // setInterval(function(){}, 3000);

            event = null;

            document.onkeyup = function(event) {

            	if (event) {
            		event = null;
            		hangmanGame.gameComplete = false;
            		hangGame();

            	}
            }
    }



        






        //}
    };

    hangmanGame.setUpGame();
    hangmanGame.constructWordView();

    //at t his point, letters of word has a randomly chosen word in it, guess letters is empty, matched letters is empty


    if (hangmanGame.gameComplete === false ) {
    document.onkeyup = function(event) {

        // if (hangmanGame.alphabet.indexOf(event.key) !== -1) {

        hangmanGame.letterGuessed = event;
        hangmanGame.verifyInputofUser(hangmanGame.letterGuessed.key);
        console.log(hangmanGame.matchedLetters.length);
        console.log(hangmanGame.editedLettersOfWord.length);
        hangmanGame.checkResults();
        hangmanGame.constructWordView();
        hangmanGame.displayGame();
    }

    }
}

hangGame();
});