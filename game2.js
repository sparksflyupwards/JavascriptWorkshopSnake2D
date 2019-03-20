var c = document.getElementById("canva")
c.width=700;
c.height=700;
var ctx = c.getContext('2d');

var snake_color = "blue";
var food_color = "red";

var cell_size = 20;

let map = [];
var map_width = c.width/cell_size;
var map_height = c.height/cell_size;



function createClearMap(map){
  for(var i=0; i<map_width; i++){
    var row =[];
    for(var j=0; j<map_height; j++){
      
      row.push(0);
      
    }
    map.push(row);
  }

  map[0][0]=1;
}

createClearMap(map);
generateFood(map);
drawMap(map);

function generateFood( map){
  var x = Math.floor(Math.random()*map_width-0.002);
  var y = Math.floor(Math.random()*map_height-0.002);
  if(map[x][y]!=0){
    generateFood();
  }
  map[x][y]=2;
}

function drawMap(map){
  for(var i=0; i<map_width; i++){
    for(var j=0; j<map_height; j++){
      if(map[i][j]==1){
        ctx.fillStyle = snake_color;
        ctx.fillRect(i*cell_size,j*cell_size,cell_size,cell_size);
      }
      else if(map[i][j]==2){
        ctx.fillStyle = food_color;
        ctx.fillRect(i*cell_size,j*cell_size,cell_size,cell_size);    
      }
      
    }
  }
}

