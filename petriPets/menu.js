function menu_onload() {
    let shop_table = document.getElementById("shop_table");
    for (let part_index = 0; part_index < available_parts.length; part_index++) {
        let part = available_parts[part_index];
        shop_table.innerHTML += //height="200" width="200" 
        `<tr>
            <td>` + part.part_name + `</td>
            <td><img src="`+ part.icon_path +`" class="part_icon"/></td>
            <td>`+ part.cost +`</td>
            <td id="number_owned_`+ part_index +`">`+ part.number_owned +`</td>
            <td><button onclick="purchase(`+ part_index +`)">+1</button></td>
        </tr>`;
    }

    let garage_table = document.getElementById("garage_table");
    for (let part_index = 0; part_index < available_parts.length; part_index++) {
        let part = available_parts[part_index];
        garage_table.innerHTML += 
        `<tr id="part_row_`+ part_index +`" onclick="change_selection(`+ part_index +`)">
            <td>` + part.part_name + `</td>
            <td><img src="`+ part.icon_path +`" class="part_icon"/></td>
            <td id="number_owned_out_of_`+ part_index +`">`+ part.number_available +" / "+ part.number_owned +`</td>
        </tr>`;
    }
    /*for (let schematic_index = 0; schematic_index < saved_schematics.length; saved_schematics++) {
        let schematic = saved_schematics[schematic_index];
        garage_table.innerHTML += 
        `<tr>
            <td>` + schematic.schematic_name + `</td>
        </tr>`;
    }*/
    

    for (let x = 0; x < dimensions; x++) {
        for (let y = 0; y < dimensions; y++) {
            let svg_xy = xy_to_svg_xy(x, y);
            garage_svg.innerHTML += `<g transform="translate(`+svg_xy[0]+`,`+svg_xy[1]+`)" onclick="add_particle_to_design(`+x+`, `+y+`)") oncontextmenu="edit_particle_attributes(`+x+`, `+y+`)"><circle cx="`+0+`" cy="`+0+`" r="10" fill="#404040" class="circle_node_svg"/><g id="cord_`+x+`_`+y+`"></g></g>`
        }
    }
    garage_svg.addEventListener("contextmenu", (e) => {e.preventDefault()});

    update_dashboard()
}
let garage_svg = document.getElementById("garage_svg");
let svg_width = .6*window.innerWidth;
let svg_height = svg_width * ((y_basis.y)/(x_basis.x+y_basis.x))
garage_svg.style.width = svg_width;
console.log(svg_width)
garage_svg.style.height = svg_height;

let dimensions = 12;
let svg_radius = (svg_height)/dimensions/(y_basis.y/radius);

function xy_to_svg_xy(x, y) {
    return [(svg_radius*(x - y_basis.x/radius*y + y_basis.x/radius*dimensions)), (svg_radius*y_basis.y/radius*y+svg_height/24)];
}

let selection = {"type": "none", "part": available_parts[0], "index": -1}

function make_null_list(x_max, y_max) {
    let empty_list = [];
    for (let y = 0; y < y_max; y++){
        empty_list.push([]);
        for (let x = 0; x < x_max; x++){
            empty_list[y].push(null);
        }
    }
    return empty_list
}

let garage_design = make_null_list(12, 12);
let garage_design_additional_bonds = [];
let bond_cell_1 = {"x":-1, "y":-1}

function add_particle_to_design(x, y) {
    console.log("x: "+x+", y: "+y);
    if (selection["type"] == "cell") {
        if (selection["part"].number_available > 0){
            refresh_garage_table_parts_remaining(x, y);
            garage_design[y][x] = selection["part"];
            document.getElementById("cord_"+x+"_"+y).innerHTML = `<image href="`+selection["part"].icon_path+`" class="part_svg" height="16" width="16" transform="translate(-8,-8)"/>`
            selection["part"].number_available--;
            document.getElementById("number_owned_out_of_" + selection["index"]).innerHTML = selection["part"].number_available +" / "+ selection["part"].number_owned;
        }
    } else if (selection["type"] == "bond") {
        if (bond_cell_1["x"] == -1) {
            bond_cell_1 = {"x":x, "y":y}
        } else {
            let svg_xy_cell1 = xy_to_svg_xy(bond_cell_1["x"], bond_cell_1["y"]);
            let svg_xy_cell2 = xy_to_svg_xy(x, y);
            garage_design_additional_bonds.push([bond_cell_1["x"], bond_cell_1["y"], 0, x, y, 0]);
            document.getElementById("garage_svg").innerHTML += `<line x1="`+svg_xy_cell1[0]+`" y1="`+svg_xy_cell1[1]+`" x2="`+svg_xy_cell2[0]+`" y2="`+svg_xy_cell2[1]+`" style="stroke:rgb(10,10,10);stroke-width:4" class="bond_svg" oncontextmenu="edit_bond_weights()"/>`
            bond_cell_1 = {"x":-1, "y":-1}
        }
    } else if (selection["type"] == "delete") {
        refresh_garage_table_parts_remaining(x, y);
        garage_design[y][x] = null;
        document.getElementById("cord_"+x+"_"+y).innerHTML = ``;
    } else {
        //yeet;
    }
}

function refresh_garage_table_parts_remaining(x, y) {
    clicked_part = garage_design[y][x];
    if (clicked_part != null) {
        clicked_part.number_available++;
        for (let part_index = 0; part_index < available_parts.length; part_index++) {
            document.getElementById("number_owned_out_of_" + part_index).innerHTML = available_parts[part_index].number_available +" / "+ available_parts[part_index].number_owned;
        }
    }
}

function edit_particle_attributes(x, y) {
    let part = garage_design[y][x];
    if (part != null) {
        let attribute_inputs = document.getElementById("attribute_inputs");
        attribute_inputs.innerHTML = ``;
        attribute_inputs.part_x = x;
        attribute_inputs.part_y = y;
        for (let attribute_index = 0; attribute_index < part.part_attributes.length; attribute_index++) {
            let attribute = part.part_attributes[attribute_index];
            attribute_inputs.innerHTML += `<div>`+attribute["name"]+`</div>`;
            if (attribute["type"] == "text") {
                attribute_inputs.innerHTML += `<input id="attribute_input_`+attribute_index+`" type="text"/>`;
            } else if (attribute["type"] == "key") {
                attribute_inputs.innerHTML += `<input id="attribute_input_`+attribute_index+`" type="text"/>`;
            } else if (attribute["type"] == "bond") {
                attribute_inputs.innerHTML += `<input id="attribute_input_`+attribute_index+`" type="button"/>`;
            } else if (attribute["type"] == "schematic") {
                attribute_inputs.innerHTML += `<input id="attribute_input_`+attribute_index+`" type="button"/>`;
            } else if (attribute["type"] == "number") {
                attribute_inputs.innerHTML += `<input id="attribute_input_`+attribute_index+`" type="number"/>`;
            }
        }
        document.getElementById("attribute_inputs_popup").hidden = false;
    }
}

function save_change_to_particle_attributes() {
    let x = attribute_inputs.part_x;
    let y = attribute_inputs.part_y;
    let part = garage_design[y][x];
    if (part != null) {
        for (let attribute_index = 0; attribute_index < part.part_attributes.length; attribute_index++) {
            let attribute = part.part_attributes[attribute_index];
            console.log(document.getElementById("attribute_input_"+attribute_index));
            console.log(attribute["value"]);
            attribute["value"] = document.getElementById("attribute_input_"+attribute_index).value;
            console.log(attribute["value"]);
            /*if (attribute["type"] == "text") {
                attribute_inputs.innerHTML += `<input id="attribute_input_`+attribute_index+`" type="text"/>`;
            } else if (attribute["type"] == "key") {
                attribute_inputs.innerHTML += `<input id="attribute_input_`+attribute_index+`" type="text"/>`;
            } else if (attribute["type"] == "bond") {
                attribute_inputs.innerHTML += `<input id="attribute_input_`+attribute_index+`" type="button"/>`;
            } else if (attribute["type"] == "schematic") {
                attribute_inputs.innerHTML += `<input id="attribute_input_`+attribute_index+`" type="button"/>`;
            } else if (attribute["type"] == "number") {
                attribute_inputs.innerHTML += `<input id="attribute_input_`+attribute_index+`" type="number"/>`;
            }*/
        }
    }
    document.getElementById("attribute_inputs_popup").hidden = true;
}

function save_schematics() {
    // loops through the data created from the garage, then creates a schematic based on that and finally adds it to the schematics list.
    let garage_schematic_cells = make_null_list(garage_design.length, garage_design[0].length);
    for (let y = 0; y < garage_design.length; y++) {
        for (let x = 0; x < garage_design[y].length; x++) {
            let part = garage_design[y][x];
            if (part != null) {
                garage_schematic_cells[y][x] = part.template_cell_function(part.part_attributes);
            } else {
                garage_schematic_cells[y][x] = null;
            }
        }
    }
    let new_schematics = new Schematic(garage_schematic_cells, make_empty_list(garage_schematic_cells), bond_material_1, [0, 0], garage_design_additional_bonds, "new_schematic");
    saved_schematics.push(new_schematics);
    //schematic_1.build_schematic(new THREE.Vector3(-50, -25, 0));
}

function change_selection(part_index) {
    document.getElementById("part_row_"+selection["index"]).style.backgroundColor = "";
    document.getElementById("part_row_"+part_index).style.backgroundColor = "#000000";
    if (part_index == -1) {
        selection = {"type": "bond", "part": 0, "index": part_index};
    } else if (part_index >= 0) {
        selection = {"type": "cell", "part": available_parts[part_index], "index": part_index};
    } else if (part_index == -2) {
        selection = {"type": "delete", "part": 0, "index": part_index};
    } 
}

function purchase(part_index) {
    part = available_parts[part_index];
    if (credits >= part.cost) {//if enough money
        credits -= part.cost;
        let number_owned = ++part.number_owned;
        part.number_available++;
        document.getElementById("number_owned_" + part_index).innerHTML = number_owned;
        document.getElementById("number_owned_out_of_" + part_index).innerHTML = number_owned + " / " + number_owned;
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
    document.getElementById("attribute_inputs_popup").hidden = true;
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