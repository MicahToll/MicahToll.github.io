// Optional: Provide a DRACOLoader instance to decode compressed mesh data
//looks cool but would need to import. ignore for now
/*const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( '/examples/js/libs/draco/' );
loader.setDRACOLoader( dracoLoader );*/
function getRandomInt(max) {
	return Math.floor(Math.random() * max);
  }
function addStars(){
	var vertices = [];
	for (var i = 0; i<10000; i++){
		var x = THREE.MathUtils.randFloatSpread( 1000 );
		var y = THREE.MathUtils.randFloatSpread( 1000 );
		var z = THREE.MathUtils.randFloatSpread( 1000 );
		if (Math.abs(x)<250&&Math.abs(y)<250&&Math.abs(z)<250){
			continue;
		}
		vertices.push( x, y, z );
	}
	var starGeometry = new THREE.BufferGeometry();
	starGeometry.setAttribute('position', new THREE.Float32BufferAttribute( vertices, 3 ));
	var starMaterial = new THREE.PointsMaterial({color:0x888888})
	var stars = new THREE.Points( starGeometry, starMaterial );
	universe.add(stars);
}
addStars();


// Load a glTF resource
var doughnut;
loader.load(
	// resource URL
	'models/doughnut3.glb',
	// called when the resource is loaded
	function ( loadedObject ) {
		doughnut = loadedObject.scene;
		/*loadedMesh.traverse( function(child){
			if (child instanceof THREE.Mesh){
				child.material = material;
				console.log("hi");
			}
			console.log("there");
		});*/
		//universe.add(doughnut);
	},
	// called while loading is progressing
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	// called when loading has errors
	function ( error ) {
		console.log( 'An error happened' );
		console.log(error);
	}
);

//before this level may be constructed, all the materials and geometries used must be created separately.  thus, these can be shared between levels.
class level{
	name;
	number;
	constructor(name, number, load_level, unload_level){
		this.name = name;
		this.number = number;
		//this.reward = reward;
		//this.time = time;
		this.load_level = load_level;
		this.unload_level = unload_level;
	}
	load_level(){}//this will add the meshes to the universe
	unload_level(){
		for (var i = 0; i<all_objects.length; i++){
			all_objects[i].remove;
		}
	}//this will remove the meshes from the universe
}
var levels=[];

var universe_children = universe.children;
var time_dependent_objects = [];
var all_objects = [];
//for this class to work right, you must first put the objects in the universe group.
/*class collider{
	bounding_box = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
	constructor(){
		bounding_box.setFromObject(universe_children[index]);
	}
}*/
class object {//extends collider
	mesh;
	collision_type;
	bounding_box;
	
	constructor(mesh,collision_type){
		//super();
		this.mesh = mesh;
		this.collision_type = collision_type;
		this.bounding_box = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
		this.update_bounding_box();
		all_objects.push(this);
		universe.add(this.mesh);
	}
	update_bounding_box(){
		this.bounding_box.setFromObject(this.mesh);
	}
	check_for_bounding_box_collision(){
		return this.bounding_box.intersectsBox(spaceship_boundingbox);
	}
}
class time_dependent_object extends object{
	F(length_contraction){};
	r;
	constructor(mesh,collision_type,F){
		super(mesh,collision_type);
		this.r = new THREE.Vector3();
		this.F = F
		time_dependent_objects.push(this);
	}
	get_object_time(length_contraction){//this is a function that uses space ship time, spaceship position, given object position, and given velocity to calculate obj time in space ship reference frame
		this.mesh.getWorldPosition(this.r).sub(position_vector);
		if (v==0){
			return universe_time;
		}
		else{
			return universe_time+((1-length_contraction)*v_unit_vector.dot(this.r))/c;
		}
	}
}

/*
//cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshLambertMaterial({color:0x00ff00});//MeshBasicMaterial
const cube = new THREE.Mesh(geometry, material);
new time_dependent_object(cube,"solid",function(length_contraction){
	this.mesh.position.y = this.get_object_time(length_contraction)/10;//spaceship_time/10;
});


//create a blue LineBasicMaterial
const blueMaterial = new THREE.LineBasicMaterial( { color: 0x0000ff } );
const points = [];
points.push( new THREE.Vector3( - 10, 0, 0 ) );
points.push( new THREE.Vector3( 0, 10, 0 ) );
points.push( new THREE.Vector3( 10, 0, 0 ) );
const geometry2 = new THREE.BufferGeometry().setFromPoints( points );
const line = new THREE.Line( geometry2, blueMaterial );
new time_dependent_object(line,"solid",function(length_contraction){
	this.mesh.rotation.x = this.get_object_time(length_contraction)/10;
});

//green cube 2
const geometry3 = new THREE.BoxGeometry(1,1,80);
const cube2 = new THREE.Mesh(geometry3, material);
cube2.position.y = 20;
new object(cube2,"solid");

//planets
const planet_geometry = new THREE.SphereBufferGeometry(10, 64, 32);
const planet_material = new THREE.MeshLambertMaterial({color:0xFF9900});
const planet1 = new THREE.Mesh(planet_geometry, planet_material);
planet1.position.x = 50;
new object(planet1,"solid");*/