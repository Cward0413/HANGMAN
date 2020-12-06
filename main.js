$(document).ready(
    function () {

        //declare all variables that will be used globally
        var dictionary = ["consumer","remember","scramble","activate","remember","summit","switch","produce",
            "biography","adviser","magnitude","atmosphere","reluctance","trick","lunch","wheat"];
        var word = "";
        var placeholder = "";
        var wrongGuess = 0;
        var wordArray = [];
        var phArray = [];
        var alreadyGuessed = [];

        //start a new game when the page loads
        newGame()

        //add event handlers
        $("#ngButton").click(newGame);
        $("#guessButton").click(letterGuess);

        //all other functions (program logic)

        function newGame(){
            var wordIndex = Math.floor(Math.random() * (dictionary.length));
            word = dictionary[wordIndex].toLowerCase();
            placeholder = "";
            wrongGuess = 0;
            alreadyGuessed = [];

            for(i=0;i<word.length;i++){
                placeholder += "-";
            }

            wordArray = word.split("");
            phArray = placeholder.split("");

            $("#hiddenWord").text(placeholder);
            $("#hiddenWord").css("font-size","45px");
            $("#wGuesses").text("0")
            $("#letterGuesses").empty()
            $("#gameOver").empty();
        }

        //check if a users guess is correct or not
        function letterGuess(){
            event.preventDefault();

            var guess = $("#guessInput").val().toLowerCase();
            var pastGuesses = "";

            //check if the user already guessed this letter
            //replace the placeholder array with the letter if the guess was correct
            if(guess.length == 1 && guess != '') {
                if (!alreadyGuessed.includes(guess)) {
                    if (wordArray.includes(guess)) {
                        for (i = 0; i < wordArray.length; i++) {
                            if (guess == wordArray[i]) {
                                phArray[i] = guess;
                            }
                        }
                    } else
                        wrongGuess += 1;
                    $("#dupeGuess").empty();

                    if(!alreadyGuessed.includes(guess)) {
                        alreadyGuessed.push(guess);
                    }

                } else
                    $("#dupeGuess").text("You have already guessed that letter")
            }
            else
                $("#dupeGuess").text("Please enter 1 letter")

            //create strings from arrays to output to user
            pastGuesses = alreadyGuessed.join(", ");
            placeholder = phArray.join('');

            $("#letterGuesses").text(pastGuesses);
            $("#wGuesses").text(wrongGuess);
            $("#hiddenWord").text(placeholder);
            $("#hiddenWord").css("font-size","45px");

            if(placeholder == word){
                $("#gameOver").text("Congratulations! You Win!");
                $("#gameOver").css("color","green");
            }
            else if(wrongGuess == 6){
                $("#gameOver").text("Oh No! You Lost! Click New Game to try again.");
                $("#gameOver").css("color","red");
            }
        }

    }
)