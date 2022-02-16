/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
function runProgram(){
  ///////////////////////////////////////////////////////////////////////////////
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
  }
  var positionX = 0;
  var positionY = 0;
  var speedX = 0;
  var speedY = 0;

  var BOARD_WIDTH = $('#board').width() - $('#walker').width();
  var BOARD_HEIGHT = $('#board').height() - $('#walker').height();

  
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
    stopBallNow();
    
  }
  /* 
  Called in response to events.
  */

  // controls the movement of the walker game items , Player1 and Player2
  function handleKeyDown(event){
    if (event.which === KEY.LEFT){
      speedX = -5;
      console.log('left is pressed')
    }
    else if (event.which === KEY.RIGHT){
      speedX = 5;
      console.log('Right is pressed')
    }
    else if (event.which === KEY.UP){
      speedY = -5;
      console.log('Up is pressed')
    }
    else if(event.which === KEY.DOWN){
      speedY = 5;
      console.log('Down is pressed')
    }
  }


  // Ensures the walker stops when the user isnt attempting to move the game items
  function handleKeyUp(event){
    if (event.which === KEY.LEFT){
      speedX = 0;
    }else if (event.which === KEY.RIGHT){
      speedX = 0;
    }else if (event.which === KEY.UP){
      speedY = 0;
    }else if (event.which === KEY.DOWN){
      speedY = 0;
    }
  }
// This seemed to counter the glitch  , restrics the user to the leave the box
  function stopBallNow(){
    if (positionX > BOARD_WIDTH){
       positionX = BOARD_WIDTH -5;
    }
    else if(positionX < 0){
      positionX = 5;
    }
    else if (positionY > BOARD_HEIGHT -5){
      positionY = BOARD_HEIGHT;
    }
    else if (positionY < 0){
      positionY = 5;

    }  
 }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionGameItem(){
//Repositions the gameItem 
     positionX += speedX;
     positionY += speedY;
  }
  
  function redrawGameItem(){
    $('#walker').css('top', positionY);
    $('#walker').css('left', positionX);
    
  }
  function endGame(){
    // stop the interval timer
    clearInterval(interval);
    // turn off event handlers
    $(document).off();
  }
}