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

function make_dict_list(x_max, y_max) {
    let empty_list = [];
    for (let y = 0; y < y_max; y++){
        empty_list.push([]);
        for (let x = 0; x < x_max; x++){
            empty_list[y].push({});
        }
    }
    return empty_list
}

function left_click_bond(x1, y1, x2, y2) {
    if (selection["type"] == "delete") {
        let bond = get_bond_index(x1, y1, x2, y2);
        let bx1 = bond[0];
        let by1 = bond[1];
        let bx2 = bond[2];
        let by2 = bond[3];
        delete garage_design_bond_weights[by1][bx1][bx2 + "_" + by2];
        document.getElementById(bx1+"_"+by1+"_"+bx2+"_"+by2).remove();
    } else if (selection["type"] == "none") {
        document.getElementById( "attribute_input_" + selection["index"] ).value = x1+", "+y1+"_"+x2+", "+y2;
    }
}

let garage_design = make_null_list(12, 12);
let garage_design_attributes = make_null_list(12, 12);
let garage_design_bond_weights = make_dict_list(12, 12);
let bond_cell_1 = {"x":-1, "y":-1}

function get_bond_index(x1, y1, x2, y2){
    let bond;
    if (x2-x1 >= 0 && y2-y1 >= 0) {
        bond = [x1, y1, x2, y2];
    } else if (x2-x1 <= 0 && y2-y1 <= 0) {
        bond = [x2, y2, x1, y1];
    } else if (y2-y1 >= 0) {
        bond = [x1, y1, x2, y2];
    } else {
        bond = [x2, y2, x1, y1];
    }
    return bond
}

function add_particle_to_design(x, y) {
    console.log("x: "+x+", y: "+y);
    if (selection["type"] == "cell") {
        if (selection["part"].number_available > 0){
            refresh_garage_table_parts_remaining(x, y);
            garage_design[y][x] = selection["part"];
            garage_design_attributes[y][x] = [];
            for (let attribute of selection["part"]["part_attributes"]) {
                garage_design_attributes[y][x].push(attribute["default_value"]);
            }
            document.getElementById("cord_"+x+"_"+y).innerHTML = `<image href="`+selection["part"].icon_path+`" class="part_svg" height="16" width="16" transform="translate(-8,-8)"/>`
            selection["part"].number_available--;
            document.getElementById("number_owned_out_of_" + selection["index"]).innerHTML = selection["part"].number_available +" / "+ selection["part"].number_owned;
        }
    } else if (selection["type"] == "bond") {
        if (bond_cell_1["x"] == -1) {
            bond_cell_1 = {"x":x, "y":y}
        } else if (bond_cell_1["x"] != x || bond_cell_1["y"] != y) {
            let bond = get_bond_index(bond_cell_1["x"], bond_cell_1["y"], x, y);
            let x1 = bond[0];
            let y1 = bond[1];
            let x2 = bond[2];
            let y2 = bond[3];
            garage_design_bond_weights[y1][x1][x2 + "_" + y2] = [x2, y2, 0, 0];
            console.log(x1+", "+y1+", "+x2+", "+y2+", ")

            let svg_xy_cell1 = xy_to_svg_xy(x1, y1);
            let svg_xy_cell2 = xy_to_svg_xy(x2, y2);
            //garage_design_bond_weights[bond_cell_1["y"]][bond_cell_1["x"]][x + "_" + y] = [x, y, 0, 0];
            //garage_design_bond_weights[y][x][bond_cell_1["x"] + "_" + bond_cell_1["y"]] = [bond_cell_1["x"], bond_cell_1["y"], 0];

            document.getElementById("garage_svg").innerHTML += `<line id="`+x1+`_`+y1+`_`+x2+`_`+y2+`" x1="`+svg_xy_cell1[0]+`" y1="`+svg_xy_cell1[1]+`" x2="`+svg_xy_cell2[0]+`" y2="`+svg_xy_cell2[1]+`" style="stroke:rgb(10,10,10);stroke-width:4" class="bond_svg" oncontextmenu="edit_bond_weights(`+x1+`, `+y1+`, `+x2+`, `+y2+`)" onclick="left_click_bond(`+x1+`, `+y1+`, `+x2+`, `+y2+`)"/>`
            bond_cell_1 = {"x":-1, "y":-1}
        } else {
            console.log("bond must connect 2 different cells");
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
                attribute_inputs.innerHTML += `<input id="attribute_input_`+attribute_index+`" type="button" value="" onclick="select_bond(`+attribute_index+`)"/>`;
            } else if (attribute["type"] == "schematic") {
                attribute_inputs.innerHTML += `<input id="attribute_input_`+attribute_index+`" type="button"/>`;
            } else if (attribute["type"] == "number") {
                attribute_inputs.innerHTML += `<input id="attribute_input_`+attribute_index+`" type="number"/>`;
            }
        }
        document.getElementById("attribute_inputs_popup").hidden = false;
    }
}

function select_bond(attribute_index) {
    document.getElementById("part_row_"+selection["index"]).style.backgroundColor = "";
    selection = {"type": "none", "part": available_parts[0], "index": attribute_index}
}

function edit_bond_weights(x1, y1, x2, y2) {
    let attribute_inputs = document.getElementById("attribute_inputs");
    attribute_inputs.innerHTML = ``;
    attribute_inputs.part_x = -1;
    attribute_inputs.part_y = -1;
    attribute_inputs.bond_x1 = x1;
    attribute_inputs.bond_y1 = y1;
    attribute_inputs.bond_x2 = x2;
    attribute_inputs.bond_y2 = y2;
    let attributes = [{"name":"weight_1", "type":"number"}, {"name":"weight_2", "type":"number"}]
    for (let attribute_index = 0; attribute_index < attributes.length; attribute_index++) {
        let attribute = attributes[attribute_index];
        attribute_inputs.innerHTML += `<div>`+attribute["name"]+`</div>`;
        attribute_inputs.innerHTML += `<input id="attribute_input_`+attribute_index+`" type="number"/>`;
    }
    document.getElementById("attribute_inputs_popup").hidden = false;
}

function save_change_to_particle_attributes() {
    let attribute_inputs = document.getElementById("attribute_inputs");
    let x = attribute_inputs.part_x;
    let y = attribute_inputs.part_y;
    if (x != -1) {//-1 indecates that this attribute is for a bond
        let part = garage_design[y][x];
        let part_attributes = garage_design_attributes[y][x];
        if (part != null && part_attributes != null) {
            for (let attribute_index = 0; attribute_index < part.part_attributes.length; attribute_index++) {
                part_attributes[attribute_index] = document.getElementById("attribute_input_"+attribute_index).value;
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
    } else {
        x1 = attribute_inputs.bond_x1;
        y1 = attribute_inputs.bond_y1;
        x2 = attribute_inputs.bond_x2;
        y2 = attribute_inputs.bond_y2;
        garage_design_bond_weights[y1][x1][x2 + "_" + y2][2] = document.getElementById("attribute_input_"+0).value;
        garage_design_bond_weights[y1][x1][x2 + "_" + y2][3] = document.getElementById("attribute_input_"+1).value;
        document.getElementById(x1+"_"+y1+"_"+x2+"_"+y2).style.stroke = "green";
        console.log("this will save the weights");
    }
    document.getElementById("attribute_inputs_popup").hidden = true;
}

let saved_designs = [];

function open_schematics_menu() {
    document.getElementById("schematics_popup").hidden = false;
}

function add_row(){
    let new_schematics = null;
    saved_schematics.push(new_schematics);

    let new_design = {"garage_design":null, "garage_design_attributes":null, "saved_designs":null, "design_name":""}
    saved_designs.push(new_design);

    let new_index = saved_designs.length - 1;
    document.getElementById("schematics_table").innerHTML += `
        <td><input id="schematic_name_input_`+new_index+`" type="text" value="new name"/></td>
        <td><div class="button schematics_table_button" onclick="save_schematics(`+new_index+`)">save</div></td>
        <td><div class="button schematics_table_button" onclick="save_schematics(`+new_index+`)">save</div></td>
        <td><div class="button schematics_table_button" onclick="build_schematic_at_index(`+new_index+`)">build</div></td>`;
}

function build_schematic_at_index(schematic_index) {
    saved_schematics[schematic_index].build_schematic();
    closeAllWindows();
}

function save_schematics(schematic_index) {
    // loops through the data created from the garage, then creates a schematic based on that and finally adds it to the schematics list.
    let garage_schematic_cells = make_null_list(garage_design.length, garage_design[0].length);
    for (let y = 0; y < garage_design.length; y++) {
        for (let x = 0; x < garage_design[y].length; x++) {
            let part = garage_design[y][x];
            let part_attributes = garage_design_attributes[y][x];
            if (part != null) {
                garage_schematic_cells[y][x] = available_parts_functions[part.part_name](part_attributes);
            } else {
                garage_schematic_cells[y][x] = null;
            }
        }
    }
    let new_schematics = new Schematic(garage_schematic_cells, garage_design_bond_weights, bond_material_1, [0, 0], "new_schematic");
    saved_schematics[schematic_index] = new_schematics//does this create a memory leak? it won't be a bad one anyway.
    let new_name = saved_designs[schematic_index]["design_name"];
    if (document.getElementById("schematic_name_input_"+schematic_index) != null) {
        new_name = document.getElementById("schematic_name_input_"+schematic_index).value;
    }
    let new_design = {"garage_design":garage_design, "garage_design_attributes":garage_design_attributes, "garage_design_bond_weights":garage_design_bond_weights, "design_name": new_name}
    saved_designs[schematic_index] = new_design;
    refresh_schematics_table();
}

function refresh_schematics_table() {
    let schematics_table = document.getElementById("schematics_table");
    schematics_table.innerHTML = 
    `<tr>
        <td>Schematics Name</td>
        <td>Save</td>
        <td>Load</td>
        <td>Build</td>
    </tr>`;
    for (let design_index = 0; design_index < saved_designs.length; design_index++) {
        schematics_table.innerHTML += `<td>`+saved_designs[design_index]["design_name"]+`</td>
        <td><div class="button schematics_table_button" onclick="save_schematics(`+design_index+`)">save</div></td>
        <td><div class="button schematics_table_button" onclick="save_schematics(`+design_index+`)">save</div></td>
        <td><div class="button schematics_table_button" onclick="build_schematic_at_index(`+design_index+`)">build</div></td>`;
    }
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

function close_schematic_window() {
    document.getElementById("schematics_popup").hidden = true;
}

function update_dashboard() {
    document.getElementById("credits").innerHTML = "Credits: " + credits;
}
function closeAllWindows(){
    document.getElementById("settings").hidden = true;
    document.getElementById("shop").hidden = true;
    document.getElementById("select").hidden = true;
    document.getElementById("attribute_inputs_popup").hidden = true;
    document.getElementById("schematics_popup").hidden = true;
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
        "progress":{"credits": credits, "available_parts": available_parts, "saved_designs":saved_designs}
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
        saved_designs = progress["saved_designs"];

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