function init(){
    var canvas = document.getElementById('test_canvas');
    var gl = canvas.getContext('experimental-webgl');//instead of "2d"

    //context.font = '20pt Calibri';
    //context.fillStyle = 'green';
    //context.fillText('Welcome to Tutorialspoint', 70, 70);
    gl.clearColor(0.9,0.9,0.8,1);
    gl.clear(gl.COLOR_BUFFER_BIT);
}