var c;
var ctx;

var link = "https://www.editey.com/file/1NwPe0oTq8bj3HzL_qgsrliuq3VV6Ifrz/";

//var c2;https://lh3.googleusercontent.com/-FUWgZH_zd3s/AAAAAAAAAAI/AAAAAAAABT8/Vw63wNU1nG4/photo.jpg?sz=50
//var ctx2;

//this is the paralax value in px
var para = -200;//-238.110236223;
//this is the distance in px from the screen to your head
var d = 1000;
//these are the position of the player
var position = [0,0,0,0];

var x = 0;
var y = 0;
var z = 0;
var w = 0;

//I think that we need some sort of off set value to zero the window's cordinate system 
var xOffSet;
var yOffSet;

/*
//this will be the corrdinates of the vanishing point for the third dimension
var vanPointx3 = 0;
var vanPointy3 = 0;
*/
//this is the corrdinates of the vanishing point for the fourth dimension
var vanPointx4 = 400;
var vanPointy4 = 400;

//user inputted data 
var userVerticies = []; //is an int[][] when "save data" button is pressed
var userFaces = []; //is an int[][] when "save data" button is pressed
var dimensionSize = 0; //updated when "save data" button is pressed
var dimensionMax = 7;
var defaultRangeSliders ="100";
var tSliders = ["X", "Y", "Z", "W", "V", "U", "T"];

function saveUserInput(){ //TODO: add line numbers to both textareas
    var input = document.getElementById("userInputVerticies").value;
    var inputPoints = [];
    userVerticies = [];
    userFaces = [];
    dimensionSize = 0;
    splitUserInput(input, inputPoints, userVerticies);

    //updates dimension size
    for(i = 0; i < userVerticies.length; i++){
        console.log("i" + userVerticies[i].length);
        if(userVerticies[i].length > dimensionSize) {
            if(userVerticies[i].length > dimensionMax){
                document.getElementById("warningPrint").innerHTML = "ERROR: too many dimensions! Max dimensions: 7"; 
            } else {
                dimensionSize = userVerticies[i].length;
                document.getElementById("warningPrint").innerHTML = ""; 
            }
        }
        addSliders();
    }   
    
    //adds zeros to points when not specified
    for(i = 0; i < userVerticies.length; i++){
        while(dimensionSize > userVerticies[i].length) {
            userVerticies[i].push(0);
        }
    }   
    
    turnToInt(userVerticies, true);
    input = document.getElementById("userInputFaces").value;
    inputPoints = [];
    splitUserInput(input, inputPoints, userFaces);
    turnToInt(userFaces, false);
                console.log(userVerticies);
    //checks if point exists when faces are created
   for(var i = 0; i < userFaces.length; i++){
        for(var j = 0; j < userFaces[i].length; j++) {
            if(userFaces[i][j] > userVerticies.length) 
               document.getElementById("warningPrint").innerHTML = "ERROR: point " + userFaces[i][j] + " is never created!";
            else if(document.getElementById("warningPrint").innerHTML == "ERROR: point " + userFaces[i][j] + " is never created!")
               document.getElementById("warningPrint").innerHTML = ""; 
        }
   }
}
function splitUserInput(input, inputPoints, savedVar){
    var placeHolder = [];
    inputPoints = input.split('\n');
        
     for(i=0; i < inputPoints.length; i++)
        placeHolder[i] = inputPoints[i].split(',');
    

    for(i = 0; i < inputPoints.length; i++)
        savedVar.push(placeHolder[i]);
}

function turnToInt(array, isFloat){
    for(var i = 0; i < array.length; i++) {
        for(var j = 0; j < array[i].length; j++) {
            if(isFloat) array[i][j] = parseFloat(array[i][j]);
            else array[i][j] = parseInt(array[i][j]);
            console.log("array: " + userVerticies[i][j]);
        }
    }
}

function updateDimensionSize(){
    var e = document.getElementById("NoD");
    dimensionSize = e.options[e.selectedIndex].value;
    addSliders();
}

function addSliders(){ //TODO: make default range print to numbre boxes on creation
    var rSliders = ["X-Y", "Y-Z", "Z-X", "W-X", "W-Y", "W-Z", "V-X", "V-Y", "V-Z", "V-W", 
            "U-X", "U-Y", "U-Z", "U-W", "U-V", "T-X", "T-Y", "T-Z", "T-W", "T-V", "T-U"];
    var rNum = [0, 0, 1, 3, 6, 10, 15, 21];
    var string = "";
    
    document.getElementById("TSliders").innerHTML = "";
    document.getElementById("TLabel").style.visibility="hidden";
    document.getElementById("RLabel").style.visibility="hidden";
    document.getElementById("RSliders").innerHTML = "";
    
    for(var k = 0; dimensionSize > k; k++){ //ID 1 is box 1, 2 is box 2, and 3 is the slider
        string +="<input id=" + tSliders[k] + "1  onChange=updateSliderRange() class=\"sliderBoxes leftmar1\" type=\"number\">\n";
        string +="<input id=" + tSliders[k] + "2 onChange=updateSliderRange() class=\"sliderBoxes leftmar\" type=\"number\">\n";
        string += "<div>" + tSliders[k] + "-Axis<input id=" + tSliders[k] + "3 type=\"range\" min=\"" + -defaultRangeSliders + "\" max=\"" + defaultRangeSliders + "\" step=\"1\" /></div>\n";
        document.getElementById("TLabel").style.visibility="visible";
    }
    document.getElementById("TSliders").innerHTML = string;
    string = "";
    for(var l = 0; rNum[dimensionSize] > l; l++){
        string += "<div>" + rSliders[l] + " Axes<input type=\"range\" min=\"-360\" max=\"360\" step=\"1\" /></div>\n";
        document.getElementById("RLabel").style.visibility="visible";
    }
    document.getElementById("RSliders").innerHTML = string;
    console.log("ready");
}

function updateSliderRange(){
    for(let i = 0; i < dimensionSize; i++){
        if (document.getElementById( tSliders[i] + 1).value >= document.getElementById( tSliders[i] + 2).value){
            document.getElementById("warningTrans").innerHTML = "ERROR: invalid range!"; 
        } else document.getElementById("warningTrans").innerHTML = ""; 
        document.getElementById(tSliders[i] + 3).min = document.getElementById( tSliders[i] + 1).value;
        document.getElementById( tSliders[i] + 3).max = document.getElementById( tSliders[i] + 2).value;
    }
}

function copyLink() {
  var link = "sup"; //TODO: put real link in the String
  
   var el = document.createElement('textarea');
   el.value = link;
   el.setAttribute('readonly', '');
   el.style = {position: 'absolute', left: '-9999px'};
   document.body.appendChild(el);
   el.select();
   document.execCommand('copy');
   document.body.removeChild(el);
  
  alert("Copied!");
}


function clearCanvas(){
    ctx.clearRect(0, 0, 800, 800);
    //ctx2.clearRect(0, 0, 800, 800);
}

function drawShape(){
    ctx.beginPath();
    for(var face of userFaces){
        var xandy = findCord(userVerticies[face.length-1][0],userVerticies[face.length-1][1],userVerticies[face.length-1][2],userVerticies[face.length-1][3]);
             
        ctx.moveTo(xandy[0],xandy[1]);
        console.log(xandy[0]+","+xandy[1]);
        for(var point of face){
            
            xandy = findCord(userVerticies[point][0],userVerticies[point][1],userVerticies[point][2],userVerticies[point][3]);
            ctx.lineTo(xandy[0],xandy[1]);
            console.log(xandy[0]+","+xandy[1]);
        }
        
    }
    ctx.stroke();
}

function findCord(x1,y1,z1,w1){
    return [
        (((x1+x)*d/(d+-z1+-z) - vanPointx4)*(d/(d+-w+-w1)) + vanPointx4) + xOffSet,
        (((y1+y)*d/(d+-z+-z1) + vanPointy4)*(d/(d+-w+-w1)) - vanPointy4) + yOffSet
    ];
}
function findCordPara(x1,y1,z1,w1){
    return [
        (((x1+x+para)*d/(d+-z1+-z) - vanPointx4)*(d/(d+-w+-w1)) + vanPointx4) + xOffSet,
        (((y1+y)*d/(d+-z+-z1) + vanPointy4)*(d/(d+-w+-w1)) - vanPointy4) + yOffSet
    ];
    //var ne
}
function drawLine(x1,y1,z1,w1,x2,y2,z2,w2){wZ1
    //var newW1
    
    ctx.beginPath();
    var newX1 = ((x1+x)*d/(d+-z1+-z) - vanPointx4)*(d/(d+-w+-w1)) + vanPointx4;
    var newY1 = ((y1+y)*d/(d+-z+-z1) + vanPointy4)*(d/(d+-w+-w1)) - vanPointy4;
    
    var newX2 = ((x2+x)*d/(d+-z2+-z) - vanPointx4)*(d/(d+-w+-w2)) + vanPointx4;
    var newY2 = ((y2+y)*d/(d+-z2+-z) + vanPointy4)*(d/(d+-w+-w2)) - vanPointy4;
    
    ctx.moveTo(newX1 + xOffSet,newY1 + yOffSet);
    ctx.lineTo(newX2 + xOffSet,newY2 + yOffSet);
    ctx.stroke();
    
    
    
    
    
    ctx2.beginPath();
    var newX12 = ((x1+x+para)*d/(d+-z1+-z) - vanPointx4)*(d/(d+-w1+-w)) + vanPointx4;
    var newY12 = ((y1+y)*d/(d+-z1+-z) + vanPointy4)*(d/(d+-w1+-w)) - vanPointy4;
    
    var newX22 = ((x2+x+para)*d/(d+-z2+-z) - vanPointx4)*(d/(d+-w2+-w)) + vanPointx4;
    var newY22 = ((y2+y)*d/(d+-z2+-z) + vanPointy4)*(d/(d+-w2+-w)) - vanPointy4;
    
    ctx2.moveTo(newX12 + xOffSet,newY12 + yOffSet);
    ctx2.lineTo(newX22 + xOffSet,newY22 + yOffSet);
    ctx2.stroke();
}

function rotate(xAxis,yAxis,changeInAngle){
    for (var point of userVerticies){
        var angleOfPoint;
        if (point[xAxis]>0){
            angleOfPoint = Math.atan(point[yAxis]/point[xAxis]);
        }
        else if (point[xAxis]<0){
            angleOfPoint = Math.PI-Math.atan(point[yAxis]/(-1*point[xAxis]));
        }
        else {
            angleOfPoint = Math.atan(1);
        }
        var h = Math.sqrt(point[yAxis]*point[yAxis]+point[xAxis]*point[xAxis]);
        if(changeInAngle>0){
            angleOfPoint += .175;// 0.17453292519;
        }
        else{
            angleOfPoint -= .175;// 0.17453292519;
        }
        point[yAxis] = h*Math.sin(angleOfPoint);//y
        point[xAxis] = h*Math.cos(angleOfPoint);//x
        //alert(point[yAxis]+","+point[xAxis]);
    }
    clearCanvas();
    drawShape();
}

function onload(){
    c = document.getElementById("myCanvas");
    ctx = c.getContext("2d");
    //c2 = document.getElementById("myCanvas2");
    //ctx2 = c2.getContext("2d");
    //drawItem([{},{},{}]);
    xOffSet = Math.floor(c.width/2);
    yOffSet = Math.floor(c.height/2);
    
    userVerticies = [
        [0,0,0,0],
        [0,100,0,0],
        [100,100,0,0],
        [100,0,0,0],
    
        [100,100,100,0],
        [100,0,100,0],
        [0,0,100,0],
        [0,100,100,0]
        
    ];
    userFaces = [
        [0,1,2,3],
        [4,5,6,7]
    ];
    
    
    /*test thing
    userVerticies = [
        [0,0,0,0],
        [100,0,0,0],
        [100,100,0,0],
        [0,100,0,0],
        [0,0,100,0],
        [100,0,100,0],
        [100,100,100,0],
        [0,100,100,0],
        [0,0,0,100],//8
        [100,0,0,100],
        [100,100,0,100],
        [0,100,0,100],
        [0,0,100,100],
        [100,0,100,100],
        [100,100,100,100],
        [0,100,100,100]
    ];
    userFaces = [
        [0,1,2,3],
        [4,5,6,7],
        [8,9,10,11],
        [12,13,14,15],
        [14,13,9,10],
        [15,14,10,11],
        [12,15,11,8],
        [12,13,9,0],
        [1,2,6,5],
        [4,5,1,0],
        [7,6,2,3],
        [0,3,7,4],
        [11,10,2,3],
        [10,9,1,2],
        [9,8,0,1],
        [8,11,3,0],
        [15,14,6,7],
        [14,13,5,6],
        [12,13,5,4],
        [12,15,7,4]   
    ];*/
    //pentachoronData();
}

function updateShape(){
    var e = document.getElementById("shape");
    alert("hello");
    switch(e.options[e.selectedIndex].value) {
    case "pentachoron":
        pentachoronData();
        break;
    default:
        // code block
    }
}

function life() {
    //document.getElementById("fname").addEventListener("focusout", myFunction);
    alert("huyiefisfgiuobseg");
}

function pentachoronData(){
    dimensionSize = 4;
    addSliders();
    var phi = 1.61803398875 * 100;
        userVerticies = [
        [200,0,0,0],
        [0,200,0,0],
        [0,0,200,0],
        [0,0,0,200],
        [phi,phi,phi,phi]
    ];
    userFaces = [//TODO: add all faces
        [0, 1, 2], //TODO: fix 164 line bug with 5 pts (Micah)
        [1, 2, 3],
        [2, 3, 4], 
        [0, 3, 1], 
        [0, 3, 2], 
        [0, 4, 1],
        [0, 2, 4] //TODO: fix face bug loop back
    ];
}