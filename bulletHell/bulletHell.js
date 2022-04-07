var everything = new PIXI.Container();
var all_bullets = [];
var all_enemies = [];
let player_x = 0;
let player_y = 0;
//let player_dx = 0;
//let player_dy = 0;
let half_window_width = 0;
let half_window_height = 0;
let player_radius = 5;
let health = 100;
let ship;
let time = 0;
function init(){
    app = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight});
    document.body.appendChild(app.view); 
    app.stage.addChild(everything);
    half_window_width = window.innerWidth/2;
    half_window_height = window.innerHeight/2;
    everything.position.x = half_window_width;//this makes zero zero at the middle of the screen
    everything.position.y = half_window_height;
    app.view.addEventListener("mousemove", updatePlayer, false);

    // Create a template graphics object
    let template = new PIXI.Graphics();
    // Add a circle
    template.lineStyle(1, 0xFEEB77, 1);
    template.beginFill(0x650A5A, 1);
    template.drawCircle(0, 0, 10);
    template.endFill();
    
    //space ship
    ship = new PIXI.Graphics();
    ship.beginFill(0xFF3300);
    ship.lineStyle(4, 0xffd900, 1);
    ship.moveTo(0, -player_radius*2);//note to self, this ship's farthest point is twice that of the ships hit box (aka: radius is multiplied by two)
    ship.lineTo(player_radius*Math.sqrt(3), player_radius);
    ship.lineTo(-player_radius*Math.sqrt(3), player_radius);
    ship.lineTo(0, -player_radius*2);
    ship.closePath();
    ship.endFill();
    everything.addChild(ship);
    //everything.addChild(template);
    
    all_bullets.push(new Bullet(10, [[0,-half_window_height/2],[.3,.2],[0,.01]], template.geometry));
    all_bullets.push(new Bullet(10, [[0,-half_window_height/2],[.3,.2],[0,-.02]], template.geometry));
    all_enemies.push(new Enemy(ship.geometry, 100, 5, 3000, 0, 0, template.geometry));
    gameloop(1);
}

function gameloop(timestamp){
    for (var enemy of all_enemies){
        enemy.update();
    }
    for (var bullet of all_bullets){
        bullet.update_bullet();
        if (bullet.check_collision()){
            //console.log("boom");
            health -= 1;
            update_dash();
        }
    }
    for (var i = all_bullets.length; i--;) {
        if (all_bullets[i].check_onscreen()){
            all_bullets[i].destroy_graphics();
            all_bullets.splice(i, 1);
        }
    }
    time = timestamp;
    window.requestAnimationFrame(gameloop);
}

function updatePlayer(event) {
    player_x = event.x-half_window_width;
    player_y = event.y-half_window_height;
    ship.x = player_x;
    ship.y = player_y;
}

function update_dash(){
    document.getElementById("health").innerHTML = "health: "+health+"%"
}

var c1 = 0xe32d2d;
var c2 = 0x32a852;
var c3 = 0x10a9e0;
var c4 = 0x710dbd;

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