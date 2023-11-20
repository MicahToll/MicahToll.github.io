function set_up_level3() {
    let design1 = {"garage_design":[[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,{"part_name":"basic part","cost":5,"icon_path":"../KirbyBulletHell/assets/bullets/kirby_bullet.png","part_attributes":[],"number_owned":5,"number_available":1},{"part_name":"basic part","cost":5,"icon_path":"../KirbyBulletHell/assets/bullets/kirby_bullet.png","part_attributes":[],"number_owned":5,"number_available":1},null,null],[null,null,null,null,null,null,null,null,{"part_name":"key board input","cost":15,"icon_path":"../KirbyBulletHell/assets/bullets/kirby_bullet_lightblue.png","part_attributes":[{"name":"key","type":"key","default_value":"w"}],"number_owned":5,"number_available":0},{"part_name":"propulsor","cost":25,"icon_path":"../KirbyBulletHell/assets/bullets/kirby_bullet_orange.png","part_attributes":[{"name":"anchor_bond_index","type":"bond","default_value":[0,0]}],"number_owned":5,"number_available":2},{"part_name":"key board input","cost":15,"icon_path":"../KirbyBulletHell/assets/bullets/kirby_bullet_lightblue.png","part_attributes":[{"name":"key","type":"key","default_value":"w"}],"number_owned":5,"number_available":0},null],[null,null,null,null,null,null,null,null,{"part_name":"basic part","cost":5,"icon_path":"../KirbyBulletHell/assets/bullets/kirby_bullet.png","part_attributes":[],"number_owned":5,"number_available":1},{"part_name":"propulsor","cost":25,"icon_path":"../KirbyBulletHell/assets/bullets/kirby_bullet_orange.png","part_attributes":[{"name":"anchor_bond_index","type":"bond","default_value":[0,0]}],"number_owned":5,"number_available":2},{"part_name":"propulsor","cost":25,"icon_path":"../KirbyBulletHell/assets/bullets/kirby_bullet_orange.png","part_attributes":[{"name":"anchor_bond_index","type":"bond","default_value":[0,0]}],"number_owned":5,"number_available":2},{"part_name":"basic part","cost":5,"icon_path":"../KirbyBulletHell/assets/bullets/kirby_bullet.png","part_attributes":[],"number_owned":5,"number_available":1}],[null,null,null,null,null,null,null,null,null,{"part_name":"key board input","cost":15,"icon_path":"../KirbyBulletHell/assets/bullets/kirby_bullet_lightblue.png","part_attributes":[{"name":"key","type":"key","default_value":"w"}],"number_owned":5,"number_available":0},{"part_name":"key board input","cost":15,"icon_path":"../KirbyBulletHell/assets/bullets/kirby_bullet_lightblue.png","part_attributes":[{"name":"key","type":"key","default_value":"w"}],"number_owned":5,"number_available":0},{"part_name":"key board input","cost":15,"icon_path":"../KirbyBulletHell/assets/bullets/kirby_bullet_lightblue.png","part_attributes":[{"name":"key","type":"key","default_value":"w"}],"number_owned":5,"number_available":0}]],"garage_design_attributes":[[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,[],[],null,null],[null,null,null,null,null,null,null,null,["w"],[[0,0]],["w"],null],[null,null,null,null,null,null,null,null,[],[[0,0]],[[0,0]],[]],[null,null,null,null,null,null,null,null,null,["w"],["w"],["w"]]],"garage_design_bond_weights":[[{},{},{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{"8_9":[8,9,0,0],"9_8":[9,8,0,0]},{"10_9":[10,9,0,0]},{},{}],[{},{},{},{},{},{},{},{},{"8_10":[8,10,0,0]},{"10_10":[10,10,0,0],"9_10":[9,10,0,0]},{"11_10":[11,10,0,0]},{}],[{},{},{},{},{},{},{},{},{"9_11":[9,11,0,0]},{"10_10":[10,10,0,0]},{},{"11_11":[11,11,0,0]}],[{},{},{},{},{},{},{},{},{},{"10_11":[10,11,0,0]},{"11_11":[11,11,0,0]},{}]],"design_name":"doughnut"}
    /*{
        "garage_design":[[null,null,null,null,null,null,null,null,null,null,null,null],[null,{"part_name":"basic part","cost":5,"icon_path":"../KirbyBulletHell/assets/bullets/kirby_bullet.png","part_attributes":[],"number_owned":5,"number_available":2},null,null,null,null,null,null,null,null,null,null],[null,{"part_name":"basic part","cost":5,"icon_path":"../KirbyBulletHell/assets/bullets/kirby_bullet.png","part_attributes":[],"number_owned":5,"number_available":2},{"part_name":"basic part","cost":5,"icon_path":"../KirbyBulletHell/assets/bullets/kirby_bullet.png","part_attributes":[],"number_owned":5,"number_available":2},null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null]],
        "garage_design_attributes":[[null,null,null,null,null,null,null,null,null,null,null,null],[null,[],null,null,null,null,null,null,null,null,null,null],[null,[],[],null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null]],
        "garage_design_bond_weights":[[{},{},{},{},{},{},{},{},{},{},{},{}],[{},{"1_2":[1,2,0,0],"2_2":[2,2,0,0]},{},{},{},{},{},{},{},{},{},{}],[{},{"2_2":[2,2,0,0]},{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{},{},{}]],
        "design_name":"bob"
    }*/
    
    /*let schematic1 = design_to_schematics(design1);
    schematic1.build_schematic();*/

    let design2 = {"garage_design":[[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,{"part_name":"key board input","cost":15,"icon_path":"../KirbyBulletHell/assets/bullets/kirby_bullet_lightblue.png","part_attributes":[{"name":"key","type":"key","default_value":"w"}],"number_owned":5,"number_available":2},{"part_name":"generator","cost":5,"icon_path":"../KirbyBulletHell/assets/bullets/kirby_bullet.png","part_attributes":[],"number_owned":5,"number_available":4},null,null,null,null,null,null,null,null,null],[null,{"part_name":"key board input","cost":15,"icon_path":"../KirbyBulletHell/assets/bullets/kirby_bullet_lightblue.png","part_attributes":[{"name":"key","type":"key","default_value":"w"}],"number_owned":5,"number_available":2},{"part_name":"basic player part","cost":25,"icon_path":"../KirbyBulletHell/assets/kirby.png","part_attributes":[],"number_owned":1,"number_available":0},{"part_name":"key board input","cost":15,"icon_path":"../KirbyBulletHell/assets/bullets/kirby_bullet_lightblue.png","part_attributes":[{"name":"key","type":"key","default_value":"w"}],"number_owned":5,"number_available":2},null,null,null,null,null,null,null,null],[null,{"part_name":"propulsor","cost":25,"icon_path":"../KirbyBulletHell/assets/bullets/kirby_bullet_orange.png","part_attributes":[{"name":"anchor_bond_index","type":"bond","default_value":[0,0]}],"number_owned":5,"number_available":1},{"part_name":"propulsor","cost":25,"icon_path":"../KirbyBulletHell/assets/bullets/kirby_bullet_orange.png","part_attributes":[{"name":"anchor_bond_index","type":"bond","default_value":[0,0]}],"number_owned":5,"number_available":1},{"part_name":"propulsor","cost":25,"icon_path":"../KirbyBulletHell/assets/bullets/kirby_bullet_orange.png","part_attributes":[{"name":"anchor_bond_index","type":"bond","default_value":[0,0]}],"number_owned":5,"number_available":1},{"part_name":"propulsor","cost":25,"icon_path":"../KirbyBulletHell/assets/bullets/kirby_bullet_orange.png","part_attributes":[{"name":"anchor_bond_index","type":"bond","default_value":[0,0]}],"number_owned":5,"number_available":1},null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null]],"garage_design_attributes":[[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,["w"],[],null,null,null,null,null,null,null,null,null],[null,["d"],[],["a"],null,null,null,null,null,null,null,null],[null,["1, 4_1, 5"],["2, 4_2, 5"],["2, 4_3, 5"],["3, 4_4, 5"],null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null]],"garage_design_bond_weights":[[{},{},{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{},{},{}],[{},{"2_4":[2,4,"0","2"],"2_3":[2,3,0,0],"1_4":[1,4,0,0]},{"3_4":[3,4,0,0],"2_4":[2,4,0,0]},{},{},{},{},{},{},{},{},{}],[{},{"1_5":[1,5,"0","2"],"2_5":[2,5,0,0],"2_4":[2,4,0,0]},{"2_5":[2,5,"0","2"],"3_5":[3,5,"0","2"],"3_4":[3,4,0,0]},{"4_5":[4,5,"0","2"],"3_5":[3,5,0,0]},{},{},{},{},{},{},{},{}],[{},{"2_5":[2,5,0,0]},{"3_5":[3,5,0,0]},{"4_5":[4,5,0,0]},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{},{},{}]],"design_name":"space ship"}
    let schematic2 = design_to_schematics(design2);
    schematic2.build_schematic();

/*
    let design3 = {"garage_design":[[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,{"part_name":"basic part","cost":5,"icon_path":"../KirbyBulletHell/assets/bullets/kirby_bullet.png","part_attributes":[],"number_owned":5,"number_available":3},{"part_name":"basic part","cost":5,"icon_path":"../KirbyBulletHell/assets/bullets/kirby_bullet.png","part_attributes":[],"number_owned":5,"number_available":3},null,null,null,null,null,null],[null,null,null,null,{"part_name":"propulsor","cost":25,"icon_path":"../KirbyBulletHell/assets/bullets/kirby_bullet_orange.png","part_attributes":[{"name":"anchor_bond_index","type":"bond","default_value":[0,0]}],"number_owned":5,"number_available":1},{"part_name":"player sensor","cost":30,"icon_path":"../KirbyBulletHell/assets/bullets/kirby_bullet_lightblue.png","part_attributes":[{"name":"anchor_bond_index","type":"bond","default_value":[0,0]}],"number_owned":1,"number_available":0},{"part_name":"propulsor","cost":25,"icon_path":"../KirbyBulletHell/assets/bullets/kirby_bullet_orange.png","part_attributes":[{"name":"anchor_bond_index","type":"bond","default_value":[0,0]}],"number_owned":5,"number_available":1},null,null,null,null,null],[null,null,null,null,null,{"part_name":"propulsor","cost":25,"icon_path":"../KirbyBulletHell/assets/bullets/kirby_bullet_orange.png","part_attributes":[{"name":"anchor_bond_index","type":"bond","default_value":[0,0]}],"number_owned":5,"number_available":1},{"part_name":"propulsor","cost":25,"icon_path":"../KirbyBulletHell/assets/bullets/kirby_bullet_orange.png","part_attributes":[{"name":"anchor_bond_index","type":"bond","default_value":[0,0]}],"number_owned":5,"number_available":1},null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null]],"garage_design_attributes":[[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,[],[],null,null,null,null,null,null],[null,null,null,null,["4, 1_4, 2"],["5, 2_6, 2"],["5, 1_6, 2"],null,null,null,null,null],[null,null,null,null,null,["4, 2_5, 3"],["6, 2_6, 3"],null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null]],"garage_design_bond_weights":[[{},{},{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{"4_2":[4,2,0,0],"5_1":[5,1,0,0],"5_2":[5,2,0,0]},{"6_2":[6,2,0,0],"5_2":[5,2,0,0]},{},{},{},{},{},{}],[{},{},{},{},{"5_3":[5,3,0,0],"5_2":[5,2,"1.5","1.5"]},{"5_3":[5,3,"","3"],"6_3":[6,3,"","-3"],"6_2":[6,2,"","-1.5"]},{"6_3":[6,3,0,0]},{},{},{},{},{}],[{},{},{},{},{},{"6_3":[6,3,0,0]},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{},{},{}]],"design_name":"new name"}
    let schematic3 = design_to_schematics(design3);
    schematic3.build_schematic();

    let design5 = {"garage_design":[[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,{"part_name":"key board input","cost":15,"icon_path":"../KirbyBulletHell/assets/bullets/kirby_bullet_lightblue.png","part_attributes":[{"name":"key","type":"key","default_value":"w"}],"number_owned":5,"number_available":4},null,null,null,null,null,null,null,null,null,null],[null,{"part_name":"explosive","cost":25,"icon_path":"images/bomb_cell.png","part_attributes":[{"name":"explostion_radius","type":"number","default_value":0.5},{"name":"fragments","type":"number","default_value":4}],"number_owned":5,"number_available":4},null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null]],"garage_design_attributes":[[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,["w"],null,null,null,null,null,null,null,null,null,null],[null,[0.5,4],null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null]],"garage_design_bond_weights":[[{},{},{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{},{},{}],[{},{"1_7":[1,7,"","2"]},{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{},{},{}]],"design_name":"new name"}
    let schematic5 = design_to_schematics(design5);
    schematic5.build_schematic();
    */
}

function design_to_schematics(design) {//mostly a copy of save schematics. probably should combine.
    let local_garage_design = design["garage_design"];
    let local_garage_design_attributes = design["garage_design_attributes"];
    // loops through the data created from the garage, then creates a schematic based on that and finally adds it to the schematics list.
    let garage_schematic_cells = make_null_list(local_garage_design.length, local_garage_design[0].length);
    for (let y = 0; y < local_garage_design.length; y++) {
        for (let x = 0; x < local_garage_design[y].length; x++) {
            let part = local_garage_design[y][x];
            let part_attributes = local_garage_design_attributes[y][x];
            if (part != null) {
                garage_schematic_cells[y][x] = available_parts_functions[part.part_name](part_attributes);
            } else {
                garage_schematic_cells[y][x] = null;
            }
        }
    }
    let new_schematics = new Schematic(garage_schematic_cells, design["garage_design_bond_weights"], bond_material_1, standard_origin, design["design_name"]);
    return new_schematics;
}