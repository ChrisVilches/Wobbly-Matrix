let canvas = document.getElementById("canvas")
let width = canvas.width;
let height = canvas.height;
let ctx = canvas.getContext("2d");
let mousePos = { x: 0, y: 0 };

// TODO: As of now (2020/08/08) rows & cols and the way is rendered may be inverted.
// (rows become cols, and vice-versa).
// The reason could be because in a matrix[i][j], 'i' is row (vertical), but I used
// 'x' and 'y' (horizontal / vertical) instead of 'i' and 'j' (vertical / horizontal).

// This point follows the mouse position.
let mainPoint = {
  x: width / 2,
  y: height / 2
}

// Coordinates relative to the main point.
let grid = [];
let prevDx = [];
let prevDy = [];

// Modify in config file.
let speed = config.speed; // TODO: rename this parameter.
let cellSize = config.cellSize;
let limitAcc = config.limitAcc;
let dLimit = config.dLimit;
let rows = config.rows;
let cols = config.cols;
let distToMainWeight = config.distToMainWeight;
let maxD = config.maxD;
let centerPoint = config.centerPoint;

for(let i=0; i<rows; i++){
  grid.push([]);
  prevDx.push([]);
  prevDy.push([]);
  for(let j=0; j<cols; j++){
    grid[i].push(pointShouldBePosition(i, j));
    prevDx[i].push(0);
    prevDy[i].push(0);
  }
}

// Calculates the position a point should be assuming it's not wobbly
// (i.e. if the grid was solid).
function pointShouldBePosition(i, j){
  return {
    x: mainPoint.x - (cellSize * (centerPoint.x + i)),
    y: mainPoint.y - (cellSize * (centerPoint.y + j))
  };
}

// Make a number close to another, but without surpassing it,
// because when this constantly happens, the number goes back and forth,
// and vibrates never reaching the desired number.
function drawNear(src, dest, inc){
  let newNum = src + ((src > dest ? -1 : 1) * inc);
  let range = [src, newNum].sort();

  // If it surpassed it, then make it dest
  if(range[0] <= dest && dest <= range[1]){
    newNum = dest;
  }
  return newNum;
}

function updateMainPoint(){
  mainPoint.x = mousePos.x;
  mainPoint.y = mousePos.y;
}

// Limit using absolute value.
// Limit parameter must be a [0,∞) number
function limitAbs(v, limit){
  if(v > limit){ return limit; }
  if(v < -limit){ return -limit; }
  return v;
}

function updateDifferentials(i, j, point, shouldPoint){
  let prevDxValue = prevDx[i][j];
  let prevDyValue = prevDy[i][j];

  let distToMain = Util.dist(mainPoint.x, mainPoint.y, point.x, point.y);

  // Update speed so it goes closer to the point it should be.
  let dx = (shouldPoint.x - point.x) / speed;
  let dy = (shouldPoint.y - point.y) / speed;

  // Make it a bit different depending on its position with respect to the main point.
  // This makes all points oscillate differently.
  // Without this, the entire grid would oscillate like it's solid.
  dx = dx * distToMain * distToMainWeight;
  dy = dy * distToMain * distToMainWeight;

  // Instead of setting dx and dy to the current distance, lower it to make it
  // close to the value it should be. This creates the oscillation effect.
  if(Math.abs(prevDxValue - dx) > dLimit){
    dx = drawNear(prevDxValue, dx, limitAcc);
  }
  if(Math.abs(prevDyValue - dy) > dLimit){
    dy = drawNear(prevDyValue, dy, limitAcc);
  }

  prevDx[i][j] = limitAbs(dx, maxD);
  prevDy[i][j] = limitAbs(dy, maxD);
}

function pointExists(i, j){
  return i >= 0 && i < rows && j >= 0 && j < cols;
}

// Returns indexes in the grid of lines that surround the point.
// Example:
// Parameter: 1, 1
// Return: [[[0, 0], [0, 1]], [[0, 1], [0, 2]], [[0, 2], [1, 2]], ...]
function surroundingLines(i, j){
  if(!pointExists(i, j)){
    throw new Error('Argument error: Point does not exist.');
  }

  let lines = [];

  // Points starting from bottom-left corner, and then going clock-wise
  // and going back to the first point (it's twice, at the start and end).
  let pi = [-1, -1, -1, 0, 1, 1,  1,  0, -1];
  let pj = [-1,  0,  1, 1, 1, 0, -1, -1, -1];

  for(let q=0; q<pi.length - 1; q++){
    // TODO: This code is very difficult to debug.
    // j and i are easy to mix up.
    let from = [i + pi[q],     j + pj[q]];
    let to   = [i + pi[q + 1], j + pj[q + 1]];

    // For border cases, it will not be surrounded by some points, so don't add lines.
    if(pointExists(...from) && pointExists(...to)){
      lines.push([from, to]);
    }

    if(from.join(',') == to.join(',')){
      throw new Error(`Indexes are the same (${from} --> ${to}). It should be a line (different points). (i, j) = (${i}, ${j}). Iteration #${q}`);
    }
  }

  return lines;
}

function avoidIntersection(i, j, nextP){
  let p = grid[i][j];
  // Define all lines to check intersections.
  // When a point moves from p ----> nextP it could intersect some lines.
  // This code detects the closest collision and does something to prevent it.
  // (i.e. changes the nextP to somewhere else).
  // Limitations:
  // 1. If the wobbling is too extreme, it could intersect with other lines not defined here.
  //    (i.e. lines that are not in its vicinity)
  // 2. For polygons other than a grid a different algorithm has to be used.
  let linesToCheck = surroundingLines(i, j).map(line => {
    let from = line[0];
    let to = line[1];

    let fromPoint = grid[from[0]][from[1]];
    let toPoint = grid[to[0]][to[1]];
    return [fromPoint, toPoint];
  });

  if(linesToCheck.length === 0){
    throw new Error(`Point ${i}, ${j} doesn't have lines. Rows=${rows}, cols=${cols}`);
  }

  console.assert(linesToCheck.length > 0);
  for(let i=0; i<linesToCheck.length; i++){
    let line = linesToCheck[i];
    console.assert(line.length == 2);
    line.forEach(p => {
      console.assert(typeof p === 'object');
      console.assert(p.hasOwnProperty('x'));
      console.assert(p.hasOwnProperty('y'));
    });
  }

  let intersection = Util.closestIntersection(p, nextP, linesToCheck);
  if(intersection){
    // If it intersects, then move the point to somewhere it doesn't intersect.
    return {
      x: ((intersection.x - p.x)/2) + p.x,
      y: ((intersection.y - p.y)/2) + p.y
    };
  }
  return null;
}

function updatePoint(i, j){
  let p = grid[i][j];
  let shouldPoint = {
    x: mainPoint.x - (cellSize * (centerPoint.x + i)),
    y: mainPoint.y - (cellSize * (centerPoint.y + j))
  };

  // Update prevDx[i] and prevDy[i]
  updateDifferentials(i, j, p, shouldPoint);

  let nextP = {
    x: p.x + prevDx[i][j],
    y: p.y + prevDy[i][j]
  };

  // Try to fix point by detecting collisions, and then moving
  // the point to somewhere where it doesn't collide.
  let fixedPoint = avoidIntersection(i, j, nextP);

  if(fixedPoint){
    p.x = fixedPoint.x;
    p.y = fixedPoint.y;
    return;
  }

  p.x = nextP.x;
  p.y = nextP.y;
}

let started = false;

function update(progress) {
  if(!started) return;
  
  updateMainPoint();

  for(let i=0; i<rows; i++){
    for(let j=0; j<cols; j++){
      updatePoint(i, j);
    }
  }
}

let size = 5;
ctx.fillStyle = "black";

function drawLine(p1, p2){
  ctx.beginPath();
  ctx.moveTo(p1.x-size/2, p1.y-size/2);
  ctx.lineTo(p2.x-size/2, p2.y-size/2);
  ctx.stroke();
}

function draw() {
  ctx.clearRect(0, 0, width, height);

  for(let i=0; i<rows; i++){
    for(let j=0; j<cols; j++){
      let p = grid[i][j];
      ctx.fillRect(p.x - (size * 1), p.y - (size * 1), size, size);
    }
  }

  for(let i=0; i<rows; i++){
    for(let j=0; j<cols; j++){
      let p = grid[i][j];
      if(i < rows - 1){
        let p1 = grid[i+1][j];
        drawLine(p, p1);
      }
      if(j < cols - 1){
        let p2 = grid[i][j+1];
        drawLine(p, p2);
      }
    }
  }
}

function loop(timestamp) {
  let progress = timestamp - lastRender;
  update(progress);

  draw()
  if(window.stopp){
    throw new Error();
  }

  lastRender = timestamp;
  window.requestAnimationFrame(loop);
}
let lastRender = 0;
window.requestAnimationFrame(loop);

function mouseMoveHandle(e){
  mousePos.x = e.clientX;
  mousePos.y = e.clientY;
}

setTimeout(() => {
  started = true;
}, 1000);
