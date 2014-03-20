var width = window.innerWidth;
var height = window.innerHeight;

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene;

var cubeGeometry = new THREE.CubeGeometry(100, 100, 100);
var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x1ec876 });
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
//cube.rotation.y = Math.PI * 45 / 180;
scene.add(cube);

var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
camera.position.y = 160;
camera.position.z = 400;
camera.lookAt(cube.position);

scene.add(camera);

var skyboxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
var skyboxMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide });
var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);

scene.add(skybox);

var pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 300, 200);

scene.add(pointLight);

var mouseDown = false;
var mouseX = 0, mouseY = 0;

onMouseMove = function(evt) {
	if (!mouseDown) {
            return;
    }

    evt.preventDefault();

    var deltaX = evt.clientX - mouseX, deltaY = evt.clientY - mouseY;
    mouseX = evt.clientX;
    mouseY = evt.clientY;
    rotateScene(deltaX, deltaY);
}

onMouseDown = function(evt) {
	evt.preventDefault();

    mouseDown = true;
    mouseX = evt.clientX;
    mouseY = evt.clientY;
}

onMouseUp = function(evt) {
	evt.preventDefault();
    mouseDown = false;
}

var xAxis = new THREE.Vector3(1,0,0);
var yAxis = new THREE.Vector3(0,1,0);
var zAxis = new THREE.Vector3(0,0,1);

rotateScene = function (deltaX, deltaY) {
	//cube.rotation.y += deltaX / 100;
	//cube.rotation.x += deltaY / 100;
    rotateAroundWorldAxis(cube, xAxis, deltaY/100);
    rotateAroundWorldAxis(cube, yAxis, deltaX/100);
}

rotateAroundWorldAxis = function(object, axis, radians) {
    rotWorldMatrix = new THREE.Matrix4();
    rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);

    rotWorldMatrix.multiply(object.matrix);                // pre-multiply

    object.matrix = rotWorldMatrix;

    //console.log(object.rotation);
    //object.rotation.setEulerFromRotationMatrix(object.matrix) did not work
    object.rotation.setFromRotationMatrix(object.matrix);
}

//var clock = new THREE.Clock;
document.addEventListener('mousemove', onMouseMove, false);
document.addEventListener('mousedown', onMouseDown, false);
document.addEventListener('mouseup', onMouseUp, false);

function render() {
        requestAnimationFrame(render);
        
        //cube.rotation.y -= clock.getDelta();
        
        renderer.render(scene, camera);
}

render();
