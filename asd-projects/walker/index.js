/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  
  // Game Item Objects
// Controls for movement of the game items
  var KEY = {
    'ENTER':13,
    'LEFT':37,
    'UP':38,
    'DOWN':40,
    'RIGHT':39,

    'LEFT2':65,
    'RIGHT2':68,
    'DOWN2': 83,
    'UP2':87,
  }
  var positionX = 0;
  var positionY = 0;
  var speedX = 0;
  var speedY = 0;

  var positionY2 = 0;
  var positionX2 = 0;
  var speedX2 = 0;
  var speedY2 = 0;
  
  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);

  $(document).on('keyup', handleKeyUp);
  
  // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame(){
    repositionGameItem();
    redrawGameItem();
  }

  /* 
  Called in response to events.
  */

  // controls the movement of the walker game items , Player1 and Player2
  function handleKeyDown(event){
    if (event.which === KEY.ENTER){
      console.log("Enter pressed");
    }else if (event.which === KEY.UP){  
      speedY = -5;
      console.log("Up pressed");
    }else if (event.which === KEY.DOWN){ 
      speedY = 5;
      console.log("Down pressed");
    }else if (event.which === KEY.RIGHT){
      speedX = 5;
      console.log("Right pressed");
    }else if (event.which === KEY.LEFT){
      speedX = -5;
      console.log("Left pressed");
    }else if (event.which === KEY.LEFT2){
     speedX2 = - 5;
    }else if (event.which === KEY.RIGHT2){
      speedX2 = 5;
    }else if (event.which === KEY.UP2){
      speedY2 = -5;
    }else if (event.which === KEY.DOWN2){
      speedY2 = 5;
    }

  }

  // Ensures the walker stops when the user isnt attempting to move the game items
  function handleKeyUp(event){
    if (event.which === KEY.LEFT){
      speedX = 0;
      speedY = 0;
    }else if (event.which === KEY.RIGHT){
      speedX = 0;
      speedY = 0;
    }else if (event.which === KEY.UP){
      speedX = 0;
      speedY = 0;
    }else if (event.which === KEY.DOWN){
      speedX = 0;
      speedY = 0;
    }else if (event.which === KEY.LEFT2){
      speedX2 = 0;
    }
    else if (event.which === KEY.RIGHT2){
      speedX2 = 0;
    }else if (event.which === KEY.UP2){
      speedY2 = 0;
    }else if (event.which === KEY.DOWN2){
      speedY2 = 0;
    }
  }
  
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionGameItem(){
// Added a player 2 to the reposition function
     positionX2 += speedX2;
     positionY2 += speedY2;
     positionX += speedX;
     positionY += speedY;
  } 
  function redrawGameItem(){
    $('#walker').css('top', positionY);
    $('#walker').css('bottom', positionY);
    $('#walker').css('left', positionX);
    $('#walker').css('right', positionX);
    $('#walker2').css('top', positionY2);
    $('#walker2').css('bottom', positionY2);
    $('#walker2').css('left', positionX2);
    $('#walker2').css('right', positionX2);

  }
  function endGame() {
    // stop the interval timer
    clearInterval(interval);
    // turn off event handlers
    $(document).off();
  }}
