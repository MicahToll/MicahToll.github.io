//scale:  1m = 1 light second

//initialize your variables here
const c = 1; // in units of light seconds per second.  
const m = 1; // in kg
var thrusters = 0;// in __  
var direction = new THREE.Vector3;//direction of the ship.  (unit vector)
var hyperdrive = true;// when caps lock is on and a key is pressed, hyper driver is turned on
var p = 0;//momentum
var p_vector = new THREE.Vector3;//momentum vector
var v = 0;//velocity
var position_vector = new THREE.Vector3;

//keyboard variables, 
var w = false;
var a = false;
var s = false;
var d = false;
var q = false;
var e = false;
var space = false;

//define ambiant sound
//var music = document.getElementById("myAudio");

//setting up three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 15000);			

const renderer = new THREE.WebGLRenderer();//to add anti aliasing, sdd { antialias: true } to the parameter
renderer.setSize(window.innerWidth, window.innerHeight); 
document.body.appendChild( renderer.domElement );//document.getElementById("body").appendChild( renderer.domElement );

//import GLTFLoader from "js/GLTFLoader.js";
// Instantiate a loader
const loader = new GLTFLoader();

//everything in the universe's reference frame should be added to this group
var universe = new THREE.Group();//the size should be approximately equal to the size of the solar system i think (which is 15,000 lsecond radius), on second thought, lets aim for closer to 1,500

//create spaceship
var spaceship = new THREE.Group();
var UFO;
loader.load(
	'models/UFO2.glb',
	function ( loadedObject ) {
		UFO = loadedObject.scene;
        spaceship.add(UFO);
		UFO.position.y=-1.75
	},
	function ( xhr ) {console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );},
	function ( error ) {console.log( 'An error happened' );console.log(error);}
);
spaceship.add(camera);

//light
const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

const light2 = new THREE.HemisphereLight( 0xffffbb, 0x080820, 5 );
scene.add( light2 );

// White directional light at half intensity shining from the top.
/*const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
scene.add( directionalLight );*/


//pointer camera controls
controls = new THREE.PointerLockControls( camera, document.body );
function start(){
	controls.lock();
	//music.playbackRate = 1/3;//0.0625;
	//music.volume = .05;
	//music.play()
}
function end(){
	console.log("esc")
	controls.unlock();
}
//scene.add(controls.getobject())

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
			space = true;
			break;
		case 27:
			end();
			break;
		//default:
			//alert(event.keyCode);
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
		case 32:
			space = false;
			break;
		//default:
			//no default required for this
	}
	/*if (event.getModifierState("CapsLock")) {
    	hyperdrive = true;
  	} else {
    	hyperdrive = false;
  	}*/
}
function wheel(){
	//console.log(event.deltaY);
	thrusters += event.deltaY/500;//not sure why this has to be negative
}

//finally, everything is set up, so universe can begin to be built