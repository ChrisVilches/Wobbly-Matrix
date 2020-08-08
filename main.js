var width = 800
var height = 200
var canvas = document.getElementById("canvas")
var width = canvas.width;
var height = canvas.height;
var ctx = canvas.getContext("2d");
var mouseX = 0;
var mouseY = 0;
var state = {
  x: width / 2,
  y: height / 2
}

var speed = 2;
var cellSize = 100;

// Coordinates relative to the main point.
var otherPoints = [];
var storedDXDY = [];

var matrixMap = {};

var howMany =2;

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
    storedDXDY.push({
      dx: 0, dy: 0
    });
  }
}

// line intercept math by Paul Bourke http://paulbourke.net/geometry/pointlineplane/
// Determine the intersection point of two line segments
// Return FALSE if the lines don't intersect
function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {

  // Check if none of the lines are of length 0
	if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
		return false
	}

	denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))

  // Lines are parallel
	if (denominator === 0) {
		return false
	}

	let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
	let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator

  // is the intersection along the segments
	if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
		return false
	}

  // Return a object with the x and y coordinates of the intersection
	let x = x1 + ua * (x2 - x1)
	let y = y1 + ua * (y2 - y1)

	return {x, y}
}

function parallelIntersection(p1, p2, p3, p4){
  return null;
}

function twoLinesIntersection(p1, p2, p3, p4){
  let inter = parallelIntersection(p1, p2, p3, p4);
  if(inter){
    return inter;
  }
  return intersect(
    p1.x, p1.y,
    p2.x, p2.y,
    p3.x, p3.y,
    p4.x, p4.y
  );
}

// p1 ----> p2 (first vector)
// allLines is [[q1, q2], [r1, r2], [s1, s2]]
// Returns point { x:, y: } or else null.
// Note that for a grid this can be optimized by
// just passing adjacent lines as parameter, not the
// entire polygon.
function closestIntersection(p1, p2, allLines){
  console.assert(p1.hasOwnProperty('x') && p1.hasOwnProperty('y'));
  console.assert(p2.hasOwnProperty('x') && p2.hasOwnProperty('y'));
  let allIntersections = [];
  console.assert(allLines.length > 0)
  allLines.forEach(line => {
    let r1 = line[0];
    let r2 = line[1];
    if(typeof r1 === 'undefined') return null;
    if(typeof r2 === 'undefined') return null;
    let inter = twoLinesIntersection(p1, p2, r1, r2);
    if(inter != false){
      allIntersections.push(inter);
    }

    inter = twoLinesIntersection(p2, p1, r2, r1);
    if(inter != false){
      allIntersections.push(inter);
    }
  });

  if(allIntersections.length == 0){
    return null;
  }
if(allIntersections.length > 1){
  //console.log(allIntersections)
}
  //console.log(p1, p2, allLines, allIntersections[0])
  //throw new Error(p1, p2, allLines, allIntersections[0]);
  return allIntersections[0];
  // TODO: Find the closest!!! for now just return the first.
  // this might be inaccurate for polygons other than grids,
  // and for quick movements.

}

function diff (num1, num2) {
  if (num1 > num2) {
    return (num1 - num2);
  } else {
    return (num2 - num1);
  }
};

function dist (x1, y1, x2, y2) {
  var deltaX = diff(x1, x2);
  var deltaY = diff(y1, y2);
  var dist = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
  return dist;
};

var otherPointsActual = otherPoints.map(p => ({ x: state.x - p.x, y: state.y - p.y }));

var dx = 0;
var dy = 0;
var limitAcc = 1
var dLimit = 0.8;

// Make a number close to another, but without surpassing it,
// because when this constantly happens, the number goes back and forth,
// and vibrates never reaching the desired number.
function makeItCloseTo(src, dest, inc){
  let newNum = src + ((src > dest ? -1 : 1) * inc);
  let range = [src, newNum].sort();

  // If it surpassed it, then make it dest
  if(range[0] <= dest && dest <= range[1]){
    newNum = dest;
  }
  return newNum;
}

function updateMainPoint(){
  state.x = mouseX;
  state.y = mouseY;
  return;

  newDx = (mouseX - state.x)// / speed;
  newDy = (mouseY - state.y) /// speed;

  if(diff(dx, newDx) > dLimit){
    //newDx = makeItCloseTo(dx, newDx, limitAcc);
  }
  if(diff(dy, newDy) > dLimit){
    //newDy = makeItCloseTo(dy, newDy, limitAcc);
  }

  dx = newDx;
  dy = newDy;
  state.x += dx;
  state.y += dy;
}

let xHowMuchChanged = 0;
let yHowMuchChanged = 0;
function updateBlackPoint(p, i){
  let currX = p.x + xHowMuchChanged;
  let currY = p.y + yHowMuchChanged;
  let shouldX = state.x - otherPoints[i].x;
  let shouldY = state.y - otherPoints[i].y;
  var distToMain = dist(state.x, state.y, currX, currY);

  var newDx = (shouldX - currX) / speed;
  var newDy = (shouldY - currY) / speed;

  newDx = newDx * (distToMain / 80);
  newDy = newDy * (distToMain / 80);
  var dx = storedDXDY[i].dx;
  var dy = storedDXDY[i].dy;

  if(diff(dx, newDx) > dLimit){
    newDx = makeItCloseTo(dx, newDx, limitAcc);
  }
  if(diff(dy, newDy) > dLimit){
    newDy = makeItCloseTo(dy, newDy, limitAcc);
  }

  let maxD = 10;
  if(newDy > maxD){ newDy = maxD; }
  if(newDy < -maxD){ newDy = -maxD; }
  if(newDx > maxD){ newDx = maxD; }
  if(newDx < -maxD){ newDx = -maxD; }

  storedDXDY[i].dx = newDx;
  storedDXDY[i].dy = newDy;

  let nextXWithoutLimit = currX + storedDXDY[i].dx;
  let nextYWithoutLimit = currY + storedDXDY[i].dy;

  nextX = nextXWithoutLimit;
  nextY = nextYWithoutLimit;
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
  }

  if(matrixMap[0][0] === i){
    //console.log(linesToCheck)
    //throw new Error("ja");
  }

  let inter = closestIntersection({ x: currX, y: currY }, { x: nextX, y: nextY }, linesToCheck);
  if(inter){
    window.stopp = true

    // Store how much it actually changed


    storedDXDY[i].dx = 0;
    storedDXDY[i].dy = 0;
    pointsWithInter[i] = true;
    //console.log("inter")

    ctx.beginPath();
    ctx.moveTo(currX, currY);
    ctx.lineTo(inter.x, inter.y);
    ctx.stroke();
    ctx.fillStyle = "red";
    ctx.fillRect(
    /*((inter.x - currX)/2) +*/ currX - (size * 1),
    /*((inter.y - currY)/2) +*/ currY - (size * 1),
    size, size);
    throw new Error("stop");
    return {
      x: ((inter.x - currX)/2) + currX,
      y: ((inter.y - currY)/2) + currY
    }
    return inter;
  }
  ///////////////////////////////////////////////
  
  return {
    x: nextX,
    y: nextY,
  };
}
var pointsWithInter = {};
var started = false;
var waitDefault = 0;
var wait = waitDefault;
function update(progress) {
  if(!started) return;
  if(wait != 0){
    //console.log(storedDXDY[15])
    wait--;
    return;
  }
  if(wait == 0) wait = waitDefault;
  
  updateMainPoint();
  for(let i=0; i<otherPointsActual.length; i++){
    let newPoint = updateBlackPoint(otherPointsActual[i], i); // lol
    otherPointsActual[i] = newPoint;
  }
  //otherPointsActual = otherPointsActual.map(updateBlackPoint);
}

var drawBlackPoints = true;
var size = 5;
function draw() {
  ctx.clearRect(0, 0, width, height);

  //ctx.fillStyle = "red";
  //ctx.fillRect(state.x - (size * 1.5), state.y - (size * 1.5), size, size);

  if(!drawBlackPoints) return;
  ctx.fillStyle = "black";
  otherPointsActual.forEach((p,i) => {
    if(pointsWithInter[i] == true){
      ctx.fillStyle = "red";
    } else {
      ctx.fillStyle = "black";
    }
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
  var progress = timestamp - lastRender


  update(progress)

  draw()
  if(window.stopp){
    throw new Error();
  }

  lastRender = timestamp
  window.requestAnimationFrame(loop)
}
var lastRender = 0
window.requestAnimationFrame(loop)

function mouseMoveHandle(e){
  mouseX = e.clientX;
  mouseY = e.clientY;
}

setTimeout(() => {
started = true;
}, 1000);