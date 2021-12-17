var everything = new PIXI.Container();
var all_bullets = [];
function init(){
    app = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight});
    document.body.appendChild(app.view); 
    app.stage.addChild(everything);
    everything.position.x = window.innerWidth/2;//this makes zero zero at the middle of the screen
    everything.position.y = window.innerHeight/2;

    // Create a master graphics object
    let template = new PIXI.Graphics();
    // Add a circle
    template.lineStyle(1, 0xFEEB77, 1);
    template.beginFill(0x650A5A, 1);
    template.drawCircle(0, 0, 10);
    template.endFill();

/*
    // Create 5 duplicate objects
    for (let i = 0; i < 5; i++) {
        // Initialize the duplicate using our template's pre-built geometry
        let duplicate = new PIXI.Graphics(template.geometry);
        duplicate.position.x = i*5;
        everything.addChild(duplicate);
    }
    //everything.addChild(template);
*/
    console.log("hi2")
    all_bullets.push(new Bullet(1, c1, [0,3,.1], template.geometry));
    console.log("hi3")
    all_bullets.push(new Bullet(1, c1, [0,3,-.1], template.geometry));

    gameloop();//app.ticker.add((delta)=>gameloop(delta));
}

function gameloop(){
    //do something
    //console.log("hello")
    for (var bullet of all_bullets){
        bullet.update_bullet();
    }
    window.requestAnimationFrame(gameloop);
}


var c1 = 0xe32d2d;
var c2 = 0x32a852;
var c3 = 0x10a9e0;
var c4 = 0x710dbd;

//currently assuming all 
class Bullet{
    constructor(radius, color, vectors, geometry){
        this.radius = radius;
        this.color = color;
        this.vectors = vectors;
        this.dimensions = vectors.length;
        this.graphics = new PIXI.Graphics(geometry);
        console.log("hi1")
        everything.addChild(this.graphics);
    }
    update_bullet(){
        let v = this.vectors;
        let d = this.dimensions;
        if (d>1){
            for (var i = d-1;i>0;i--){
                v[i-1] += v[i];
            }
            this.graphics.x = v[0];
            this.graphics.y = v[0];
        }
    }
}