const points = [[1, 1, 0], [6, 1, 0], [3, 3, 0], [2, 4, 0]];

const target = [5, 2, 0];
const boundbox = [], pointsCont = [];;

const n = points.length;
const m = points[0].length;

var ab = [], at = [], cp = [], mag;
var flagV = 0, flagE = 0; vertex = false; edge = false, inside = false, outside = false;


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

    console.log(xmin, xmax, ymax, ymin)
    boundbox.push([xmin, ymin], [xmax, ymin], [xmin, ymax], [xmax, ymax])
    console.log(boundbox)
}

function line_points() {
    const bound = [[1, 1, 0], [6, 1, 0], [1, 4, 0]]
    // 1 6 4 1
    let boundLine = [];
    let num = 10;
    // num !== 0 
    // console.log(bound.length)
    for (let k = 0; k < (bound.length - 1); k++) {
        boundLine[k] = []
        for (let t = 0, i = 0; i <= num && Number(t.toFixed(5)) <= 1; i++, t += 1 / num) {
            boundLine[k][i] = [];
            boundLine[k][i][0] = (bound[0][0] * (1 - t) + (bound[k + 1][0] * t)).toFixed(5);
            boundLine[k][i][1] = (bound[0][1] * (1 - t) + (bound[k + 1][1] * t)).toFixed(5);
        }
    }
    console.log(boundLine)
}

function onVertex(inPoints, inTarget) {
    for (let i = 0; i < n; i++) {
        ab[i] = [], at[i] = [];
        for (let j = 0; j < m; j++) {
            if (vertex == true) break;
            //  ab = b - a 
            // (parseFloat(number).toPrecision(12)))
            at[i][j] = inTarget[j] - inPoints[i][j];
            ab[i][j] = inPoints[(i + 1) % n][j] - inPoints[i][j];
            if (at[i][j] == 0) {
                flagV++;
            }
            // console.log(flagV)
            if (flagV == 3) {
                vertex = true;
                console.log("point is on a vertex");
                return true
            }
        }
        flagV = 0;
    }
    return false
}

function onEdge(inAb, inAt) {
    if (vertex == false) {
        for (let i = 0; i < n; i++) {
            cp[i] = []
            for (let j = 0; j < m; j++) {
                // console.log(ab[(i+1)%m]);
                if (edge == true) break;
                cp[i][j] = inAb[i][(j + 1) % m] * inAt[i][(j + 2) % m] - inAb[i][(j + 2) % m] * inAt[i][(j + 1) % m];
                //  result[i] = ab[(i+1)%m]*at[(i+2)%m] - ab[(i+2)%m]*at[(i+1)%m]; 
                if (cp[i][j] == 0) {
                    flagE++;
                }
                //   console.log(flag)
                if (flagE == 3) {
                    edge = true;
                    console.log("point is on a edge");
                    return true
                }
            }
            flagE = 0;
        }
    }
    return false
}

function in_out(inCp) {
    let pos_count = 0, neg_count = 0;
    if (vertex == false && edge == false) {
        for (let i = 0; i < n; i++) {
            if (inCp[i][2] < 0)
                neg_count++;
            else
                pos_count++;
        }

        if (pos_count == n || neg_count == n) {
            inside = true;
            console.log("point is inside")
            return
        } else {
            outside = true;
            console.log("point is outside")
            return
        }

    }
}



boundary(points)
line_points(bound)
// allPoints()
// onVertex( points,target);
// onEdge(ab,at);
// in_out(cp)

// console.log("at", at)
// console.log("ab", ab)
// console.log("cp", cp)




