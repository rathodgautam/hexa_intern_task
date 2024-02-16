
//Final code for point in polygon

// const points = [[1, 4, 0],[5,0.3,0], [6, 1, 0], [7, 10, 0], [2, 9, 0]];
// const points = [[0, 0, 0], [5, 0, 0], [5, 5, 0], [0, 5, 0]];
// const points =[[5.2936,	-2.0629,	0],[4.1692	,3.9538	,0],[2.5817	,-4.5346	,0],[0.4353,	5.2757,	0],[-2.0573,	4.5258	,0],[-3.3913	,3.6194	,0],[-4.3102	,2.2464	,0],[-4.3574	,-2.3185	,0],[-3.4031	,-3.4772	,0],[-2.1187	,-4.4592	,0],[-1.0269	,-4.8805	,0],[0.6146	,-5.1786	,0],[2.622	,-4.4428	,0],[4.0869	,-3.6286	,0],[5.4917	,-2.217	,0],
// [5.2936	,2.0629	,0]] 
const points = [[5.2751250664507, 0.7849801137441208,0], [12.622065187731776, 6.702958725931767,0], [5.720301365117938, 11.215791111126105,0], [3.830896207726779, 11.8716479180769,0], [0.5516121729728045, 2.424622131121109,0], [16.664506043720284, 5.607920339200787,0], [9.512656536551935, 15.451153603535237,0], [14.913783810803894, 13.638450433830778,0], [15.144309701785755, 17.179523223715847,0], [16.270824823945077, 13.229125977489728,0], [6.676058113028001, 5.508911304559945,0], [10.502881542071037, 6.799562386943836,0], [16.39886710463572, 0.03518189141661132,0], [6.542781594183209, 5.906987027847556,0], [0.1267556803524461, 7.483498297559043,0], [7.733936349008257, 12.43301986366734,0], [16.54709953721039, 2.3957841333883234,0], [19.090408281851065, 13.614143694711052,0], [7.053030591210783, 8.099302865242901,0], [11.946026826927412, 9.702217174586405,0], [11.6204236448561, 2.8974235991772535,0], [10.38214388462274, 12.55549942696825,0], [14.103316762880048, 11.292845996782164,0], [1.1957907188309425, 8.099142246827167,0], [0.760465758375477, 12.10141911776666,0]]; 
// const points = [[6.7302,	0	,0],[5.5696,	3.9886,	0],[4.436	,4.9293,	0],[2.8475,	4.5983,	0],[1.1231	,4.2634,	0],[-1.9421,	4.3852,	0],[-1.8235	,4.3728,0],[-2.2206,	4.5529,	0],[-3.8116,	5.0711,	0],[-6.7561,	0.6644,	0],[-5.7035,	2.926,	0],[5.2936,	-2.0629,	0],[4.1692	,3.9538	,0],[2.5817	,-4.5346	,0],[0.4353,	5.2757,	0],[-2.0573,	4.5258	,0],[-3.3913	,3.6194	,0],[-4.3102	,2.2464	,0],[-4.3574	,-2.3185	,0],[-3.4031	,-3.4772	,0],[-2.1187	,-4.4592	,0],[-1.0269	,-4.8805	,0],[0.6146	,-5.1786	,0],[2.622	,-4.4428	,0],[4.0869	,-3.6286	,0],[5.4917	,-2.217	,0]]
// [5.2936	,2.0629	,0]] 
// -6.9928	-2.313	0
// -5.8522	-3.1624	0
// -4.8372	-3.6258	0
// -2.1074	-4.6373	0
// -0.9333	-4.6063	0
// -1.0474	-4.2699	0
// -1.2668	-4.4333	0
// 0.1237	-4.6186	0
// 1.4708	-4.3884	0
// 1.2409	-4.3625	0
// 1.5662	-4.6562	0
// 2.1931	-5.0184	0
// 5.5235	-3.8843	0
// 6.4728	-2.853	0;
// const points = [[0, 5, 0],[5,2,0], [10, 0, 0], [10, 10, 0], [0, 10, 0]];
// const points = [[0, 5, 0], [8, 0, 0], [10, 8, 0], [10, 10, 0], [0, 10, 0]];
const xmax = 1000;
// const points = [[1, 2, 0], [10, 2, 0], [10, 6, 0], [4, 5, 0], [4, 9, 0], [8, 9, 0], [8, 7, 0], [12, 7, 0], [12, 13, 0], [1, 11, 0]];
// last touch on vertex exclude
var boundbox = [], target = [];

let decision = [];
var int_count;
var wd, flagWD;
const num = 100;
if (num == 0) {
  throw new Error("Num is 0. Exiting script.");
}


function crossP(inAll_vector, Inp1, Inp2, Inq1, Inq2) {
  console.log("crossP() :: inAll_vector", inAll_vector)
  let cp11 = [], cp12 = [], cp21 = [], cp22 = [];
  let m = inAll_vector[0].length, n = inAll_vector.length;

  for (let j = 0; j < m; j++) {
    cp11[j] = (inAll_vector[0][(j + 1) % m] * inAll_vector[1][(j + 2) % m]) - (inAll_vector[0][(j + 2) % m] * inAll_vector[1][(j + 1) % m])

    cp12[j] = (inAll_vector[0][(j + 1) % m] * inAll_vector[2][(j + 2) % m]) - (inAll_vector[0][(j + 2) % m] * inAll_vector[2][(j + 1) % m])

    cp21[j] = (inAll_vector[3][(j + 1) % m] * inAll_vector[4][(j + 2) % m]) - (inAll_vector[3][(j + 2) % m] * inAll_vector[4][(j + 1) % m])

    cp22[j] = (inAll_vector[3][(j + 1) % m] * inAll_vector[5][(j + 2) % m]) - (inAll_vector[3][(j + 2) % m] * inAll_vector[5][(j + 1) % m])

  }

  console.log('cp', cp11, cp12, cp21, cp22)

  if ((cp11[2] * cp12[2]) == 0 || (cp21[2] * cp22[2]) == 0) {
    // onEdge(points, Inp1)
    console.log("rayonvertex()")
    if (rayOnVertex(cp11, cp12, cp21, cp22, Inp1, Inp2, Inq1, Inq2)) {
      flagWD = true
    }
  }
  console.log("intOrNOt()")
  intOrNot(cp11, cp12, cp21, cp22)
  // console.log(Math.sign(cp12[2]))

  // return cp
}

// *******************************************
// this fun return cross product
// function crossPP(vector1,vector2) {

//   let cp =[];
//   let m = vector1[0].length;

//   for (let j = 0; j < m; j++) {
//     cp[j] = (vector1[(j + 1) % m] *  vector2[(j + 2) % m]) - (vector1[(j + 2) % m] *  vector2[(j + 1) % m]) 

//   }
//     return cp

// } 

function rayOnVertex(cp11, cp12, cp21, cp22, Inp1, Inp2, Inq1, Inq2) {
  if (cp11[2] == 0 && IsPointOnLine(Inq1, Inp1, Inp2)) {
    (cp12[2] > 0) ? (wd++) : (wd--);
    console.log("wd", wd)
    console.log("cp11[2] is zero ", cp12[2])
    return true
  }
  else if ((cp12[2]) == 0 && IsPointOnLine(Inq2, Inp1, Inp2)) {
    (cp11[2] > 0) ? (wd++) : (wd--);
    console.log("wd", wd)
    console.log(" cp12[2]) is zero ", cp11[2])
    return true
  } else if (cp21[2] == 0 && IsPointOnLine(Inp1, Inq1, Inq2)) {
    //check if point is inside of line or not
    (cp22[2] > 0) ? (wd++) : (wd--);
    console.log("wd", wd)
    console.log("cp21[2]  is zero ", cp22[2])
    return true
  }
  else if ((cp22[2]) == 0 && IsPointOnLine(Inp2, Inq1, Inq2)) {
    (cp21[2] > 0) ? (wd++) : (wd--);
    console.log("wd", wd)
    console.log("cp22[2]) is zero ", cp21[2])
    return true
  }
  return false;
}

function intOrNot(cp11, cp12, cp21, cp22) {
  //   // magnitude(cp11, cp12)
  //   //   for(let i = 0; i < m; i++){
  console.log("(cp11[2] * cp12[2])  (cp21[2] * cp22[2])", cp11[2] * cp12[2], cp21[2] * cp22[2])

  if ((cp11[2] * cp12[2]) < 0 && (cp21[2] * cp22[2]) < 0) {
    int_count++;
    console.log("intersect");
  } else {
    console.log("not intersect")
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
        IsPointOnLine(inTarget, inPoints[i], inPoints[(i + 1) % n])
        // t = P - p1 / p2 - p1
        // t = P - p1 / p2 - p1
        // console.log("flagE",flagE)
        // tx = (inTarget[0] - inPoints[i][0]) / (inPoints[(i + 1) % n][0] - inPoints[i][0]);
        // if (tx > 1 || tx < 0) {
        //   console.log("points is not on edge")
        //   return false;
        // }
        // ty = (inTarget[1] - inPoints[i][1]) / (inPoints[(i + 1) % n][1] - inPoints[i][1]);
        // if (ty > 1 || ty < 0) {
        //   console.log("points is not on edge")
        //   return false;
        // }
        // tz = (inTarget[2] - inPoints[i][2]) / (inPoints[(i + 1) % n][2] - inPoints[i][2]);
        // if (tz > 1 || tz < 0) {
        //   console.log("points is not on edge")
        //   return false
        // }
        // // edge = true;
        // console.log("point is on a edge");
        // return true

      }
    }

  }

  return false
}

function IsPointOnLine(inTarget, inPoints1, inPoints2) {
  let tx, ty, tz;
  tx = (inTarget[0] - inPoints1[0]) / (inPoints2[0] - inPoints1[0]);
  if (tx > 1 || tx < 0) {
    console.log("points is not on edge")
    return false;
  }
  ty = (inTarget[1] - inPoints1[1]) / (inPoints2[1] - inPoints1[1]);
  if (ty > 1 || ty < 0) {
    console.log("points is not on edge")
    return false;
  }
  tz = (inTarget[2] - inPoints1[2]) / (inPoints2[2] - inPoints1[2]);
  if (tz > 1 || tz < 0) {
    console.log("points is not on edge")
    return false
  }
  // edge = true;
  console.log("point is on a edge");
  return true
}

// function magnitude(cp11,cp12){
//   let  mag1 = 0,mag2 = 0;
//  for(let i = 0; i < m; i++){
//      mag1 +=(cp11[i]) * (cp11[i]);
//      mag2 +=(cp11[i]) * (cp12[i]);
//  }
//  if(mag1 == 0 || mag2 == 0){
//      console.log("one poin is on vertex ")
//      return 0
//  }
// }

function onVertex(inPoints, inTarget) {

  console.log("onVertex checking")
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
  console.log("vectorDir")
  int_count = 0;
  let n = points.length;
  let Inp2 = [xmax, Inp1[1], Inp1[2]]
  console.log("Inp1", Inp1)
  console.log("Inp2", Inp2)
  // console.log(Inq2)

  // let vectorPQ11 = [], vectorPQ12 = [], vectorPQ21 = [], vectorPQ22 = [], vectorQP11 = [], vectorQP12 = [], vectorQP21 = [], vectorQP22 = [];


  let vectorPQ11 = [], vectorPP12 = [], vectorPQ12 = [], vectorQP11 = [], vectorQP12 = [], vectorQQ12 = [];
  let Inq1, Inq2;
  wd = 0; flagWD = false;

  for (let i = 0; i < n; i++) {
    let all_vector = [],
      Inq1 = points[i], Inq2 = points[(i + 1) % n];
    console.log("in points", Inp1, Inp2, Inq1, Inq2)
    // vectorPQ11 = [(Inq1[0] - Inp1[0]), (Inq1[1] - Inp1[1]), (Inq1[2] - Inp1[2])]

    // vectorPQ21 = [(Inq1[0] - Inp2[0]), (Inq1[1] - Inp2[1]), (Inq1[2] - Inp2[2])]

    // vectorPQ12 = [(Inq2[0] - Inp1[0]), (Inq2[1] - Inp1[1]), (Inq2[2] - Inp1[2])]

    // vectorPQ22 = [(Inq2[0] - Inp2[0]), (Inq2[1] - Inp2[1]), (Inq2[2] - Inp2[2])]


    // vectorQP11 = [(Inp1[0] - Inq1[0]), (Inp1[1] - Inq1[1]), (Inp1[2] - Inq1[2])]

    // vectorQP21 = [(Inp1[0] - Inq2[0]), (Inp1[1] - Inq2[1]), (Inp1[2] - Inq2[2])]

    // vectorQP12 = [(Inp2[0] - Inq1[0]), (Inp2[1] - Inq1[1]), (Inp2[2] - Inq1[2])]

    // vectorQP22 = [(Inp2[0] - Inq2[0]), (Inp2[1] - Inq2[1]), (Inp2[2] - Inq2[2])]

    // checking with different vector


    vectorPP12 = [(Inp2[0] - Inp1[0]), (Inp2[1] - Inp1[1]), (Inp2[2] - Inp1[2])]

    vectorPQ11 = [(Inq1[0] - Inp1[0]), (Inq1[1] - Inp1[1]), (Inq1[2] - Inp1[2])]

    vectorPQ12 = [(Inq2[0] - Inp1[0]), (Inq2[1] - Inp1[1]), (Inq2[2] - Inp1[2])]

    vectorQQ12 = [(Inq2[0] - Inq1[0]), (Inq2[1] - Inq1[1]), (Inq2[2] - Inq1[2])]


    vectorQP11 = [(Inp1[0] - Inq1[0]), (Inp1[1] - Inq1[1]), (Inp1[2] - Inq1[2])]


    vectorQP12 = [(Inp2[0] - Inq1[0]), (Inp2[1] - Inq1[1]), (Inp2[2] - Inq1[2])]

    // console.log(vector11,vector12,vector21,vector22)
    all_vector.push(vectorPP12, vectorPQ11, vectorPQ12, vectorQQ12, vectorQP11, vectorQP12);
    crossP(all_vector, Inp1, Inp2, Inq1, Inq2)
  };


  console.log("vector dir int count", int_count)
  console.log("flagWD", flagWD)
  console.log("wd final", wd)
  if (flagWD) {
    return(result(wd, int_count, flagWD))
    
  } else {
    return int_count
  }
}


function result(wd, int_count, flagWD) {

  if (flagWD && (wd == 0) && (int_count % 2) == 0) {
    console.log("FInal inside from result ")
    return 1
  } else if (flagWD && (wd == 0) && (int_count % 2) == 1) {
    console.log("FInal outside from result")
    return 0
    
  } else if (flagWD && (wd !== 0) && (int_count % 2) == 1) {
    console.log("FInal inside from result ")
    return 1
    
  } else if (flagWD && (wd !== 0) && (int_count % 2) == 0) {
    console.log("FInal outside from result")
    return 0

  }
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

function inOrOut(points, target_p, xmax) {
  console.log("inOrOut checking")
  let d = vectorDir(points, target_p, xmax)
  console.log("d", d)
  // let d = vectorDir(points,[ 3.20000, 4.20000, 0 ],xmax) ;

  // console.log(int_count)
  if (d % 2 == 1) {
    decision.push(3)
    console.log("Intersect final", target_p)
  } else if (d % 2 == 0) {
    decision.push(4)
    console.log("outside")
    console.log("Not Intersect final", target_p)
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
    } else {
      inOrOut(points, target[i], xmax)
    }

  }
  console.log("deision", decision)
}

//  vecterDir(p1,p2,q1,q2) 
boundary(points)

main()

export const x = { target, decision, points };
