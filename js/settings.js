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
    localStorage.setItem("antialias", antialias);
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