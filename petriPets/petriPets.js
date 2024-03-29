//define ambiant sound
let music_names = ["Artemis", "Cirrus", "Decoherence", "Effervescence", "Golden Hour", "Hymn To The Dawn", "Moonlight", "Permafrost", "Phase Shift", "Aurora", "In Search Of Solitude"];
let audio = [];

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffle_array(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

//keyboard variables, 
class Key {
    constructor() {
        this.value = false;
    }
}
let w_key = new Key();
let a_key = new Key();
let s_key = new Key();
let d_key = new Key();
let q_key = new Key();
let e_key = new Key();
let space_key = new Key();

function keyDown(){
	//console.log(event.keyCode);
	switch(event.keyCode) {
		case 87:
			w_key.value = true;
			break;
		case 65:
			a_key.value = true;
			break;
		case 83:
			s_key.value = true;
			break;
		case 68:
			d_key.value = true;
			break;
		case 81:
			q_key.value = true;
			break;
		case 69:
			e_key.value = true;
			break;
		case 32:
			space_key.value = true;
			break;
		//default:
			//console.log(event.keyCode);
			//no default required for this
	}
}

function keyUp(){
	//console.log(event.keyCode);
	switch(event.keyCode) {
		case 87:
			w_key.value = false;
			break;
		case 65:
			a_key.value = false;
			break;
		case 83:
			s_key.value = false;
			break;
		case 68:
			d_key.value = false;
			break;
		case 81:
			q_key.value = false;
			break;
		case 69:
			e_key.value = false;
			break;
		case 32:
			space_key.value = false;
			break;
		//default:
			//no default required for this
	}
}

//controls handler
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
document.addEventListener("wheel", wheel);

let zoom = 0;
let max_camera_height = 500;

function wheel(){
    zoom = Math.max(20, Math.min( zoom+event.deltaY/25, max_camera_height ));//not sure why this has to be negative
    camera.position.setZ(zoom);
}

//setting up three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, .1, 1000);
let camera_height = 100;

const renderer = new THREE.WebGLRenderer({ antialias: true });//to add anti aliasing, sdd { antialias: true } to the parameter
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );//document.getElementById("body").appendChild( renderer.domElement );

//everything in the universe's reference frame should be added to this group
let universe = new THREE.Group();//the size should be approximately equal to the size of the solar system i think (which is 15,000 lsecond radius), on second thought, lets aim for closer to 1,500
let background = new THREE.Group();
universe.add(background);

//add atuff to the scene
scene.add( universe );

let energy_storage_cell_path = 'images/energy_storage_cell.png'
let eye_cell_path = 'images/eye_cell.png'
let generator_cell_path = 'images/generator_cell.png'
let pulse_cell_path = 'images/pulse_cell.png'
let toggle_cell_path = 'images/toggle_cell.png'
let bomb_cell_path = 'images/bomb_cell.png'
let shrapnel_cell_path = 'images/shrapnel_cell.png'
let shield_cell_path = 'images/shield_cell.png'
let sticky_cell_path = 'images/sticky_cell.png'
let absorber_cell_path = 'images/absorber_cell.png'
let kirby_path = '../KirbyBulletHell/assets/kirby.png';
let kirby_bullet_path = '../KirbyBulletHell/assets/bullets/kirby_bullet.png';
let kirby_bullet_orange_path = '../KirbyBulletHell/assets/bullets/kirby_bullet_orange.png';
let kirby_bullet_lightblue_path = '../KirbyBulletHell/assets/bullets/kirby_bullet_lightblue.png';
let gordo_path = '../KirbyBulletHell/assets/enemies/gordo.png';
let fixed_cell_path = 'images/fixed_cell.png'
let photon_path = 'images/photon.png'
let bubble_path = 'images/bubble.png'
let rocks_path= 'images/rocks.png'
let photon_map = new THREE.TextureLoader().load( photon_path );
const bomb_cell_material = new THREE.SpriteMaterial( { map: new THREE.TextureLoader().load( bomb_cell_path ) } );
const shrapnel_cell_material = new THREE.SpriteMaterial( { map: new THREE.TextureLoader().load( shrapnel_cell_path ) } );
const shield_cell_material = new THREE.SpriteMaterial( { map: new THREE.TextureLoader().load( shield_cell_path ) } );
const sticky_cell_material = new THREE.SpriteMaterial( { map: new THREE.TextureLoader().load( sticky_cell_path ) } );
const energy_storage_cell_material = new THREE.SpriteMaterial( { map: new THREE.TextureLoader().load( energy_storage_cell_path ) } );
const eye_cell_material = new THREE.SpriteMaterial( { map: new THREE.TextureLoader().load( eye_cell_path ) } );
const generator_cell_material = new THREE.SpriteMaterial( { map: new THREE.TextureLoader().load( generator_cell_path ) } );
const pulse_cell_material = new THREE.SpriteMaterial( { map: new THREE.TextureLoader().load( pulse_cell_path ) } );
const toggle_cell_material = new THREE.SpriteMaterial( { map: new THREE.TextureLoader().load( toggle_cell_path ) } );
const absorber_cell_material = new THREE.SpriteMaterial( { map: new THREE.TextureLoader().load( absorber_cell_path ) } );
const kirby_material = new THREE.SpriteMaterial( { map: new THREE.TextureLoader().load( kirby_path ) } );
const kirby_bullet_material = new THREE.SpriteMaterial( { map: new THREE.TextureLoader().load( kirby_bullet_path ) } );
const kirby_bullet_orange_material = new THREE.SpriteMaterial( { map: new THREE.TextureLoader().load( kirby_bullet_orange_path ) } );
const kirby_bullet_lightblue_material = new THREE.SpriteMaterial( { map: new THREE.TextureLoader().load( kirby_bullet_lightblue_path ) } );
const gordo_material = new THREE.SpriteMaterial( { map: new THREE.TextureLoader().load( gordo_path ) } );
const fixed_cell_material = new THREE.SpriteMaterial( { map: new THREE.TextureLoader().load( fixed_cell_path ) } );
const photon_material = new THREE.SpriteMaterial( { map: photon_map } );
const bubble_material = new THREE.SpriteMaterial( { map: new THREE.TextureLoader().load( bubble_path ) } );
const rocks_material = new THREE.SpriteMaterial( { map: new THREE.TextureLoader().load( rocks_path ) } );

//bond material
const bond_material_1 = new THREE.LineBasicMaterial( { color: 0x0000ff } );
const bond_material_2 = new THREE.LineBasicMaterial( { color: 0x00ff00 } );

let universe_grid_width = 15;
let universe_grid_height = 15;
let universe_grid = [];
let cells_to_be_moved = [];

let window_width;
let window_height;
let background_things = [];
let creatures = [];
let cells = [];
let bonds = [];
let photons = [];
let bubbles = [];
let friction = .1;
let base_friction = .1;
let radius = 5;
let universe_grid_space_diameter = 2*radius;
let universe_radius = universe_grid_space_diameter * Math.max(universe_grid_height, universe_grid_width)/2;
let c_squared = 1;
let bond_resistivity = 1/radius;//resistance per unit length (1 ohm / 5 meter)
let off_color = new THREE.Color(0xAAAAAA);
let on_color = new THREE.Color(0xFFFFFF);

let x_basis = new THREE.Vector3(radius, 0 ,0);
let y_basis = new THREE.Vector3(radius/2, radius*Math.sqrt(3)/2 ,0);
let z_axis = new THREE.Vector3(0, 0, 1);
//let logistic_k = 4;//add this to change slope of activation function to 1 at x = x_0

function init() {
    camera.position.setZ( (camera_height/2)/(Math.tan((Math.PI/4)/2)) );
    zoom = camera.position.z;
    camera.lookAt(0, 0, 0);
    //document.body.addEventListener("mousemove", updatePlayer, false);
    //document.body.addEventListener("mousedown", mousedown, false);
    //document.body.addEventListener("mouseup", mouseup, false);

    window_width = window.innerWidth;
    window_height = window.innerHeight;
    camera_width = camera_height*window_width/window_height

    for (let x = 0; x < universe_grid_width; x++) {
        universe_grid.push([])
        for (let y = 0; y < universe_grid_height; y++) {
            if (y == Math.ceil(universe_grid_height*2/3) && !( x == Math.ceil(universe_grid_width/2) || x == Math.ceil(universe_grid_width/2)+1 ) ) {
                universe_grid[x].push( new Rocky_Grid_Space( x, y ) );
            } else {
                universe_grid[x].push( new Grid_Space( x, y ) );
            }
        }
    }
    
    shuffle_array(music_names);//randomizes array for random playback order
    for (let name of music_names) {
        audio.push(document.getElementById(name));
    }

    menu_onload();

    set_up_level1()
    set_up_level2();
    set_up_level3()
    gameloop(0);
}

let repel_dist_vector = new THREE.Vector3(0, 0, 0);

function start_game() {
    document.getElementById("start_game").hidden = true;
    set_volume();
    start_music(0);
}

function set_volume() {
    let volume = document.getElementById("sound").value;
    for (let song of audio) {
        song.volume = volume;
    }
}

function start_music(audio_index) {
    audio[audio_index].play()
    document.getElementById("now_playing").innerHTML = "now playing '" + music_names[audio_index] + "' by Scott Buckley"
    document.getElementById("now_playing").style.visibility = "visible";
    setTimeout( start_music, Math.ceil(audio[audio_index].duration*1000), (audio_index+1)%audio.length);
}

let last_timestamp = 0;
let frame_number = 0;
//let time = 0;
function gameloop(timestamp) {
    frame_number++;
    if (frame_number%60 == 0) {
        document.getElementById("fps_display").innerHTML = "fps: " + Math.trunc(60/(timestamp-last_timestamp)*1000);
        last_timestamp = timestamp;
    }
    //time = timestamp;

    if (frame_number%4 == 0) {
        //(2*Math.random()-1)*universe_radius
        //create_photon(new THREE.Vector3((2*Math.random()-1)*universe_radius/2, universe_radius/2, 0), new THREE.Vector3(0, -1, 0), 45);
    }

    //update background
    for (let thing of background_things){
        thing.update();
    }

    /*for (let photon of photons){
        photon.update_photon();
    }*/
    for (let i = photons.length-1; i > 0-1; i--) {
        let photon = photons[i];
        photon.update_photon(i);
    }

    for (let i = bubbles.length-1; i > 0-1; i--) {
        let bubble = bubbles[i];
        bubble.update_bubble_position(i);
    }

    for (let i = bonds.length-1; i > 0-1; i--) {
        let bond = bonds[i];
        //console.log(i);
        bond.update_tensions(i);
        bond.update_outputs();
        bond.update_energy();
    }

    for (let x = 1; x < universe_grid.length-1; x++) {
        for (let y = 1; y < universe_grid[x].length-1; y++) {//not checking grid spaces on top/bot/sides for simplicity. best to keep these ones empty or nigh empty.
            let focused_grid = universe_grid[x][y];
            let neightbor_grid_spaces = focused_grid.get_half_grid_spaces_in_neighborhood();
            for (let i = 0; i < focused_grid.cells.length; i++) {//for each cell in each gridspace
                let cell_1 = focused_grid.cells[i];
                //cell_1.check_boundary_force();//moved to later so that edges aren't skipped
                cell_1.update_cell();
                cell_1.update_outputs();
                cell_1.update_energy_voltage();
                for (let j = i+1; j < focused_grid.cells.length; j++) {//the unchecked remaining cells in focused gridspace
                    let cell_2 = focused_grid.cells[j];
                    repel_dist_vector.subVectors(cell_2.position_vector, cell_1.position_vector);
                    cell_1.repel_cell(cell_2, repel_dist_vector);
                }
                for (let grid_space of neightbor_grid_spaces) {//for half of the surrounding spaces
                    for (let cell_2 of grid_space.cells) {//for each cell in those spaces
                        repel_dist_vector.subVectors(cell_2.position_vector, cell_1.position_vector);
                        cell_1.repel_cell(cell_2, repel_dist_vector);
                    }
                }
            }
        }
    }
    /*for (let i = 0; i < cells.length; i++) {
        let cell_1 = cells[i];
        cell_1.check_boundary_force();
        cell_1.update_cell();
        cell_1.update_outputs();
        cell_1.update_energy_voltage();
        for (let j = i+1; j < cells.length; j++) {
            let cell_2 = cells[j];
            repel_dist_vector.subVectors(cell_2.position_vector, cell_1.position_vector);
            cell_1.repel_cell(cell_2, repel_dist_vector);
        }
    }*/

    for (let i = 0; i < cells.length; i++) {
        let cell = cells[i];
        //cell.check_boundary_force();//this is here so that it isn't skipped. I probably should change some things...
        cell.update_position();
    }
    for (let i = 0; i < bonds.length; i++) {
        let bond = bonds[i];
        bond.update_position();
    }
    for (let x = 0; x < universe_grid.length; x++) {
        for (let y = 0; y < universe_grid[x].length; y++) {
            let focused_grid = universe_grid[x][y];
            for (let i = focused_grid.cells.length-1; i > 0-1; i--) {//for each cell in each gridspace (in reverse order)
                let cell = focused_grid.cells[i];
                focused_grid.check_move_grid_space(cell, i);
            }
        }
    }
    for (let cell of cells_to_be_moved) {
        if (cell.grid_space == undefined) {
            test_cell = cell;
            console.log(cell);
        }
        cell.grid_space.cells.push(cell);
    }
    cells_to_be_moved = [];

    for (let x = 0; x < universe_grid.length-1; x++) {//skipping last col but not first
        for (let y = 0; y < universe_grid[x].length-1; y++) {//skipping last row but not first
            let focused_grid = universe_grid[x][y];
            focused_grid.update_velocity();
            focused_grid.update_water_voltage();
            if (focused_grid.is_edge) {
                focused_grid.do_edge_things();
            }
        }
    }

    renderer.render(scene,camera);
    window.requestAnimationFrame(gameloop);
}

/*
creature_cells structure:
[
    [cell,null,null,cell],
    [cell,null,null,cell],
    [cell,cell,cell,cell],
    [cell,null,cell,cell]
]
creature_cells[(-?)y][x]

bond_weights structure:
[
    [[[weight, x, y], [weight, x, y]],[],[],[] ],
    [[],[],[],[]],
    [[],[],[],[]],
    [[],[],[],[]]
]
2D array of dimensions of creature. Each spot contains an array of weights and where they point to.
this can add extra bonds potentially.



each spot here is a cell; for each of these spots, there is a set of its connections [[connection 1],[connection 2],[connection 3]]
each of these connections is formated like this: [weight, from_x, from_y]
sometimes these links do not exist yet, in which case, create it; othertimes, such a connection already exists, so just update it//this isn't done yet. only adjacent bonds are finished now; :(

additional_bonds structure:
[
    [from_x, from_y, from_weight, to_x, to_y, to_weight],
    [from_x, from_y, from_weight, to_x, to_y, to_weight],
    [from_x, from_y, from_weight, to_x, to_y, to_weight],
    [from_x, from_y, from_weight, to_x, to_y, to_weight],
    [from_x, from_y, from_weight, to_x, to_y, to_weight],
]
//thoughts for bond weights: each bond weight has a unique to and from:
so something like [y1][x1][y2][x2] = weight or 0 or null. this is by far the most straight forward.
however, it has us going through many many iterations.
additional bonds is formatted as desribed above. it is nice for placing but hard to edit later. (no way to search for specific bond)
bond_weights structure is a comprimise between the two. 
how bout a dictionary:
bond_weights[y][x]["tox_toy"] = [x, y, weight]


*/
/*let little_sigma = 1;
stefan_boltzmann_law(temp) {//returns power per unit area
    return little_sigma*temp**4;
}*/

/*function get_grid_space(x, y) {
    if (x >= 0 && y >= 0 && x < universe_grid_width && y < universe_grid_height) {
        return universe_grid[x][y];
    } else {
        return universe
    }
}
*/

let sanity_offset = universe_radius;
class Grid_Space {//before impelenting this, I can simulate about 630 before frame rate dropped below 60 (though the computer fans turned on)
    //after, fan turned on at 400, still going pretty strong at 2000. good sign.
    constructor(x_index, y_index, water_voltage = 0) {
        this.cells = [];
        this.x_coord = x_index;
        this.y_coord = y_index;
        if (x_index != 0) {
            this.x_min = universe_grid_space_diameter*x_index;
        } else {
            this.x_min = -2*universe_radius;//the edge cells extend to double radius
        }
        if (x_index != universe_grid_width-1) {
            this.x_max = universe_grid_space_diameter*(x_index+1);
        } else {
            this.x_max = 2*universe_radius;
        }
        if (y_index != 0) {
            this.y_min = universe_grid_space_diameter*y_index;
        } else {
            this.y_min = -2*universe_radius;
        }
        if (y_index != universe_grid_height-1) {
            this.y_max = universe_grid_space_diameter*(y_index+1);
        } else {
            this.y_max = 2*universe_radius;
        }
        //this.x_min = universe_grid_space_diameter*x_index;
        //this.x_max = universe_grid_space_diameter*(x_index+1);
        //this.y_min = universe_grid_space_diameter*y_index;
        //this.y_max = universe_grid_space_diameter*(y_index+1);

        this.water_voltage = water_voltage;
        //this.temperature = 0;//ignore for now
        this.force_vector = new THREE.Vector3(0, 0, 0);
        this.velocity_vector = new THREE.Vector3(0, 0, 0);
        this.mass = 1;
        this.friction_force = new THREE.Vector3(0, 0, 0);
        this.friction = .1;//resistance (velocity instead of I, water voltage instead of V)
        this.water_ohms = 1;//-- just that, water ohms. hight -> more resistance to (water) current
        /*this.current_up;
        this.current_down;
        this.current_left;
        this.current_right;*/
        if (this.x_coord == 0) {
            this.is_edge = true;
            this.const_water_voltage = 5;
            this.water_voltage = this.const_water_voltage;
            this.boundary_force_vector = new THREE.Vector3(1, 0, 0);
        } else if (this.x_coord == 1) {
            this.is_edge = true;
            this.const_water_voltage = null;
            this.boundary_force_vector = new THREE.Vector3(1, 0, 0);
        } else if (this.x_coord == universe_grid_width-2) {
            this.is_edge = true;
            this.const_water_voltage = -5;
            this.water_voltage = this.const_water_voltage;
            this.boundary_force_vector = new THREE.Vector3(-1, 0, 0);
        } else if (this.y_coord == 0) {
            this.is_edge = true;
            this.const_water_voltage = 5;
            this.water_voltage = this.const_water_voltage;
            this.boundary_force_vector = new THREE.Vector3(0, 1, 0);
        } else if (this.y_coord == 1) {
            this.is_edge = true;
            this.const_water_voltage = null;
            this.boundary_force_vector = new THREE.Vector3(0, 1, 0);
        } else if (this.y_coord == universe_grid_height-2) {
            this.is_edge = true;
            this.const_water_voltage = -5;
            this.water_voltage = this.const_water_voltage;
            this.boundary_force_vector = new THREE.Vector3(0, -1, 0);
        } else {
            this.is_edge = false;
        }
    }
    get_grid_spaces_in_neighborhood() {
        return [
            universe_grid[this.x_coord-1][this.y_coord-1],
            universe_grid[this.x_coord][this.y_coord-1],
            universe_grid[this.x_coord+1][this.y_coord-1],
            universe_grid[this.x_coord-1][this.y_coord],
            universe_grid[this.x_coord][this.y_coord],
            universe_grid[this.x_coord+1][this.y_coord],
            universe_grid[this.x_coord-1][this.y_coord+1],
            universe_grid[this.x_coord][this.y_coord+1],
            universe_grid[this.x_coord+1][this.y_coord+1]
        ]
    }
    get_half_grid_spaces_in_neighborhood() {
        return [
            universe_grid[this.x_coord+1][this.y_coord],
            universe_grid[this.x_coord-1][this.y_coord+1],
            universe_grid[this.x_coord][this.y_coord+1],
            universe_grid[this.x_coord+1][this.y_coord+1]
        ]
    }
    check_move_grid_space(cell, index) {//iterate backwards
        let cell_x = cell.position_vector.x + sanity_offset;
        let cell_y = cell.position_vector.y + sanity_offset;
        if (cell_x < this.x_min || cell_x > this.x_max) {
            let new_grid_x = Math.min(Math.max(0, Math.floor(cell_x/universe_grid_space_diameter)), universe_grid_width-1);//any cells outside radius get thrown into edges
            let new_grid_y = Math.min(Math.max(0, Math.floor(cell_y/universe_grid_space_diameter)), universe_grid_height-1);
            cell.set_cell_grid_space(universe_grid[new_grid_x][new_grid_y]);
            this.cells.splice(index, 1);
            cells_to_be_moved.push(cell);
            /*if (cell_y < this.y_min || cell_y > this.y_max) {
                let new_grid_y = Math.floor(cell_y/universe_grid_space_diameter);
            } else {
                let new_grid_y = cell.gridspace.y_coord;
            }*/
        } else if (cell_y < this.y_min || cell_y > this.y_max) {
            let new_grid_x = cell.grid_space.x_coord;
            let new_grid_y = Math.min(Math.max(0, Math.floor(cell_y/universe_grid_space_diameter)), universe_grid_height-1);
            cell.set_cell_grid_space(universe_grid[new_grid_x][new_grid_y]);
            this.cells.splice(index, 1);
            cells_to_be_moved.push(cell);
        }
    }
    remove_cell_from_cells(cell) {
        for (let cell_index = 0; cell_index < this.cells.length; cell_index++) {
            if (this.cells[cell_index] === cell) {
                this.cells.splice(cell_index, 1);
            }
        }
    }
    apply_friction_with_cell(cell) {
        this.friction_force.subVectors(cell.velocity_vector, this.velocity_vector);
        this.friction_force.multiplyScalar(this.friction);
        this.force_vector.add(this.friction_force);
        cell.force_vector.add(this.friction_force.negate());
    }
    update_velocity() {//and add friction and reset force
        let ohms_law_force_x = (this.water_voltage - universe_grid[this.x_coord+1][this.y_coord].water_voltage)/this.water_ohms;
        let ohms_law_force_y = (this.water_voltage - universe_grid[this.x_coord][this.y_coord+1].water_voltage)/this.water_ohms;
        this.force_vector.set(this.force_vector.x + ohms_law_force_x, this.force_vector.y + ohms_law_force_y, 0);
        this.force_vector.addScaledVector(this.velocity_vector, -base_friction);

        this.velocity_vector.addScaledVector(this.force_vector, (1/60)/this.mass);
        this.force_vector.set(0, 0, 0);
    }
    update_water_voltage() {
        this.water_voltage -= this.velocity_vector.x * (1/60);
        this.water_voltage -= this.velocity_vector.y * (1/60);
        universe_grid[this.x_coord+1][this.y_coord].water_voltage += this.velocity_vector.x * (1/60);
        universe_grid[this.x_coord][this.y_coord+1].water_voltage += this.velocity_vector.y * (1/60);
    }
    do_edge_things() {
        this.apply_boundary_force();
        if (this.const_water_voltage != null) {
            this.water_voltage = this.const_water_voltage;
        }
    }
    apply_boundary_force() {
        for (let cell of this.cells) {
            //let cell_x = cell.position_vector.x + sanity_offset;
            //let cell_y = cell.position_vector.y + sanity_offset;
            let boundary_force_magnitude = 500;
            cell.force_vector.addScaledVector(this.boundary_force_vector, boundary_force_magnitude);
            //let force_x = universe_grid_space_diameter / ( this.x_coord * universe_grid_space_diameter - cell_x ) - 1;
            //let force_y = universe_grid_space_diameter / ( this.y_coord * universe_grid_space_diameter - cell_y ) - 1;
        }
    }
}

class Rocky_Grid_Space extends Grid_Space {
    constructor(x_index, y_index, water_voltage = 0) {
        super(x_index, y_index, water_voltage);
        this.water_ohms = this.water_ohms*100;

        this.sprite = new THREE.Sprite(rocks_material);
        this.sprite.position.set( (this.x_max+this.x_min)/2-sanity_offset, (this.y_max+this.y_min)/2-sanity_offset, 0);
        this.sprite.scale.set( universe_grid_space_diameter, universe_grid_space_diameter, 0);
        universe.add(this.sprite);
        //add to list of rocky spaces?

        this.repel_dist_vector = new THREE.Vector3(0, 0, 0);
    }
    apply_friction_with_cell(cell) {
        /*console.log("hey")
        this.repel_dist_vector.subVectors(cell.position_vector, this.sprite.position);
        let dist = repel_dist_vector.length() - universe_grid_space_diameter/4;
        if (dist > 0 && true) {//asymptotes at 1/2 radius
            console.log("there1")
            if (dist < universe_grid_space_diameter/4) {
                console.log("there2");
                let force = 1000*cell.charge**2*(1-(dist/(universe_grid_space_diameter/4))**3)/(dist)**3;// this is actually force over dist (so that dist gets divided out)
                cell.force_vector.addScaledVector(repel_dist_vector, force);
            }
            else {
                console.log(dist/(universe_grid_space_diameter/2));
            }
            
        }*/

        super.apply_friction_with_cell(cell);
    }
}

class Schematic {//we are going to change this
    constructor(schematic_cells, bond_weights, bond_material, origin_point = [0, 0], schematic_name = "") {
        this.schematic_cells = schematic_cells;
        this.bond_weights = bond_weights;
        this.bond_material = bond_material;
        this.origin_point = origin_point;// in the form [x, y], indicates the coordinates of the builder cell is.
        this.schematic_name = schematic_name;
        this.energy_cost;
        this.calculate_energy_cost();
    }
    calculate_energy_cost() {
        this.energy_cost = 0;
        for (let cell_row of this.schematic_cells) {
            for (let cell of cell_row) {
                if (cell != null) {
                    this.energy_cost += cell.mass*c_squared + cell.energy;
                }
            }
        }
    }
    build_schematic(creature_position = new THREE.Vector3(0, 0, 0), creature_velocity = new THREE.Vector3(0, 0, 0), angle_change = 0, builder_cell =null ) {
        //instance of this
        let creature_cells = [];

        for (let y = 0; y < this.schematic_cells.length; y++) {
            creature_cells.push([]);
            for (let x = 0; x < this.schematic_cells[y].length; x++) {
                if (this.schematic_cells[y][x] != null) {
                    let current_cell = this.schematic_cells[y][x].clone_cell();//this now clones the cell and adds it to the creature cells array
                    creature_cells[y].push(current_cell);
                    current_cell.update_schematics(this, x, y);
                    //current_cell.position_vector.addScaledVector(x_basis, (x-this.origin_point[0])).addScaledVector(y_basis, -(y-this.origin_point[1])).add(creature_position);
                    current_cell.position_vector.addScaledVector(x_basis, (x-this.origin_point[0])).addScaledVector(y_basis, -(y-this.origin_point[1]));
                    current_cell.position_vector.applyAxisAngle(z_axis, angle_change);
                    //current_cell.position_vector.addScaledVector(x_basis, ()).addScaledVector(y_basis, -(-this.origin_point[1])).add(creature_position);
                    current_cell.position_vector.add(creature_position);
                    current_cell.velocity_vector.add(creature_velocity);
                    current_cell.add_cell_to_simulation();
                } else {
                    creature_cells[y].push(null);
                }
            }
        }
        for (let y = 0; y < creature_cells.length; y++) {
            for (let x = 0; x < creature_cells[y].length; x++) {
                let current_cell = creature_cells[y][x];
                if (current_cell == null && x == this.origin_point[0] && y == this.origin_point[1]) {
                    current_cell = builder_cell;
                }
                if (current_cell != null) {
                    for (let bond_key in this.bond_weights[y][x]) {
                        let bond = this.bond_weights[y][x][bond_key]
                        let x2 = bond[0];
                        let y2 = bond[1];
                        let weight_1 = bond[2];
                        let weight_2 = bond[3];
                        if (creature_cells[y2][x2] != null) {
                            let connecting_cell = creature_cells[y2][x2];
                            this.build_bond(current_cell, connecting_cell, weight_1, weight_2);
                        } else if ( builder_cell != null && (x2 == this.origin_point[0] && y2 == this.origin_point[1])) {
                            this.build_bond(current_cell, builder_cell, weight_1, weight_2);
                        }
                    }
                }
            }
        }
    }
    build_bond(current_cell, connecting_cell, weight_1, weight_2) {// returns the newly created bond
        let difference = current_cell.position_vector.distanceTo(connecting_cell.position_vector);
        let current_bond = new Bond(current_cell, connecting_cell, difference, this.bond_material, weight_1, weight_2);
        current_bond.add_bond_to_simulation();
        current_bond.check_directed_connection();
        return current_bond;
    }
}

class Cell {
    constructor(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0 = 0, energy_capacity, energy = 0, position_vector = new THREE.Vector3(0, 0, 0), velocity_vector = new THREE.Vector3(0, 0, 0)) {
        this.mass = mass;
        this.k = k;//currently, k changes both spring force and charge
        this.dampening = dampening;
        this.max_length = max_length;
        this.charge = charge;//currently unused
        this.position_vector = position_vector;
        this.velocity_vector = velocity_vector;
        this.force_vector = new THREE.Vector3(0, 0, 0);
        this.sprite_material = sprite_material.clone();//the clone is only needed for the directional cell, so this could be moved there... not sure if it is worth it though.
        this.sprite = new THREE.Sprite(sprite_material);
        this.sprite_diameter = sprite_diameter;
        this.sprite.scale.set(sprite_diameter, sprite_diameter, 1);
        this.sprite.position.copy(this.position_vector);
        this.cell_bonds = [];
        this.input_total = 0;
        this.output = 0;
        this.x_0 = x_0;

        this.cell_schematics = null;
        this.x_index = 0;
        this.y_index = 0;

        this.energy = energy;
        this.energy_capacity = energy_capacity;
        this.energy_equilibrium_offset = 0;//+ for wants to give energy, - for wants to take energy
        this.energy_voltage = 0;

        this.number_of_bonds = 0
    }
    add_cell_to_simulation() {
        universe.add(this.sprite);
        cells.push(this);
        this.sprite.position.copy(this.position_vector);
        this.set_cell_grid_space(this.find_grid_space_from_position());
        this.grid_space.cells.push(this);
    }
    find_grid_space_from_position() {
        return universe_grid[Math.min(Math.max(0, Math.floor((this.position_vector.x + sanity_offset)/universe_grid_space_diameter)), universe_grid_height-1)][Math.min(Math.max(0, Math.floor((this.position_vector.y + sanity_offset)/universe_grid_space_diameter)), universe_grid_height-1)];
    }
    set_cell_grid_space(grid_space) {
        this.grid_space = grid_space;
    }
    add_bond_to_cell(new_bond) {
        this.cell_bonds.push(new_bond);
        this.number_of_bonds = this.cell_bonds.length;
    }
    remove_bond_from_cell(bond_to_remove) {
        for (let cell_bond_index = 0; cell_bond_index < this.cell_bonds.length; cell_bond_index++) {
            if (bond_to_remove === this.cell_bonds[cell_bond_index]) {
                this.cell_bonds.splice(cell_bond_index, 1);
            }
        }
        this.number_of_bonds = this.cell_bonds.length;
        if (this.number_of_bonds == 0) {
            console.log("destined to be forever alone");
        }
    }
    update_schematics(cell_schematics, x_index = 0, y_index = 0) {//and index
        this.cell_schematics = cell_schematics;
        this.x_index = x_index;
        this.y_index = y_index;
    }
    update_position() {//and add friction and reset force
        //apply_friction_with_cell(cell)
        //this.force_vector.addScaledVector(this.velocity_vector, -friction);//old version. doesn't use current
        this.grid_space.apply_friction_with_cell(this);

        this.velocity_vector.addScaledVector(this.force_vector, 1/60/this.mass);
        this.position_vector.addScaledVector(this.velocity_vector, 1/60);
        
        this.sprite.position.copy(this.position_vector);
        this.force_vector.set(0, 0, 0);
    }
    repel_cell(cell_2, repel_dist_vector) {
        let dist = repel_dist_vector.length();
        if (dist != 0 && dist < radius) {
            //let force = this.k*this.charge*cell_2.charge/(dist/radius)**2/dist;//this adds charge, a currently unused stat
            let force = this.charge*cell_2.charge*(1-(dist/radius)**3)/(dist)**3;// this is actually force over dist (so that dist gets divided out)
            this.force_vector.addScaledVector(repel_dist_vector, -force);
            cell_2.force_vector.addScaledVector(repel_dist_vector, force);
        }
    }
    check_boundary_force() {
        let position_vector_length = this.position_vector.length()
        if (position_vector_length > universe_radius) {
            this.force_vector.addScaledVector(this.position_vector, -1*(universe_radius - position_vector_length)**2/position_vector_length);
        }
    }
    update_outputs() {
        if (this.input_total > this.x_0) {
            this.output = 1;
        }
        else {
            this.output = 0;
        }
        this.update_output_display()
        this.input_total = 0;
    }
    update_output_display() {
        if (this.output == 1) {
            this.sprite.scale.set(2*this.sprite_diameter, 2*this.sprite_diameter, 1);
            //this.sprite.material.color = on_color;
        }
        else {
            this.sprite.scale.set(this.sprite_diameter, this.sprite_diameter, 1);
            //this.sprite.material.color = off_color;
        }
    }
    update_energy_voltage() {
        this.energy_voltage = (this.energy+this.energy_equilibrium_offset)/this.energy_capacity;
        //this.sprite.scale.set((1+this.energy/this.energy_capacity)*this.sprite_diameter, (1+this.energy/this.energy_capacity)*this.sprite_diameter, 1);
    }
    update_cell(){}
    //initialize_cell(){}
    
    destroy_cell() {
        if (this.number_of_bonds != 0) {
            console.log("error: destroy cell only works when number of bonds is zero");
        }
        for (let cell_index = 0; cell_index < cells.length; cell_index++) {
            if (cells[cell_index] === this) {
                cells.splice(cell_index, 1);
            }
        }
        universe.remove(this.sprite);
        this.sprite_material.dispose();
        delete this.sprite_material;
        delete this.sprite;
        this.grid_space.remove_cell_from_cells(this);
    }
    clone_cell() {
        return new Cell(this.mass, this.k, this.dampening, this.max_length, this.charge, this.sprite_material, this.sprite_diameter, this.x_0, this.energy_capacity, this.energy, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0));
    }
}

class Bond {
    constructor(cell_1, cell_2, bond_length, bond_material, cell_1_weight = 0, cell_2_weight = 0){ //, cell_1_weight = 0, cell_2_weight = 0) {
        this.k = ( cell_1.k + cell_2.k )/2;
        this.dampening = ( cell_1.dampening + cell_2.dampening )/2;
        this.bond_length = bond_length;//( cell_1.bond_length + cell_2.bond_length )/2;
        this.max_length = this.bond_length*( cell_1.max_length + cell_2.max_length )/2;//max length is based on target length * coef
        this.cell_1 = cell_1;
        this.cell_2 = cell_2;
        this.broken = false;
        this.geometry = new THREE.BufferGeometry().setFromPoints([cell_1.position_vector, cell_2.position_vector]);
        this.bond_material = bond_material;
        this.line = new THREE.Line( this.geometry, this.bond_material );
        this.line_vertices = this.geometry.getAttribute( 'position' );
        this.line_vertices.setX(0, 0);
        this.line_vertices.setY(0, 0);
        this.bond_id = this.cell_1.x_index + ", " + this.cell_1.y_index + "_" + this.cell_2.x_index + ", " + this.cell_2.y_index
        this.cell_1.add_bond_to_cell(this);
        this.cell_2.add_bond_to_cell(this);

        this.cell_1_weight = cell_1_weight;
        this.cell_2_weight = cell_2_weight;
        /*if (this.cell_1_weight != 0) {
            if (this.cell_2_weight != 0) {
                this.update_outputs = function() {
                    this.cell_2.input_total += this.cell_1_weight * this.cell_1.output;
                    this.cell_1.input_total += this.cell_2_weight * this.cell_2.output;
                }
            }
            else {
                this.update_outputs = function() {
                    this.cell_2.input_total += this.cell_1_weight * this.cell_1.output;
                }
            }
        }
        else if (this.cell_2_weight != 0) {
            this.update_outputs = function() {
                this.cell_1.input_total += this.cell_2_weight * this.cell_2.output;
            }
        }*/

        this.dist_vector = new THREE.Vector3(0, 0, 0);//cell_2_pos - cell_1_pos
        this.dist_vector_length = this.dist_vector.length();

        //add an if statement here to add the bond to directed cells. (also could add to a break list...)
    }
    add_bond_to_simulation() {
        universe.add(this.line);
        bonds.push(this)
    }
    update_tensions(i) {
        let last_dist_length = this.dist_vector_length;
        this.dist_vector.subVectors(this.cell_2.position_vector, this.cell_1.position_vector);
        this.dist_vector_length = this.dist_vector.length();

        let k_d_times_d_dist_over_dt = this.dampening*(1 - last_dist_length/this.dist_vector_length);
        let spring_force = this.k*(this.dist_vector_length - this.bond_length);
        if (this.dist_vector.length() > this.max_length) {
            this.break_bond_at_index(i);
        }//this.bond_length
        else {
            this.cell_2.force_vector.addScaledVector(this.dist_vector, - (spring_force/this.dist_vector_length + k_d_times_d_dist_over_dt) );
            this.cell_1.force_vector.addScaledVector(this.dist_vector, (spring_force/this.dist_vector_length + k_d_times_d_dist_over_dt) );
        }
    }
    check_directed_connection() {
        //console.log((this.cell_1 instanceof Directed_Cell) + " x: " + this.x_index + " y: " + this.y_index)
        //console.log((this.cell_2 instanceof Directed_Cell) + " x: " + this.x_index + " y: " + this.y_index)
        if (this.cell_1 instanceof Cell_With_Bond && this.cell_1.anchor_bond_id == this.bond_id) {
            this.cell_1.update_anchor(this);
        }
        if (this.cell_2 instanceof Cell_With_Bond && this.cell_2.anchor_bond_id == this.bond_id) {
            this.cell_2.update_anchor(this);
        }
    }
    update_position() {
        this.line.position.copy(this.cell_1.position_vector);

        this.line_vertices.setX(1, this.dist_vector.x);
        this.line_vertices.setY(1, this.dist_vector.y);
        this.line_vertices.needsUpdate = true;
    }
    break_bond() {
        this.broken = true;
        universe.remove(this.line);
        for (let i = 0; i < bonds.length; i++) {
            if (bonds[i] === this) {
                bonds.splice(i, 1);
            }
        }
        this.cell_1.remove_bond_from_cell(this);
        this.cell_2.remove_bond_from_cell(this);
    }
    break_bond_at_index(i) {
        this.broken = true;
        universe.remove(this.line);
        bonds.splice(i, 1);
        this.cell_1.remove_bond_from_cell(this);
        this.cell_2.remove_bond_from_cell(this);
        this.geometry.dispose()
    }
    update_energy() {
        let voltage_diff = this.cell_1.energy_voltage - this.cell_2.energy_voltage;
        let current = voltage_diff/(bond_resistivity*this.dist_vector_length);
        if (current < 0) {
            current = Math.min( current, this.cell_1.energy_capacity-this.cell_1.energy, this.cell_2.energy );
        } else {
            current = Math.max( current, -(this.cell_2.energy_capacity-this.cell_2.energy), -this.cell_1.energy );
        }
        this.cell_1.energy -= current;
        this.cell_2.energy += current;
    }
    update_outputs() {
        this.cell_1.input_total += this.cell_1_weight * this.cell_2.output;//not sure how this works... But I think it's ok. 
        this.cell_2.input_total += this.cell_2_weight * this.cell_1.output;
    }
}

/*let angle_decoder = [//[y][x]
    [0, -150, 150],
    [-90, 0, 90],
    [-30, 30, 0]
]*/

class Cell_With_Bond extends Cell {
    constructor(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0 = 0, energy_capacity, energy = 0, position_vector = new THREE.Vector3(0, 0, 0), velocity_vector = new THREE.Vector3(0, 0, 0), anchor_bond_id) {
        super(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0, energy_capacity, energy, position_vector, velocity_vector);
        this.anchor_bond_id = anchor_bond_id;
        this.anchor_bond = null;
        this.anchor_cell = null;
    }
    update_anchor(anchor_bond) {
        this.anchor_bond = anchor_bond;
        if (this.anchor_bond.cell_1.x_index == this.x_index && this.anchor_bond.cell_1.y_index == this.y_index) {
            this.anchor_cell = this.anchor_bond.cell_2;
        } else {
            this.anchor_cell = this.anchor_bond.cell_1;
        }
    }
    clone_cell() {
        return new Cell_With_Bond(this.mass, this.k, this.dampening, this.max_length, this.charge, this.sprite_material, this.sprite_diameter, this.x_0, this.energy_capacity, this.energy, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), this.anchor_bond_id);
    }
}

class Muscle_Cell extends Cell_With_Bond {
    constructor(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0 = 0, energy_capacity, energy = 0, position_vector = new THREE.Vector3(0, 0, 0), velocity_vector = new THREE.Vector3(0, 0, 0), anchor_bond_id, extension_factor) {
        super(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0, energy_capacity, energy, position_vector, velocity_vector, anchor_bond_id);
        this.extension_factor = extension_factor;
        this.extended = false;
    }
    update_anchor(anchor_bond) {
        super.update_anchor(anchor_bond);
        this.anchor_bond_original_length = this.anchor_bond.bond_length;
        this.anchor_bond_original_max_length = this.anchor_bond.max_length;
    }
    update_cell(){
        if (this.anchor_bond != null){
            if (this.output == 1 && !this.extended){
                let new_length = this.extension_factor*this.anchor_bond_original_length
                let energy_cost = 
                    1/2*this.anchor_bond.k*(Math.abs(this.anchor_bond.dist_vector_length-new_length))**2
                    - 1/2*this.anchor_bond.k*(Math.abs(this.anchor_bond.dist_vector_length-this.anchor_bond.bond_length))**2;
                if (energy_cost <= this.energy) {
                    this.energy -= energy_cost;
                    this.extended = true;
                    this.anchor_bond.bond_length = new_length;
                    this.anchor_bond.max_length = this.extension_factor*this.anchor_bond_original_max_length;
                }
            } else if (this.output == 0 && this.extended) {
                let new_length = this.anchor_bond_original_length
                let energy_cost = 
                    1/2*this.anchor_bond.k*(Math.abs(this.anchor_bond.dist_vector_length-new_length))**2
                    - 1/2*this.anchor_bond.k*(Math.abs(this.anchor_bond.dist_vector_length-this.anchor_bond.bond_length))**2;
                if (energy_cost <= this.energy) {
                    this.energy -= energy_cost;
                    this.extended = false;
                    this.anchor_bond.bond_length = new_length;
                    this.anchor_bond.max_length = this.anchor_bond_original_max_length;
                }
            }
        }
    }
    clone_cell() {
        return new Muscle_Cell(this.mass, this.k, this.dampening, this.max_length, this.charge, this.sprite_material, this.sprite_diameter, this.x_0, this.energy_capacity, this.energy, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), this.anchor_bond_id, this.extension_factor);
    }
}

class Inverse_Muscle_Cell extends Cell_With_Bond {
    constructor(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0 = 0, energy_capacity, energy = 0, position_vector = new THREE.Vector3(0, 0, 0), velocity_vector = new THREE.Vector3(0, 0, 0), anchor_bond_id, extention_resistance) {
        super(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0, energy_capacity, energy, position_vector, velocity_vector, anchor_bond_id);
        this.extention_resistance = extention_resistance;
        this.last_dist_length = 0;
    }
    update_anchor(anchor_bond) {
        super.update_anchor(anchor_bond);
        this.last_dist_length = this.anchor_bond.dist_vector_length;
        this.anchor_bond.dampening += this.extention_resistance;
    }
    update_cell(){
        if (this.anchor_bond != null){
            this.energy = Math.min(this.energy_capacity, this.energy + (this.anchor_bond.dist_vector_length-this.last_dist_length)**2 * this.extention_resistance);//apparently the over dt is included in the k constant, so not included here either ¯\_(;))_/¯
            this.last_dist_length = this.anchor_bond.dist_vector_length;
        }
    }
    clone_cell() {
        return new Inverse_Muscle_Cell(this.mass, this.k, this.dampening, this.max_length, this.charge, this.sprite_material, this.sprite_diameter, this.x_0, this.energy_capacity, this.energy, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), this.anchor_bond_id, this.extention_resistance);
    }
}

let vertical_vector = new THREE.Vector3(1, 0, 0);
class Directed_Cell extends Cell_With_Bond {
    constructor(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0 = 0, energy_capacity, energy = 0, position_vector = new THREE.Vector3(0, 0, 0), velocity_vector = new THREE.Vector3(0, 0, 0), anchor_bond_id, desired_angle = 0) {//angle measured from vertical
        super(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0, energy_capacity, energy, position_vector, velocity_vector, anchor_bond_id);
        this.direction = new THREE.Vector3(0, 1, 0);
        this.desired_angle = desired_angle;
        this.sprite_angle = 0;
    }
    /*update_anchor(anchor_bond) {
        this.anchor_bond = anchor_bond;
        if (this.anchor_bond.cell_1.x_index == this.x_index && this.anchor_bond.cell_1.y_index == this.y_index) {
            this.anchor_cell = this.anchor_bond.cell_2;
        } else {
            this.anchor_cell = this.anchor_bond.cell_1;
        }
    }*/
    update_direction() {
        if (this.anchor_bond != null) {//this check might be redundant
            if (!this.anchor_bond.broken){
                this.direction.subVectors(this.position_vector, this.anchor_cell.position_vector);
                this.direction.normalize().negate();
                //this.sprite_angle = this.direction.angleTo(vertical_vector);
                this.sprite_angle = this.get_angle_from_vertical();//-this.direction.angleTo(vertical_vector);
                //console.log(this.sprite_angle);
                this.sprite.material.rotation = this.sprite_angle;
                //this.sprite.setRotationFromAxisAngle(z_axis, this.sprite_angle);
                //this.direction.applyAxsiAngle(z_axis, desired_angle);
            } else {
                this.anchor_bond = null;
                this.anchor_cell = null;
            }
        } else {
            //console.log("yeet");
        }
    }
    get_angle_from_vertical() {
        if (this.direction.y > 0) {
            return Math.asin(-this.direction.x);
        } else {
            return -Math.asin(-this.direction.x)+Math.PI;
        }
    }
    /*update_schematics(cell_schematics, x_index = 0, y_index = 0) {//and index
        super.update_schematics(cell_schematics, x_index, y_index);
        this.something ;
        this.x_index
        this.y_index;

    }*/
    update_cell() {
        this.update_direction();
    }
    clone_cell() {
        return new Directed_Cell(this.mass, this.k, this.dampening, this.max_length, this.charge, this.sprite_material, this.sprite_diameter, this.x_0, this.energy_capacity, this.energy, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), this.anchor_bond_id, this.desired_angle);
    }
}

let planks_constant = 60;
/*class Photon_Cell extends Cell {
    constructor(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0 = 0, energy_capacity, energy = 0, position_vector = new THREE.Vector3(0, 0, 0), velocity_vector = new THREE.Vector3(0, 0, 0)) {
        super(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0, energy_capacity, energy, position_vector, velocity_vector)
        this.energy = energy;
        this.last_position_vector = this.position_vector.copy;
        this.last_force_vector = this.force_vector.copy;
        this.period = 1;//in 1/60th of a sec
        this.time_since_flip = 0;//in 1/60th of a sec
        //this.last_speed = this.velocity_vector.length();
        this.update_period();
    }
    update_period() {
        this.period = Math.ceil(planks_constant/this.energy);
    }
    update_energy() {//might switch tactic. currently doing one big update every few ticks, might change to a small update every single tick
        let potential_energy = 0;
        for (let cell_2 in cells){
            let dist = repel_dist_vector.length();
            if (dist != 0 && dist < radius) {
                potential_energy += this.charge*cell_2.charge/(dist);
            }
        }
        this.energy -= potential_energy;//detla E = delta KE + delta PE + delta internal energy + delta external energy
        this.energy = 0
    }
    update_cell() {
        if (this.time_since_flip >= this.period) {
            console.log(this.charge);
            this.charge = -this.charge;
            this.update_energy();
            this.update_period();
            this.time_since_flip = 1;
        } else {
            this.time_since_flip++;
        }
    }
}*/

//v = lambda * f
function create_photon(position_vector, velocity_vector, wave_length) {
    let photon = new Photon(radius, photon_path, wave_length, 1000, position_vector, velocity_vector);
    photon.add_photon_to_simulation();
}

class Photon {
    constructor(photon_radius, sprite_path, period, energy = 0, position_vector = new THREE.Vector3(0, 0, 0), velocity_vector = new THREE.Vector3(0, 0, 0)) {
        let sprite_map = new THREE.TextureLoader().load( sprite_path );
        let sprite_material = new THREE.SpriteMaterial( { map: sprite_map } );
        this.sprite = new THREE.Sprite(sprite_material);
        this.photon_radius = photon_radius;
        this.sprite.scale.set(4*this.photon_radius, 2*this.photon_radius, 1);

        this.position_vector = position_vector;
        this.velocity_vector = velocity_vector;
        this.velocity_vector.setLength((2*this.photon_radius) * (1/(period/60)));
        this.electric_force_norm_vector = this.velocity_vector.clone()
        this.electric_force_norm_vector.applyAxisAngle(z_axis, Math.PI/2);
        this.electric_force_norm_vector.normalize();

        this.electric_force_vector = this.electric_force_norm_vector.clone()

        this.sprite.position.copy(this.position_vector);
        this.cell_bonds = [];//is this needed?

        this.original_energy = energy;
        this.energy = energy;
        this.period = 1;//in 1/60th of a sec
        this.time_since_flip = 0;//in 1/60th of a sec
        //this.last_speed = this.velocity_vector.length();
        this.period = period;//in number of frames

        this.sprite_angle = this.get_angle_from_vertical()+Math.PI/2;
        this.sprite.material.rotation = this.sprite_angle;

        this.sprite.material.map.repeat.set( 1, 1/2 );
        //sprite_map.magFilter = THREE.NearestFilter;//makes sharper if needed;

        this.starting_frame_num = frame_number;
    }
    update_force() {
        this.electric_force_vector.copy(this.electric_force_norm_vector);
        let force_scalar = this.energy/16;
        //let sin_component = Math.sin(2*Math.PI * frame_number/this.period);
        let sin_component = Math.sin(2*Math.PI * (frame_number-this.starting_frame_num)/this.period);
        this.electric_force_vector.multiplyScalar(force_scalar*sin_component);
        if(sin_component < 0) {
            this.sprite.material.map.offset.set( 0, 0 );
        } else {
            this.sprite.material.map.offset.set( 0, 1/2 );
        }
        this.sprite.material.opacity = Math.min(1, this.energy/this.original_energy);
        this.sprite.scale.set(4*this.photon_radius, 2*this.photon_radius*sin_component, 1);
    }
    /*update_period() {
        this.period = Math.ceil(planks_constant/this.energy);
    }*/
    update_photon(index) {
        this.update_force();
        if ( this.grid_space.x_coord != 0 &&  this.grid_space.x_coord != universe_grid_width - 1 && this.grid_space.y_coord != 0  &&  this.grid_space.y_coord != universe_grid_height - 1 ) {//this should probably be replaced with different logic ( specifically adding a "photons" list to the gridspace class )
            let near_spaces = this.grid_space.get_grid_spaces_in_neighborhood();
            for (let space of near_spaces) {
                for (let cell of space.cells) {
                    //do thing
                    let dist = this.position_vector.distanceTo(cell.position_vector);
                    if (dist < this.photon_radius) {
                        cell.force_vector.add(this.electric_force_vector);
                        this.energy = this.energy - this.electric_force_vector.dot(cell.velocity_vector)*(1/60);//force dot distance (distance is v * delta T)
                    }
                }
            }
            this.update_position(index);
            if (this.energy < 0) {
                this.destroy_photon();
            }
        } else {
            this.destroy_photon(index);
        }
    }
    update_position() {//and add friction and reset force
        this.position_vector.addScaledVector(this.velocity_vector, 1/60);
        
        this.sprite.position.copy(this.position_vector);

        this.set_photon_grid_space(this.find_grid_space_from_position());//might not be efficient - or might be
    }
    add_photon_to_simulation() {
        universe.add(this.sprite);
        photons.push(this);
        this.set_photon_grid_space(this.find_grid_space_from_position());
        //this.grid_space.photon.push(this);
    }
    find_grid_space_from_position() {
        return universe_grid[Math.min(Math.max(0, Math.floor((this.position_vector.x + sanity_offset)/universe_grid_space_diameter)), universe_grid_height-1)][Math.min(Math.max(0, Math.floor((this.position_vector.y + sanity_offset)/universe_grid_space_diameter)), universe_grid_height-1)];
    }
    set_photon_grid_space(grid_space) {
        this.grid_space = grid_space;
    }
    get_angle_from_vertical() {
        if (this.velocity_vector.y > 0) {
            return Math.asin(-this.velocity_vector.x/this.velocity_vector.length());
        } else {
            return -Math.asin(-this.velocity_vector.x/this.velocity_vector.length())+Math.PI;
        }
    }
    destroy_photon(index) {
        //console.log("rip photon");
        universe.remove(this.sprite);
        this.sprite.material.map.dispose();
        this.sprite.material.dispose();
        delete this.sprite;
        photons.splice(index, 1);
    }
}

let player_cell_position_vector = new THREE.Vector3(0, 0, 0);
class Player_Cell extends Cell { //there should only ever be one player vector (unless I add split screen)
    constructor(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0 = 0, energy_capacity, energy = 0, position_vector = new THREE.Vector3(0, 0, 0), velocity_vector = new THREE.Vector3(0, 0, 0)) {
        super(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0, energy_capacity, energy, position_vector, velocity_vector);
    }
    update_cell() {
        player_cell_position_vector.copy(this.position_vector);
        camera.position.setX(this.position_vector.x);
        camera.position.setY(this.position_vector.y);
    }
    clone_cell() {//this function should probably only be called once tops. (unless I add split screen)
        return new Player_Cell(this.mass, this.k, this.dampening, this.max_length, this.charge, this.sprite_material, this.sprite_diameter, this.x_0, this.energy_capacity, this.energy, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0));
    }
}

class Key_Cell extends Cell {
    constructor(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0 = 0, energy_capacity, energy = 0, position_vector = new THREE.Vector3(0, 0, 0), velocity_vector = new THREE.Vector3(0, 0, 0), key) {
        super(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0, energy_capacity, energy, position_vector, velocity_vector);
        this.key = key;
    }
    update_outputs() {
        if (this.key.value) {
            this.output = 1;    
        }
        else {
            this.output = 0;
        }
        this.update_output_display();
        this.input_total = 0;//this cell shouldn't have inputs, since it is an input cell.
    }
    clone_cell(){
        return new Key_Cell(this.mass, this.k, this.dampening, this.max_length, this.charge, this.sprite_material, this.sprite_diameter, this.x_0, this.energy_capacity, this.energy, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), this.key);
    }
}

class Toggle_Cell extends Cell {
    constructor(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0 = 0, energy_capacity, energy = 0, position_vector = new THREE.Vector3(0, 0, 0), velocity_vector = new THREE.Vector3(0, 0, 0)) {
        super(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0, energy_capacity, energy, position_vector, velocity_vector);
        this.last_input = 0;
    }
    update_outputs() {
        if (this.input_total > this.x_0) {
            if (this.last_input == 0) {
                if (this.output == 0) {
                    this.output = 1;
                } else {
                    this.output = 0;
                }
            } 
            this.last_input = 1;
            this.update_output_display()
        } else {
            this.last_input = 0;
        }
        this.input_total = 0;
    }
    clone_cell(){
        return new Toggle_Cell(this.mass, this.k, this.dampening, this.max_length, this.charge, this.sprite_material, this.sprite_diameter, this.x_0, this.energy_capacity, this.energy, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0));
    }
}

class Pulse_Cell extends Cell {
    constructor(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0 = 0, energy_capacity, energy = 0, position_vector = new THREE.Vector3(0, 0, 0), velocity_vector = new THREE.Vector3(0, 0, 0)) {
        super(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0, energy_capacity, energy, position_vector, velocity_vector);
        this.last_input = 0;
    }
    update_outputs() {
        if (this.input_total > this.x_0) {
            if (this.last_input == 0) {
                this.output = 1;
            } else {
                this.output = 0;
            }
            this.last_input = 1;
            this.update_output_display()
        } else {
            this.last_input = 0;
        }
        this.input_total = 0;
    }
    clone_cell(){
        return new Pulse_Cell(this.mass, this.k, this.dampening, this.max_length, this.charge, this.sprite_material, this.sprite_diameter, this.x_0, this.energy_capacity, this.energy, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0));
    }
}

class Derivative_Cell extends Cell {
    constructor(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0 = 0, energy_capacity, energy = 0, position_vector = new THREE.Vector3(0, 0, 0), velocity_vector = new THREE.Vector3(0, 0, 0)) {
        super(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0, energy_capacity, energy, position_vector, velocity_vector);
        this.last_input = 0;
    }
    update_outputs() {
        this.output = (this.input_total - this.last_input)/(1/60);//delta input / delta time (in seconds)
        this.last_input = this.input_total;
        this.input_total = 0;
    }
    clone_cell(){
        return new Pulse_Cell(this.mass, this.k, this.dampening, this.max_length, this.charge, this.sprite_material, this.sprite_diameter, this.x_0, this.energy_capacity, this.energy, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0));
    }
}

let sticky_bond_material = new THREE.LineBasicMaterial( { color: 0x00AA00 } );
class Sticky_Cell extends Cell {
    constructor(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0 = 0, energy_capacity, energy = 0, position_vector = new THREE.Vector3(0, 0, 0), velocity_vector = new THREE.Vector3(0, 0, 0), sticky_radius, sticky_k) {
        super(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0, energy_capacity, energy, position_vector, velocity_vector);
        this.sticky_radius = sticky_radius;
        this.sticky_k = sticky_k;
        this.cell_bonds = [];
    }
    update_cell() {
        let near_spaces = this.grid_space.get_grid_spaces_in_neighborhood();
        for (let space of near_spaces) {
            for (let cell of space.cells) {
                if (cell !== this) {
                    //do thing
                    let already_bonded = false;
                    for (let bond of this.cell_bonds) {
                        if (bond.cell_1 === cell || bond.cell_2 === cell) {
                            already_bonded = true;
                            break;
                        }
                    }
                    if (!already_bonded) {
                        let dist = this.position_vector.distanceTo(cell.position_vector);
                        if (dist != 0 && dist < this.sticky_radius) {
                            let added_bond = new Bond(this, cell, this.sticky_radius, sticky_bond_material, 0, 0);
                            added_bond.add_bond_to_simulation();
                            added_bond.check_directed_connection();
                        }
                    }
                }
            }
        }
    }
    clone_cell() {
        return new Sticky_Cell(this.mass, this.k, this.dampening, this.max_length, this.charge, this.sprite_material, this.sprite_diameter, this.x_0, this.energy_capacity, this.energy, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), this.sticky_radius, this.sticky_k);
    }
}

class Absorber_Cell extends Sticky_Cell {
    constructor(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0 = 0, energy_capacity, energy = 0, position_vector = new THREE.Vector3(0, 0, 0), velocity_vector = new THREE.Vector3(0, 0, 0), sticky_radius, sticky_k) {
        super(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0, energy_capacity, energy, position_vector, velocity_vector);
        this.sticky_radius = sticky_radius;
        this.sticky_k = sticky_k;
        this.cell_bonds = [];
    }
    update_cell() {
        super.update_cell();
        for (let bond of this.cell_bonds) {
            if (bond.bond_material === sticky_bond_material) {
                if (bond.cell_1 !== this) {
                    if (bond.cell_1.number_of_bonds == 1) {
                        let cell_1 = bond.cell_1;
                        bond.break_bond();
                        cell_1.destroy_cell();
                    }
                } else if (bond.cell_2 !== this){
                    if (bond.cell_2.number_of_bonds == 1) {
                        let cell_2 = bond.cell_2;
                        bond.break_bond();
                        cell_2.destroy_cell();
                    }
                }
            }
        }
    }
    clone_cell() {
        return new Absorber_Cell(this.mass, this.k, this.dampening, this.max_length, this.charge, this.sprite_material, this.sprite_diameter, this.x_0, this.energy_capacity, this.energy, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), this.sticky_radius, this.sticky_k);
    }
}

class Explosive_Cell extends Cell { //there should only ever be one player vector (unless I add split screen)
    constructor(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0 = 0, energy_capacity, energy = 0, position_vector = new THREE.Vector3(0, 0, 0), velocity_vector = new THREE.Vector3(0, 0, 0), explosive_radius, fragments, shapnel_cell) {
        super(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0, energy_capacity, energy, position_vector, velocity_vector);
        this.explosive_radius = explosive_radius;//in units of energy?
        this.fragments = fragments;
        this.shapnel_cell = shapnel_cell;
        this.exploded = false;
        this.radius_vector = new THREE.Vector3(this.explosive_radius, 0, 0);
    }
    update_cell(){
        if (!this.exploded && this.output == 1){
            let delta_theta = 2*Math.PI/this.fragments;
            for (let i = 0; i < this.fragments; i++) {
                this.radius_vector.set(this.explosive_radius*Math.cos(i*delta_theta), this.explosive_radius*Math.sin(i*delta_theta), 0)
                let new_shrapnel_cell = this.shapnel_cell.clone_cell();
                new_shrapnel_cell.position_vector.add(this.radius_vector).add(this.position_vector);
                new_shrapnel_cell.add_cell_to_simulation();
            }
            this.exploded = true;
        }
    }
    clone_cell() {//this function should probably only be called once tops. (unless I add split screen)
        return new Explosive_Cell(this.mass, this.k, this.dampening, this.max_length, this.charge, this.sprite_material, this.sprite_diameter, this.x_0, this.energy_capacity, this.energy, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), this.explosive_radius, this.fragments, this.shapnel_cell);
    }
}

class Fixed_Cell extends Cell { //there should only ever be one player vector (unless I add split screen)
    constructor(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0 = 0, energy_capacity, energy = 0, position_vector = new THREE.Vector3(0, 0, 0), velocity_vector = new THREE.Vector3(0, 0, 0), root_strength) {
        super(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0, energy_capacity, energy, position_vector, velocity_vector);
        this.root_strength = root_strength;
        this.rooted = true;
    }
    update_position() {//and add friction and reset force
        //this.force_vector.addScaledVector(this.velocity_vector, -friction);//old version. doesn't use current
        this.grid_space.apply_friction_with_cell(this);

        if (this.rooted) {
            let force_magnitude = this.force_vector.length();
            if (force_magnitude > this.root_strength) {
                this.rooted = false;

                this.force_vector.setLength(force_magnitude-this.root_strength);
                this.velocity_vector.addScaledVector(this.force_vector, 1/60/this.mass);
                this.position_vector.addScaledVector(this.velocity_vector, 1/60);

                this.sprite.position.copy(this.position_vector);
            }
        } else {
            this.velocity_vector.addScaledVector(this.force_vector, 1/60/this.mass);
            this.position_vector.addScaledVector(this.velocity_vector, 1/60);
            
            this.sprite.position.copy(this.position_vector);
        }
        
        this.force_vector.set(0, 0, 0);
    }
    clone_cell() {//this function should probably only be called once tops. (unless I add split screen)
        return new Fixed_Cell(this.mass, this.k, this.dampening, this.max_length, this.charge, this.sprite_material, this.sprite_diameter, this.x_0, this.energy_capacity, this.energy, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), this.root_strength);
    }
}

let propeller_efficiency = 1;//units of distance over time
class Propulsor extends Directed_Cell {
    constructor(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0 = 0, energy_capacity, energy = 0, position_vector = new THREE.Vector3(0, 0, 0), velocity_vector = new THREE.Vector3(0, 0, 0), anchor_bond_id, desired_angle = 0, propulsion) {
        super(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0, energy_capacity, energy, position_vector, velocity_vector, anchor_bond_id, desired_angle)
        this.propulsion = propulsion;//(does this mean that these points must have an orientation?)
    }
    update_outputs() {
        this.output = Math.max( -1, Math.min( 1, this.input_total-this.x_0 ) );
        this.update_output_display()
        this.input_total = 0;
    }
    update_output_display() {
        this.sprite.scale.set((this.output+1)*this.sprite_diameter, (this.output+1)*this.sprite_diameter, 1);
    }
    update_cell(){
        if (this.anchor_bond != null){
            super.update_cell();
            let energy_cost = propeller_efficiency*this.output*this.propulsion*(1/60);//propeller_efficiency is a constant with units of distance/delta time. I am thinking if this as a propeller. Thus, the rotors spin with a torque T against the water (based on the reletive speeds) and therefore the energy cost is T*delta theta. (and of course delta theta is rotational velocity * delta t hence the (1/60). 1 is arbitrarily chosen. I think it'll be ok so long as I'm consistent)
            //let energy_cost = Math.max( 0, this.velocity_vector.dot(this.direction) * this.output*this.propulsion * (1/60) );//this is a weird place for the work equation. might change/remove
            if (energy_cost <= this.energy) {
                this.energy -= energy_cost;
                this.force_vector.addScaledVector(this.direction, this.output*this.propulsion);
                this.grid_space.force_vector.addScaledVector(this.direction, -this.output*this.propulsion);
            }
        }
    }
    clone_cell() {
        return new Propulsor(this.mass, this.k, this.dampening, this.max_length, this.charge, this.sprite_material, this.sprite_diameter, this.x_0, this.energy_capacity, this.energy, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), this.anchor_bond_id, this.desired_angle, this.propulsion);
    }
}

class Propulsor2 extends Directed_Cell {
    constructor(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0 = 0, energy_capacity, energy = 0, position_vector = new THREE.Vector3(0, 0, 0), velocity_vector = new THREE.Vector3(0, 0, 0), anchor_bond_id, desired_angle = 0, rotor_resistance) {
        super(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0, energy_capacity, energy, position_vector, velocity_vector, anchor_bond_id, desired_angle)
        this.rotor_resistance = 9//rotor_resistance;
        this.max_target_speed = 10;
        this.target_velocity = new THREE.Vector3(0, 0, 0);
        this.friction_force = new THREE.Vector3(0, 0, 0);
    }
    update_outputs() {
        this.output = Math.max( -1, Math.min( 1, this.input_total-this.x_0 ) );
        this.update_output_display()
        this.input_total = 0;
    }
    update_output_display() {
        this.sprite.scale.set((this.output+1)*this.sprite_diameter, (this.output+1)*this.sprite_diameter, 1);
    }
    update_cell() {
        if (this.anchor_bond != null){
            super.update_cell();
            this.target_velocity.copy(this.direction);//unit vec in direction cell is facing
            this.target_velocity.multiplyScalar( this.max_target_speed * this.output );//now with the desired magnitude based on cell output (related to rotor speed)
            this.target_velocity.add(this.grid_space.velocity_vector)//add in the current

            this.friction_force.subVectors(this.target_velocity, this.velocity_vector)//I could change this to only be the directed component, but I wil leave it for now for simplicity and to represent the side resistence of the flagelum.
            this.friction_force.multiplyScalar(this.rotor_resistance)

            //this.reletive_velocity_vector.subVectors(this.grid_space.velocity_vector, this.velocity_vector);
            //this.directional_friction_force.copy(this.direction);
            //this.directional_friction_force.multiplyScalar( -this.direction.dot(this.reletive_velocity_vector)*this.directional_resistance );
            //let energy_cost = this.directional_friction_force.dot(this.velocity_vector)*1/60;//Force dot distance (distance = v * delta T)
            let energy_cost = propeller_efficiency*this.direction.dot(this.friction_force)*(1/60);//propeller_efficiency is a constant with units of distance/delta time. I am thinking if this as a propeller. Thus, the rotors spin with a torque T against the water (based on the reletive speeds) and therefore the energy cost is T*delta theta. (and of course delta theta is rotational velocity * delta t hence the (1/60). 1 is arbitrarily chosen. I think it'll be ok so long as I'm consistent)
            if (energy_cost <= this.energy) {
                this.energy -= Math.max( 0, energy_cost );
                //this.energy = Math.min(this.energy_capacity, this.energy - energy_cost);
                //this.energy -= energy_cost;
                this.force_vector.add(this.friction_force);
                this.grid_space.force_vector.sub(this.friction_force);//same thing as .negate(), but doesn't change the friction force var
            } else {
                this.force_vector.add(this.friction_force);
                this.grid_space.force_vector.sub(this.friction_force);//same thing as .negate(), but doesn't change the friction force var
                this.grid_space.force_vector.addScaledVector(this.friction_force, -1);
                let forward_component = this.friction_force.dot(this.direction);
                this.friction_force.copy(this.direction);
                this.friction_force.multiplyScalar(forward_component);
                this.force_vector.sub(this.friction_force);
                this.grid_space.force_vector.add(this.friction_force);//same thing as .negate(), but doesn't change the friction force var
                //as is, when there is not enough power to the propulsor, the flagelium disengeages and reduces the forward backward friction to 0.
            }
            //arguements for this system. picture a flagelium. there is as much sideways cross section as forward cross section. therefore, sideways friction will be included (whether applying tork or not). 
            //similarly, if the force isn't in the positive direction, no energy cost, since it will spin on it's own. however, allowing it to spin will still slightly help over locking it in place.
            //finally when unable to afford to spin the flagalium, the friction is calculated side to side only.
            //this.force_vector.add(this.directional_friction_force);
            //let energy_generated = -this.directional_friction_force.dot(this.velocity_vector)*1/60;//Force dot distance (distance = v * delta T)
            //this.energy = Math.(this.energy_capacity, this.energy + energy_generated);
        }
    }
    /*update_cell(){
        if (this.anchor_bond != null){
            super.update_cell();
            let energy_cost = Math.max( 0, this.velocity_vector.dot(this.direction) * this.output*this.propulsion * (1/60) );//this is a weird place for the work equation. might change/remove
            if (energy_cost <= this.energy) {
                this.energy -= energy_cost;
                this.force_vector.addScaledVector(this.direction, this.output*this.propulsion);
            }
        }
    }*/
    clone_cell() {
        return new Propulsor2(this.mass, this.k, this.dampening, this.max_length, this.charge, this.sprite_material, this.sprite_diameter, this.x_0, this.energy_capacity, this.energy, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), this.anchor_bond_id, this.desired_angle, this.directional_resistance);
    }
}

class Inverse_Propulsor extends Directed_Cell {
    constructor(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0 = 0, energy_capacity, energy = 0, position_vector = new THREE.Vector3(0, 0, 0), velocity_vector = new THREE.Vector3(0, 0, 0), anchor_bond_id, desired_angle = 0, rotor_resistance) {
        super(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0, energy_capacity, energy, position_vector, velocity_vector, anchor_bond_id, desired_angle);
        this.rotor_resistance = rotor_resistance;
        //this.reletive_velocity_vector = new THREE.Vector3(0, 0, 0);
        this.friction_force = new THREE.Vector3(0, 0, 0);
    }
    update_cell(){
        if (this.anchor_bond != null){
            super.update_cell();
            if (this.output == 1) {
                this.friction_force.subVectors(this.grid_space.velocity_vector, this.velocity_vector);
                //this.friction_force.copy(this.reletive_velocity_vector);
                this.friction_force.multiplyScalar(this.rotor_resistance);
                let energy_generated = Math.abs(propeller_efficiency*this.direction.dot(this.friction_force)*(1/60));//propeller_efficiency is a constant with units of distance/delta time. I am thinking if this as a propeller. Thus, the rotors spin with a torque T against the water (based on the reletive speeds) and therefore the energy cost is T*delta theta. (and of course delta theta is rotational velocity * delta t hence the (1/60). 1 is arbitrarily chosen. I think it'll be ok so long as I'm consistent)
                this.energy = Math.min(this.energy_capacity, this.energy + energy_generated);
                this.force_vector.add(this.friction_force);
            } else {
                this.force_vector.add(this.friction_force);
                let forward_component = this.friction_force.dot(this.direction);
                this.friction_force.copy(this.direction);
                this.friction_force.multiplyScalar(forward_component);
                this.force_vector.sub(this.friction_force);
            }
        }
    }
    clone_cell() {
        return new Inverse_Propulsor(this.mass, this.k, this.dampening, this.max_length, this.charge, this.sprite_material, this.sprite_diameter, this.x_0, this.energy_capacity, this.energy, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), this.anchor_bond_id, this.desired_angle, this.rotor_resistance);
    }
}

class Player_Sensor extends Directed_Cell {//outputs 1 if facing toward player. outputs -1? 0? if facing away from player
    constructor(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0 = 0, energy_capacity, energy = 0, position_vector = new THREE.Vector3(0, 0, 0), velocity_vector = new THREE.Vector3(0, 0, 0), anchor_bond_id, desired_angle = 0) {
        super(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0, energy_capacity, energy, position_vector, velocity_vector, anchor_bond_id, desired_angle)
        this.vector_to_player = new THREE.Vector3(0, 0, 0);
    }
    update_outputs() {
        if (this.anchor_bond != null){
            this.vector_to_player.subVectors(player_cell_position_vector, this.position_vector);
            this.output = this.direction.dot(this.vector_to_player)/this.vector_to_player.length();
        }
    }
    clone_cell() {
        return new Player_Sensor(this.mass, this.k, this.dampening, this.max_length, this.charge, this.sprite_material, this.sprite_diameter, this.x_0, this.energy_capacity, this.energy, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), this.anchor_bond_id, this.desired_angle);
    }
}

class Eye_Cell extends Directed_Cell {// I want to make the sprite look at the target cell for cuteness and visual feedback
    constructor(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0 = 0, energy_capacity, energy = 0, position_vector = new THREE.Vector3(0, 0, 0), velocity_vector = new THREE.Vector3(0, 0, 0), anchor_bond_id, desired_angle = 0, vision_range = radius) {
        super(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0, energy_capacity, energy, position_vector, velocity_vector, anchor_bond_id, desired_angle)
        this.vision_range = vision_range;
        this.target_cell = null;
        this.vector_to_target = new THREE.Vector3(0, 0, 0);
    }
    update_cell(){
        if (this.anchor_bond != null){
            super.update_cell();
            if (this.target_cell == null || this.position_vector.distanceTo(this.target_cell.position_vector) > this.vision_range) {//the order of this or matters
                this.output = 0;
                this.look_for_new_target();
            }
        }
    }
    update_outputs() {
        if (this.anchor_bond != null && this.target_cell != null){
            this.vector_to_target.subVectors(this.target_cell.position_vector, this.position_vector);
            this.output = this.direction.dot(this.vector_to_target)/this.vector_to_target.length();
        }
    }
    look_for_new_target() {//sets target cell to null if couldn't find anything. currently chooses random one (not random, just the first one that qualifies)
        this.target_cell = null;
        let near_spaces = this.grid_space.get_grid_spaces_in_neighborhood();
        for (let space of near_spaces) {
            for (let cell of space.cells) {
                if (cell !== this) {
                    //do thing
                    if (cell instanceof Energy_Generator) {//works well, just need the cell type to not be hard coded :)
                        this.target_cell = cell;
                        break;
                    }
                }
            }
        }
    }
    clone_cell() {
        return new Eye_Cell(this.mass, this.k, this.dampening, this.max_length, this.charge, this.sprite_material, this.sprite_diameter, this.x_0, this.energy_capacity, this.energy, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), this.anchor_bond_id, this.desired_angle, this.vision_range);
    }
}

/*class Eye_Beam_Cell extends Directed_Cell {
    constructor(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0 = 0, energy_capacity, energy = 0, position_vector = new THREE.Vector3(0, 0, 0), velocity_vector = new THREE.Vector3(0, 0, 0), anchor_bond_id, desired_angle = 0) {
        super(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0, energy_capacity, energy, position_vector, velocity_vector, anchor_bond_id, desired_angle)
    }
    update_cell(){
        if (this.anchor_bond != null){
            super.update_cell();
            this.output = 1/(1+1);//something
        }
    }
    clone_cell() {
        return new Eye_Cell(this.mass, this.k, this.dampening, this.max_length, this.charge, this.sprite_material, this.sprite_diameter, this.x_0, this.energy_capacity, this.energy, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), this.anchor_bond_id, this.desired_angle);
    }
}*/

class Energy_Generator extends Cell {
    constructor(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0 = 0, energy_capacity, energy = 0, position_vector = new THREE.Vector3(0, 0, 0), velocity_vector = new THREE.Vector3(0, 0, 0), energy_generation) {
        super(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0, energy_capacity, energy, position_vector, velocity_vector);
        this.energy_generation = energy_generation;
    }
    update_cell() {
        this.energy = Math.min(this.energy_capacity, this.energy + this.energy_generation);
    }
    clone_cell() {
        return new Energy_Generator(this.mass, this.k, this.dampening, this.max_length, this.charge, this.sprite_material, this.sprite_diameter, this.x_0, this.energy_capacity, this.energy, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), this.energy_generation);
    }
}

class Reproducer extends Directed_Cell {
    constructor(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0 = 0, energy_capacity, energy = 0, position_vector = new THREE.Vector3(0, 0, 0), velocity_vector = new THREE.Vector3(0, 0, 0), anchor_bond_id, desired_angle = 0, schematics_to_produce = null, schematics_to_produce_index) {
        super(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0, energy_capacity, energy, position_vector, velocity_vector, anchor_bond_id, desired_angle);
        this.schematics_to_produce = schematics_to_produce;
        this.schematics_to_produce_index = schematics_to_produce_index;
        this.able_to_build = true;
        //this.energy2 = 1;
    }
    update_schematics(cell_schematics, x_index = 0, y_index = 0) {
        super.update_schematics(cell_schematics, x_index, y_index)
        if (this.schematics_to_produce == null) {
            this.schematics_to_produce = cell_schematics;
        }
    }
    update_anchor(anchor_bond) {
        super.update_anchor(anchor_bond);
        super.update_cell();
        this.starting_angle = this.get_angle_from_vertical();
    }
    update_cell() {
        if (this.anchor_bond != null && this.schematics_to_produce != null){
            super.update_cell();
            if (this.output == 1){
                if (this.able_to_build){
                    if (this.energy >= this.schematics_to_produce.energy_cost) {
                        console.log("energy "+this.energy) 
                        console.log("energy_cost "+this.schematics_to_produce.energy_cost)
                        let creature_position = this.position_vector.clone();
                        //creature_position.addScaledVector(this.direction, -radius);
                        let creature_velocity = this.velocity_vector.clone();
                        this.schematics_to_produce.build_schematic(creature_position, creature_velocity, this.get_angle_from_vertical()-this.starting_angle, this);
                        this.energy -= this.schematics_to_produce.energy_cost;
                        this.able_to_build = false;
                    }
                }
            }
        }
    }
    remove_bond_from_cell(bond_to_remove) {
        super.remove_bond_from_cell(bond_to_remove);
        this.able_to_build = true;
    }
    clone_cell() {
        return new Reproducer(this.mass, this.k, this.dampening, this.max_length, this.charge, this.sprite_material, this.sprite_diameter, this.x_0, this.energy_capacity, this.energy, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), this.anchor_bond_id, this.desired_angle, this.schematics_to_produce, this.schematics_to_produce_index);
    }
}

/*class Self_Reproducer extends Reproducer {
    constructor(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0 = 0, energy_capacity, energy = 0, position_vector = new THREE.Vector3(0, 0, 0), velocity_vector = new THREE.Vector3(0, 0, 0), anchor_bond_id, desired_angle = x_0, schematics_to_produce_index) {
        super(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0, energy_capacity, energy, position_vector, velocity_vector, anchor_bond_id, desired_angle = 0, something, schematics_to_produce_index);
    }
    update_cell() {
        if (this.anchor_bond != null){
            super.update_cell();
            if (this.output == 1){
                if (this.energy2 >= 1) {
                    let creature_position = this.position_vector.clone();
                    //creature_position.addScaledVector(this.direction, -radius);
                    let creature_velocity = this.velocity_vector.clone();
                    this.schematics_to_produce.build_schematic(creature_position, creature_velocity);
                    this.energy2 = 0;
                }
            }
        }
    }
    clone_cell() {
        return new Self_Reproducer(this.mass, this.k, this.dampening, this.max_length, this.charge, this.sprite_material, this.sprite_diameter, this.x_0, this.energy_capacity, this.energy, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), this.anchor_bond_id, this.desired_angle, this.schematics_to_produce_index);
    }
}*/

class Ejector_Cell extends Cell_With_Bond {
    constructor(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0 = 0, energy_capacity, energy = 0, position_vector = new THREE.Vector3(0, 0, 0), velocity_vector = new THREE.Vector3(0, 0, 0), anchor_bond_id) {
        super(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0, energy_capacity, energy, position_vector, velocity_vector, anchor_bond_id);
    }
    update_cell() {
        if (this.anchor_bond != null){
            if (this.output == 1) {
                this.anchor_bond.break_bond();
                this.anchor_bond = null;
            }
        }
    }
    clone_cell() {
        return new Ejector_Cell(this.mass, this.k, this.dampening, this.max_length, this.charge, this.sprite_material, this.sprite_diameter, this.x_0, this.energy_capacity, this.energy, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), this.anchor_bond_id);
    }
}