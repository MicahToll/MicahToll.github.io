//setting up three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, .1, 1000);			

const renderer = new THREE.WebGLRenderer({ antialias: true });//to add anti aliasing, sdd { antialias: true } to the parameter
renderer.setSize(window.innerWidth, window.innerHeight); 
document.body.appendChild( renderer.domElement );//document.getElementById("body").appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );
//controls.update() must be called after any manual changes to the camera's transform

//everything in the universe's reference frame should be added to this group
let universe = new THREE.Group();//the size should be approximately equal to the size of the solar system i think (which is 15,000 lsecond radius), on second thought, lets aim for closer to 1,500

//will revmove for relativity race
let background = new THREE.Group();
universe.add(background);

//add stuff to the scene
scene.add( universe );

let background_things = [];
let time;
let window_width;
let window_height;
let camera_width;
let camera_height = 100;

function init(){
    camera.position.z = (camera_height/2)/(Math.tan((Math.PI/4)/2));
    camera.lookAt(0,0,0);
    controls.target.set(0, 0, 0);
    controls.update();

    window_width = window.innerWidth;
    window_height = window.innerHeight;
    camera_width = camera_height*window_width/window_height

    set_up_level1();

    gameloop(0);
}

function gameloop(timestamp){
    move_background();
    for (thing of background_things){
        thing.update();
    }

    time = timestamp;
    renderer.render(scene,camera);
    window.requestAnimationFrame(gameloop);
}

function move_background(){}

class Background {
    constructor(update,mesh){
        this.update = update;
        this.mesh = mesh;
        background.add(this.mesh);
    }
    update(){}
    /*delete_sprite(){
        background.remove(this.sprite);
    }*/
}

const materialsh = new THREE.ShaderMaterial( {
    uniforms: {
        color: { value: new THREE.Color( 0xffffff ) },
    },
    vertexShader: document.getElementById( 'vertexshader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentshader' ).textContent
} );
/*
//level 1
*/
function set_up_level1() {
    const vertices = [];
    for ( let i = 0; i < 1000; i ++ ) {
        const x = THREE.MathUtils.randFloatSpread( 500 );
        const y = THREE.MathUtils.randFloatSpread( 500 );
        const z = THREE.MathUtils.randFloatSpread( 500 );

        vertices.push( x, y, z );
    }
    var starGeometry = new THREE.BufferGeometry();
	starGeometry.setAttribute('position', new THREE.Float32BufferAttribute( vertices, 3 ));
	var starMaterial = new THREE.PointsMaterial({color:0x888888})
	var stars = new THREE.Points( starGeometry, materialsh );
	background.add(stars);

    let planel1_geometry = new THREE.IcosahedronGeometry(75);
    let planel1_edges = new THREE.EdgesGeometry( planel1_geometry );
    let planel1_material = new THREE.LineBasicMaterial( { color: 0x00ff00 } );
    const planet1_line = new THREE.LineSegments( planel1_edges, planel1_material);
    background_things.push(new Background(function(){
        this.mesh.rotation.z -= .0005;
        this.mesh.rotation.y += .001;
    }, planet1_line));

    background.position.z = 0;//offset - for kirby set to about -200
    //move_background = function() { background.position.y -= .1 }//translate
    move_background = function() { background.rotation.x += .001 }//rotate

    //music.play();

    const Line_test_material = new THREE.LineBasicMaterial( {
        color: 0xffffff,
        linewidth: 1,
    } );
    let line_test_curve = new THREE.CubicBezierCurve3(
        new THREE.Vector3( -10, 0, 0 ),
        new THREE.Vector3( -5, 15, 0 ),
        new THREE.Vector3( 20, 15, 0 ),
        new THREE.Vector3( 10, 0, 0 )
    );
    const line_test_geometry = new THREE.BufferGeometry().setFromPoints( line_test_curve.getPoints(100) );
    const anotherthing = new THREE.Line( line_test_geometry, Line_test_material );
    background.add(anotherthing)

    
    const points = [];
    points.push( new THREE.Vector3( - 10, 0, 0 ) );
    points.push( new THREE.Vector3( 0, 10, 0 ) );
    points.push( new THREE.Vector3( 10, 0, 0 ) );
    const geometry234 = new THREE.BufferGeometry().setFromPoints( points );
    const anotherthing2 = new THREE.Line( geometry234, Line_test_material );
    background.add(anotherthing2)

}

class Set {
    constructor(dimensions, points){
        this.dimensions = dimensions;
        this.points = [];
    }
}

class Particles {
//color,//done
//size,//done
//shape,//eh...
//transparency,
//change with distance, 
    constructor(points, color){
        this.material = new THREE.ShaderMaterial({
            uniforms: {
                color: { value: color },//new THREE.Color( 0xffffff )
                //likely add size,opacity, and similar things
            },
            vertexShader: document.getElementById( 'vertexshader' ).textContent,
            fragmentShader: document.getElementById( 'fragmentshader' ).textContent
        });
        this.points = points
        //var stars = new THREE.Points( this.points, this.material );
        //this.behavior = 
    }
    behavior() {
        //hi
    }
}

class Trailed_Particles extends Particles {
    constructor(){
        //life
    }
    //life
    //trail details
}

class Line {//curve it will give a list of points
    constructor(){

    }
    //life
//color,//done
//size,//(width)
//transparency,
}

class Surface {//
    //uses a line of lines
}

/*class Map {//used 
    //projections
}*/

class Space {
    //a list of points
}

class cool_thing {
    //given a space and a map, and a position+mirrir (T/F), will give a set of points
    //might also need a prototype particle
}

//Im not sure about this one
/*class Metric_Space {
    constructor(space, metric){
        this.space = space;
        //this.metric = metric;
    }
    metric(x,y,z) {
        return Math.sqrt(x**2 + y**2 + z**2);
    }
}*/