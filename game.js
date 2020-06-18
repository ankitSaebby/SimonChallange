
//--------------------------game color array-------------------------------------------------------------
var buttonColors=["red","blue","green","yellow"];
//==============array for game pattern===================================================
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;


$(document).click(function(){
  if(!started){
    nextSequence();
    $("#level-title").text("Level "+level);
    started=true;
  }
});

$(document).keypress(function(){
  if(!started){
    nextSequence();
    $("#level-title").text("Level "+level);
    started=true;
  }
});

$(".btn").click(function(){

  var userChosenColor=$(this).attr("id");  
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animationPress(userChosenColor);

  checkAnswer(userClickedPattern.length-1);
});

function animationPress(name){
  $("#"+name).addClass("pressed");
  setTimeout(function () {
    $("#" + name).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if(userClickedPattern.length===gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
    
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");

    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}

function nextSequence(){

  userClickedPattern=[];

  level++;
  $("#level-title").text("Level "+level);
  
  var randomNumber=Math.random();
  randomNumber=Math.floor(randomNumber*4);
  // return randomNumber;
  
  var randomChosenColor=buttonColors[randomNumber];
  //console.log(randomChosenColor);
  gamePattern.push(randomChosenColor);
  
  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  //level++;
}
//nextSequence();

function playSound(name) {
  //console.log(name);
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
