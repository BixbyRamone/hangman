$(document).ready(function() {

var words = ["elephant", "walrus", "two dogs"];
var selector = randomSelector();
var playWord = chooseFromArray(words, selector);
var hiddenWord = "";

// playWord = splitWord(playWord);
console.log(playWord);

hiddenWord = hideWord(playWord);
console.log(hiddenWord);
displayPuzzle(hiddenWord);
playWord = playWord.split("");


document.onkeyup = function(event) {

	console.log(event.key);
	var input = event.key

	checkInput(input);	
}

function checkInput(letter) {

	console.log(playWord);

	if (playWord.indexOf(letter)) {

		var indexes = [];
		var i = -1;
		console.log(i);
    while ((i = playWord.indexOf(letter, i+1)) && !== -1){
    	console.log(i);
        indexes.push(i);

		console.log(indexes);
	}

}
}


function randomSelector() {

	var rand = Math.floor(Math.random() * 3 );

	return rand;
}




function chooseFromArray(array, select) {

	return array[select];

}


function hideWord(word) {

var hiddenWordArray = [];

	for (var i = 0; i < word.length; i++) {
		
		if (word[i] !== " ") {
			hiddenWord += "_ ";
			hiddenWordArray.push("_");
		} else {
			hiddenWord += "  ";
			hiddenWordArray.push(" ");

		}
	}
	console.log(hiddenWord);
	console.log(hiddenWordArray);
	return hiddenWordArray;
}

function displayPuzzle(word) {


	for (var i = 0; i < word.length; i++) {
		console.log(word[i]);
		$(".puzzle-view").append(word[i]);
	}
	
}

});