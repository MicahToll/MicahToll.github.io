//source: https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API
var gamepad1;//var gamepads = {};
var gamepad_is_connected = false;

function gamepadHandler(event, connecting) {
    var gamepad = event.gamepad;
    // Note:
    // gamepad === navigator.getGamepads()[gamepad.index]
    if (connecting) {
        gamepad1 = gamepad;//gamepads[gamepad.index] = gamepad;
        document.getElementById("lockMouse").hidden = true;
        gamepad_is_connected = true;
        console.log("gamepad connected");
    } else {
        delete gamepad1;//delete gamepads[gamepad.index];
        document.getElementById("lockMouse").hidden = false;
        gamepad_is_connected = false;
        console.log("gamepad disconnected");
    }
}

window.addEventListener("gamepadconnected", function(e) { gamepadHandler(e, true); }, false);
window.addEventListener("gamepaddisconnected", function(e) { gamepadHandler(e, false); }, false);

var head = new THREE.Euler(0,Math.PI,0,"YXZ");
function update_gamepad(){
    gamepad1 = navigator.getGamepads()[0]
    if (gamepad1.buttons[0].pressed){
        spaceship.rotateZ(-maneuvering_per_tick);
    }
    if (gamepad1.buttons[1].pressed){
        spaceship.rotateZ(maneuvering_per_tick);
    }
    if (gamepad1.buttons[2].pressed){
        shop();
    }
    /*if (gamepad1.buttons[3].pressed){
        //y button is pressed
    }*/
    if (gamepad1.buttons[4].pressed){
        if (v>.05){// this number is arbitrary
            var scale_p = p*.95;// this number is also arbitrary, I might relate this to air resistance
            p = scale_p;
            p_vector.setLength(scale_p);
        } else {
            p = 0;
            p_vector.set(0,0,0);
        }
    } else if (gamepad1.buttons[6].pressed){
        if (v>.05){// this number is arbitrary
            var scale_p = p*.95;// this number is also arbitrary, I might relate this to air resistance
            p = scale_p;
            p_vector.setLength(scale_p);
        } else {
            p = 0;
            p_vector.set(0,0,0);
        }
    }
    if (gamepad1.buttons[5].pressed){
        thrusters = engine_power*1/60;
    }
    else if (gamepad1.buttons[7].pressed){
        thrusters = engine_power*gamepad1.buttons[7].value/60;
    }
    else {
        thrusters = 0;
    }
    if (gamepad1.buttons[8].pressed){
        select();
    }
    if (gamepad1.buttons[9].pressed){
        settings();
    }
    /*if (gamepad1.buttons[10].pressed){
        //maybe recenter position?
    }*/
    if (gamepad1.buttons[11].pressed){
        //recenter camera
        head.set(0,Math.PI,0);
        camera.setRotationFromEuler(head);
    }
    //12 through 15 are the d pad buttons
    //no clue what 16 is
    if (Math.abs(gamepad1.axes[0])>.15||Math.abs(gamepad1.axes[1])>.15){
        spaceship.rotateY(-maneuvering_per_tick*gamepad1.axes[0]/2);
        spaceship.rotateX(-invertY*maneuvering_per_tick*gamepad1.axes[1]);
    }
    if (Math.abs(gamepad1.axes[2])>.15||Math.abs(gamepad1.axes[3])>.15){
        head.set(Math.max(-Math.PI/2,Math.min(head.x-head_speed_per_tick*gamepad1.axes[3],Math.PI/2)), head.y-head_speed_per_tick*gamepad1.axes[2],0);
        camera.setRotationFromEuler(head);
    }
}