//scale:  1m = 1 light second

//initialize your variables here
const c = 1; // in units of light seconds per second.  
const m = 1; // in kg
var thrusters = 0;// in __
var direction = new THREE.Vector3;//direction of camera
var hyperdrive = false;// when caps lock is on and a key is pressed, hyper driver is turned on
var p = 0;//momentum
var v = 0;//velocity

//keyboard variables, 
var w = false;
var a = false;
var s = false;
var d = false;
var q = false;
var e = false;

//controls handler
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
document.addEventListener("wheel", wheel);

function keyDown(){
	//console.log(event.keyCode);
	switch(event.keyCode) {
		case 87:
			w = true;
			break;
		case 65:
			a = true;
			break;
		case 83:
			s = true;
			break;
		case 68:
			d = true;
			break;
		case 81:
			q = true;
			break;
		case 69:
			e = true;
			break;
		case 32:
			p = 0;
			thrusters = 0;
			break;
		//default:
			//no default required for this
	}
}

function keyUp(){
	//console.log(event.keyCode);
	switch(event.keyCode) {
		case 87:
			w = false;
			break;
		case 65:
			a = false;
			break;
		case 83:
			s = false;
			break;
		case 68:
			d = false;
			break;
		case 81:
			q = false;
			break;
		case 69:
			e = false;
			break;
		//default:
			//no default required for this
	}
	if (event.getModifierState("CapsLock")) {
    	hyperdrive = true;
  	} else {
    	hyperdrive = false;
  	}
}
function wheel(){
	//console.log(event.deltaY);
	thrusters -= event.deltaY/100;//not sure why this has to be negative
}

//this is a web GL compatibility checked //didn't seem to work
//starting here
/*if ( WEBGL.isWebGLAvailable() ) {
	// Initiate function or other initializations here
	animate();
} else {
	const warning = WEBGL.getWebGLErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );
}*/
//ending here

//setting up three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000);			

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight); 
document.body.appendChild( renderer.domElement );//document.getElementById("body").appendChild( renderer.domElement );

//everything in the universe's reference frame should be added to this group
var universe = new THREE.Group()

//finally, everything is set up, so universe can begin to be built

//first tutorial (a cube spinning)

// now everything is set up, so the coding cube can be placed















//moved to galaxy.js
/*
//green cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({color:0x00ff00});
const cube = new THREE.Mesh(geometry, material);

universe.add(cube);

//green cube 2
const geometry3 = new THREE.BoxGeometry(1,1,80);
const cube2 = new THREE.Mesh(geometry3, material);
cube2.position.y = 20;

universe.add(cube2)


//create a blue LineBasicMaterial
const blueMaterial = new THREE.LineBasicMaterial( { color: 0x0000ff } );

const points = [];
points.push( new THREE.Vector3( - 10, 0, 0 ) );
points.push( new THREE.Vector3( 0, 10, 0 ) );
points.push( new THREE.Vector3( 10, 0, 0 ) );

const geometry2 = new THREE.BufferGeometry().setFromPoints( points );
const line = new THREE.Line( geometry2, material );

universe.add(line);
*/



























//moved to animate.js
/* 
scene.add( universe );
camera.position.z = 100;
camera.lookAt(0,0,0);

universe.matrix.matrixAutoUpdate = false;
function animate() {



    //insert universe
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	line.rotation.x += 0.02;

	//controls
	if(w){
		camera.rotation.x += .01;
	}
	if(a){
		camera.rotation.y += .01;
	}
	if(s){
		camera.rotation.x -= .01;
	}
	if(d){
		camera.rotation.y -= .01;
	}
	if(q){
		camera.rotation.z += .01;//not sure
	}
	if(e){
		camera.rotation.z -= .01;//not sure
	}
	camera.getWorldDirection(direction);
	var T = new THREE.Matrix4();
	//calculating velocity and the like
	p += thrusters/60;//momentum = F*time ... this is assuming 60 fps
	if (hyperdrive){
		if (p < 0){//NEGATIVE VALUES are squared, so rip
			v = -Math.sqrt((p/m)**2/(1+(p/m)**2/(c**2)));
		}
		else {
			v = Math.sqrt((p/m)**2/(1+(p/m)**2/(c**2)));
		}
		length_contraction = Math.sqrt(1-(v/c)**2);
		
		//create the matrix
		var len1 = length_contraction-1;
		var u1 = direction.x;
		var u2 = direction.y;
		var u3 = direction.z;
		T.set(
			1+len1*u1*u1, 0+len1*u2*u1, 0+len1*u3*u1, 0,
			0+len1*u1*u2, 1+len1*u2*u2, 0+len1*u3*u2, 0,
			0+len1*u1*u3, 0+len1*u2*u3, 1+len1*u3*u3, 0,
			0,            0,            0,            1
		);
        //apply matrix
		universe.applyMatrix4(T);
	}
	else {
		v = p/m; // v*m = p
	}
	camera.position.addScaledVector(direction, v);//I need to change everything, but for the time being, this is good.
    //render
	renderer.render(scene,camera);
    //reset the scale of the universe
	universe.position.set(0,0,0);
	universe.rotation.set(0,0,0);
	universe.scale.set(1,1,1);
    //get new frame
	requestAnimationFrame(animate);
}
animate();
*/

// interesting space pirates game idea:  kinda like the sea pirates game, but where you upgrade your ship.  
// in it, you have up to 4 people all working together to pilate a space craft, this means: stir the ship, fire the cannons, man the shields, and repair any damages.  if there is pvp, the ships is insured, however pve, ship is not fully ensured.