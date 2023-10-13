function menu_onload() {
    let shop_table = document.getElementById("shop_table");
    for (let part_index = 0; part_index < available_parts.length; part_index++) {
        let part = available_parts[part_index];
        shop_table.innerHTML += 
        `<tr>
            <td>` + part.part_name + `</td>
            <td></td>
            <td>`+ part.cost +`</td>
            <td id="number_owned_`+ part_index +`">`+ part.number_owned +`</td>
            <td><button onclick="purchase(`+ part_index +`)">+1</button></td>
        </tr>`;
    }

    /*let garage_table = document.getElementById("garage_table");
    for (let schematic_index = 0; schematic_index < saved_schematics.length; saved_schematics++) {
        let schematic = saved_schematics[schematic_index];
        garage_table.innerHTML += 
        `<tr>
            <td>` + schematic.schematic_name + `</td>
        </tr>`;
    }*/

    update_dashboard()
}

function purchase(part_index) {
    part = available_parts[part_index];
    if (credits >= part.cost) {//if enough money
        credits -= part.cost;
        let number_owned = ++part.number_owned;
        document.getElementById("number_owned_" + part_index).innerHTML = number_owned;
        update_dashboard();
    } else {
        window.alert("Not enough funds");
    }
}

function update_dashboard() {
    document.getElementById("credits").innerHTML = "Credits: " + credits;
}

function closeAllWindows(){
    document.getElementById("settings").hidden = true;
    document.getElementById("shop").hidden = true;
    document.getElementById("select").hidden = true;
}
function select(){
    closeAllWindows();
    document.getElementById("select").hidden = false;
}
function shop(){
    closeAllWindows();
    document.getElementById("shop").hidden = false;
}
function settings(){
    closeAllWindows();
    document.getElementById("settings").hidden = false;
}

//// ---- 

//save data stuff
let credits = 0;
//let available_parts = [];defined on other js file
let saved_schematics = [];
//and of course, cells and bonds should be saved... we'll see if that part gets implemented. 

//saved settings stuff
//var volume = .2;
//var antialias = true;

function save(){
    let save_data = {
        //"settings":{"volume":volume, "invertY":invertY, "thirdPerson": thirdPerson, "antialias":antialias}, 
        "progress":{"credits": credits, "available_parts": available_parts, "saved_schematics":saved_schematics}
    }
    localStorage.setItem("petripets_save_data", JSON.stringify(save_data));
}

function loadSave(){
    if (localStorage.getItem("petripets_save_data")==null){
        window.alert("no save found");
    }
    else{
        save_data = JSON.parse(localStorage.getItem("petripets_save_data"));
        
        /*let settings = save_data["settings"];
        volume = settings["volume"];
        antialias = settings["antialias"];*/
        
        let progress = save_data["progress"];
        credits = progress["credits"];
        available_parts = progress["available_parts"];
        saved_schematics = progress[saved_schematics];

        //change_settings();
        update_dashboard();
    }
}

/*function change_settings(){
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
}*/