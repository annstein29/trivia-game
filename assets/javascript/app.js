var questions = {
    "Q1": {
        question: "Who unwittingly gives Hermione permission to take Most Potente Potions out of the Restricted Section in the library?",
        answers: ["Professor McGonagall", "Professor Lockhart", "Professor Flitwick", "Professor Dumbledore"],
        correct: "Professor Lockhart"
    },
    "Q2": {
        question: "What is the symbol for Hufflepuff house?",
        answers: ["A Badger", "An Eagle", "A Lion", "A Snake"],
        correct: "A Badger"
    },
    "Q3": {
        question: "How much gold do the Weasleys win in the annual Daily Prophet Grand Prize Galleon Draw in Harry Potter and the Prisoner of Azkaban?",
        answers: ["Eight Hundred Galleons", "Seven Thousand Galleons", "Seven Hundred and Ten Sickles", "Seven Hundred Galleons"],
        correct: "Seven Hundred Galleons"
    },
    "Q4": {
        question: "How does Felix Felicis behave when in the cauldron?",
        answers: ["It Spills Over the Sides", "It Bubbles Merrily", "Droplets Whizz Through the Air at Speed", "Droplets Leap Out Like Goldfish Above the Surface"],
        correct: "Droplets Leap Out Like Goldfish Above the Surface"
    },
    "Q5": {
        question: "What is the location of the Order of the Phoenix headquarters?",
        answers: ["Number Four, Privet Drive", "Shell Cottage", "Spinner's End", "Number Twelve, Grimmauld Place"],
        correct: "Number Twelve, Grimmauld Place"
    },
    "Q6": {
        question: "Which birthday does Harry celebrate in Harry Potter and the Philosopher's Stone?",
        answers: ["Tenth", "Eleventh", "Twelfth", "Thirteenth"],
        correct: "Eleventh"
    },
    "Q7": {
        question: "Where do Harry's aunt and uncle live?",
        answers: ["Little Hangleton", "Little Whinging", "Hogsmeade", "Godric's Hollow"],
        correct: "Little Whinging"
    },
    "Q8": {
        question: "What was Tom Riddle's mother's maiden name?",
        answers: ["Riddle", "Clearwater", "Peverell", "Gaunt"],
        correct: "Gaunt"
    },
    "Q9": {
        question: "What creatures feed on positive human emotions?",
        answers: ["Mermaids", "Boggarts", "Grindylows", "Dementors"],
        correct: "Dementors"
    },
    "Q10": {
        question: "Who replaces Cornelius Fudge as Minister for Magic?",
        answers: ["Rufus Scrimgeour", "Arthur Weasley", "Kingsley Shacklebolt", "Remus Lupin"],
        correct: "Rufus Scrimgeour"
    }
}

var numQuestions = Object.keys(questions).length;
var indexArr = [];
var count = 0;
var randomIndex = 0;
var randomKey = function() { return "Q" + randomIndex };
var currentQuestion = function() { return questions[randomKey()] };
var timeout = null;
var qCorrect = 0;
var qIncorrect = 0;

var QUESTION_TIME = 15 * 1000;
var RESULT_TIME = 3 * 1000;

$(document).ready(function () {
    startGame();

    function pickQuestion() {
        clearPage();
        if (count === numQuestions) {
            showResults();
        } else {
            getRandomIndex();
            showQuestion();
        }
    }

    function getRandomIndex() {
        randomIndex = (Math.floor(Math.random() * numQuestions) + 1);
        if (indexArr.indexOf(randomIndex) == -1) {
            indexArr.push(randomIndex);
        } else {
            getRandomIndex();
        }
    }

    function showQuestion() {
        timeout = setTimeout(incorrect, QUESTION_TIME);

        $(".choices").show();
        $("#question").html(currentQuestion().question);

        $("#answer1").html(currentQuestion().answers[0])
        $("#answer2").html(currentQuestion().answers[1])
        $("#answer3").html(currentQuestion().answers[2])
        $("#answer4").html(currentQuestion().answers[3])
    }

    function gradeResponse() { 
        console.log("gradeResponse called");
        var self = this;
        clearTimeout(timeout);
        $(".choices").hide();
        showAnswer(self);
    }

    function showAnswer(answer) {
        console.log("showAnswer called and the answer was ");
        if ($(answer).html() === currentQuestion().correct) {
            console.log("correct");
            correct();
        } else {
            console.log("incorrect");
            incorrect();
        }
    }

    function nextQuestion() {
        clearTimeout(timeout);
        count++;
        $("#winLose").html("");
        pickQuestion();
    }

    function correct() {
        qCorrect++;
        $("#winLose").html("Congrats, you got it right!");
        console.log("qCorrect == " + qCorrect);
        timeout = setTimeout(nextQuestion, RESULT_TIME);
    }

    function incorrect() {
        qIncorrect++;
        $(".choices").hide();
        $("#winLose").html("FAIL!")
            .append("<h3>" + `The correct answer was: ${currentQuestion().correct}` + "</h3>");
        console.log("qIncorrect == " + qIncorrect);
        timeout = setTimeout(nextQuestion, RESULT_TIME); 
    }

    function clearPage() {
        $("#welcome").empty();
        $("#instructions").empty();
        $("#question").empty();
        $("#answer1").html("");
        $("#answer2").html("");
        $("#answer3").html("");
        $("#answer4").html("");
        $("#result").empty();
        $("#correct").empty();
        $("#incorrect").empty();
        $("#winLose").empty();
    }

    function startGame() {
        clearPage();
        $("#welcome").html("Welcome to Harry Potter Trivia!");
        $("#instructions").html("<div>Try your luck!</div")
            .append("<div>You will have 15 seconds to answer each question</div>")
            .append("<div>If the clock runs out you get the question wrong!</div>")
            .append("<div>10 questions total.</div>")
            .append("<div>Good Luck!!</div>")
            .append("<button class='btn btn-primary' id='startBtn' name='Start Game'>Start Game</button>");
        $("#startBtn").on("click", pickQuestion);
        $("#answer1").on("click", gradeResponse);
        $("#answer2").on("click", gradeResponse);
        $("#answer3").on("click", gradeResponse);
        $("#answer4").on("click", gradeResponse);
        indexArr = [];
        numQuestions = Object.keys(questions).length;
        count = 0;
        randomIndex = 0;
        timeout = null;
        qCorrect = 0;
        qIncorrect = 0;
    }

    function showResults() {
        clearPage();
        if (qCorrect > qIncorrect) {
            $("#result").html("Congratulations! You Won!");
        } else {
            $("#result").html("Sorry, you didn't get enough correct...");
        }
        $("#correct").html(`You got: ${qCorrect} correct!`);
        $("#incorrect").html(`You got: ${qIncorrect} wrong :(`);
        timeout = setTimeout(startGame, RESULT_TIME);
    }
});