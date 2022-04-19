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
  }
  function MakeBall(elementId) {
    var item = {};
    item.id = elementId;
    item.x = Number($(elementId).css('left').replace(/[^-\d\.]/g, ""));
    item.y = Number($(elementId).css('top').replace(/[^-\d\.]/g, ""));
    item.width = $(elementId).width();
    item.height = $(elementId).height();
    item.speedX = 2;
    item.speedY = 2;
    return item;
  }
  let pong = MakeGameItem('#player1');
  let pong2 = MakeGameItem('#player2');
  let ball = MakeBall('#ball');
 

  const BOARD_HEIGHT = $('#board').height() - $('#player1').height();
  const boardwidth = $('#board').width() - $('#ball').width();
  const  KEY = {
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
    playerMovement(pong);
    playerMovement(pong2);
    moveBall();
    check(ball,pong);
   
  }
  /* 
  Called in response to events.
  */
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function check(ball, paddles){
      if (ball.x + ball.width + ball.speedX > paddles.x  && ball.x + ball.speedX < paddles.x + paddles.width && ball.y + paddles.height ){
        ball.speedX = -2;
      }
      else if (ball.x < 0 || ball.x + ball.width > width){
        ball.speedX = -2;
      }
    }
    // when the ball hits the paddle .. speed should be reversed 
  function playerMovement(obj) {
    obj.y += obj.speedY;
    $(obj.id).css('top', obj.y);
    dontLeaveBoard(obj);
  }
  function moveBall(){
    ball.x += ball.speedX;
    // ball.y += ball.speedY;
    $(ball.id).css("left", ball.x);
    // $(ball.id).css('top', ball.y);
    if (ball.x > boardwidth){
      ball.x = 250;
      ball.speedX = -2;
    //   scoreTaker('#scoreboard');
     }
    else if (ball.x < 0){
      ball.x = 300;
      ball.speedX += 4;
      // scoreTaker('#scoreboard2');
    }
  }
  function handleKeyDown(event) {
    if (event.which === KEY.P1UP) {
      pong.speedY = -5;
    }
    else if (event.which === KEY.P1DOWN) {
      pong.speedY = 5;
    }
    if (event.which === KEY.P2UP) {
      pong2.speedY = -5;
    }
    else if (event.which === KEY.P2DOWN) {
      pong2.speedY = 5;
    }
  }
  function handleKeyUp(event) {
    if (event.which === KEY.P1UP) {
      pong.speedY = 0;
    }
    else if (event.which === KEY.P1DOWN) {
      pong.speedY = 0;
    }
    else if (event.which === KEY.P2UP) {
      pong2.speedY = 0;
    }
    else if (event.which === KEY.P2DOWN) {
      pong2.speedY = 0;
    }
  }
  function dontLeaveBoard(obj) {
    if (obj.y >= BOARD_HEIGHT) {
      obj.y = BOARD_HEIGHT;
    }
    else if (obj.y < 0) {
      obj.y = 0;
    }
  }
  // scoreboard for the game ...
  function scoreTaker(id){
    $(id).text( 'Players score : ' + (parseFloat($(id).text().replace(/^\D+/g, '')) + 1));
  }
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
}

