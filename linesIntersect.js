// const p1 = [1,3,0],p2 = [5,3,0],q1 = [2,2,0],q2 = [2,4,0];
// const p1 = [2,2,0],p2 = [4,2,0],q1 = [3,1,0],q2 = [3,3,0];
// const p1 = [2,2,0],p2 = [4,2,0],q1 = [1,1,0],q2 = [1,3,0];
const p1 = [2,2,0],p2 = [4,2,0],q1 = [4,3,0],q2 = [4,1,0];
// last touch on vertex exclude
 
function crossP(inAll_vector){
  let cp1=[],cp2=[] ;   
  let m = inAll_vector[0].length,n = inAll_vector.length; 
   
 for (let j = 0; j < m; j++) {
  cp1[j] =(inAll_vector[0][(j+1)%m]*inAll_vector[1][(j+2)%m])-(inAll_vector[0][(j+2)%m] *  inAll_vector[1][(j+1)%m] )
  cp2[j] =(inAll_vector[2][(j+1)%m]*inAll_vector[3][(j+2)%m])-(inAll_vector[2][(j+2)%m] *  inAll_vector[3][(j+1)%m])
      }

      console.log(cp1,cp2)
      console.log(Math.sign(cp2[2]))
      
//   return cp
}


function vecterDir(Inp1,Inp2,Inq1,Inq2) {
    let all_vector=[], vector11 = [],vector12=[],vector21=[],vector22=[];
     vector11 = [(Inq1[0]-Inp1[0]),(Inq1[1]-Inp1[1]),(Inq1[2]-Inp1[2])]
     vector12 = [(Inq2[0]-Inp1[0]),(Inq2[1]-Inp1[1]),(Inq2[2]-Inp1[2])]
     vector21 = [(Inq1[0]-Inp2[0]),(Inq1[1]-Inp2[1]),(Inq1[2]-Inp2[2])]
     vector22 = [(Inq2[0]-Inp2[0]),(Inq2[1]-Inp2[1]),(Inq2[2]-Inp2[2])]
      all_vector.push(vector11,vector12,vector21,vector22);
      console.log(all_vector,"all")
     crossP(all_vector)  }
     
     vecterDir(p1,p2,q1,q2) 