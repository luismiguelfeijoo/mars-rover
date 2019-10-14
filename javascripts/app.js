// I`ve added another rover
var rover1 = {
  direction: "N",
  x: 0,
  y: 0,
  travelLog: [],
  name: `rover1`
}

var rover2 = {
  direction: "N",
  x: 5,
  y: 5,
  travelLog: [],
  name: `rover2`
}
// ======================

// ======================

//these functions turn the rover
function turnLeft(obj){
  switch (obj.direction) {
    case "N": 
      obj.direction = "W";
      break;
    case "W":
      obj.direction = "S";
      break;
    case "S":
      obj.direction = "E";
      break;
    case "E":
      obj.direction = "N";
      break;
  }
  console.log("turnLeft was called!" ) ;
}

function turnRight(obj){
  switch (obj.direction) {
    case "N": 
      obj.direction = "E";
      break;
    case "W":
      obj.direction = "N";
      break;
    case "S":
      obj.direction = "W";
      break;
    case "E":
      obj.direction = "S";
      break;
  }
  console.log("turnRight was called!");
}

//these functions move the rover
function moveForward(obj){
  switch (obj.direction) {
    case "N": 
      obj.y --;
      break;
    case "W":
      obj.x --;
      break;
    case "S":
      obj.y ++;
      break;
    case "E":
      obj.x ++;
      break;
  }
  console.log("moveForward was called")
}

function moveBackward(obj){
  switch (obj.direction) {
    case "N": 
      obj.y ++;
      break;
    case "W":
      obj.x ++;
      break;
    case "S":
      obj.y --;
      break;
    case "E":
      obj.x --;
      break;
  }
  console.log("moveBackward was called")
}

// created a grid for the rovers to move and to put obstacles
let grid = [
  [null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null],

]

// This is for placing the rovers depending on the initial position
grid[rover1.y][rover1.x] = rover1.name;
grid[rover2.y][rover2.x] = rover2.name;

//this is the main function, it takes the rover`s name and the commands as a string 
//Example: move(rover1,`rfflb`) <== this will move the rover1 following the commands given
function move(rover,commands) {
  let movements = commands.split(``);
  let regex = /[^fblr]/;
  let stop = false;
  if (regex.test(commands)) {
    return (`You have entered an invalid command`);
  } else {
    movements.forEach(element => {
      switch (element) {
        case `f`:
          rover.travelLog.push(`(${rover.x}, ${rover.y})`);
          grid[rover.y][rover.x] = null;
          moveForward(rover);
          if (rover.x === -1 || rover.x === 10 || rover.y=== -1 || rover.y === 10) {
            console.log(`You almost lose our ${rover.name} on mars, we are glad that a martian helped us move back`);
            moveBackward(rover);
            rover.travelLog.pop();
          } else if (grid[rover.y][rover.x]){
            console.log(`You almost crashed with ${grid[rover.y][rover.x]}. Try to be more carefull next time` );
            moveBackward(rover);
            rover.travelLog.pop();
          }
          grid[rover.y][rover.x] = `${rover.name}`;
          break;
        case `b`:
          rover.travelLog.push(`(${rover.x}, ${rover.y})`);
          grid[rover.y][rover.x] = null;
          moveBackward(rover);
          if (rover.x === -1 || rover.x === 10 || rover.y=== -1 || rover.y === 10) {
            console.log(`You almost lose our ${rover.name} on mars, we are glad that a martian helped us move back`);
            moveForward(rover);
            rover.travelLog.pop();
          } else if (grid[rover.y][rover.x]){
            console.log(`You almost crashed with ${grid[rover.y][rover.x]} Try to be more carefull next time`);
            moveForward(rover);
            rover.travelLog.pop();
          }
          grid[rover.y][rover.x] = `${rover.name}`;
          break;
        case `l`:
          turnLeft(rover);
          break;
        case `r`:
          turnRight(rover);
          break;
      }
    });  
  }
  console.log(grid)
  return (`The ${rover.name} current position is: (${rover.x}, ${rover.y}). It´s journey was through: ${rover.travelLog}`)
}

//this is a bonus function if you want to change the rover`s main position.
function teleport(rover,x,y) {
  grid[rover.y][rover.x] = null;
  rover.x = x;
  rover.y = y;
  grid[rover.y][rover.x] = rover.name;
  console.log(grid);
  return (`Our ${rover.name} has been teleported`)
}

