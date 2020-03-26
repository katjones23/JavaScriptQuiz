// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and score

var startBtn = $("#startBtn")
var timeDisplay = $(".timer")
var timer = 0;

$(startBtn).click(function gameFn() {
    timer = 75;
    timeDisplay.text("Time: " + timer);

    var timerInterval = setInterval(intervalFn, 1000);

    function intervalFn() {
        timer--
        timeDisplay.text("Time: " + timer);
    }

})