function boundary(inPoints){
  // boundaryBox
  var xmin = inPoints[0][0], xmax = inPoints[0][0], ymin = inPoints[0][1], ymax = inPoints[0][1];
  console.log(xmin, xmax, ymax, ymin)
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
  
  boundbox.push([xmin,ymin],[xmin,ymax],[xmax,ymax],[xmax,ymin])
  console.log(boundbox) 
  }