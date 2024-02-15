// here one ray (point) consider inside if it intersect ony on vertex from outside

// const points = [[1, 4, 0],[5,0.3,0], [6, 1, 0], [7, 10, 0], [2, 9, 0]];
// const points = [[0, 0, 0], [5, 0, 0], [5, 5, 0], [0, 5, 0]];
// const points = [[0, 5, 0],[5,2,0], [10, 0, 0], [10, 10, 0], [0, 10, 0]];
const points = [[0, 5, 0],[8,0,0], [10, 8, 0], [10, 10, 0], [0, 10, 0]]; 
const xmax = 1000;
// const points = [[1, 2, 0], [10, 2, 0], [10, 6, 0], [4, 5, 0], [4, 9, 0], [8, 9, 0], [8, 7, 0], [12, 7, 0], [12, 13, 0], [1, 11, 0]];
// last touch on vertex exclude
var boundbox = [], target = [];
  var  vertex ;
  let decision = [];
  var int_count ; 
const num = 5;
if (num == 0) {
  throw new Error("Num is 0. Exiting script.");
}


function crossP(inAll_vector) {
    console.log("inAll_vector",inAll_vector)
  let cp1 = [], cp2 = [], cp3 = [], cp4 = [];
  let m = inAll_vector[0].length, n = inAll_vector.length;

  for (let j = 0; j < m; j++) {
    cp1[j] = (inAll_vector[0][(j + 1) % m] * inAll_vector[1][(j + 2) % m]) - (inAll_vector[0][(j + 2) % m] * inAll_vector[1][(j + 1) % m])
    cp2[j] = (inAll_vector[2][(j + 1) % m] * inAll_vector[3][(j + 2) % m]) - (inAll_vector[2][(j + 2) % m] * inAll_vector[3][(j + 1) % m])

    cp3[j] = (inAll_vector[4][(j + 1) % m] * inAll_vector[5][(j + 2) % m]) - (inAll_vector[4][(j + 2) % m] * inAll_vector[5][(j + 1) % m])
    cp4[j] = (inAll_vector[6][(j + 1) % m] * inAll_vector[7][(j + 2) % m]) - (inAll_vector[6][(j + 2) % m] * inAll_vector[7][(j + 1) % m])

  }

  console.log('cp', cp1, cp2, cp3, cp4)

  intOrNot(cp1, cp2, cp3, cp4)
  // console.log(Math.sign(cp2[2]))

  // return cp
}


function intOrNot(cp1, cp2, cp3, cp4) {
//   // magnitude(cp1, cp2)
//   //   for(let i = 0; i < m; i++){
    if((cp1[2] * cp2[2]) == 0){
        vertex = true
        console.log("int count &  vertex true ",int_count)
        console.log("cp1[2] * cp2[2]) is zero ")
        console.log(vertex)
    } else if((cp3[2] * cp4[2]) == 0){
        vertex == true
        console.log("int count  &  vertex true",int_count)
        console.log("cp3[2] * cp4[2]) is zero ")

    }

  console.log("(cp1[2] * cp2[2])  (cp3[2] * cp4[2])",cp1[2] * cp2[2], cp3[2] * cp4[2])

  if ((cp1[2] * cp2[2]) < 0 && (cp3[2] * cp4[2]) < 0) {
    int_count++;
    console.log( int_count,"intersect");
  } 
}
function onEdge(inPoints, inTarget) {
    console.log("Onedge checking")
  let edge = false;
  let n = inPoints.length, m = inPoints[0].length;
  let tx, ty, tz;
  let cp = [];
  let inAb = [], inAt = [];
  for (let i = 0; i < n; i++) {
    inAb[i] = [inPoints[i][0] - inPoints[(i + 1) % n][0], inPoints[i][1] - inPoints[(i + 1) % n][1], inPoints[i][2] - inPoints[(i + 1) % n][2]];
    inAt[i] = [inTarget[0] - inPoints[i][0], inTarget[1] - inPoints[i][1], inTarget[2] - inPoints[i][2]];
  }
  for (let i = 0; i < n; i++) {
    cp[i] = [];

    let flagE = 0;
    for (let j = 0; j < m; j++) {
      cp[i][j] = (inAb[i][(j + 1) % m] * inAt[i][(j + 2) % m]) - (inAb[i][(j + 2) % m] * inAt[i][(j + 1) % m]);
      if (cp[i][j] == 0) {
        flagE++;
      }
      if (flagE == 3) {
        // t = P - p1 / p2 - p1
        tx = (inTarget[0] - inPoints[i][0]) / (inPoints[(i + 1) % n][0] - inPoints[i][0]);
        if (tx > 1 || tx < 0) {
          console.log("points is not on edge")
          return false;
        }
        ty = (inTarget[1] - inPoints[i][1]) / (inPoints[(i + 1) % n][1] - inPoints[i][1]);
        if (ty > 1 || ty < 0) {
          console.log("points is not on edge")
          return false;
        }
        tz = (inTarget[2] - inPoints[i][2]) / (inPoints[(i + 1) % n][2] - inPoints[i][2]);
        if (tz > 1 || tz < 0) {
          console.log("points is not on edge")
          return false
        }
        // edge = true;
        console.log("point is on a edge");
        return true
      }
    }

  }

  return false
}

// function magnitude(cp1,cp2){
//   let  mag1 = 0,mag2 = 0;
//  for(let i = 0; i < m; i++){
//      mag1 +=(cp1[i]) * (cp1[i]);
//      mag2 +=(cp1[i]) * (cp2[i]);
//  }
//  if(mag1 == 0 || mag2 == 0){
//      console.log("one poin is on vertex ")
//      return 0
//  }
// }

function onVertex(inPoints, inTarget) {
    
    console.log("onVeetex checking")
  let vertex = false, at = [];
  let n = inPoints.length, m = inPoints[0].length;;
  for (let i = 0; i < n; i++) {
    at[i] = [];
    let flagV = 0;
    for (let j = 0; j < m; j++) {
      at[i][j] = inTarget[j] - inPoints[i][j];
      if (at[i][j] == 0) {
        flagV++;
      }
      if (flagV == 3) {
        console.log('point is vertex')
        vertex = true;
        return true
      }
    }
  }
  return false
}

function vectorDir(points, Inp1, xmax) {
  int_count = 0;
  let n = points.length;
  let Inp2 = [xmax, Inp1[1], Inp1[2]]
//   console.log("Inp1",Inp1)
//   console.log("Inp2",Inp2)
  // console.log(Inq2) 

  let vectorPQ11 = [], vectorPQ12 = [], vectorPQ21 = [], vectorPQ22 = [], vectorQP11 = [], vectorQP12 = [], vectorQP21 = [], vectorQP22 = [];
  let Inq1, Inq2;
  for (let i = 0; i < n; i++) {
    let all_vector = [],
      Inq1 = points[i], Inq2 = points[(i + 1) % n];
     console.log("in points",Inp1,Inp2,Inq1,Inq2)
    vectorPQ11 = [(Inq1[0] - Inp1[0]), (Inq1[1] - Inp1[1]), (Inq1[2] - Inp1[2])]

    vectorPQ21 = [(Inq1[0] - Inp2[0]), (Inq1[1] - Inp2[1]), (Inq1[2] - Inp2[2])]

    vectorPQ12 = [(Inq2[0] - Inp1[0]), (Inq2[1] - Inp1[1]), (Inq2[2] - Inp1[2])]

    vectorPQ22 = [(Inq2[0] - Inp2[0]), (Inq2[1] - Inp2[1]), (Inq2[2] - Inp2[2])]


    vectorQP11 = [(Inp1[0] - Inq1[0]), (Inp1[1] - Inq1[1]), (Inp1[2] - Inq1[2])]

    vectorQP21 = [(Inp1[0] - Inq2[0]), (Inp1[1] - Inq2[1]), (Inp1[2] - Inq2[2])]

    vectorQP12 = [(Inp2[0] - Inq1[0]), (Inp2[1] - Inq1[1]), (Inp2[2] - Inq1[2])]

    vectorQP22 = [(Inp2[0] - Inq2[0]), (Inp2[1] - Inq2[1]), (Inp2[2] - Inq2[2])]

    // console.log(vector11,vector12,vector21,vector22)
    all_vector.push(vectorPQ11, vectorPQ21, vectorPQ12, vectorPQ22, vectorQP11, vectorQP21, vectorQP12, vectorQP22);
    crossP(all_vector)
  };
  console.log("vector dir int count",int_count)
  return int_count
}


function boundary(inPoints) {

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
  line_points(boundbox)
}
function line_points(inboundBox) {
    console.log(inboundBox)
  let boundLine = [];
  const boundbox = [];
  for (let k = 0; k < (inboundBox.length - 2); k++) {
    boundLine[k] = []
    for (let t = 0, i = 0; i <= num && Number(t.toFixed(5)) <= 1; i++, t += 1 / num) {
      boundLine[k][i] = [];
      boundLine[k][i][0] = (inboundBox[0][0] * (1 - t) + (inboundBox[k + 1][0] * t)).toFixed(5);
      boundLine[k][i][1] = (inboundBox[0][1] * (1 - t) + (inboundBox[k + 1][1] * t)).toFixed(5);
    }
  }
  // console.log("boundLine",boundLine)
  funAllPoints(boundLine)
}

function funAllPoints(inBoundLine) {
  let a = inBoundLine[0].length;
  let allPoints = [];
  for (let i = 0; i < a; i++) {
    allPoints[i] = [];
    for (let j = 0; j < a; j++) {
      allPoints[i][j] = [];
      allPoints[i][j][0] = Number(inBoundLine[0][j][0]);
      allPoints[i][j][1] = Number(inBoundLine[1][i][1]);
      allPoints[i][j][2] = 0;
      target.push(allPoints[i][j]);
    }
  }
  console.log(target)
  return target
}


// console.log(target)

function inOrOut(points, target_p, xmax){ 
        let d = vectorDir(points, target_p, xmax)
        console.log("d", d)
        // let d = vectorDir(points,[ 3.20000, 4.20000, 0 ],xmax) ;
      
        // console.log(int_count))
        console.log("outside vertex true or not",vertex)
        if((vertex == true)){ 
            (d % 2 == 0)?  (decision.push(3)):  decision.push(4);
        }
        else if (d % 2 == 1) {
          decision.push(3)
          console.log("Intersect final",  target_p)
        } else if (d % 2 == 0) {
          decision.push(4)
          console.log("outside")
          console.log("Not Intersect final",  target_p)
        } else {
          decision.push(5)
          console.log("not in bound")
        }

}


function main() {
 
  for (let i = 0; i < target.length; i++) {
    console.log(i + 1, target[i])
    if (onVertex(points, target[i])) {
      decision.push(1)
      console.log("on vertex", target[i])
    }
    else if (onEdge(points, target[i])) {
      decision.push(2)
      console.log("final edge")
    }else{
        console.log("inOrOut checking")
        inOrOut(points, target[i], xmax)
    }
    vertex = false;
  }
  console.log("deision",decision)
}

//  vecterDir(p1,p2,q1,q2) 
boundary(points) 
main()

export const x = { target, decision, points };
