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
    'ENTER': 13,
    'LEFT': 37,
    'UP': 38,
    'DOWN': 40,
    'RIGHT': 39,
    'UP2': 87,
    'DOWN2': 83,
    'LEFT2': 65,
    'RIGHT2': 68,
  }
  var positionX = 0;
  var positionY = 0;
  var speedX = 0;
  var speedY = 0;
  var BOARD_WIDTH = $('#board').width() - $('#walker').width();
  var BOARD_HEIGHT = $('#board').height() - $('#walker').height();


  var locationx = 0;
  var locationy = 0;
  var speedx2 = 0;
  var speedy2 = 0;


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
  function newFrame() {
    repositionGameItem();
    redrawGameItem();
  }
  /* 
  Called in response to events.
  */
  // controls the movement of the walker game items , Player1 and Player2
  function handleKeyDown(event) {
    if (event.which === KEY.LEFT) {
      speedX = -5;
      console.log('left key detected')
    }
    else if (event.which === KEY.RIGHT) {
      speedX = 5;
      console.log('Right is pressed')
    }
    else if (event.which === KEY.UP) {
      speedY = -5;
      console.log('Up is pressed')
    }
    else if (event.which === KEY.DOWN) {
      speedY = 5;
      console.log('Down is pressed')
    }
    else if (event.which === KEY.UP2) {
      speedy2 = -5;
    } else if (event.which === KEY.DOWN2) {
      speedy2 = 5;
    }
    else if (event.which === KEY.RIGHT2) {
      speedx2 = 5;
    }
    else if (event.which === KEY.LEFT2) {
      speedx2 = -5;
    }
  }
  // Ensures the walker stops when the user isnt attempting to move the game items
  function handleKeyUp(event){
    if (event.which === KEY.LEFT) {
      speedX = 0;
    } else if (event.which === KEY.RIGHT) {
      speedX = 0;
    } else if (event.which === KEY.UP) {
      speedY = 0;
    } else if (event.which === KEY.DOWN) {
      speedY = 0;
    } else if (event.which === KEY.LEFT2) {
      speedx2 = 0;
    } else if (event.which === KEY.RIGHT2) {
      speedx2 = 0;
    } else if (event.which === KEY.UP2) {
      speedy2 = 0;
    } else if (event.which === KEY.DOWN2) {
      speedy2 = 0;
    }
  }
  // This seemed to counter the glitch  , restrics the user to the leave the box
  function stopBallNow(){
    if (positionX > BOARD_WIDTH) {
      positionX = BOARD_WIDTH;
    } else if (positionX < 0) {
      positionX = 0;
    } if (positionY > BOARD_HEIGHT) {
      positionY = BOARD_HEIGHT;
    } else if (positionY < 0) {
      positionY = 0;
    }
    if (locationx > BOARD_WIDTH) {
      locationx = BOARD_WIDTH;
    } else if (locationx < 0) {
      locationx = 0;
    } if (locationy > BOARD_HEIGHT) {
      locationy = BOARD_HEIGHT;
    } else if (locationy < 0) {
      locationy = 0;
    }
  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionGameItem() {
    //Repositions the gameItem 
    locationx += speedx2;
    locationy += speedy2;
    positionX += speedX;
    positionY += speedY;
    stopBallNow();
  }

  function redrawGameItem() {
    $('#walker').css('top', positionY);
    $('#walker').css('left', positionX);
    $('#player2').css('top', locationy);
    $('#player2').css('left', locationx);
  }
  function endGame() {
    // stop the interval timer
    clearInterval(interval);
    // turn off event handlers
    $(document).off();
  }
}