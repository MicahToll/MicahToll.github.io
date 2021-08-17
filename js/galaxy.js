//green cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshLambertMaterial({color:0x00ff00});//MeshBasicMaterial
const cube = new THREE.Mesh(geometry, material);
cube.position.z = 200;

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

//planets
const planet_geometry = new THREE.SphereBufferGeometry(10, 64, 32);
const planet_material = new THREE.MeshLambertMaterial({color:0xFF9900})
const planet1 = new THREE.Mesh(planet_geometry, planet_material);
planet1.position.x = 50;

universe.add(planet1);



// Optional: Provide a DRACOLoader instance to decode compressed mesh data
//looks cool but would need to import. ignore for now
/*const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( '/examples/js/libs/draco/' );
loader.setDRACOLoader( dracoLoader );*/

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