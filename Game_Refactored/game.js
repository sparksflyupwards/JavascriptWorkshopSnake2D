


var snake_color = "blue";
var food_color = "red";
var game_is_running = true;


let snake = [{x:0,y:0},{x:1,y:0},{x:2,y:0}];
let food = {};

let game_speed = 100;
let game = setInterval(gameLoop, game_speed);

let snake_direction = "right";


let score = 0;

let canvas = document.getElementById("canvas")
canvas.width=700;
canvas.height=700;
let ctx = canvas.getContext('2d');

document.addEventListener("keydown",newDirection);
canvas.addEventListener("click",restartGame);




var cell_size = 20;
var map_coloumn_length = canvas.width/cell_size;
var map_row_length = canvas.height/cell_size;


function createClearMap(){
  snake = [{x:2,y:0},{x:1,y:0},{x:0,y:0}];
  generateFood();
}

createClearMap();
generateFood();
drawMap();

function generateFood(){
  var food_x = Math.floor(Math.random()*map_coloumn_length-0.002);
  var food_y = Math.floor(Math.random()*map_row_length-0.002);

  for(let i = 0; i<snake.length; i++){
      if(snake[i].x==food_x&&snake[i].y==food_y){
        generateFood();
      }
  }
  console.log(food_x)
  food = {x:food_x, y:food_y};
}

function shiftSnake(snake_head_x,snake_head_y){

  let prev_pos = {x:snake_head_x, y:snake_head_y};
  let current_pos = {}

  for(let i=1; i<snake.length; i++){
    current_pos = snake[i];
    snake[i]=prev_pos;
    prev_pos = current_pos;
  }
}

function checkCollisions(prev_pos){

  //see if snake has left bounds
  if(snake[0].x<0||snake[0].x>map_coloumn_length){
    gameOver();
    return;
  }

   if(snake[0].y<0||snake[0].y>map_row_length){
    gameOver();
    return;
  }

  //see if snake steps onto it self
  for(let i=1; i<snake.length; i++){
    if(snake[0].x==snake[i].x&&snake[0].y==snake[i].y){

      gameOver();
      return;
    }
  }

  //see if snake ate the food
  if(snake[0].x==food.x&&snake[0].y==food.y){
    score+=10;
    generateFood();
    snake.push(prev_pos);
  }
}
function moveSnake(direction){


  prev_pos = {x: snake[0].x, y: snake[0].y};
  if(direction == "left"){
    snake[0].x = snake[0].x-1;
  }

  if(direction == "right"){
    snake[0].x = snake[0].x+1;
  }

  if(direction == "up"){
    snake[0].y = snake[0].y-1;
  }

  if(direction == "down"){
    snake[0].y = snake[0].y+1;
  }

  checkCollisions(prev_pos);
  shiftSnake(prev_pos.x,prev_pos.y);

}



function newDirection(event){

  if(event.keyCode == 37&&snake_direction!="right"){
    snake_direction = "left";
  }
  else if(event.keyCode == 38&&snake_direction!="down"){
    snake_direction = "up";
  }
  else if(event.keyCode == 39&&snake_direction!="left"){
    snake_direction = "right";
  }
  else if(event.keyCode == 40&&snake_direction!="up"){
    snake_direction = "down";
  }
}

function gameLoop(){
  drawMap();
  moveSnake(snake_direction);
  
}


function restartGame(){
  if(game_is_running == false){
    game_is_running = true;


createClearMap();
generateFood();
drawMap();

game = setInterval(gameLoop, game_speed);


  }
}