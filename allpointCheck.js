

// temp 

const points = [[1, 4, 0], [6, 1, 0], [7, 10, 0], [2, 9, 0]];

const target = [];
const boundbox = [], boundLine = [];
var allPoints = []
const num = 10;
if(num == 0){
    throw new Error("Num is 0. Exiting script.");
    } 
// num !== 0

const n = points.length;
const m = points[0].length;

var ab = [], at = [], cp = [], mag;
// var flagV = 0, flagE = 0;
// let vertex = false, edge = false, inside = false, outside = false;


function boundary(inPoints) {
    // boundaryBox
    var xmin = inPoints[0][0], xmax = inPoints[0][0], ymin = inPoints[0][1], ymax = inPoints[0][1];
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

    // console.log(xmin, xmax, ymax, ymin)
    boundbox.push([xmin, ymin], [xmax, ymin], [xmin, ymax], [xmax, ymax])
    // console.log(boundbox)
}

function line_points(inboundBox) {
    // const bound = [[1, 1, 0], [6, 1, 0], [1, 4, 0]]
    // console.log(bound.length)
    for (let k = 0; k < (inboundBox.length - 2); k++) {
        boundLine[k] = []
        for (let t = 0, i = 0; i <= num && Number(t.toFixed(5)) <= 1; i++, t += 1 / num) {
            boundLine[k][i] = [];
            boundLine[k][i][0] = (inboundBox[0][0] * (1 - t) + (inboundBox[k + 1][0] * t)).toFixed(5);
            boundLine[k][i][1] = (inboundBox[0][1] * (1 - t) + (inboundBox[k + 1][1] * t)).toFixed(5);
        }
    }
    // console.log("boundLine",boundLine)
}

function funallPoints(inBoundLine) {
    let a = inBoundLine[0].length;
    for (let i = 0; i < a; i++) {
        allPoints[i] = [];
        for (let j = 0; j < a; j++) {
            allPoints[i][j] = [];
            allPoints[i][j][0] = inBoundLine[0][j][0];
            allPoints[i][j][1] = inBoundLine[1][i][1];
            allPoints[i][j][2] = 0;
            target.push(allPoints[i][j]);
        }
    }
    // console.log('target',target)
    // console.log("allPoints",allPoints.flat(1))
}


function atVertex(inPoints, inTarget) { 
      for (let i = 0; i < n; i++) {
          at[i] = []; 
          for (let j = 0; j < m; j++) {  
              at[i][j] = inTarget[j] - inPoints[i][j]; 
          }
      } 
  }

function abVertex(inPoints) {
    for (let i = 0; i < n; i++) {
        ab[i] = [];
        for (let j = 0; j < m; j++) {
            ab[i][j] = inPoints[(i + 1) % n][j] - inPoints[i][j]
        }
    }
}

function onVertex(inPoints, inTarget) {
  let vertex = false;
    for (let i = 0; i < n; i++) {
        // at[i] = [];
        let flagV = 0;
        for (let j = 0; j < m; j++) { 
            //  ab = b - a 
            // (parseFloat(number).toPrecision(12)))
            // at[i][j] = inTarget[j] - inPoints[i][j];
            if (at[i][j] == 0) {
                flagV++;
            }
            // console.log("flagv",flagV)
            if (flagV == 3) {
                console.log('point is vertex')
                vertex = true;
                return true
            }
        }
    }
    return false
}

function funcp(inAb, inAt){ 
    for (let i = 0; i < n; i++) {
        cp[i] = []; 
        for (let j = 0; j < m; j++) { 
            cp[i][j] = inAb[i][(j + 1) % m] * inAt[i][(j + 2) % m] - inAb[i][(j + 2) % m] * inAt[i][(j + 1) % m]; 
            
        }
        
    } 
}

function onEdge(inAb, inAt) {
    let edge = false; 
    for (let i = 0; i < n; i++) {
        cp[i] = [];
        let flagE = 0;
        for (let j = 0; j < m; j++) { 
            cp[i][j] = inAb[i][(j + 1) % m] * inAt[i][(j + 2) % m] - inAb[i][(j + 2) % m] * inAt[i][(j + 1) % m]; 
            if (cp[i][j] == 0) {
                flagE++;
            } 
            if (flagE == 3) {
                edge = true;
                console.log("point is on a edge");
                return true
            }
        }
        
    }

    return false
}

function in_out(inCp) {
    let inside = false,outside = false;
    let pos_count = 0, neg_count = 0;
 
    for (let i = 0; i < n; i++) {
        if (inCp[i][2] < 0) {
            neg_count++;
        }
        else {
            pos_count++;
        }


    }
    if (pos_count == n || neg_count == n) {
        inside = true;
        console.log("point is inside")
        return true
    }
    else {
        outside = true;
        console.log("point is outside")
        return false
    }

}



boundary(points)
line_points(boundbox)
funallPoints(boundLine)
abVertex(points)


let l = target.length
console.log('l', l)
let decision = [];
var temp = 0;
console.log("starting decision", decision)
for (let k = 0; k < l; k++) {
    atVertex(points, target[k])
    funcp(ab,at)
    console.log(temp++, "target", target[k])
    console.log('cp',cp)
    let inOut = in_out(cp);
    if(inOut){
        decision.push(3)
    } else if (!inOut) {
        //   console.log("in_out 1 calling")
        decision.push(4)
    }
    else if (onVertex(points, target[k])) {
        decision.push(1)
    }
    else if (onEdge(ab, at)) {
        decision.push(2)
    } else  {
        decision.push(5) 
    }
    // else(inoutReturn == undefined){
    //     decision.push('undefined') 
    // }
    console.log("d length",decision.length)

}

console.log("decision")
decision.forEach((val) => {if(val == 4){
    console.log(val)
}
   })
export const x = { target, decision, points };
// onVertex( points, [7.00000,5.05000, 0]);
// onEdge(ab,at);
// in_out(cp)
//  console.log("decision",decision.length)
// console.log(target)
// console.log("at", at)
// console.log("ab", ab)
// console.log("cp", cp)  




