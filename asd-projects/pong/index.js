/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  // Game Item Objects
  function MakeGameItem(elementId) {
    let item = {};
    item.id = elementId;
    item.x = Number($(elementId).css('left').replace(/[^-\d\.]/g, ""));
    item.y = Number($(elementId).css('top').replace(/[^-\d\.]/g, ""));
    item.width = $(elementId).width();
    item.height = $(elementId).height();
    item.speedX = 0;
    item.speedY = 0;
    return item;
    // factory function..
  }
  let pong = MakeGameItem('#player1');
  let pong2 = MakeGameItem('#player2');
  let ball = MakeGameItem('#ball');
  ball.speedX = 4;
  ball.speedY = 4;
  let winner , winner2 = 0;
  const BOARD_HEIGHT = $('#board').height() - $('#player1').height();
  const boardWidth = $('#board').width() - $('#ball').width();
  const ballBoardHeight = $('#board').height() - 9;
  const KEY = {
    'P1UP': 38,
    'P1DOWN': 40,
    'P2UP': 87,
    'P2DOWN': 83,
  }
  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);
  $(document).on('keyup', handleKeyUp);
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    movement(pong);
    movement(pong2);
    makeItMove(ball);
    collide(pong);
    collide(pong2);
    CheckForWin();
  } 
  // 
  // Called in response to events.
  // */
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  //  calculate the right side of the 1st paddle.
 
  function collide(player) {
    player.top = player.y;
    player.bottom = player.y + player.height;
    player.left = player.x;
    player.right = player.x + player.width;

    ball.left = ball.x;
    ball.right = ball.x + ball.width;
    ball.bottom = ball.y + ball.height;
    ball.top = ball.y;

    if (player.right > ball.left && player.left < ball.right && player.top < ball.bottom && player.bottom > ball.top) {
      ball.speedX = 4;
    }
    if (player.left < ball.right && player.right > ball.right && player.top < ball.bottom && player.bottom > ball.top) {
      ball.speedX = -4;
    }
  }
  function movement(obj) {
    $(obj.id).css('top', obj.y);
    obj.y += obj.speedY;
    dontLeaveBoard(obj);
  }
  function makeItMove(item) {
    item.x += item.speedX;
    item.y += item.speedY;
    $(item.id).css("left", item.x);
    $(item.id).css('top', item.y);
    getScore(item);
    keepBallInBoard(item);
  }
  function handleKeyDown(event) {
    if (event.which === KEY.P1UP) {
      pong2.speedY = -7;
    }
    else if (event.which === KEY.P1DOWN) {
      pong2.speedY = 7;
    }
    if (event.which === KEY.P2UP) {
      pong.speedY = -7;
    }
    else if (event.which === KEY.P2DOWN) {
      pong.speedY = 7;
    }
  }
  function handleKeyUp(event) {
    if (event.which === KEY.P1UP) {
      pong2.speedY = 0;
    }
    else if (event.which === KEY.P1DOWN) {
      pong2.speedY = 0;
    }
    else if (event.which === KEY.P2UP) {
      pong.speedY = 0;
    }
    else if (event.which === KEY.P2DOWN) {
      pong.speedY = 0;
    }
  }
  function dontLeaveBoard(obj) {
    if (obj.y > BOARD_HEIGHT) {
      obj.y = BOARD_HEIGHT;
    }
    if (obj.y < BOARD_HEIGHT - BOARD_HEIGHT) {
      obj.y = BOARD_HEIGHT - BOARD_HEIGHT;
    }
  }
  function getScore(item) {
    if (item.x > boardWidth) {
      item.x = 250;
      item.y = 250;
      item.speedX = 0;
      item.speedX = Math.floor((Math.random() - 4 + -1) + 1);
      score('#scoreboard');
      getScoreFeed('Player1');
      winner++;
    }
    if (item.x < 0) {
      item.x = 250;
      item.y = 250;
      item.speed = 0;
      item.speedX = Math.floor((Math.random() * 3) + 1);
      score('#scoreboard2');
      getScoreFeed('Player2')
      winner2++;
    }
  }
  function keepBallInBoard(item) {
    if (item.y > ballBoardHeight) {
      item.speedY = Math.floor((Math.random() * -4) + -1);
      item.speedX++;
    }
    else if (item.y < 9) {
      item.speedY = Math.floor((Math.random() * 4 - 2) + 4);
      item.speedX++;
    }
  }
  // scoreboard for the game ...
  function score(id) {
    $(id).text((parseFloat($(id).text().replace(/^\D+/g, '')) + 1));
  }
  function CheckForWin(){
    const gameOver = 7;
    if (winner === gameOver || winner2 === gameOver){
        
    }
  }
    
    

    
  
  function getScoreFeed(currentScorer) {
    $('#scoreFeed').text('...' + currentScorer + ' has scored !');
  }
  function endGame(champ) {
    alert(champ + ' has won this game');
    $('#scoreFeed').text(champ + ' has won the Game !!');
    $(document).off();
    clearInterval(interval);
  }
}

