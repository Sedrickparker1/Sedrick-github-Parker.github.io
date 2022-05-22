/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
function runProgram() {
  ///////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  // Game Item Objects
  // Controls for movement of the game items
  const KEY = {
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

  function MakePlayer(id) {
    const player = {};
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
    repositionGameItem(player2);
    tag(player1, player2);
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
  function handleKeyUp(event) {
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
  function keepOnBoard(obj) {
    if (obj.x > BOARD_WIDTH) {
      obj.x = BOARD_WIDTH;
    }
    else if (obj.x < BOARD_WIDTH - BOARD_WIDTH) {
      obj.x = BOARD_WIDTH - BOARD_WIDTH;
    }
    if (obj.y > BOARD_HEIGHT) {
      obj.y = BOARD_HEIGHT;
    }
    else if (obj.y < BOARD_HEIGHT - BOARD_HEIGHT) {
      obj.y = BOARD_HEIGHT - BOARD_HEIGHT;

    }
  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////
  function repositionGameItem(obj) {
    //Repositions the gameItem 
    obj.x += obj.speedX;
    obj.y += obj.speedY;
    $(obj.id).css('top', obj.y);
    $(obj.id).css('left', obj.x)
    keepOnBoard(obj);
  }
  function respawn(first, second){
    // respwan helper funtion..
  first.x = 450;
  first.y = 200;
  
  second.x = 30;
  second.y = 200;
  }

  function getGameItemSides(x1, x2) {
    x1.left = x1.x;
    x1.right = x1.x + x1.width;
    x1.top = x1.y;
    x1.bottom = x1.y + x1.height;
    // players sides <.
    x2.left = x2.x;
    x2.right = x2.x + x2.width;
    x2.top = x2.y;
    x2.bottom = x2.y + x2.height
  }
  function tag(p1, p2) {
    getGameItemSides(p1, p2);
    if (p1.left <= p2.right && p1.right >= p2.left && p1.top <= p2.bottom && p1.bottom >= p2.top) {
      document.getElementById('walker').style.backgroundColor = 'red';
      document.getElementById('player2').style.backgroundColor = 'green';
      respawn(p1, p2);
      // adding scoreCounter fucntion...
      // make the players swap
  }
}

  function endGame() {
    // stop the interval timer
    clearInterval(interval);
    // turn off event handlers
    $(document).off();
  }}
