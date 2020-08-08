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

	return { x, y }
}

function parallelIntersection(p1, p2, p3, p4){
  return null;
}

function twoLinesIntersection(p1, p2, p3, p4){
  let inter = parallelIntersection(p1, p2, p3, p4);
  if(inter !== null){
    return inter;
  }
  return intersect(
    p1.x, p1.y,
    p2.x, p2.y,
    p3.x, p3.y,
    p4.x, p4.y
  );
}

const Util = {
  // p1 ----> p2 (first vector)
  // allLines is [[q1, q2], [r1, r2], [s1, s2]]
  // Returns point { x:, y: } or else null.
  // Note that for a grid this can be optimized by
  // just passing adjacent lines as parameter, not the
  // entire polygon.
  closestIntersection: (p1, p2, allLines) => {
    console.assert(p1.hasOwnProperty('x') && p1.hasOwnProperty('y'));
    console.assert(p2.hasOwnProperty('x') && p2.hasOwnProperty('y'));
    let allIntersections = [];
    console.assert(allLines.length > 0)
    allLines.forEach(line => {
      let r1 = line[0];
      let r2 = line[1];
      console.assert(typeof r1 !== 'undefined');
      console.assert(typeof r2 !== 'undefined');
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

    return allIntersections[0];
    // TODO: Find the closest!!! for now just return the first.
    // this might be inaccurate for polygons other than grids,
    // and for quick movements.
  },

  dist: (x1, y1, x2, y2) => {
    var deltaX = Math.abs(x1 - x2);
    var deltaY = Math.abs(y1 - y2);
    var dist = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
    return dist;
  }
};
