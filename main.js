let canvas = document.getElementById("canvas")
let width = canvas.width;
let height = canvas.height;
let ctx = canvas.getContext("2d");
let mousePos = { x: 0, y: 0 };
let mainPoint = {
  x: width / 2,
  y: height / 2
}


// Coordinates relative to the main point.
let otherPoints = [];
let prevDx = [];
let prevDy = [];

let matrixMap = {};

let speed = 2;
let cellSize = 100;
let limitAcc = 1
let dLimit = 0.8;
let howMany = 2;
let distToMainWeight = 0.0125;
let maxD = 10;

for(let i=-howMany; i<=howMany; i++){
  matrixMap[i] = {};
  for(let j=-howMany; j<=howMany; j++){
    if(j == 0 && i == 0){
      //continue;
    }
    matrixMap[i][j] = otherPoints.length;
    otherPoints.push({
      x: i*cellSize,
      y: j*cellSize,
      matrixPos: {
        i, j
      }
    });

    prevDx.push(0);
    prevDy.push(0);
  }
}



let otherPointsActual = otherPoints.map(p => ({ x: mainPoint.x - p.x, y: mainPoint.y - p.y }));



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

function updateDifferentials(i, point, shouldPoint){
  let prevDxValue = prevDx[i];
  let prevDyValue = prevDy[i];

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

  prevDx[i] = limitAbs(dx, maxD);
  prevDy[i] = limitAbs(dy, maxD);
}

function updatePoint(i){
  let p = otherPointsActual[i];
  let shouldPoint = {
    x: mainPoint.x - otherPoints[i].x,
    y: mainPoint.y - otherPoints[i].y
  };

  // Update prevDx[i] and prevDy[i]
  updateDifferentials(i, p, shouldPoint);

  let nextP = {
    x: p.x + prevDx[i],
    y: p.y + prevDy[i]
  };

  /////////////////// Limit movement ////////////

  // All this mapping is disgusting lol
  let ii = otherPoints[i].matrixPos.i;
  let jj = otherPoints[i].matrixPos.j;
  let linesToCheck = [];


  // matrixMap[ii][jj] returns an index of a point.
  // don't get confused here lol. Just make sure you use
  // easier to understand data structures when refactoring.

  // Add all lines that surround the point to move. This is assuming it's a grid.
  // For a different polygon, a different method has to be used to determine which points surround a point.
/*
  try { linesToCheck.push([otherPointsActual[matrixMap[ii-1][jj]], otherPointsActual[  matrixMap[ii-1][jj+1]]]) }catch(e){}
  try { linesToCheck.push([otherPointsActual[matrixMap[ii-1][jj+1]], otherPointsActual[matrixMap[ii]  [jj+1]]]) }catch(e){}
  try { linesToCheck.push([otherPointsActual[matrixMap[ii]  [jj+1]], otherPointsActual[matrixMap[ii+1][jj+1]]]) }catch(e){}
  try { linesToCheck.push([otherPointsActual[matrixMap[ii+1][jj+1]], otherPointsActual[matrixMap[ii+1][jj]]]) }catch(e){}
  try { linesToCheck.push([otherPointsActual[matrixMap[ii+1][jj]], otherPointsActual[  matrixMap[ii+1][jj-1]]]) }catch(e){}
  try { linesToCheck.push([otherPointsActual[matrixMap[ii+1][jj-1]], otherPointsActual[matrixMap[ii]  [jj-1]]]) }catch(e){}
  try { linesToCheck.push([otherPointsActual[matrixMap[ii]  [jj-1]], otherPointsActual[matrixMap[ii-1][jj-1]]]) }catch(e){}
  try { linesToCheck.push([otherPointsActual[matrixMap[ii-1][jj-1]], otherPointsActual[matrixMap[ii-1][jj]]]) }catch(e){}

  try { linesToCheck.push([otherPointsActual[matrixMap[ii-1][jj+1]], otherPointsActual[  matrixMap[ii+1][jj+1]]]) }catch(e){}
  try { linesToCheck.push([otherPointsActual[matrixMap[ii+1][jj+1]], otherPointsActual[  matrixMap[ii+1][jj-1]]]) }catch(e){}
  try { linesToCheck.push([otherPointsActual[matrixMap[ii+1][jj-1]], otherPointsActual[  matrixMap[ii-1][jj-1]]]) }catch(e){}
  try { linesToCheck.push([otherPointsActual[matrixMap[ii-1][jj-1]], otherPointsActual[  matrixMap[ii-1][jj+1]]]) }catch(e){}
*/
/*
  // this is unnecessary but still
  for(let i=-howMany; i<=howMany; i++){
    if(i == ii) continue;
    for(let j=-howMany; j<=howMany; j++){
      if(j == jj) continue;
      if(ii == i+1) continue;
      if(ii == i-1) continue;
      if(jj == i+1) continue;
      if(jj == i-1) continue;
      let p;
      try{p = otherPointsActual[matrixMap[i][j]];}catch(e){continue}
      if(typeof p.y == 'undefined') continue;
      if(typeof p.x == 'undefined') continue;
      let points = [];
      try{points.push(otherPointsActual[matrixMap[i+1][j]]);}catch(e){}
      try{points.push(otherPointsActual[matrixMap[i][j+1]]);}catch(e){}
      try{points.push(otherPointsActual[matrixMap[i-1][j]]);}catch(e){}
      try{points.push(otherPointsActual[matrixMap[i][j-1]]);}catch(e){}
      points.forEach(point => {
        if(typeof point == 'undefined') return;
        if(typeof point.y == 'undefined') return;
        if(typeof point.x == 'undefined') return;
        linesToCheck.push([p, point]);
      })
    }
  }*/


  //let intersection = Util.closestIntersection(p, nextP, linesToCheck);
  let intersection = null;
  if(intersection){
    // If it intersects, then move the point to somewhere it doesn't intersect.
    p.x = ((intersection.x - p.x)/2) + p.x;
    p.y = ((intersection.y - p.y)/2) + p.y;
    return;
  }
  ///////////////////////////////////////////////
  
  p.x = nextP.x;
  p.y = nextP.y;
}

let started = false;

function update(progress) {
  if(!started) return;
  
  updateMainPoint();
  for(let i=0; i<otherPointsActual.length; i++){
    updatePoint(i);
  }
}

let size = 5;
ctx.fillStyle = "black";
function draw() {
  ctx.clearRect(0, 0, width, height);
  otherPointsActual.forEach((p,i) => {
    ctx.fillRect(p.x - (size * 1), p.y - (size * 1), size, size);
  });

  for(let i=-howMany; i<=howMany; i++){
    for(let j=-howMany; j<=howMany; j++){
      let p;
      try{p = otherPointsActual[matrixMap[i][j]];}catch(e){ continue; }
      if(p == null) continue;
      if(typeof p.y == 'undefined') continue;
      if(typeof p.x == 'undefined') continue;
      let points = [];
      try{points.push(otherPointsActual[matrixMap[i+1][j]]);}catch(e){}
      try{points.push(otherPointsActual[matrixMap[i][j+1]]);}catch(e){}
      try{points.push(otherPointsActual[matrixMap[i-1][j]]);}catch(e){}
      try{points.push(otherPointsActual[matrixMap[i][j-1]]);}catch(e){}
      points.forEach(point => {
        if(typeof point == 'undefined') return;
        if(typeof point.y == 'undefined') return;
        if(typeof point.x == 'undefined') return;
        ctx.beginPath();
        ctx.moveTo(p.x-size/2, p.y-size/2);
        ctx.lineTo(point.x-size/2, point.y-size/2);
        ctx.stroke();
      })
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
