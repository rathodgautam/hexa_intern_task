
//Final code for point in polygon
import input from "./input.js";
// const points =  

// calculate magnitude of vector
function magnitude(vect) {
  let mag;
  mag = ((vect[0] * vect[0]) + (vect[1] * vect[1]) + (vect[2] * vect[2]));
  return Math.sqrt(mag)
}

// this fun return cross product
function crossProduct(vector1, vector2) {
  let cp = [];
  let m = 3;
  for (let j = 0; j < m; j++) {
    cp[j] = (vector1[(j + 1) % m] * vector2[(j + 2) % m]) - (vector1[(j + 2) % m] * vector2[(j + 1) % m])
  }

  return cp
}

// vector from two points 
function createVector(p1, p2) {
  return [p2[0] - p1[0], p2[1] - p1[1], p2[2] - p1[2]]
}

// two line intersecting or not 

function intersectOrNot(cp11, cp12, cp21, cp22) {

  if ((cp11[2] * cp12[2]) < 0 && (cp21[2] * cp22[2]) < 0) {
    return true
  } else {
    return false
  }
}

// checking point is on the edge or not
function onEdge(inPoints, inTarget) {
  let edge = false;
  let n = inPoints.length, m = inPoints[0].length;
  let tx, ty, tz;
  let cp = [];
  let inAb = [], inAt = [];

  for (let i = 0; i < n; i++) {
    let p1 = inPoints[i], p2 = inPoints[(i + 1) % n];

    inAb[i] = createVector(p1, p2);
    inAt[i] = createVector(p1, inTarget)
    cp[i] = crossProduct(inAb[i], inAt[i]);
    let mag = magnitude(cp[i]);

    if (mag == 0) {
      IsPointOnLine(inTarget, p1, p2)
    }
  }
  return false
}

// 

function onVertex(inPoints, inTarget) {
  let vertex = false, at = [];
  let n = inPoints.length, m = inPoints[0].length;

  for (let i = 0; i < n; i++) {
    at[i] = createVector(inPoints[i], inTarget)
    let mag = magnitude(at[i])
    if (mag == 0) {
      vertex = true;
      return true
    }
  }
  return false
}

function isInside(points, Inp1) {

  let xmax = 100, flagWD = false;
  let int_count = 0;
  let n = points.length;
  let Inp2 = [xmax, Inp1[1], Inp1[2]];
  let Inq1, Inq2;

  var vertexHit = false;

  let lastP = false;

  let vectorPP12 = createVector(Inp1, Inp2);

  for (let i = 0; i < n; i++) {
    if (lastP == true && i == n - 1) break;

    Inq1 = points[i],
      Inq2 = points[(i + 1) % n];

    let vectorPQ11 = [],
      vectorPQ12 = [],
      vectorQP11 = [],
      vectorQP12 = [],
      vectorQQ12 = [];


    vectorPQ11 = createVector(Inp1, Inq1);
    vectorPQ12 = createVector(Inp1, Inq2);

    vectorQQ12 = createVector(Inq1, Inq2);

    vectorQP11 = createVector(Inq1, Inp1);
    vectorQP12 = createVector(Inq1, Inp2);

    let cp11 = [], cp12 = [], cp21 = [], cp22 = [], cPQ;

    cp11 = crossProduct(vectorPP12, vectorPQ11);
    cp12 = crossProduct(vectorPP12, vectorPQ12);

    cp21 = crossProduct(vectorQQ12, vectorQP11);
    cp22 = crossProduct(vectorQQ12, vectorQP12);


    let isC = isCrossing(cp11, cp12, cp21, cp22, Inp1, Inp2, Inq1, Inq2, vertexHit)
    let f = isC.first, s = isC.second;

    if (f == true) {

      ((i == 0) ?( lastP = true ): (i++));

      let c = vertexType(i, vectorPP12, vectorQQ12)
      int_count += c;

    }
    else if (s == true) {
      i++
      let c = vertexType(i + 1, vectorPP12, vectorQQ12)
      int_count += c;

    }
    else if (isC) {
      int_count++;
    }
  } 
  return ((int_count % 2) == 1)
}


function isCrossing(c1, c2, c3, c4, Inp1, Inp2, Inq1, Inq2, vertexHit) {
  let first = false, second = false
  if ((c1[2] * c2[2]) < 0 && (c3[2] * c4[2]) < 0) {
    console.log("intersecting in line")
    return true
  }

  else if (c1[2] == 0 && IsPointOnLine(Inq1, Inp1, Inp2)) {
    console.log("hiting 1 vertex")
    first = true
    vertexHit = true;
    return { first, second }
  }
  else if ((c2[2]) == 0 && IsPointOnLine(Inq2, Inp1, Inp2)) {
    // i+1
    console.log("hiting 2 vertex")
    second = true
    vertexHit = true
    return { first, second }
  } else if (c3[2] == 0 && IsPointOnLine(Inp1, Inq1, Inq2)) {
    vertexHit = true
    return true
  }
  else if ((c4[2]) == 0 && IsPointOnLine(Inp2, Inq1, Inq2)) {
    vertexHit = true
    return true
  }
  return false;
}

function vertexType(position, vectorPP12, vectorQQ12) {
  console.log("vertexType")
  let n = points.length
  let I = position;
  let vectorQQ1n;
  let qn = points[(I + (n - 1)) % n], q1 = points[I], q2 = points[(I + 1) % n];
  vectorQQ1n = createVector(q1, qn);

  let d1 = crossProduct(vectorPP12, vectorQQ12);
  let d2 = crossProduct(vectorPP12, vectorQQ1n);
  console.log("d1", d1)
  console.log("d2", d2)
  if ((d1[2] * d2[2]) < 0) {
    console.log("count 1 vertex")
    return 1
  }
  else {
    console.log("count 2 vertex")
    return 2
  }

}

function IsPointOnLine(t, p1, p2) {
  let tx, ty, tz;
  tx = (t[0] - p1[0]) / (p2[0] - p1[0]);
  if (tx > 1 || tx < 0) {
    console.log("points is not on edge")
    return false;
  }
  ty = (t[1] - p1[1]) / (p2[1] - p1[1]);
  if (ty > 1 || ty < 0) {
    console.log("points is not on edge")
    return false;
  }
  // tz = (t[2] - p1[2]) / (p2[2] - p1[2]);
  // if (tz > 1 || tz < 0) {
  //   console.log("points is not on edge")
  //   return false
  // }
  console.log("point is on a edge");
  return true
}

function boundary(inPoints) {
  let boundbox = [];
  var xmin = inPoints[0][0], xmax = inPoints[0][0], ymin = inPoints[0][1], ymax = inPoints[0][1];
  // console.log(xmin, xmax, ymax, ymin)
  for (let i = 0; i < inPoints.length; i++) {
    if (xmin > inPoints[i][0]) {
      xmin = inPoints[i][0]
    } if (xmax < inPoints[i][0]) {
      xmax = inPoints[i][0]
    } if (ymin > inPoints[i][1]) {
      ymin = inPoints[i][1]
    } if (ymax < inPoints[i][1]) {
      ymax = inPoints[i][1]
    }
  }

  boundbox.push([xmin, ymin], [xmax, ymin], [xmin, ymax], [xmax, ymax])
  return boundbox
}

function line_points(inboundBox) {
  let boundLine = [];
  for (let k = 0; k < (inboundBox.length - 2); k++) {
    boundLine[k] = []
    for (let t = 0, i = 0; i <= num && Number(t.toFixed(5)) <= 1; i++, t += 1 / num) {
      boundLine[k][i] = [];
      boundLine[k][i][0] = (inboundBox[0][0] * (1 - t) + (inboundBox[k + 1][0] * t)).toFixed(5);
      boundLine[k][i][1] = (inboundBox[0][1] * (1 - t) + (inboundBox[k + 1][1] * t)).toFixed(5);
    }
  }
  return boundLine

}

function funAllPoints(inBoundLine) {
  let inTarget = [];
  let a = inBoundLine[0].length;
  let allPoints = [];
  for (let i = 0; i < a; i++) {
    allPoints[i] = [];
    for (let j = 0; j < a; j++) {
      allPoints[i][j] = [];
      allPoints[i][j][0] = Number(inBoundLine[0][j][0]);
      allPoints[i][j][1] = Number(inBoundLine[1][i][1]);
      allPoints[i][j][2] = 0;
      inTarget.push(allPoints[i][j]);
    }
  }
  // console.log(inTarget)
  return inTarget
}


function main() {
  let inDicision = [];
  for (let i = 0; i < target.length; i++) {
    console.log(i + 1, target[i])
    let target_p = target[i]

    if (onVertex(points, target_p)) {
      inDicision.push(1)
      console.log("on vertex", target_p)
    }
    else if (onEdge(points, target_p)) {
      inDicision.push(2)
      console.log("final edge")
    }
    else if (isInside(points, target_p)) {
      inDicision.push(3)
      console.log("Intersect final", target_p)
    }
    else {
      inDicision.push(4)
      console.log("outside")
      console.log("Not Intersect final", target_p)
    }
  }
  // console.log("InDeision", inDicision)
  return inDicision
}

//  vecterDir(p1,p2,q1,q2) 
function boundBoxPoints() {
  let boundBox = boundary(points)
  let boundLine = line_points(boundBox)
  let target = funAllPoints(boundLine)
  // console.log("target points", target)
  return target
}

const points = input[0]
// console.log("points", points)

const num = 30;
if (num == 0) {
  throw new Error("Error : Num is 0");
}

var target = boundBoxPoints()
var decision = main()

export const x = { target, decision, points };
