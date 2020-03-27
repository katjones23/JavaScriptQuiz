var startBtn = $("#startBtn");
var timeDisplay = $(".timer");
var header = $(".header");
var questionsEl = $(".questions");
var choicea = $("#choicea");
var choiceb = $("#choiceb");
var choicec = $("#choicec");
var choiced = $("#choiced");
var result = $(".result");

var timer = 0;
var i = 0;

//storing questions and answers
var questionArr = [
    {
        question: "Is JavaScript a case-sensitive language?",
        answers: {
            a: "Yes",
            b: "No",
            c: "It depends",
            d: "Maybe"
        },
        correctAnswer: "a"
    },
    {
        question: "Which of the following is true about cookie handling in JavaScript?",
        answers: {
            a: "JavaScript can manipulate cookies using the cookie property of the Document object.",
            b: "JavaScript can read, create, modify, and delete the cookie or cookies that apply to the current web page.",
            c: "Both of the above.",
            d: "None of the above."
        },
        correctAnswer: "c"
    },
    {
        question: "Which of the following is correct about callbacks?",
        answers: {
            a: "A callback is a plain JavaScript function passed to some method as an argument or option.",
            b: "Some callbacks are just events, called to give the user a chance to react when a certain state is triggered.",
            c: "Both of the above.",
            d: "None of the above."
        },
        correctAnswer: "c"
    },
    {
        question: "Which built-in method returns the calling string value converted to upper case?",
        answers: {
            a: "toUpperCase()",
            b: "toUpper()",
            c: "changeCase(case)",
            d: "None of the above."
        },
        correctAnswer: "a"
    },
    {
        question: "Which of the following function of Boolean object returns a string containing the source of the Boolean object?",
        answers: {
            a: "toSource()",
            b: "valueOf()",
            c: "toString()",
            d: "None of the above."
        },
        correctAnswer: "a"
    },
    {
        question: "Which of the following function of String object extracts a section of a string and returns a new string?",
        answers: {
            a: "slice()",
            b: "split()",
            c: "replace()",
            d: "search()"
        },
        correctAnswer: "a"
    },
    {
        question: "Which of the following function of String object creates an HTML anchor that is used as a hypertext target?",
        answers: {
            a: "anchor()",
            b: "link()",
            c: "blink()",
            d: "big()"
        },
        correctAnswer: "a"
    },
    {
        question: "Which of the following function of String object causes a string to be displayed as struck-out text, as if it were in a <strike> tag?",
        answers: {
            a: "sup()",
            b: "small()",
            c: "strike()",
            d: "sub()"
        },
        correctAnswer: "c"
    },
    {
        question: "Which of the following function of Array object joins all elements of an array into a string?",
        answers: {
            a: "concat()",
            b: "join()",
            c: "pop()",
            d: "map()"
        },
        correctAnswer: "b"
    },
    {
        question: "Which of the following function of Array object removes the first element from an array and returns that element?",
        answers: {
            a: "reverse()",
            b: "shift()",
            c: "slice()",
            d: "some()"
        },
        correctAnswer: "b"
    },
];

// start timer and quiz
$(startBtn).click(function startFn() {
    $(startBtn).hide();
    $("p").hide();

    timer = 75;
    timeDisplay.text("Time: " + timer);

    timerInterval = setInterval(intervalFn, 1000);

    function intervalFn() {
        timer--;
        timeDisplay.text("Time: " + timer);

        if (timer === 0) {
            clearInterval(timerInterval);
            $(header).text("Game over!")
            $(questionsEl).hide();
            $(result).hide();
            $("p").text("Your score: " + timer)
                .css("display", "block")
            highscore();
        };
        return timerInterval;
    };

    shuffleArray(questionArr);
    quizFn();

});

//grab index of question randomly
// function questionRandom() {
//     i = (Math.floor(Math.random() * questionArr.length));
//     return i;
// };

// Durstenfeld shuffle to shuffle array via stackoverflow
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


function quizFn() {

        if (i >= questionArr.length) {
            clearInterval(timerInterval);
            $(header).text("Game over!")
            $("p").text("Your score: " + timer)
                .css("display", "block")
            $(questionsEl).hide();
            $(result).hide();
            highscore();
        } else {
        var question = questionArr[i].question;
        var answerA = questionArr[i].answers.a
        var answerB = questionArr[i].answers.b
        var answerC = questionArr[i].answers.c
        var answerD = questionArr[i].answers.d

        //add text of question to div
        $(header).text(question);
        $(header).css("font-size", "30px");
    
        //add text to buttons
        $(choicea).text("a. " + answerA);
        $("#btn0").attr("data-answer", "a");
        $("#btn0").css("display", "block");
    
        $(choiceb).text("b. " + answerB);
        $("#btn1").attr("data-answer", "b");
        $("#btn1").css("display", "block");
    
        $(choicec).text("c. " + answerC);
        $("#btn2").attr("data-answer", "c");
        $("#btn2").css("display", "block");
    
        $(choiced).text("d. " + answerD);
        $("#btn3").attr("data-answer", "d");
        $("#btn3").css("display", "block");
        
        return;
    }
}

$(".answerBtn").click(function userChoice(event) {

    event.stopPropagation();
    var correctAnswer = questionArr[i].correctAnswer
    var userPick = $(this).attr("data-answer");

    if (userPick === correctAnswer) {
        $(result).text("Correct!");
        timer = timer + 10;
    } else {
        $(result).text("Wrong!");
        if (timer < 11) {
            clearInterval(timerInterval);
            $(header).text("Game over!")
            $("p").text("Your score: " + timer)
                .css("display", "block")
            $(questionsEl).hide();
            $(result).hide();
            highscore();
            return;
        } else {
            timer = timer - 10;
        }
        
    };

    setTimeout(nextQuestion, 1000);
});

function nextQuestion() {
    i++
    console.log(i);
    $(result).text("");
    quizFn();
};

var highscores = [];

//based off todos activity
function highscore() {
    $(".enterScore").css("display", "block");

    function storeHs() {
        localStorage.setItem("highscores", JSON.stringify(highscores));
    }

    $(".hsBtn").click(function submitScore(event) {
        event.preventDefault();

        var score = timer;
        var initials = $("input:text").val();

        var scoreInitials = (initials + " " + score);

        highscores.push(scoreInitials);
        initials = "";

        storeHs();

        location.href = "./highscore.html";
    })
}


var hsInput = $("#initials");
var hsList = $(".listHS");

init();


function renderHs() {
    $(hsList).html("");

    for (var k = 0; k < highscores.length; k++) {
        var highscore = highscores[k];

        var li = $("<li>");
        
        $(li).text(highscore);
        $(li).attr("data-index", k);
        
        $(hsList).append(li);
    }
}


function init() {
    var storedHs = JSON.parse(localStorage.getItem("highscores"));

    if (storedHs !== null) {
        highscores = storedHs;
    }

    renderHs();
}

$("#clear").click(function clearStorage() {
    localStorage.clear();

    $(hsList).html("");
})