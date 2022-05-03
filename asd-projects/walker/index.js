/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
function runProgram(){
  ///////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  // Game Item Objects
  // Controls for movement of the game items
let KEY = {
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
function MakePlayer(id){
  var player = {};
  player.id = id;
  player.x = Number($(id).css('left').replace(/[^-\d\.]/g, ""));
  player.y = Number($(id).css('top').replace(/[^-\d\.]/g, ""));
  player.height = $(id).height();
  player.width = $(id).width();
  player.speedX = 0;
  player.speedY = 0;
  return player;
}
  let player1 = MakePlayer('#walker');
  let player2 = MakePlayer('#player2');
  const BOARD_WIDTH = $('#board').width() - $('#walker').width();
  const BOARD_HEIGHT = $('#board').height() - $('#walker').height();
  // one-time setup
  const interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
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
    repositionGameItem(player1);
  }
  /* 
  Called in response to events.
  */
  // controls the movement of the walker game items , Player1 and Player2
  function handleKeyDown(event) {
    if (event.which === KEY.LEFT) {
      player1.speedX = -5;
    }
    else if (event.which === KEY.RIGHT) {
      player1.speedX = 5;
    }
    else if (event.which === KEY.UP) {
      player1.speedY = -5;
    }
    else if (event.which === KEY.DOWN) {
      player1.speedY = 5;
    }
    else if (event.which === KEY.UP2) {
      player2.speedY = -5;
    } else if (event.which === KEY.DOWN2) {
      player2.speedY = 5;
    }
    else if (event.which === KEY.RIGHT2) {
      player2.speedX = 5;
    }
    else if (event.which === KEY.LEFT2) {
      player2.speedX = -5;
    }
  }
  // Ensures the walker stops when the user isnt attempting to move the game items
  function handleKeyUp(event){
    if (event.which === KEY.LEFT) {
      player1.speedX = 0;
    } else if (event.which === KEY.RIGHT) {
      player1.speedX = 0;
    } else if (event.which === KEY.UP) {
      player1.speedY = 0;
    } else if (event.which === KEY.DOWN) {
      player1.speedY = 0;
    } else if (event.which === KEY.LEFT2) {
      player2.speedX = 0;
    } else if (event.which === KEY.RIGHT2) {
      player2.speedX = 0;
    } else if (event.which === KEY.UP2) {
      player2.speedY = 0;
    } else if (event.which === KEY.DOWN2) {
      player2.speedY = 0;
    }
  }
  // This seemed to counter the glitch  , restrics the user to the leave the bo

  function keepOnBoard(obj){
    if(obj.x > BOARD_WIDTH ){
      obj.x = BOARD_WIDTH;
    }
    else if (obj.x < BOARD_WIDTH - BOARD_WIDTH){
      obj.x = BOARD_WIDTH - BOARD_WIDTH;
    }
    if (obj.y > BOARD_HEIGHT){
      obj.y = BOARD_HEIGHT;
    }
    else if(obj.y < BOARD_HEIGHT - BOARD_HEIGHT){
      obj.y = BOARD_HEIGHT - BOARD_HEIGHT;

    }
  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionGameItem(obj){
    //Repositions the gameItem 
   obj.x += obj.speedX;
   obj.y += obj.speedY;
  }
  function endGame() {
    // stop the interval timer
    clearInterval(interval);
    // turn off event handlers
    $(document).off();
  }
}