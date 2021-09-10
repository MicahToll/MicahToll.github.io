//save data stuff
var credits = 0;
var unlockedMaps = [];
var unlockedShips = [];
var unlockedPrimaryEngines = [];
var unlockedFuelTanks = [];
var unlockedManeuveringEngines = [];
var unlockedShieldGenerators = [];
//var ownedblasters = [];

//saved settings stuff
var volume = .2;
var invertY = true;
var thirdPerson = true;
var antialias = true;

function loadSave(){
    if (localStorage.getItem("credits")==null||localStorage.getItem("ownedShips")==null){
        window.alert("no save found");
    }
    else{
        credits=JSON.parse(localStorage.getItem("credits"));
        unlockedMaps=JSON.parse(localStorage.getItem("unlockedMaps"));
        unlockedShips=JSON.parse(localStorage.getItem("unlockedShips"));
        unlockedPrimaryEngines=JSON.parse(localStorage.getItem("unlockedPrimaryEngines"));
        unlockedFuelTanks=JSON.parse(localStorage.getItem("unlockedFuelTanks"));
        unlockedManeuveringEngines=JSON.parse(localStorage.getItem("unlockedManeuveringEngines"));
        unlockedShieldGenerators=JSON.parse(localStorage.getItem("unlockedShieldGenerators"));
        volume=JSON.parse(localStorage.getItem("volume"));
        invertY=JSON.parse(localStorage.getItem("invertY"));
        thirdPerson=JSON.parse(localStorage.getItem("thirdPerson"));
        antialias=JSON.parse(localStorage.getItem("antialias"));
    }
    change_settings();
}
function save(){
    localStorage.setItem("credits", JSON.stringify(credits));
    localStorage.setItem("unlockedMaps", JSON.stringify(unlockedMaps));
    localStorage.setItem("unlockedShips", JSON.stringify(unlockedShips));
    localStorage.setItem("unlockedPrimaryEngines", JSON.stringify(unlockedPrimaryEngines));
    localStorage.setItem("unlockedFuelTanks", JSON.stringify(unlockedFuelTanks));
    localStorage.setItem("unlockedManeuveringEngines", JSON.stringify(unlockedManeuveringEngines));
    localStorage.setItem("unlockedShieldGenerators", JSON.stringify(unlockedShieldGenerators));
    localStorage.setItem("volume", JSON.stringify(volume));
    localStorage.setItem("invertY", JSON.stringify(invertY));
    localStorage.setItem("thirdPerson", JSON.stringify(thirdPerson));
    localStorage.setItem("antialias", JSON.stringify(antialias));
}

function closeAllWindows(){
    document.getElementById("settings").hidden = true;
    document.getElementById("shop").hidden = true;
    document.getElementById("select").hidden = true;
}

function settings(){
    closeAllWindows();
    document.getElementById("settings").hidden = false;

}

function change_settings(){
    document.getElementById("third_person_view").checked = thirdPerson;
    document.getElementById("invert_y").checked = invertY;
    document.getElementById("sound").value = volume;
    implement_settings();
}

function update_settings(){
    thirdPerson = document.getElementById("third_person_view").checked;
    invertY = document.getElementById("invert_y").checked;
    volume = document.getElementById("sound").value;
    implement_settings();
}

function implement_settings(){
    if (thirdPerson){
        camera.position.z = -5;
        camera.position.y = 1;
    }
    else{
        camera.position.z = 0;
        camera.position.y = 0;
    }
    if (invertY){
        invertY_axis = 1;
    }
    else{
        invertY_axis = -1;
    }
    //add sound settings here
}