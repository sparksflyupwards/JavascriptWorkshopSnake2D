//###settup the canvas object and the context
var canvas = document.getElementById("canvas");
canvas.width = 500;
canvas.height = 500;
var ctx = canvas.getContext("2d");

//create an event listener to respond to user keystrokes
document.addEventListener("keydown", newDirection)

//these variables configure how the game is printed
var cell_size = 20;
var map_column_length = canvas.width/cell_size;
var map_row_length = canvas.height/cell_size;

//snake and food design variables
var snake_color = "blue";
var food_color = "brown";

//game data
var snake =  [{x: 2, y: 0}, {x: 1, y: 0}, {x: 0, y: 0}];
var food = {};
var score = 0;
var lives = 3;
var game_active = false;
var high_scores = [0, 0, 0, 0, 0, 0];

//position data type {x:[int] , y:[int]}

//timer variables
var game_speed = 100;
var game;
//control variables
var snake_direction = "right";
var left_key = 37;
var up_key = 38;
var right_key = 39;
var down_key = 40;

//###start a new game
createClearMap(3);
generateFood();
drawMap();

//###creates starting conditions for the game 
function createClearMap(){
    snake = [{x: 2, y: 0}, {x: 1, y: 0}, {x: 0, y: 0}];
    snake_direction="right";
    generateFood();
    if (game_active == false) {
        game = setInterval(gameLoop, game_speed);
        game_active = true;
    }
}

//creates a new food item that is within the map and not on top of the cell
function generateFood(){
  var food_x = Math.floor(Math.random()*map_column_length);
  var food_y = Math.floor(Math.random()*map_row_length);

  for(let i = 0; i<snake.length; i++){
      if(snake[i].x==food_x&&snake[i].y==food_y){
        generateFood();
      }
  }
  food = {x:food_x, y:food_y};
}

//prints the current state of the game
function drawMap(){

  //### clear the canvas
    ctx.clearRect(0,0,canvas.width, canvas.height);

  //### draw game elements
    drawScore();
    drawFood();
    drawSnake();
  }


function drawSnake(){
  for(var i=0; i<snake.length; i++){
        ctx.fillStyle = snake_color;
        ctx.fillRect(snake[i].x*cell_size+cell_size/7,snake[i].y*cell_size+cell_size/7,cell_size-2*cell_size/7,cell_size-2*cell_size/7);
    }
}

function drawFood(){
    ctx.fillStyle = food_color;
    ctx.fillRect(food.x*cell_size, food.y*cell_size, cell_size, cell_size);
}


function drawScore(){
    ctx.fillStyle = "purple";
    ctx.font = "30px Arial";
    ctx.fillText("Score: " + score, (map_column_length - 8) * cell_size, 50);
    ctx.fillText("Lives: " + lives, (map_column_length - 8) * cell_size, 100);
}

function shiftSnake(snake_head_x,snake_head_y){

  //###create previous_pos and current_pos variables
    var prev_pos = {x:snake_head_x,y:snake_head_y};
    var current_pos;

  //moves every cell of the snake one step forward
  for(var i=1; i<snake.length; i++){
    current_pos = snake[i];
    snake[i]=prev_pos;
    prev_pos = current_pos;
  }
}



function checkCollisions(prev_pos){

  //see if snake has left bounds
  if(snake[0].x<0||snake[0].x>=map_column_length){
     lives -= 1;
     if (lives == 0)
         gameOver();
     else
         createClearMap();
     return;
   }

   if(snake[0].y<0||snake[0].y>=map_row_length){
       lives -= 1;
       if (lives == 0)
           gameOver();
       else
           createClearMap();
       return;
   }

  //see if snake steps onto it self
  for(let i=1; i<snake.length; i++){
    if(snake[0].x==snake[i].x&&snake[0].y==snake[i].y){
        lives -= 1;
        if (lives == 0)
            gameOver();
        else
            createClearMap();
        return;
    }
  }

  //see if snake ate the food
  if(snake[0].x==food.x&&snake[0].y==food.y){
    score += 1;
    generateFood();
    snake.push(prev_pos);
  }
}


function moveSnake(direction){
        //store the snakehead's starting position
        prev_pos = {x: snake[0].x, y: snake[0].y};

        //move the snake depending up the current direction of the snake
        if(direction == "left"){
          snake[0].x = snake[0].x - 1;
        }

        if(direction == "right"){
           snake[0]. x = snake[0].x + 1;
        }

        if(direction == "up"){
          snake[0].y = snake[0].y - 1;
        }

        if(direction == "down"){
          snake[0].y = snake[0].y + 1;
        }

        //check collisions and shift the rest of the snake
        checkCollisions(prev_pos);
        shiftSnake(prev_pos.x,prev_pos.y);


}

  
  //set the new direction of the snake depending on the user input ensuring not to allow illegal moves
function newDirection(event){

  if(event.keyCode == left_key && snake_direction!="right"){
        snake_direction = "left";
  }
  else if(event.keyCode == up_key && snake_direction!="down"){
        snake_direction = "up";
  }
  else if(event.keyCode == right_key && snake_direction!="left"){
      snake_direction = "right";
  }
  else if(event.keyCode == down_key && snake_direction!="up"){
      snake_direction = "down";
  }
}

//create the game over screen
function gameOver(){

  console.log("GAME OVER");
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.font = "30px Arial";
  ctx.fillText("Game over!",canvas.width/2-50,canvas.height/2-50);
  clearTimeout(game);
  gameRestart();
}

//### this is the function the timer executes every cycle
function gameLoop(){
    drawMap();
    moveSnake(snake_direction);
}

function gameRestart(){
    var option = confirm("New game?");
    if (option == true){
        lives = 3;
        game_active = false;
        saveScore(score);
        score = 0;
        createClearMap();
        return;
    }
    saveScore(score);
}

function saveScore(sc) {
    high_scores[0] = sc;
    for (var x = 1; x < high_scores.length; x++) {
        var val = high_scores[x];
        var y = x - 1;
        while (y >= 0 && high_scores[y] > val) {
            high_scores[y + 1] = high_scores[y];
            y--;
        }
        high_scores[y + 1] = val;
    }
    printHighScores();
}

function printHighScores() {
    var highScoreDiv = document.getElementById("highScores");
    if(document.getElementById("highscoresTable")!=null){
        document.getElementById("highscoresTable").remove();
    }
    var table = document.createElement("TABLE");
    table.setAttribute("id", "highscoresTable");

    for (var x = 5; x >= 1; x--){
        var row = document.createElement("TR");
        var t = document.createTextNode(high_scores[x]);
        row.appendChild(t);
        table.appendChild(row);
    }

    highScoreDiv.appendChild(table);
}


