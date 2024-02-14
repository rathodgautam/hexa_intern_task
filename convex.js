// const p1 = [1,3,0],p2 = [5,3,0],q1 = [2,2,0],q2 = [2,4,0];
// const p1 = [2,2,0],p2 = [4,2,0],q1 = [3,1,0],q2 = [3,3,0];
// const p1 = [2,2,0],p2 = [4,2,0],q1 = [1,1,0],q2 = [1,3,0];
const p1 = [2,2,0],p2 = [4,2,0],q1 = [4,3,0],q2 = [4,1,0];
// last touch CP = 0
 let m = 3;

function crossP(inAll_vector){
  let cp1=[],cp2=[] ;   
  let n=inAll_vector.length;
  console.log(m)
   
 for (let j = 0; j < m; j++) {
  cp1[j] =(inAll_vector[0][(j+1)%m]*inAll_vector[1][(j+2)%m])-(inAll_vector[0][(j+2)%m] *  inAll_vector[1][(j+1)%m] )
  cp2[j] =(inAll_vector[2][(j+1)%m]*inAll_vector[3][(j+2)%m])-(inAll_vector[2][(j+2)%m] *  inAll_vector[3][(j+1)%m] )
      }
    // onEdgeCheck(cp1,cp2)
    decision(cp1,cp2)
}


function decision(cp1,cp2){
    magnitude(cp1,cp2)
    for(let i = 0; i < m; i++){
        if(cp1[i] < 0 && cp2[i] > 0){
            console.log("Intersect")
            return 1
        }
            console.log("Not Intersect")
         return 0
    }
}

function magnitude(cp1,cp2){
    let  mag1 = 0,mag2 = 0;
   for(let i = 0; i < m; i++){
       mag1 +=(cp1[i]) * (cp1[i]);
       mag2 +=(cp1[i]) * (cp2[i]);
   }
   if(mag1 ==0 || mag2 == 0){
       console.log("one poin is on vertex ")
       return 0
   }
}

// function onEdgeCheck(Incp1,Incp2){
//     if(Incp[0]==)
// }

function vecterDir(Inp1,Inp2,Inq1,Inq2) {
    let all_vector=[], vector11 = [],vector12=[],vector21=[],vector22=[];
     vector11 = [(Inq1[0]-Inp1[0]),(Inq1[1]-Inp1[1]),(Inq1[2]-Inp1[2])]
     vector12 = [(Inq2[0]-Inp1[0]),(Inq2[1]-Inp1[1]),(Inq2[2]-Inp1[2])]
     vector21 = [(Inq1[0]-Inp2[0]),(Inq1[1]-Inp2[1]),(Inq1[2]-Inp2[2])]
     vector22 = [(Inq2[0]-Inp2[0]),(Inq2[1]-Inp2[1]),(Inq2[2]-Inp2[2])]
      all_vector.push(vector11,vector12,vector21,vector22);
      console.log(all_vector,"all")
     crossP(all_vector) 
    //  for(let i = 0;)
} 
 
     vecterDir(p1,p2,q1,q2) 