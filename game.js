var buttoncolors = ["red", "blue", "green", "yellow"];
var gamepattern = [];
var userClickedPattern = [];
var started = false;

var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
  }
});
$(".btn").click(function() {
  var userChoosenColor = this.id;
  userClickedPattern.push(userChoosenColor);
  playSound(userChoosenColor);
  animatePress(userChoosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentlevel) {
  if (userClickedPattern[currentlevel] === gamepattern[currentlevel]) {
    console.log = ("success");
    if (userClickedPattern.length === gamepattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {

    console.log = ("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game over try again");
    startover();
  }
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("level " + level);



  var randomnumber = Math.floor(Math.random() * 4);

  var randomChoosenColor = buttoncolors[randomnumber];

  gamepattern.push(randomChoosenColor);

  $("#" + randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChoosenColor);

}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);

}
function startover(){
  level = 0;
  gamepattern = [];
  started = false;
}
