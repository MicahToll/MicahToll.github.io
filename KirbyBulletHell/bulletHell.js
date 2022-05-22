//define ambiant sound
var music = document.getElementById("myAudio");

//setting up three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, .1, 1000);			

const renderer = new THREE.WebGLRenderer({ antialias: true });//to add anti aliasing, sdd { antialias: true } to the parameter
renderer.setSize(window.innerWidth, window.innerHeight); 
document.body.appendChild( renderer.domElement );//document.getElementById("body").appendChild( renderer.domElement );

//everything in the universe's reference frame should be added to this group
let universe = new THREE.Group();//the size should be approximately equal to the size of the solar system i think (which is 15,000 lsecond radius), on second thought, lets aim for closer to 1,500
let background = new THREE.Group();
universe.add(background);

//create spaceship
let spaceship = new THREE.Group();

//add atuff to the scene
scene.add( universe );


let all_bullets = [];
let all_enemies = [];
let background_things = [];
let player_x = 0;
let player_y = -25;
//let player_dx = 0;
//let player_dy = 0;
let player_radius = 2;
let health = 100;
let time = 0;
let kirby;
let window_width;
let window_height;
let camera_width;
let camera_height = 100;
let is_mousedown = false;

const kirby_bullet_map = new THREE.TextureLoader().load( 'assets/bullets/kirby_bullet.png' );
const kirby_bullet_material = new THREE.SpriteMaterial( { map: kirby_bullet_map } );


function init(){
    camera.position.z = (camera_height/2)/(Math.tan((Math.PI/4)/2));
    camera.lookAt(0,0,0);
    document.body.addEventListener("mousemove", updatePlayer, false);
    document.body.addEventListener("mousedown", mousedown, false);
    document.body.addEventListener("mouseup", mouseup, false);

    window_width = window.innerWidth;
    window_height = window.innerHeight;
    camera_width = camera_height*window_width/window_height

    const kirby_map = new THREE.TextureLoader().load( 'assets/kirby.png' );
    const kirby_material = new THREE.SpriteMaterial( { map: kirby_map } );
    kirby = new THREE.Sprite( kirby_material );
    kirby.scale.set(player_radius*2, player_radius*2, 1);
    kirby.position.y = -camera_height/4
    universe.add( kirby );

    set_up_level1();

    gameloop(1);
}

function gameloop(timestamp){
    move_background();
    for (thing of background_things){
        thing.update();
    }
    for (var enemy of all_enemies){
        //enemy.update();
        enemy.check_collision();
    }
    if (is_mousedown){
        all_bullets.push(new Kirby_bullet(1, [[player_x,player_y+player_radius],[0,+2]], kirby_bullet_material,1));
    }
    for (var i = all_bullets.length; i--;) {
        all_bullets[i].update_bullet();
        if (all_bullets[i].check_onscreen()||all_bullets[i].check_collision()){
            all_bullets[i].delete_sprite();
            all_bullets.splice(i, 1);
        }
    }
    time = timestamp;
    renderer.render(scene,camera);
    window.requestAnimationFrame(gameloop);
}

function updatePlayer(event) {
    player_x = camera_width*(event.x/window_width-(1/2));
    player_y = -camera_height*(event.y/window_height-(1/2));
    kirby.position.x = player_x;
    kirby.position.y = player_y;
}
function mousedown() {
    is_mousedown = true;
}
function mouseup() {
    is_mousedown = false;
}

function update_dash(){
    document.getElementById("health").innerHTML = "health: "+health+"%"
}

function move_background(){}

//currently assuming all 
class Bullet{
    constructor(radius, vectors, material, damage){
        this.radius = radius;
        this.vectors = vectors;
        this.dimensions = vectors.length;
        this.damage = damage;
        this.sprite = new THREE.Sprite(material);
        this.sprite.scale.set(radius*2, radius*2, 1);
        universe.add(this.sprite);
    }
    update_bullet(){
        let v = this.vectors;
        let d = this.dimensions;
        if (d>1){
            for (var i = d-1;i>0;i--){
                v[i-1][0] += v[i][0];
                v[i-1][1] += v[i][1];
            }
            this.sprite.position.x = v[0][0];
            this.sprite.position.y = v[0][1];
        }
    }
    check_collision(){
        if ((this.sprite.position.x-player_x)**2+(this.sprite.position.y-player_y)**2 < (this.radius+player_radius)**2){
            health -= this.damage;
            update_dash();
            return true;
        } else {
            return false;
        }
    }
    check_onscreen(){
        if (Math.abs(this.sprite.position.x)+this.radius>camera_width/2||Math.abs(this.sprite.position.y)+this.radius>camera_height/2){
            return true;
        }
        else {
            return false;
        }
    }
    delete_sprite(){
        universe.remove(this.sprite);
    }
}
class Kirby_bullet extends Bullet{
    check_collision(){
        //return false
        let x_pos = this.sprite.position.x;
        let y_pos = this.sprite.position.y;
        for (let enemy of all_enemies){
            if ((x_pos-enemy.x)**2+(y_pos-enemy.y)**2 < (this.radius+enemy.radius)**2){
                enemy.hp -= this.damage;
                return true;
            }
        }
        return false;
    }
}

class Enemy{//radius, vectors, geometry
    constructor(sprite, hp, radius, period, movement, rotation, bullet_materials, damage = 1){
        this.hp = hp;
        this.radius = radius;
        this.period = period;
        this.movement = movement;
        this.rotation = rotation;
        this.bullet_materials = bullet_materials;
        this.sprite = sprite//new THREE.Sprite(sprite);
        this.sprite.scale.set(radius*2, radius*2, 1);
        this.damage = damage;
        universe.add(this.sprite);
        this.state = 0;
        this.x = 0;
        this.y = 0;
    }
    movement(){}
    update(){
        this.move();
        this.shoot();
    }
    move(){
        this.graphics.x = half_window_width*Math.cos(time*2*Math.PI/this.period);
        this.graphics.y = 0;
        //this.graphics.y = half_window_height;
        for (a of movement.x.a){
            //something
        }
        something = movement.x.a[0]/2 + Math.cos() + Math.sin()
        //do something
        
    }
    rotate(){}
    shoot(){
        if (Math.cos(time*2*Math.PI/(this.period/8))**2<.05){
            all_bullets.push(new Bullet(10, [[this.graphics.x,-half_window_height/2],[.3,.2],[0,.01]], this.bullet_geometry));
        }
    }
    check_collision(){
        if ((this.sprite.position.x-player_x)**2+(this.sprite.position.y-player_y)**2 < (this.radius+player_radius)**2){
            health -= this.damage;
            update_dash();
            return true;
        } else {
            return false;
        }
    }
    destroy_graphics(){
        this.graphics.destroy();
    }
}

class Background {
    constructor(update,mesh){
        this.update = update;
        this.mesh = mesh;
        background.add(this.mesh);
    }
    update(){}
    rotate(amount){
        this.mesh.rotate.x += amount;
    }
    /*delete_sprite(){
        background.remove(this.sprite);
    }*/
}


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
	var stars = new THREE.Points( starGeometry, starMaterial );
	background.add(stars);

    const cgeometry = new THREE.BoxGeometry();
    const cmaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( cgeometry, cmaterial );
    background_things.push(new Background(function(){}, cube));

    let b_bullet_map = new THREE.TextureLoader().load( 'assets/bullets/bbullet.png' );
    let b_bullet_material = new THREE.SpriteMaterial( { map: b_bullet_map } );
    let dark_matter_map = new THREE.TextureLoader().load( 'assets/enemies/darkmatter.png' );
    let dark_matter_material = new THREE.SpriteMaterial( { map: dark_matter_map } );
    dark_matter = new THREE.Sprite( dark_matter_material );

    all_enemies.push(new Enemy(dark_matter, 100, 8, 1, function(){},0,b_bullet_material));

    background.position.z = -100;//offset
    //move_background = function() { background.position.y -= .1 }//translate
    move_background = function() { background.rotation.x += .001 }//rotate

    //music.play();
}