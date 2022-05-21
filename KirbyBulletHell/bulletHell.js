//define ambiant sound
var music = document.getElementById("myAudio");

//setting up three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, .1, 1000);			

const renderer = new THREE.WebGLRenderer({ antialias: true });//to add anti aliasing, sdd { antialias: true } to the parameter
renderer.setSize(window.innerWidth, window.innerHeight); 
document.body.appendChild( renderer.domElement );//document.getElementById("body").appendChild( renderer.domElement );

//everything in the universe's reference frame should be added to this group
var universe = new THREE.Group();//the size should be approximately equal to the size of the solar system i think (which is 15,000 lsecond radius), on second thought, lets aim for closer to 1,500

//create spaceship
var spaceship = new THREE.Group();

//add atuff to the scene
scene.add( universe );


var all_bullets = [];
var all_enemies = [];
var background = [];
let player_x = 0;
let player_y = 0;
//let player_dx = 0;
//let player_dy = 0;
let player_radius = 2;
let health = 100;
let time = 0;
let kirby;
let kirby_bullets = [];
let window_width;
let window_height;
function init(){
    camera.position.z = 50/(Math.tan((Math.PI/4)/2));
    camera.lookAt(0,0,0);
    document.body.addEventListener("mousemove", updatePlayer, false);

    window_width = window.innerWidth;
    window_height = window.innerHeight;

    const kirby_map = new THREE.TextureLoader().load( 'assets/kirby.png' );
    const kirby_material = new THREE.SpriteMaterial( { map: kirby_map } );
    kirby = new THREE.Sprite( kirby_material );
    kirby.scale.set(player_radius*2, player_radius*2, 1);
    universe.add( kirby );

    const map2 = new THREE.TextureLoader().load( 'assets/bullets/longboy.png' );
    const material2 = new THREE.SpriteMaterial( { map: map2 } );

    const sprite2 = new THREE.Sprite( material2 );
    sprite2.scale.set(4, 4, 1);
    universe.add( sprite2 );

    const vertices = [];
    for ( let i = 0; i < 10000; i ++ ) {
        const x = THREE.MathUtils.randFloatSpread( 2000 );
        const y = THREE.MathUtils.randFloatSpread( 2000 );
        const z = THREE.MathUtils.randFloatSpread( 2000 );

        vertices.push( x, y, z );
    }
    var starGeometry = new THREE.BufferGeometry();
	starGeometry.setAttribute('position', new THREE.Float32BufferAttribute( vertices, 3 ));
	var starMaterial = new THREE.PointsMaterial({color:0x888888})
	var stars = new THREE.Points( starGeometry, starMaterial );
	universe.add(stars);

    //music.play();

    gameloop(1);
}

function gameloop(timestamp){
    for (var enemy of all_enemies){
        //enemy.update();
    }
    for (var bullet of all_bullets){
        //bullet.update_bullet();
        /*if (bullet.check_collision()){
            //console.log("boom");
            health -= 1;
            update_dash();
        }*/
    }
    for (var i = all_bullets.length; i--;) {
        /*if (all_bullets[i].check_onscreen()){
            all_bullets[i].destroy_graphics();
            all_bullets.splice(i, 1);
        }*/
    }
    time = timestamp;
    renderer.render(scene,camera);
    window.requestAnimationFrame(gameloop);
}

function updatePlayer(event) {
    player_x = (event.x/window_width*100-50)*window_width/window_height;
    player_y = -event.y/window_height*100+50;
    kirby.position.x = player_x;
    kirby.position.y = player_y;
}

function update_dash(){
    document.getElementById("health").innerHTML = "health: "+health+"%"
}

//currently assuming all 
class Bullet{
    constructor(radius, vectors, geometry){
        this.radius = radius;
        this.vectors = vectors;
        this.dimensions = vectors.length;
        this.graphics = new PIXI.Graphics(geometry);
        everything.addChild(this.graphics);
    }
    update_bullet(){
        let v = this.vectors;
        let d = this.dimensions;
        if (d>1){
            for (var i = d-1;i>0;i--){
                v[i-1][0] += v[i][0];
                v[i-1][1] += v[i][1];
            }
            this.graphics.x = v[0][0];
            this.graphics.y = v[0][1];
        }
    }
    check_collision(){
        if ((this.graphics.x-player_x)**2+(this.graphics.y-player_y)**2 < (this.radius+player_radius)**2){
            return true;
        } else {
            return false;
        }
    }
    check_onscreen(){
        if (Math.abs(this.graphics.x)+this.radius>half_window_width||Math.abs(this.graphics.y)+this.radius>half_window_height){
            return true;
        }
        else {
            return false;
        }
    }
    destroy_graphics(){
        this.graphics.destroy();
    }
}

class Enemy{//radius, vectors, geometry
    constructor(enemy_geometry, hp, enemy_radius, period, movement, rotation, bullet_geometry){
        this.hp = hp;
        this.enemy_radius = enemy_radius;
        this.period = period;
        this.movement = movement;
        this.rotation = rotation;
        this.bullet_geometry = bullet_geometry;
        this.graphics = new PIXI.Graphics(enemy_geometry);
        everything.addChild(this.graphics);
    }
    update(){
        this.move();
        this.shoot();
    }
    move(){
        this.graphics.x = half_window_width*Math.cos(time*2*Math.PI/this.period);
        this.graphics.y = 0;
        //this.graphics.y = half_window_height;
        /*for (a of movement.x.a){
            //something
        }
        something = movement.x.a[0]/2 + Math.cos() + Math.sin()
        //do something
        */
    }
    rotate(){}
    shoot(){
        if (Math.cos(time*2*Math.PI/(this.period/8))**2<.05){
            all_bullets.push(new Bullet(10, [[this.graphics.x,-half_window_height/2],[.3,.2],[0,.01]], this.bullet_geometry));
        }
    }
    
    /*check_collision(){
        if ((this.graphics.x-player_x)**2+(this.graphics.y-player_y)**2 < (this.radius+player_radius)**2){
            return true;
        } else {
            return false;
        }
    }*/
    destroy_graphics(){
        this.graphics.destroy();
    }
}
/*class sub_enemy extends enemy{
    constructor(){
        super()
    }
}*/