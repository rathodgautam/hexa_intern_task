const points = [[1,1,0],[3,1,0],[3,3,0],[1,3,0]];

const target = [2,1,0];

const n = points.length; 
const m = points[0].length; 
 
var ab = [],at = [],result = [],mag;
var flagV = 0, flagE = 0; vertex = false; edge = false;

function onVertex(inPoints,inTarget){
  if(edge == false){
  for (let i = 0; i < n; i++) {
    for(let j = 0; j < m; j++){ 
     if(vertex == true) break;
      //  ab = b - a 
      // (parseFloat(number).toPrecision(12)))
        at[j] =  inTarget[j] - inPoints[i][j];
        ab[j] =   inPoints[(i+1)%n][j]-inPoints[i][j];
        if(at[j] == 0) {
        flagV++;
        }
        console.log(flagV)
        if(flagV == 3){
             vertex = true;
             console.log("point is on a vertex");
             return true
        }
      }
       flagV = 0;
    } 
  }
  return false
}

function onEdge(){
  if(vertex == false){
  for (let i = 0; i < n; i++) {
    for(let j = 0; j < m; j++){
      // console.log(ab[(i+1)%m]);
      if(edge == true) break;
       result[i] = ab[(i+1)%m]*at[(i+2)%m] - ab[(i+2)%m]*at[(i+1)%m]; 
      //  result[i] = ab[(i+1)%m]*at[(i+2)%m] - ab[(i+2)%m]*at[(i+1)%m]; 
       console.log(result[i])
       mag +=(result[i]) * (result[i]);
        if(result[i] == 0) {
        flagE++;
        }
      //   console.log(flag)
        if(flagE == 3){
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

onVertex( points,target);
onEdge(); 




