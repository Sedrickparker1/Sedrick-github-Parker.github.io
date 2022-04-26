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
  let pong = MakeGameItem('#player1');
  let pong2 = MakeGameItem('#player2');
  let ball = MakeGameItem('#ball');
  ball.speedX = 4;
  ball.speedY = 4; 
  const BOARD_HEIGHT = $('#board').height() - $('#player1').height();
  const boardwidth = $('#board').width() - $('#ball').width();
  const ballBoardHeight = $('#board').height() - $('#ball').height();
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
    Movement(pong);
    Movement(pong2);
    moveBall();
    collide(pong,pong2);
    CheckForWin();
  }
  /* 
  Called in response to events.
  */
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
    //  calculate the right side of the 1st paddle.
  let winner = 0;
  let winner2 = 0;
  function collide(player1, player2){
      // item sides
      player1.top = player1.y;
      player1.bottom = player1.y + player1.height;
      player1.left = player1.x;
      player1.right = player1.x + player1.width;
  
      player2.top = player2.y;
      player2.bottom = player2.y + player2.height;
      player2.left = player2.x 
      player2.right = player2.x + player2.width;
  
  // the ball ..
      ball.left = ball.x ;
      ball.right = ball.x + ball.width;
      ball.bottom = ball.y + ball.height;
      ball.top = ball.y;
  // long ass conditionss
     if(player1.right > ball.left && player1.left < ball.right && player1.top < ball.bottom && player1.bottom > ball.top){
      ball.speedX = 4;
     }
     else if(player2.left < ball.right && player2.right > ball.right && player2.top < ball.bottom && player2.bottom > ball.top){
      ball.speedX = -4;
     }
  }   
  function Movement(obj){
    obj.y += obj.speedY;
    $(obj.id).css('top', obj.y);
    dontLeaveBoard(obj);
  }
  function moveBall(){
    ball.x += ball.speedX;
    ball.y += ball.speedY;
    $(ball.id).css("left", ball.x);
    $(ball.id).css('top', ball.y);
    if(ball.x > boardwidth){
      ball.x = Math.floor((Math.random(250)* 260));
      ball.speedX = Math.floor((Math.random(-3)* -5));
      score('#scoreboard');
      winner++;
     }

    else if(ball.x < 0){
      ball.x = Math.floor((Math.random(250)* 255));
      ball.speedX = Math.floor((Math.random(3) * 4)); 
      score('#scoreboard2');
      winner2++;
    }
    else if(ball.y > ballBoardHeight){
      ball.speedY = Math.floor((Math.random(-3) * -4)); ;
    }
    else if(ball.y < 0){
      ball.speedY = Math.floor((Math.random(3) * 4));
    }
  }
  function handleKeyDown(event){
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
  function handleKeyUp(event){
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
  function dontLeaveBoard(obj){
    if (obj.y >= BOARD_HEIGHT) {
      obj.y = BOARD_HEIGHT;
    }
    else if (obj.y < 0) {
      obj.y = 0;
    }
  }
  // scoreboard for the game ...
  function score(id){
    $(id).text( 'Players score : ' + (parseFloat($(id).text().replace(/^\D+/g, '')) + 1));
   }
   function CheckForWin(){
    if (winner === 5){
        winner = 'Player1';
      endGame(winner);
    }else if(winner2 === 5){ 
       winner2 = 'Player2';
      endGame(winner2);
    }
  }
  function getScoreFeed(id, newtext ){
    document.getElementById(id).innerHTML = newtext;
  }
  function endGame(champ){
    // stop the interval timer
    alert(champ + ' has won this game');
    clearInterval(interval);
    $(document).off();
  }
}

