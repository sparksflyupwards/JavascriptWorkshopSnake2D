let c = document.getElementById("canva")
c.width=700;
c.height=700;
let ctx = c.getContext('2d');
let food_image = document.getElementById("foodImage");
document.addEventListener("keydown",newDirection)


var cell_size = 20;
var map_coloumn_length = c.width/cell_size;
var map_row_length = c.height/cell_size;

var snake_color = "blue";
var food_color = "red";



let snake = [{x:0,y:0},{x:1,y:0},{x:2,y:0}];
let food = {};

let game_speed = 100;
let game = setInterval(gameLoop, game_speed);

let snake_direction = "right";


let score = 0;


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

function drawMap(){

  //clear the canvas
  //ctx.fiLStyle = "black"
  ctx.clearRect(0,0,c.width,c.height);
  //ctx.clearRect(5,5,c.width-10,c.height-10);

  //draw the snake
  for(var i=0; i<snake.length; i++){
        ctx.fillStyle = "white";
        //ctx.fillRect(snake[i].x*cell_size,snake[i].y*cell_size,cell_size,cell_size);
        ctx.fillStyle = snake_color;
        ctx.fillRect(snake[i].x*cell_size+cell_size/7,snake[i].y*cell_size+cell_size/7,cell_size-2*cell_size/7,cell_size-2*cell_size/7);
    }

  //draw the food
   ctx.shadowBlur = 20;
  ctx.shadowColor = "white";
  ctx.fillStyle = food_color;
  ctx.fillRect(food.x*cell_size,food.y*cell_size,cell_size,cell_size);
    ctx.shadowBlur = 0;
  ctx.shadowColor = "";
  /**
  ctx.shadowBlur = 20;
  ctx.shadowColor = "white";
  ctx.drawImage(food_image, 0, 0, food_image.width, food_image.height, food.x*cell_size,food.y*cell_size,cell_size,cell_size);
  ctx.shadowBlur = 0;
  ctx.shadowColor = "";
  */


  //draw the score
  ctx.fillStyle = "black";
  ctx.font = "30px Arial";
  ctx.fillText("Score: "+score,(map_coloumn_length-8)*cell_size,50);
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


function gameOver(){
  console.log("GAME OVER");
  
  console.log(ctx.clearRect(0,0,c.width,c.height));
  ctx.font = "30px Arial";
  ctx.fillText("Game over",c.width/2-50,c.height/2-50);
  clearTimeout(game);
}
function gameLoop(){
  drawMap();
  moveSnake(snake_direction);
  
}



