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
var invertY = 1;//1 for true, -1 for false.
var thirdPerson = false;
var antialias = true;

function loadSave(){
    if (localStorage.getItem("credits")==null||localStorage.getItem("ownedShips")==null){
        window.alert("no save found");
    }
    else{
        credits=localStorage.getItem("credits");
        unlockedMaps=localStorage.getItem("unlockedMaps");
        unlockedShips=localStorage.getItem("unlockedShips");
        unlockedPrimaryEngines=localStorage.getItem("unlockedPrimaryEngines");
        unlockedFuelTanks=localStorage.getItem("unlockedFuelTanks");
        unlockedManeuveringEngines=localStorage.getItem("unlockedManeuveringEngines");
        unlockedShieldGenerators=localStorage.getItem("unlockedShieldGenerators");
        volume=localStorage.getItem("volume");
        invertY=localStorage.getItem("invertY");
        thirdPerson=localStorage.getItem("thirdPerson");
        antialias=localStorage.getItem("antialias");
    }
}
function save(){
    localStorage.setItem("credits", credits);
    localStorage.setItem("unlockedMaps", unlockedMaps);
    localStorage.setItem("unlockedShips", unlockedShips);
    localStorage.setItem("unlockedPrimaryEngines", unlockedPrimaryEngines);
    localStorage.setItem("unlockedFuelTanks", unlockedFuelTanks);
    localStorage.setItem("unlockedManeuveringEngines", unlockedManeuveringEngines);
    localStorage.setItem("unlockedShieldGenerators", unlockedShieldGenerators);
    localStorage.setItem("volume", volume);
    localStorage.setItem("invertY", invertY);
    localStorage.setItem("thirdPerson", thirdPerson);
    localStorage.setItem("antialias", antialias);
}

function closeAllWindows(){
    document.getElementById("settings").hidden = true;
    document.getElementById("shop").hidden = true;
    document.getElementById("select").hidden = true;
}

function settings(){
    if (document.getElementById("settings").hidden){
        closeAllWindows();
        document.getElementById("settings").hidden = false;
    } else {
        closeAllWindows();
    }
}

function update_settings(){
    if (document.getElementById("third_person_view").checked){
        camera.position.z = -5;
        camera.position.y = 1;
    }
    else{
        camera.position.z = 0;
        camera.position.y = 0;
    }
    if (document.getElementById("invert_y").checked){
        invertY = 1;
    }
    else{
        invertY = -1;
    }
    //add sound settings here
    //console.log(document.getElementById("sound").value);
}