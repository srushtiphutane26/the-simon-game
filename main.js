var array = ["red", "blue", "yellow", "green"];
var gamePattern = [];
var userClickedPattern = [];


var buttons = document.querySelectorAll(".btn");
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", handleClick);
}
var isGameStarted = false;
var level = 0;


document.addEventListener('keydown', startGame);
document.getElementById("start").addEventListener("click", startGame);

function startGame() {
    if (!isGameStarted) {
        $("#level-title").text("Level " + level);
        nextSequence();
        isGameStarted = true;
    }
}

function handleClick() {
    if (isGameStarted) {
        var userChosenColor = this.id;
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(userClickedPattern.length - 1);
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var num = Math.floor(Math.random() * 4);
    var randomChosenColor = array[num];
    gamePattern.push(randomChosenColor);

    // Show animation
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

}

function playSound(name) {
    // Play Audio
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over!");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    isGameStarted = false;
}