//save data stuff
var credits = 0;
var unlockedAreas = [];
var unlockedParts = {};
var equippedParts = {};

//saved settings stuff
var volume = .2;
var invertY = true;
var thirdPerson = true;
var antialias = true;

function loadSave(){
    if (localStorage.getItem("save_data")==null){
        window.alert("no save found");
    }
    else{
        save_data = JSON.parse(localStorage.getItem("save_data"));
        
        let settings = save_data["settings"];
        volume = settings["volume"];
        invertY = settings["invertY"];
        thirdPerson = settings["thirdPerson"]; 
        antialias = settings["antialias"];
        
        let progress = save_data["progress"];
        credits = progress["credits"];
        unlockedAreas = [];
        unlockedParts = {};
        equippedParts = {};
    }
    change_settings();
}
function save(){
    let save_data = {
        "settings":{"volume":volume, "invertY":invertY, "thirdPerson": thirdPerson, "antialias":antialias}, 
        "progress":{"credits": credits, "unlockedAreas": unlockedAreas, "unlockedParts":unlockedParts, "equippedParts":equippedParts}
    }
    localStorage.setItem("save_data", JSON.stringify(save_data));
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