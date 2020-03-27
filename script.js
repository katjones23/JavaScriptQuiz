// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and score

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

    var timerInterval = setInterval(intervalFn, 1000);

    function intervalFn() {
        timer--;
        timeDisplay.text("Time: " + timer);

        if (timer === 0) {
            clearInterval(timerInterval);
        };
    };

    quizFn();

});

//grab index of question randomly
function questionRandom() {
    i = (Math.floor(Math.random() * questionArr.length));
    return i;
};


function quizFn() {
    questionRandom();

    //add text of question to div
    $(header).text(questionArr[i].question);
    $(header).css("font-size", "30px");

    //add text to buttons if that question has that answer choice
    if (questionArr[i].answers.a !== null) {
        $(choicea).text("a. " + questionArr[i].answers.a);
        $("#btn0").attr("data-answer", "a");
        $("#btn0").css("display", "block");
    };
    if (questionArr[i].answers.b !== null) {
        $(choiceb).text("b. " + questionArr[i].answers.b);
        $("#btn1").attr("data-answer", "b");
        $("#btn1").css("display", "block");
    };
    if (questionArr[i].answers.c !== null) {
        $(choicec).text("c. " + questionArr[i].answers.c);
        $("#btn2").attr("data-answer", "c");
        $("#btn2").css("display", "block");
    };
    if (questionArr[i].answers.d !== null) {
        $(choiced).text("d. " + questionArr[i].answers.d);
        $("#btn3").attr("data-answer", "d");
        $("#btn3").css("display", "block");
    };

    $(".btn").click(function userChoice() {
        var userPick = $(this).attr("data-answer");

        if (userPick === questionArr[i].correctAnswer) {
            $(result).text("Correct!");
        } else {
            $(result).text("Wrong!");
        };
    })

    questionArr[i].splice(i, 1,)
}

// answers: {
//     a: "Yes",
//     b: "No",
//   },
//   correctAnswer: "a"