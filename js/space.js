//scale:  1m = 1 light second

//initialize your variables here
const c = 1; // in units of light seconds per second.  
//these are the space ship stats
var m = 1; // in kg
var engine_power = 1;// units of momentum/s.  this is the maximum momentum output in one second.  
var maneuvering = 1;// units of radians per second
var shield_efficiency = 1;//
var engine_efficiency = 1;// proportion of fuel used usefully.  For example, if 300 joules go into thrust, and the efficiency is 90%, then the actual amount used is 300/.9
var air_resistance = 1;
var brakes = 1; // not sure about this one
var fuel_capacity; // in joules?
var head_speed_per_tick = 1.1/60;
var shield_radius = 3;//light seconds

var thrusters = 0;// in momentum per tick 
var direction = new THREE.Vector3();//direction of the ship.  (unit vector)
var p = 0;//momentum
var p_vector = new THREE.Vector3();//momentum vector
var v = 0;//velocity
var position_vector = new THREE.Vector3();
var spaceship_time = 0;
var universe_time = 0;
var v_unit_vector = new THREE.Vector3();
var v_displacement_per_tick = new THREE.Vector3();//units of light seconds per tick
var position_vector_for_collision_detection = new THREE.Vector3(0,0,0);//aka: actually affected by length contraction
var min_vec = new THREE.Vector3();
var max_vec = new THREE.Vector3();
var spaceship_boundingbox = new THREE.Box3(min_vec, max_vec);
var raycaster_angles = [];
raycaster_angles.length = 21;
var phi = (1+Math.sqrt(5))/2;
var dodecahredron_cords = [[1,1,1],[1,1,-1],[1,-1,1],[1,-1,-1],[-1,1,1],[-1,1,-1],[-1,-1,1],[-1,-1,-1],[0,phi,1/phi],[0,phi,-1/phi],[0,-phi,1/phi],[0,-phi,-1/phi],[1/phi,0,phi],[1/phi,0,-phi],[-1/phi,0,phi],[-1/phi,0,-phi],[phi,1/phi,0],[phi,-1/phi,0],[-phi,1/phi,0],[-phi,-1/phi,0]]
for (var i = 0; i<raycaster_angles.length-1; i++){
	raycaster_angles[i] = new THREE.Vector3(dodecahredron_cords[i][0],dodecahredron_cords[i][1],dodecahredron_cords[i][2]);
	raycaster_angles[i].normalize();
}
var raycasters = [];//new THREE.Raycaster();
raycasters.length = 21;
for (var i = 0; i<raycasters.length; i++){//this is a bit weird, just a warning
	raycasters[i] = new THREE.Raycaster(position_vector_for_collision_detection, raycaster_angles[0], 0, shield_radius);
}

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

//force shield
var force_shield_geometry = new THREE.IcosahedronGeometry(shield_radius, 1);
var shield_line_material = new THREE.LineBasicMaterial({color: 0x00ffc8, transparent: true, opacity:1});
var force_shield_lines = new THREE.LineSegments(force_shield_geometry, shield_line_material);
spaceship.add(force_shield_lines);

//UFO
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
/*var helpers = []; //helps diagnose collision detection problems
helpers.length = 21;
var zero = new THREE.Vector3(0,0,0);
for (var i = 0; i<helpers.length; i++){//this is a bit weird, just a warning
	helpers[i] = new THREE.ArrowHelper(raycaster_angles[i],zero,shield_radius, 0xff0000);
	spaceship.add(helpers[i]);
}*/

spaceship.add(camera);
var ship_scale = new THREE.Matrix4();
ship_scale.set(1/3,0,0,0,0,1/3,0,0,0,0,1/3,0,0,0,0,1)
spaceship.applyMatrix4(ship_scale);

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
	document.getElementById("lockMouse").hidden = true;
	//music.playbackRate = 1/3;//0.0625;
	//music.volume = .05;
	//music.play()
}
function end(){
	controls.unlock();
	//document.getElementById("lockMouse").hidden = false;//I can't get this to work on chrome for some reason.
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
}
function wheel(){
	//console.log(event.deltaY);
	thrusters += event.deltaY/500;//not sure why this has to be negative
}


// expand THREE.js Sphere to support collision tests vs Box3
// we are creating a vector outside the method scope to
// avoid spawning a new instance of Vector3 on every check
THREE.Sphere.__closest = new THREE.Vector3();
THREE.Sphere.prototype.intersectsBox = function (box) {
    // get box closest point to sphere center by clamping
    THREE.Sphere.__closest.set(this.center.x, this.center.y, this.center.z);
    THREE.Sphere.__closest.clamp(box.min, box.max);

    var distance =  this.center.distanceToSquared(THREE.Sphere.__closest);
    return distance < (this.radius * this.radius);
};
//source: developer.mozilla.orgen-US/docs/Games/Techniques/3D_collision_detection/Bounding_volume_collision_detection_with_THREE.js

//finally, everything is set up, so universe can begin to be built