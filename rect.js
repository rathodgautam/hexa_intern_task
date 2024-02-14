// // const input = [[0,0],[10,0],[0.10],[10,10]]

const a =[10,0,0] , b=[10,10,0] , result=[]
const n = a.length; 

let mag = 0;
for(let i=0; i<n; i++){
    result[i] = a[(i+1)%n]*b[(i+2)%n] - a[(i+2)%n]*b[(i+1)%n];
    mag +=(result[i]) * (result[i]);
  }
  
  console.log("Final Vector :",result)
  console.log("Magnitude of Vector:",  Math.sqrt(mag))


  console.log(0-0)