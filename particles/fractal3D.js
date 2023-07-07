class Fractal {
    construct(perspective_size_lim){
        this.perspective_size_lim = perspective_size_lim;
    }
    //this is a very critical function for any fractal. this is given the size of the next part of the fractal (via a corner to corner vector to define the bounding box), the position vector reletive to the camera, and the unit vector pointing parrellet with the camera.
    IsLarge(size_v, r_v, u_v) {
        if (Math.sqrt(size_v.dot(size_v)-size_v.dot(u_v)**2)/r_v.dot(u_v) > this.perspective_size_lim) {
            return true;
        } else {
            return false;
        }
    }
}



var everything = new PIXI.Container();
var almost_everything = new PIXI.Container();//use for translation
function init(){
    app = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight });
    document.body.appendChild(app.view);    
    app.stage.addChild(everything);
    everything.addChild(almost_everything);
    everything.position.x = window.innerWidth/2;//this makes zero zero at the middle of the screen
    everything.position.y = window.innerHeight/2;
    draw_hilbert(6)

    /*const template = new PIXI.Graphics();
    //template.drawRect(50, 50, 100, 100);
    graphics.beginFill(0xDE3249);
    graphics.drawRect(500, 500, 100, 100);
    graphics.endFill();
    // Create 5 duplicate objects
    for (let i = 0; i < 5; i++) {
        // Initialize the duplicate using our template's pre-built geometry
        let duplicate = new PIXI.Graphics(template.geometry);
    }
    app.stage.addChild(template);*/
}
document.addEventListener("wheel", wheel);
function wheel(){
    scale/=1+event.deltaY/1000;
    everything.scale.x=scale;
    everything.scale.y=scale;
}


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
    hilbert(-side_length/2, -side_length/2, side_length/2, side_length/2, iterations);
    almost_everything.addChild(hilbert_graphics);
}
function zoom(){
    //life
}
var x1 = 0;
var y1 = 0;
var x2 = 1;//here we a defining that the view window is 1 by 1
var y2 = 1;
var scale = 1;


function translate(){
    //life
}