function init(){
    app = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight });
    document.body.appendChild(app.view);
    draw_hilbert(6)
    /*let sprite = PIXI.Sprite.from('../petriPets/amras.png');
    app.stage.addChild(sprite);

    // Add a variable to count up the seconds our demo has been running
    let elapsed = 0.0;
    // Tell our application's ticker to run a new callback every frame, passing
    // in the amount of time that has passed since the last tick
    app.ticker.add((delta) => {
        // Add the time to our total elapsed time
        elapsed += delta;
        // Update the sprite's X position based on the cosine of our elapsed time.  We divide
        // by 50 to slow the animation down a bit...
        sprite.x = 100.0 + Math.cos(elapsed/50.0) * 100.0;
    });*/

/*
const template = new PIXI.Graphics();
//template.drawRect(50, 50, 100, 100);
graphics.beginFill(0xDE3249);
graphics.drawRect(500, 500, 100, 100);
graphics.endFill();
// Create 5 duplicate objects
for (let i = 0; i < 5; i++) {
    // Initialize the duplicate using our template's pre-built geometry
    let duplicate = new PIXI.Graphics(template.geometry);
  }
app.stage.addChild(template);
*/
//var points = [];
/*for (let i = 0; i < 20; i++) {
    points.push(new PIXI.Point(i * 50, 0));
};
let rope = new PIXI.SimpleRope(PIXI.Texture.from('../petriPets/amras.png'), points);
app.stage.addChild(rope);*/
}
//var points = [];

up = 0xe32d2d;
left = 0x32a852
right = 0x10a9e0
down = 0x710dbd
let app;
function hilbert(x1, y1, x2, y2, iterations){
    //first, calculate midpoint
    var xmid = (x1+x2)/2;
    var ymid = (y1+y2)/2;
    if (iterations > 1){
        //do something
        hilbert(x1, y1, xmid, ymid, iterations-1);//top left
        hilbert(xmid, y1, x2, ymid, iterations-1);//top right
        hilbert(xmid, ymid, x1, y2, iterations-1);//bottom left
        hilbert(xmid, y2, x2, ymid, iterations-1);//bottom right
    }
    else{//to get some cool results switch around some x's and y's... it gives like a qr code thing
        //do the actual thing
        var xx1;
        var yy1;
        var xx2;
        var yy2;
        //top left
        xx1 = x1;
        yy1 = y1;
        xx2 = xmid;
        yy2 = ymid;
        hilbert_graphics.beginFill(up);
        hilbert_graphics.drawRect(Math.min(xx1, xx2), Math.min(yy1, yy2), Math.max(xx1, xx2)-Math.min(xx1, xx2), Math.max(yy1, yy2)-Math.min(yy1, yy2));
        hilbert_graphics.endFill();
        //top right: xmid,y1, x2, ymid
        xx1 = xmid;
        yy1 = y1;
        xx2 = x2;
        yy2 = ymid;
        hilbert_graphics.beginFill(left);
        hilbert_graphics.drawRect(Math.min(xx1, xx2), Math.min(yy1, yy2), Math.max(xx1, xx2)-Math.min(xx1, xx2), Math.max(yy1, yy2)-Math.min(yy1, yy2));
        hilbert_graphics.endFill();
        //bottom left: xmid, ymid, x1, y2
        xx1 = xmid;
        yy1 = ymid;
        xx2 = x1;
        yy2 = y2;
        hilbert_graphics.beginFill(right);
        hilbert_graphics.drawRect(Math.min(xx1, xx2), Math.min(yy1, yy2), Math.max(xx1, xx2)-Math.min(xx1, xx2), Math.max(yy1, yy2)-Math.min(yy1, yy2));
        hilbert_graphics.endFill();
        //bottom right: xmid, y2, x2, ymid
        xx1 = xmid;
        yy1 = y2;
        xx2 = x2;
        yy2 = ymid;
        hilbert_graphics.beginFill(down);
        hilbert_graphics.drawRect(Math.min(xx1, xx2), Math.min(yy1, yy2), Math.max(xx1, xx2)-Math.min(xx1, xx2), Math.max(yy1, yy2)-Math.min(yy1, yy2));
        hilbert_graphics.endFill();
    }
}
function draw_hilbert(iterations){
    hilbert_graphics = new PIXI.Graphics();
    var side_length = Math.min(window.innerWidth, window.innerHeight);
    hilbert(0, 0, side_length, side_length, iterations);
    app.stage.addChild(hilbert_graphics);
}