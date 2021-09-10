// this is galaxy 1.  this plan is to have lots of "cubes" with varying velocities.  this constitudes the most basic world. we will also need to create the goal.
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
var dodecahedron_Geometry_instanced = new THREE.DodecahedronGeometry(1, 0);
var green_material_instanced = new THREE.MeshLambertMaterial({color:0xffcc66});
for (var i = 0; i<10; i++){
    let dodecahedron_Geometry_mesh = new THREE.Mesh(dodecahedron_Geometry_instanced,green_material_instanced);
    dodecahedron_Geometry_mesh.position.z = Math.cos(i*10)+150;
    dodecahedron_Geometry_mesh.position.y = Math.sin(i*10)-3.5;
    let astroid = new time_dependent_object(dodecahedron_Geometry_mesh,"solid",function(length_contraction){
	    this.mesh.position.x = this.get_object_time(length_contraction)/10+5*this.i-30-20;
    });
    astroid.i = i;
}






var waves_material = new THREE.MeshLambertMaterial({color:0x0133AA, transparent: true, opacity:.25, side:2});
var waves_line_material= new THREE.LineBasicMaterial( { color: 0xFFFFFF } ) ;

//doughnut.bounding
//var instance_test = new THREE.InstancedMesh(dodecahedron_Geometry_instanced,green_material_instanced,5);
//universe.add

/*var waves_geometry = new THREE.PlaneGeometry(100,100,20,20);
var waves_material = new THREE.MeshLambertMaterial({color:0x0133AA, transparent: true, opacity:.25, side:2});
var waves_mesh = new THREE.Mesh(waves_geometry,waves_material);
waves_mesh.position.y = -10;
waves_mesh.rotateX(-Math.PI/2);
new time_dependent_object(waves_mesh,"solid",function(length_contraction){
    var time = this.get_object_time(length_contraction);
    var waves_array = waves_geometry.attributes.position.array;
    for (let i = 0; i<waves_array.length; i+=3){
        waves_array[i+2]=5*Math.sin(time/1+waves_array[i+0]/10)+5*Math.sin(time/1+waves_array[i+1]/15);
    }
    waves_geometry.attributes.position.needsUpdate = true;
});
var waves_line_material= new THREE.LineBasicMaterial( { color: 0xFFFFFF } ) ;
var waves_lines = new THREE.LineSegments(waves_geometry, waves_line_material);
waves_lines.position.y = -10;
waves_lines.rotateX(-Math.PI/2);
new time_dependent_object(waves_lines,"solid",function(length_contraction){waves_geometry.attributes.position.needsUpdate = true;});*/


/*var level1_curve = new THREE.CubicBezierCurve3(
    new THREE.Vector3( 0, 0, 10 ),
    new THREE.Vector3( -50, 0, 60 ),
    new THREE.Vector3( 10, -20, 110 ),
    new THREE.Vector3( 0, 0, 160 )
);*/
var level1_curve = new THREE.CubicBezierCurve3(
    new THREE.Vector3( 0, 0, 50 ),
    new THREE.Vector3( 0, 0, 100 ),
    new THREE.Vector3( -50, 0, 160 ),
    new THREE.Vector3( 10, -20, 220 )
);
var tube_geometry = new THREE.TubeGeometry( level1_curve, 20, 2, 8, false );
var tube_mesh = new THREE.Mesh( tube_geometry, waves_material );
new object(tube_mesh,"solid");
var tube_lines = new THREE.LineSegments(tube_geometry, waves_line_material);
universe.add(tube_lines);

var cyl_geometry = new THREE.CylinderGeometry(2, 50, 40, 8, 8, true);
var cyl_mesh = new THREE.Mesh( cyl_geometry, waves_material );
new object(cyl_mesh,"solid");
var cyl_lines = new THREE.LineSegments(cyl_geometry, waves_line_material);
universe.add(cyl_lines);

cyl_mesh.position.z=10-40/2+40//height over two
cyl_lines.position.z=10-40/2+40//height over two
cyl_geometry.rotateX(Math.PI/2);
//cyl_geometry.position.z=10-20/2//height over two