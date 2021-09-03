/*
//green cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshLambertMaterial({color:0x00ff00});//MeshBasicMaterial
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
const line = new THREE.Line( geometry2, blueMaterial );

universe.add(line);


*/


// Optional: Provide a DRACOLoader instance to decode compressed mesh data
//looks cool but would need to import. ignore for now
/*const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( '/examples/js/libs/draco/' );
loader.setDRACOLoader( dracoLoader );*/


const vertices = [];
for ( let i = 0; i < 10000; i ++ ) {
	const x = THREE.MathUtils.randFloatSpread( 2000 );
	const y = THREE.MathUtils.randFloatSpread( 2000 );
	const z = THREE.MathUtils.randFloatSpread( 2000 );
	vertices.push( x, y, z );
}
const geometry7 = new THREE.BufferGeometry();
geometry7.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
const material7 = new THREE.PointsMaterial( { color: 0x888888 } );
const points7 = new THREE.Points( geometry7, material7 );
universe.add( points7 );


// Load a glTF resource
var obj;
loader.load(
	// resource URL
	'models/doughnut3.glb',
	// called when the resource is loaded
	function ( loadedObject ) {
		loadedMesh = loadedObject.scene;
		/*loadedMesh.traverse( function(child){
			if (child instanceof THREE.Mesh){
				child.material = material;
				console.log("hi");
			}
			console.log("there");
		});*/
        universe.add(loadedMesh);
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

class level{}
levels=[];

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
const planet_material = new THREE.MeshLambertMaterial({color:0xFF9900})
const planet1 = new THREE.Mesh(planet_geometry, planet_material);
planet1.position.x = 50;
new object(planet1,"solid");