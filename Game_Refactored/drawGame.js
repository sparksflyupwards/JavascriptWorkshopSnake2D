let canvas = document.getElementById("canvas")
canvas.width=700;
canvas.height=700;
let ctx = canvas.getContext('2d');

document.addEventListener("keydown",newDirection);
canvas.addEventListener("click",restartGame);




var cell_size = 20;
var map_coloumn_length = canvas.width/cell_size;
var map_row_length = canvas.height/cell_size;

import "game.js"

function drawMap(){

  //clear the canvas
  ctx.clearRect(0,0,c.width,c.height);

  //draw the snake
  for(var i=0; i<snake.length; i++){
        ctx.fillStyle = "white";
        //ctx.fillRect(snake[i].x*cell_size,snake[i].y*cell_size,cell_size,cell_size);
        ctx.fillStyle = snake_color;
        ctx.fillRect(snake[i].x*cell_size+cell_size/7,snake[i].y*cell_size+cell_size/7,cell_size-2*cell_size/7,cell_size-2*cell_size/7);
    }

  //draw the food
  ctx.shadowBlur = 10;
  ctx.shadowColor = "red";
  ctx.fillStyle = food_color;
  ctx.beginPath();
  ctx.arc(food.x*cell_size+cell_size/2,food.y*cell_size+cell_size/2,cell_size/2, 0, 2 * Math.PI);
  ctx.stroke();
  //ctx.fillRect(food.x*cell_size,food.y*cell_size,cell_size,cell_size);
  ctx.shadowBlur = 0;
  ctx.shadowColor = "";

  /**
  how to draw a food using an image with optional glow
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


  function gameOver(){
  console.log("GAME OVER");
  console.log(ctx.clearRect(0,0,c.width,c.height));


  ctx.font = "30px Arial";
  ctx.fillText("Game over click anywhere to restart",c.width/2-50,c.height/2-50);
  clearTimeout(game);
  game_is_running = false;
}