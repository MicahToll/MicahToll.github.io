//define ambiant sound
//var music = document.getElementById("myAudio");

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

function wheel(){
    zoom = Math.max(20, Math.min( zoom+event.deltaY/25, 500 ));//not sure why this has to be negative
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

let kirby_path = '../KirbyBulletHell/assets/kirby.png';
let kirby_bullet_path = '../KirbyBulletHell/assets/bullets/kirby_bullet.png';
let kirby_bullet_orange_path = '../KirbyBulletHell/assets/bullets/kirby_bullet_orange.png';
let kirby_bullet_lightblue_path = '../KirbyBulletHell/assets/bullets/kirby_bullet_lightblue.png';
const kirby_material = new THREE.SpriteMaterial( { map: new THREE.TextureLoader().load( kirby_path ) } );
const kirby_bullet_material = new THREE.SpriteMaterial( { map: new THREE.TextureLoader().load( kirby_bullet_path ) } );
const kirby_bullet_orange_material = new THREE.SpriteMaterial( { map: new THREE.TextureLoader().load( kirby_bullet_orange_path ) } );
const kirby_bullet_lightblue_material = new THREE.SpriteMaterial( { map: new THREE.TextureLoader().load( kirby_bullet_lightblue_path ) } );

//bond material
const bond_material_1 = new THREE.LineBasicMaterial( { color: 0x0000ff } );
const bond_material_2 = new THREE.LineBasicMaterial( { color: 0x00ff00 } );

let window_width;
let window_height;
let background_things = [];
let creatures = [];
let cells = [];
let bonds = [];
let friction = .1;
let radius = 5;
let universe_radius = 150;
let c_squared = 1;

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

    menu_onload();

    set_up_level1()
    set_up_level2();
    set_up_level3()
    gameloop(0);
}

let repel_dist_vector = new THREE.Vector3(0, 0, 0);

function gameloop(timestamp) {
    //update background
    for (thing of background_things){
        thing.update();
    }

    for (let i = bonds.length-1; i > 0-1; i--) {
        let bond = bonds[i];
        //console.log(i);
        bond.update_tensions(i);
        bond.update_outputs();
    }

    for (let i = 0; i < cells.length; i++) {
        let cell_1 = cells[i];
        cell_1.check_boundary_force();
        cell_1.update_cell();
        cell_1.update_outputs();
        for (let j = i+1; j < cells.length; j++) {
            let cell_2 = cells[j];
            repel_dist_vector.subVectors(cell_2.position_vector, cell_1.position_vector);
            cell_1.repel_cell(cell_2, repel_dist_vector);
        }
    }

    for (let i = 0; i < cells.length; i++) {
        let cell = cells[i];
        cell.update_position();
    }
    for (let i = 0; i < bonds.length; i++) {
        let bond = bonds[i];
        bond.update_position();
    }

    //time = timestamp;
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

class Schematic {//we are going to change this
    constructor(schematic_cells, bond_weights, bond_material, origin_point = [0, 0], schematic_name = "") {
        this.schematic_cells = schematic_cells;
        this.bond_weights = bond_weights;
        this.bond_material = bond_material;
        this.origin_point = origin_point;// in the form [x, y], indicates the coordinates of the builder cell is.
        this.schematic_name = schematic_name;
    }
    build_schematic(creature_position = new THREE.Vector3(0, 0, 0), creature_velocity = new THREE.Vector3(0, 0, 0)) {
        //instance of this
        let creature_cells = [];

        for (let y = 0; y < this.schematic_cells.length; y++) {
            creature_cells.push([]);
            for (let x = 0; x < this.schematic_cells[y].length; x++) {
                if (this.schematic_cells[y][x] != null) {
                    let current_cell = this.schematic_cells[y][x].clone_cell();//this now clones the cell and adds it to the creature cells array
                    creature_cells[y].push(current_cell);
                    current_cell.update_schematics(this, x, y);
                    current_cell.add_cell_to_simulation();
                    current_cell.position_vector.addScaledVector(x_basis, (x-this.origin_point[0])).addScaledVector(y_basis, -(y-this.origin_point[1])).add(creature_position);
                    //current_cell.position_vector.addScaledVector(x_basis, x-this.origin_point[0]).addScaledVector(y_basis, -(y-this.origin_point[1])).add(creature_position);
                    current_cell.velocity_vector.add(creature_velocity)
                } else {
                    creature_cells[y].push(null);
                }
            }
        }
        for (let y = 0; y < creature_cells.length; y++) {
            for (let x = 0; x < creature_cells[y].length; x++) {
                let current_cell = creature_cells[y][x];
                if (current_cell != null) {
                    for (let bond_key in this.bond_weights[y][x]) {
                        let bond = this.bond_weights[y][x][bond_key]
                        let x2 = bond[0];
                        let y2 = bond[1];
                        let weight_1 = bond[2];
                        let weight_2 = bond[3];
                        if (creature_cells[y2][x2] != null) {
                            this.build_bond(creature_cells, x, y, x2, y2, weight_1, weight_2);
                        }
                    }
                }
            }
        }
    }
    build_bond(creature_cells, current_x, current_y, connecting_x, connecting_y, weight_1, weight_2) {// returns the newly created bond
        let current_cell = creature_cells[current_y][current_x];
        let connecting_cell = creature_cells[connecting_y][connecting_x];
        let current_bond = new Bond(current_cell, connecting_cell, radius, this.bond_material, weight_1, weight_2);
        current_bond.add_bond_to_simulation();
        current_bond.check_directed_connection();
        return current_bond;
    }
}

class Cell {
    constructor(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0 = 0, position_vector = new THREE.Vector3(0, 0, 0), velocity_vector = new THREE.Vector3(0, 0, 0)) {
        this.mass = mass;
        this.k = k;//currently, k changes both spring force and charge
        this.dampening = dampening;
        this.max_length = max_length;
        this.charge = charge;//currently unused
        this.position_vector = position_vector;
        this.velocity_vector = velocity_vector;
        this.force_vector = new THREE.Vector3(0, 0, 0);
        this.sprite_material = sprite_material;
        this.sprite = new THREE.Sprite(sprite_material);
        this.sprite_diameter = sprite_diameter;
        this.sprite.scale.set(sprite_diameter, sprite_diameter, 1);
        this.sprite.position.copy(this.position_vector);
        //this.cell_bonds = [];
        this.input_total = 0;
        this.output = 0;
        this.x_0 = x_0;

        this.cell_schematics = null;
        this.x_index = 0;
        this.y_index = 0;
    }
    add_cell_to_simulation() {
        universe.add(this.sprite);
        cells.push(this);
    }
    update_schematics(cell_schematics, x_index = 0, y_index = 0) {//and index
        this.cell_schematics = cell_schematics;
        this.x_index = x_index;
        this.y_index = y_index;
    }
    update_position() {//and and add friction and reset force
        this.force_vector.addScaledVector(this.velocity_vector, -friction/60);

        this.velocity_vector.addScaledVector(this.force_vector, 1/60/this.mass);
        this.position_vector.addScaledVector(this.velocity_vector, 1/60);
        
        this.sprite.position.copy(this.position_vector);
        this.force_vector.set(0, 0, 0);
    }
    repel_cell(cell_2, repel_dist_vector) {
        let dist = repel_dist_vector.length();
        if (dist != 0 && dist < radius) {
            //let force = this.k*this.charge*cell_2.charge/(dist/radius)**2/dist;//this adds charge, a currently unused stat
            let force = this.charge*cell_2.charge/(dist)**3;// this is actually force times dist (so that dist gets divided out)
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
        }
        else {
            this.sprite.scale.set(this.sprite_diameter, this.sprite_diameter, 1);
        }
    }
    update_cell(){}
    //initialize_cell(){}
    
    delete_sprite() {//this function may be unfinished. check later
        universe.remove(this.sprite);
    }
    clone_cell() {
        return new Cell(this.mass, this.k, this.dampening, this.max_length, this.charge, this.sprite_material, this.sprite_diameter, this.x_0, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0));
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
        //this.cell_1.cell_bonds.push(this);
        //this.cell_2.cell_bonds.push(this);

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
        this.break_list = [];
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
            this.break_bond(i);
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
            this.break_list.push(this.cell_1);
        }
        if (this.cell_2 instanceof Cell_With_Bond && this.cell_2.anchor_bond_id == this.bond_id) {
            this.cell_2.update_anchor(this);
            this.break_list.push(this.cell_2);
        }
    }
    update_position() {
        this.line.position.copy(this.cell_1.position_vector);

        this.line_vertices.setX(1, this.dist_vector.x);
        this.line_vertices.setY(1, this.dist_vector.y);
        this.line_vertices.needsUpdate = true;
    }
    break_bond(i) {
        this.broken = true;
        universe.remove(this.line);
        bonds.splice(i, 1);
    }
    /*set_weights(weight, from_x, from_y) {
        this.line.material = bond_material_2;
        if (from_x == this.cell_1.x_index && from_y == this.cell_1.y_index) {
            this.cell_2_weight = weight;
        } else if (from_x == this.cell_2.x_index && from_y == this.cell_2.y_index) {
            this.cell_2_weight = weight;
        } else {
            console.log("this bond is not connected to this cell at " + to_x + ", " + to_y);
        }
    }*/
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
    constructor(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0 = 0, position_vector = new THREE.Vector3(0, 0, 0), velocity_vector = new THREE.Vector3(0, 0, 0), anchor_bond_id) {
        super(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0, position_vector, velocity_vector);
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
        return new Cell_With_Bond(this.mass, this.k, this.dampening, this.max_length, this.charge, this.sprite_material, this.sprite_diameter, this.x_0, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), this.anchor_bond_id);
    }
}

class Directed_Cell extends Cell_With_Bond {
    constructor(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0 = 0, position_vector = new THREE.Vector3(0, 0, 0), velocity_vector = new THREE.Vector3(0, 0, 0), anchor_bond_id, desired_angle = 0) {//angle measured from vertical
        super(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0, position_vector, velocity_vector, anchor_bond_id);
        this.direction = new THREE.Vector3(0, 1, 0);
        this.desired_angle = desired_angle;
    }
    update_anchor(anchor_bond) {
        this.anchor_bond = anchor_bond;
        if (this.anchor_bond.cell_1.x_index == this.x_index && this.anchor_bond.cell_1.y_index == this.y_index) {
            this.anchor_cell = this.anchor_bond.cell_2;
        } else {
            this.anchor_cell = this.anchor_bond.cell_1;
        }
    }
    update_direction() {
        if (this.anchor_bond != null) {//this check might be redundant
            if (!this.anchor_bond.broken){
                this.direction.subVectors(this.position_vector, this.anchor_cell.position_vector);
                this.direction.normalize().negate();
                //this.direction.applyAxsiAngle(z_axis, desired_angle);
            } else {
                this.anchor_bond = null;
                this.anchor_cell = null;
            }
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
        return new Directed_Cell(this.mass, this.k, this.dampening, this.max_length, this.charge, this.sprite_material, this.sprite_diameter, this.x_0, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), this.anchor_bond_id, this.desired_angle);
    }
}

let planks_constant = 60;
class Photon_Cell extends Cell {
    constructor(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0 = 0, position_vector = new THREE.Vector3(0, 0, 0), velocity_vector = new THREE.Vector3(0, 0, 0), energy) {
        super(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0, position_vector, velocity_vector)
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
}

class Player_Cell extends Cell { //there should only ever be one player vector (unless I add split screen)
    constructor(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0 = 0, position_vector = new THREE.Vector3(0, 0, 0), velocity_vector = new THREE.Vector3(0, 0, 0)) {
        super(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0, position_vector, velocity_vector);
    }
    update_cell() {
        camera.position.setX(this.position_vector.x);
        camera.position.setY(this.position_vector.y);
    }
    clone_cell() {//this function should probably only be called once tops. (unless I add split screen)
        return new Player_Cell(this.mass, this.k, this.dampening, this.max_length, this.charge, this.sprite_material, this.sprite_diameter, this.x_0, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0));
    }
}

class Key_Cell extends Cell {
    constructor(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0 = 0, position_vector = new THREE.Vector3(0, 0, 0), velocity_vector = new THREE.Vector3(0, 0, 0), key) {
        super(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0, position_vector, velocity_vector);
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
        return new Key_Cell(this.mass, this.k, this.dampening, this.max_length, this.charge, this.sprite_material, this.sprite_diameter, this.x_0, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), this.key);
    }
}

class Toggle_Cell extends Cell {
    constructor(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0 = 0, position_vector = new THREE.Vector3(0, 0, 0), velocity_vector = new THREE.Vector3(0, 0, 0), key) {
        super(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0, position_vector, velocity_vector);
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
        return new Toggle_Cell(this.mass, this.k, this.dampening, this.max_length, this.charge, this.sprite_material, this.sprite_diameter, this.x_0, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0));
    }
}

class Pulse_Cell extends Cell {
    constructor(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0 = 0, position_vector = new THREE.Vector3(0, 0, 0), velocity_vector = new THREE.Vector3(0, 0, 0), key) {
        super(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0, position_vector, velocity_vector);
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
        return new Toggle_Cell(this.mass, this.k, this.dampening, this.max_length, this.charge, this.sprite_material, this.sprite_diameter, this.x_0, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0));
    }
}

class Propulsor extends Directed_Cell {
    constructor(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0 = 0, position_vector = new THREE.Vector3(0, 0, 0), velocity_vector = new THREE.Vector3(0, 0, 0), anchor_bond_id, desired_angle = 0, propulsion) {
        super(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0, position_vector, velocity_vector, anchor_bond_id, desired_angle)
        this.propulsion = propulsion;//(does this mean that these points must have an orientation?)
    }
    update_cell(){
        if (this.anchor_bond != null){
            super.update_cell();
            if (this.output == 1){
                this.force_vector.addScaledVector(this.direction, this.propulsion);
            }
        }
    }
    clone_cell() {
        return new Propulsor(this.mass, this.k, this.dampening, this.max_length, this.charge, this.sprite_material, this.sprite_diameter, this.x_0, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), this.anchor_bond_id, this.desired_angle, this.propulsion);
    }
}

/*class blank extends Cell {

}*/

/*class Energy_Storage extends Cell {
    constructor(mass, k, length, max_length, charge, position_vector, sprite_material, velocity_vector = new THREE.Vector3(0, 0, 0), energy_capacity) {
        super(mass, k, length, max_length, charge, position_vector, sprite_material, velocity_vector);
        this.energy_capacity = energy_capacity;
    }
    init
}*/

/*class Energy_Generator extends Cell {
    constructor(mass, k, length, max_length, charge, position_vector, sprite_material, velocity_vector = new THREE.Vector3(0, 0, 0), energy_generation) {
        super(mass, k, length, max_length, charge, position_vector, sprite_material, velocity_vector);
        this.energy_generation = energy_generation;
    }
    update_cell() {
        if (parent_creature != null){
            parent_creature.change_energy(this.energy_generation);
        }
    }
}*/
/*[
    [new Cell(1, k, radius, 2*radius, 1, kirby_bullet_orange_material), null],
    [new Cell(1, k, radius, 2*radius, 1, kirby_bullet_orange_material), new Cell(1, k, radius, 2*radius, 1, kirby_bullet_orange_material)],
    [null, new Cell(1, k, radius, 2*radius, 1, kirby_bullet_orange_material)]
]*/
class Reproducer extends Directed_Cell {
    constructor(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0 = 0, position_vector = new THREE.Vector3(0, 0, 0), velocity_vector = new THREE.Vector3(0, 0, 0), anchor_bond_id, schematics_to_produce, schematics_to_produce_index) {
        super(mass, k, dampening, max_length, charge, sprite_material, sprite_diameter, x_0, position_vector, velocity_vector, anchor_bond_id, 0);
        this.schematics_to_produce = schematics_to_produce;
        this.schematics_to_produce_index = schematics_to_produce_index;
        this.energy = 1;
    }
    update_cell(){
        if (this.anchor_bond != null){
            super.update_cell();
            if (this.output == 1){
                if (this.energy >= 1) {
                    let creature_position = this.position_vector.clone();
                    //creature_position.addScaledVector(this.direction, -radius);
                    let creature_velocity = this.velocity_vector.clone();
                    this.schematics_to_produce.build_schematic(creature_position, creature_velocity);
                    this.energy = 0;
                }
            }
        }
    }
    clone_cell() {
        return new Reproducer(this.mass, this.k, this.dampening, this.max_length, this.charge, this.sprite_material, this.sprite_diameter, this.x_0, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), this.anchor_bond_id, this.schematics_to_produce, this.schematics_to_produce_index);
    }
}

/*class Ejector extends Cell {
    constructor(mass, k, length, max_length, charge, position_vector, sprite_material, velocity_vector = new THREE.Vector3(0, 0, 0), ejection_energy, bonds_to_eject) {
        super(mass, k, length, max_length, charge, position_vector, sprite_material, velocity_vector);
        this.ejection_energy = ejection_energy;
        this.bonds_to_eject = bonds_to_eject
    }
    update_cell() {
        if (parent_creature != null){
            parent_creature.change_energy(this.energy_generation);
        }
    }
    eject() {//this doesn't work yet
        for (let bond of bonds_to_eject) {
            bond.break_bond();
        }
    }
}*/

/*class Sticky_Cell extends Cell {
    constructor(mass, k, length, max_length, charge, position_vector, sprite_material, velocity_vector = new THREE.Vector3(0, 0, 0), ejection_energy) {
        super(mass, k, length, max_length, charge, position_vector, sprite_material, velocity_vector);
        this.ejection_energy = ejection_energy;
    }
    update_cell() {
        if (parent_creature != null){
            parent_creature.change_energy(this.energy_generation);
        }
    }
}*/