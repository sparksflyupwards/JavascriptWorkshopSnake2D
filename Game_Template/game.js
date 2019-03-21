//settup the canvas object and the context



//create an event listener to respond to user keystrokes



//these variables configure how the game is printed

//snake and food design variables


//game data
//position data type {x:[int] , y:[int]}

//timer variables

//control variables




//start a new game
createClearMap();
generateFood();
drawMap();


//creates starting conditions for the game 
function createClearMap(){
  snake = [{x:2,y:0},{x:1,y:0},{x:0,y:0}];
  generateFood();
  game = setInterval(gameLoop, game_speed);
}

//creates a new food item that is within the map and not on top of the cell
function generateFood(){
  var food_x = Math.floor(Math.random()*map_coloumn_length-0.002);
  var food_y = Math.floor(Math.random()*map_row_length-0.002);

  for(let i = 0; i<snake.length; i++){
      if(snake[i].x==food_x&&snake[i].y==food_y){
        generateFood();
      }
  }
  food = {x:food_x, y:food_y};
}

//prints the current state of the game
function drawMap(){

  //clear the canvas
  ctx.clearRect(0,0,canvas.width,canvas.height);

  //draw game elements
  drawSnake();
  drawFood();
  drawScore();
 
  }


function drawSnake(){
  for(var i=0; i<snake.length; i++){
        ctx.fillStyle = snake_color;
        ctx.fillRect(snake[i].x*cell_size+cell_size/7,snake[i].y*cell_size+cell_size/7,cell_size-2*cell_size/7,cell_size-2*cell_size/7);
    }
}
function drawFood(){

  ctx.fillStyle = food_color;
  ctx.fillRect(food.x*cell_size,food.y*cell_size,cell_size,cell_size);


}

function drawScore(){
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
        //store the snakehead's starting position
        prev_pos = {x: snake[0].x, y: snake[0].y};

        //move the snake depending up the current direction of the snake
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

        //check collisions and shift the rest of the snake
        checkCollisions(prev_pos);
        shiftSnake(prev_pos.x,prev_pos.y);


}

  
  //set the new direction of the snake depending on the user input ensuring not to allow illegal moves
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

//create the game over screen
function gameOver(){
  console.log("GAME OVER");
  console.log(ctx.clearRect(0,0,canvas.width,canvas.height));


  ctx.font = "30px Arial";
  ctx.fillText("Game over!",canvas.width/2-50,canvas.height/2-50);

  clearTimeout(game);
  game_is_running = false;
}

//this is the function the timer executes every cycle
function gameLoop(){
  drawMap();
  moveSnake(snake_direction);
  
}


