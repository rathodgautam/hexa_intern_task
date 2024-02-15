import * as THREE from 'three'
import {x} from './allPoints.js'
import { ThreeViewer } from './threeCustom/viewer/ThreeViewer'

let threeViewer = new ThreeViewer({
    element: document.getElementById('container3D')
})
threeViewer.initViewer()
threeViewer.loadENV('./env.hdr')


// Start your project from here

// Create a box
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 })
// const cube = new THREE.Mesh(geometry, material)
// threeViewer.scene.add(cube)

threeViewer.intersectionCallback = function checkInterSectionClick() {
    var raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(this.mouse, this.camera);
    var intersectionClick = raycaster.intersectObjects(this.pickingObjects, true);
    if (intersectionClick.length > 0) {
        console.log(intersectionClick[0])
    }
}


function addPoint(inLocation,deci) {
    const sphereGeo = new THREE.SphereGeometry(0.05, 32, 32)
    
    const colorOptions = {
        1: { color: 'red' },  // Color option for deci == 1
        2: { color: 'white' },  // Color option for deci == 2
        3: { color: 'black' },  // Color option for deci == 3
        4: { color: 'orange' } ,  // Color option for deci == 4
        5: { color: 'brown' }   // Color option for deci == 4
    };
    
    const defaultColor = { color: 'pink' };  // Default color option
    const sphereMat = new THREE.MeshBasicMaterial(colorOptions[deci] || defaultColor)


    const sphere = new THREE.Mesh(sphereGeo, sphereMat)
    threeViewer.scene.add(sphere)
    sphere.position.copy(inLocation)
}
 
for(let i = 0 ; i < x.target.length; i++){ 
        addPoint(new THREE.Vector3(x.target[i][0],x.target[i][1],x.target[i][2]),x.decision[i])
    }


    addPoint(new THREE.Vector3())


function addLine(inP1, inP2) {
    const material = new THREE.LineBasicMaterial({
        color: 0x0000ff
    });

    const points = [];
    points.push(inP1, inP2)

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const line = new THREE.Line(geometry, material);
    threeViewer.scene.add(line);
}

let Plength = x.points.length;
for(let i = 0 ; i < x.points.length; i++){
    let a = x.points[i][0], p = x.points[(i+1)%Plength][0];
    let b = x.points[i][1], q = x.points[(i+1)%Plength][1];
    let c = x.points[i][2], r = x.points[(i+1)%Plength][2]; 
    addLine(new THREE.Vector3(a,b,c), new THREE.Vector3(p,q,r))
}

// addLine(new THREE.Vector3(3.2, 4.2, 0), new THREE.Vector3(10000, 4.2, 0))
addLine(new THREE.Vector3(3.2, 4.2, 0), new THREE.Vector3(10000, 4.2, 0))
[ 3.2, 4.2, 0 ] [ 10000, 4.2, 0 ]
 

