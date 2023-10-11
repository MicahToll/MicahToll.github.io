//define ambiant sound
//var music = document.getElementById("myAudio");

//keyboard variables, 
class Key {
    constructor() {
        this.value = false;
        /*this.w = false;
        this.a = false;
        this.s = false;
        this.d = false;
        this.q = false;
        this.e = false;
        this.space = false;*/
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


const kirby_map = new THREE.TextureLoader().load( '../KirbyBulletHell/assets/kirby.png' );
const kirby_bullet_map = new THREE.TextureLoader().load( '../KirbyBulletHell/assets/bullets/kirby_bullet.png' );
const kirby_bullet_orange_map = new THREE.TextureLoader().load( '../KirbyBulletHell/assets/bullets/kirby_bullet_orange.png' );
const kirby_bullet_lightblue_map = new THREE.TextureLoader().load( '../KirbyBulletHell/assets/bullets/kirby_bullet_lightblue.png' );
const kirby_material = new THREE.SpriteMaterial( { map: kirby_map } );
const kirby_bullet_material = new THREE.SpriteMaterial( { map: kirby_bullet_map } );
const kirby_bullet_orange_material = new THREE.SpriteMaterial( { map: kirby_bullet_orange_map } );
const kirby_bullet_lightblue_material = new THREE.SpriteMaterial( { map: kirby_bullet_lightblue_map } );

//bond material
const bond_material_1 = new THREE.LineBasicMaterial( { color: 0x0000ff } );

let creatures = [];
let cells = [];
let bonds = [];
let friction = 1;
let charge = 1;
let radius = 5;
let k = 5;
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

    /*const kirby_map = new THREE.TextureLoader().load( 'assets/kirby.png' );
    const kirby_material = new THREE.SpriteMaterial( { map: kirby_map } );
    kirby = new THREE.Sprite( kirby_material );
    kirby.scale.set(player_radius*2, player_radius*2, 1);
    kirby.position.y = -camera_height/4
    universe.add( kirby );*/

    set_up_level2();
    gameloop(0);
}

let repel_dist_vector = new THREE.Vector3(0, 0, 0);

function gameloop(timestamp) {
    //update background
    /*for (thing of background_things){
        thing.update();
    }*/

    for (let i = bonds.length-1; i > 0-1; i--) {
        let bond = bonds[i];
        //console.log(i);
        bond.update_tensions(i);
        bond.update_outputs();
    }

    for (let i = 0; i < cells.length; i++) {
        let cell_1 = cells[i];
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
*/

class Schematic {//we are going to change this
    constructor(creature_cells, bond_material) {
        this.creature_cells = creature_cells;
        this.bond_material = bond_material;
    }
    build_schematic(creature_position = new THREE.Vector3(0, 0, 0), creature_velocity = new THREE.Vector3(0, 0, 0)) {
        for (let y = 0; y < this.creature_cells.length; y++) {
            for (let x = 0; x < this.creature_cells[y].length; x++) {
                let current_cell = this.creature_cells[y][x];
                if (current_cell != null){
                    current_cell.update_schematics(this, x, y);
                    current_cell.add_cell_to_simulation();
                    current_cell.position_vector.addScaledVector(x_basis, x).addScaledVector(y_basis, -y).add(creature_position);
                    console.log(current_cell.velocity_vector);
                    current_cell.velocity_vector.add(creature_velocity)
                }
            }
        }
        for (let y = 0; y < this.creature_cells.length; y++) {
            for (let x = 0; x < this.creature_cells[y].length; x++) {
                let current_cell = this.creature_cells[y][x];
                if (current_cell != null){
                    if ( (x+1 <= this.creature_cells[y].length) && this.creature_cells[y][x+1] != null){
                        let current_bond_1 = new Bond(current_cell, this.creature_cells[y][x+1], this.bond_material);
                        current_bond_1.add_bond_to_simulation();
                        current_bond_1.update_index(2*x+1, 2*y);
                        current_bond_1.check_directed_connection();
                    }
                    if ( y+1 < this.creature_cells.length ){
                        if ( ( x+1 < this.creature_cells[y].length ) && this.creature_cells[y+1][x+1] != null) {
                            let current_bond_2 = new Bond(current_cell, this.creature_cells[y+1][x+1], this.bond_material);
                            current_bond_2.add_bond_to_simulation();
                            current_bond_2.update_index(2*x+1, (2*y+1));
                            current_bond_2.check_directed_connection();
                        }
                        if (this.creature_cells[y+1][x] != null) {
                            let current_bond_3 = new Bond(current_cell, this.creature_cells[y+1][x], this.bond_material);
                            current_bond_3.add_bond_to_simulation();
                            current_bond_3.update_index(2*x, (2*y+1));
                            current_bond_3.check_directed_connection();
                        }
                    }
                }
            }
        }
    }
    /*build_bond(current_cell, connecting_x, connecting_y) {
        let connecting_cell = this.creature_cells[connecting_y][connecting_x];
        let current_bond = new Bond(current_cell, this.creature_cells[y+1][x], this.bond_material);
        current_bond.add_bond_to_simulation();
        current_bond.update_index(2*x, (2*y+1));
    }*/
}

class Cell {
    constructor(mass, k, bond_length, max_length, charge, sprite_material, sprite_diameter, position_vector = new THREE.Vector3(0, 0, 0), velocity_vector = new THREE.Vector3(0, 0, 0)) {
        this.mass = mass;
        this.k = k;//currently, k changes both spring force and charge
        this.bond_length = bond_length;
        this.max_length = max_length;
        this.charge = charge;//currently unused
        this.position_vector = position_vector;
        this.velocity_vector = velocity_vector;
        this.force_vector = new THREE.Vector3(0, 0, 0);
        this.sprite = new THREE.Sprite(sprite_material);
        this.sprite_diameter = sprite_diameter;
        this.sprite.scale.set(sprite_diameter, sprite_diameter, 1);
        this.sprite.position.copy(this.position_vector);
        //this.cell_bonds = [];
        this.input_total = 0;
        this.output = 0;
        this.x_0 = 0;

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
        if (dist != 0) {
            //let force = this.k*this.charge*cell_2.charge/(dist/radius)**2/dist;//this adds charge, a currently unused stat
            let force = this.k/(dist/radius)**2/dist;// this is actually force times dist (so that dist gets divided out)

            this.force_vector.addScaledVector(repel_dist_vector, -force);
            cell_2.force_vector.addScaledVector(repel_dist_vector, force);
        }
    }
    update_outputs() {
        if (this.input_total > this.x_0) {
            this.output = 1;
        }
        else {
            this.output = 0;
        }
        this.input_total = 0;
    }
    update_cell(){}
    //initialize_cell(){}
    
    delete_sprite() {//this function may be unfinished. check later
        universe.remove(this.sprite);
    }
    clone_cell() {
        return new Cell(this.mass, this.k, this.bond_length, this.max_length, this.charge, this.sprite_material, this.sprite_diameter, this.position_vector, this.velocity_vector);
    }
}

class Bond {
    constructor(cell_1, cell_2, bond_material){ //, cell_1_weight = 0, cell_2_weight = 0) {
        this.k = ( cell_1.k + cell_2.k )/2;
        //this.dampening = ( cell_1.dampening + cell_2.dampening )/2;
        this.bond_length = ( cell_1.bond_length + cell_2.bond_length )/2;
        this.max_length = ( cell_1.max_length + cell_2.max_length )/2;
        this.cell_1 = cell_1;
        this.cell_2 = cell_2;
        this.broken = false;
        this.geometry = new THREE.BufferGeometry().setFromPoints([cell_1.position_vector, cell_2.position_vector]);
        this.bond_material = bond_material;
        this.line = new THREE.Line( this.geometry, this.bond_material );
        this.line_vertices = this.geometry.getAttribute( 'position' );
        this.line_vertices.setX(0, 0);
        this.line_vertices.setY(0, 0);
        //this.cell_1.cell_bonds.push(this);
        //this.cell_2.cell_bonds.push(this);
        //this.cell_1_weight = cell_1_weight;
        //this.cell_2_weight = cell_2_weight;
  //      this.cell_1_weighted_output = 0;
  //      this.cell_2_weighted_output = 0;
        this.dist_vector = new THREE.Vector3(0, 0, 0);//cell_2_pos - cell_1_pos
        //add an if statement here to add the bond to directed cells. (also could add to a break list...)
        this.break_list = [];
    }
    add_bond_to_simulation() {
        universe.add(this.line);
        bonds.push(this)
    }
    update_tensions(i) {
        this.dist_vector.subVectors(this.cell_2.position_vector, this.cell_1.position_vector);
        if (this.dist_vector.length() > this.max_length) {
            this.break_bond(i);
        }
        else {
            this.cell_2.force_vector.addScaledVector(this.dist_vector, -this.k/radius);
            this.cell_1.force_vector.addScaledVector(this.dist_vector, this.k/radius);
        }
    }
    update_index(x_index, y_index) {//the given indeces will be doubled to keep everything an int 
        this.x_index = x_index;
        this.y_index = y_index;
    }
    check_directed_connection() {
        //console.log((this.cell_1 instanceof Directed_Cell) + " x: " + this.x_index + " y: " + this.y_index)
        //console.log((this.cell_2 instanceof Directed_Cell) + " x: " + this.x_index + " y: " + this.y_index)
        if (this.cell_1 instanceof Directed_Cell && this.cell_1.anchor_bond_index[0] == this.x_index && this.cell_1.anchor_bond_index[1] == this.y_index) {
            this.cell_1.update_anchor(this);
            this.break_list.push(this.cell_1);
        }
        if (this.cell_2 instanceof Directed_Cell && this.cell_2.anchor_bond_index[0] == this.x_index && this.cell_2.anchor_bond_index[1] == this.y_index) {
            this.cell_2.update_anchor(this);
            this.break_list.push(this.cell_2);
        }
    }
    update_position() {
        this.line.position.copy(this.cell_1.position_vector);

        this.line_vertices.setX(1, this.dist_vector.x);
        this.line_vertices.setY(1, this.dist_vector.y);
        //this.line_vertices.setX(0, this.cell_1.position_vector.x);//this is the old version that would disappear (from culling) when the object traveled to far from initial position
        //this.line_vertices.setY(0, this.cell_1.position_vector.y);
        //this.line_vertices.setX(1, this.cell_2.position_vector.x);
        //this.line_vertices.setY(1, this.cell_2.position_vector.y);

        this.line_vertices.needsUpdate = true;
    }
    break_bond(i) {
        this.broken = true;
        universe.remove(this.line);
        bonds.splice(i, 1);
    }
    update_outputs() {
        this.cell_2.input_total += this.cell_1_weight * this.cell_1.output;
        this.cell_1.input_total += this.cell_2_weight * this.cell_2.output;
    }
}

/*let angle_decoder = [//[y][x]
    [0, -150, 150],
    [-90, 0, 90],
    [-30, 30, 0]
]*/

class Directed_Cell extends Cell {
    constructor(mass, k, bond_length, max_length, charge, sprite_material, sprite_diameter, position_vector = new THREE.Vector3(0, 0, 0), velocity_vector = new THREE.Vector3(0, 0, 0), anchor_bond_index, desired_angle = 0) {//angle measured from vertical
        super(mass, k, bond_length, max_length, charge, sprite_material, sprite_diameter, position_vector, velocity_vector)
        this.direction = new THREE.Vector3(0, 1, 0);
        this.anchor_bond_index = anchor_bond_index;
        this.desired_angle = desired_angle;
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
    update_cell() {
        this.update_direction();
    }
    clone_cell() {
        return new Cell(this.mass, this.k, this.bond_length, this.max_length, this.charge, this.sprite_material, this.sprite_diameter, this.position_vector, this.velocity_vector, this.anchor_bond_index, this.desired_angle);
    }
}

class Player_Cell extends Cell { //there should only ever be one player vector (unless I add split screen)
    constructor(mass, k, bond_length, max_length, charge, sprite_material, sprite_diameter, position_vector = new THREE.Vector3(0, 0, 0), velocity_vector = new THREE.Vector3(0, 0, 0)) {
        super(mass, k, bond_length, max_length, charge, sprite_material, sprite_diameter, position_vector, velocity_vector);
    }
    update_cell() {
        camera.position.setX(this.position_vector.x);
        camera.position.setY(this.position_vector.y);
    }
}

class Key_Cell extends Cell {
    constructor(mass, k, bond_length, max_length, charge, sprite_material, sprite_diameter, position_vector = new THREE.Vector3(0, 0, 0), velocity_vector = new THREE.Vector3(0, 0, 0), key) {
        super(mass, k, bond_length, max_length, charge, sprite_material, sprite_diameter, position_vector, velocity_vector);
        this.key = key;
    }
    update_cell() {
        if (this.key.value) {
            this.output = 1;    
        }
        else {
            this.output = 0;
        }
    }
}

class Propulsor extends Directed_Cell {
    constructor(mass, k, bond_length, max_length, charge, sprite_material, sprite_diameter, position_vector = new THREE.Vector3(0, 0, 0), velocity_vector = new THREE.Vector3(0, 0, 0), anchor_bond_index, desired_angle = 0, propulsion) {
        super(mass, k, bond_length, max_length, charge, sprite_material, sprite_diameter, position_vector, velocity_vector, anchor_bond_index, desired_angle)
        this.propulsion = propulsion;//(does this mean that these points must have an orientation?)
    }
    update_cell(){
        if (this.anchor_bond != null){
            super.update_cell();
            this.force_vector.addScaledVector(this.direction, this.propulsion);
        }
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
class Reproducer extends Cell {
    constructor(mass, k, length, max_length, charge, position_vector, sprite_material, sprite_diameter, velocity_vector = new THREE.Vector3(0, 0, 0), cell_schematics) {
        super(mass, k, length, max_length, charge, position_vector, sprite_material, sprite_diameter, velocity_vector);
        this.cell_schematics = cell_schematics;
        this.cell_schematics_index = cell_schematics_index;
    }
    reproduce() {
        
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

function set_up_level2() {/*
    let schematic_1_cells = [
        [new Cell(1, k, radius, 2*radius, 1, kirby_bullet_orange_material, 1), null],
        [new Cell(1, k, radius, 2*radius, 1, kirby_bullet_orange_material, 1), new Cell(1, k, radius, 2*radius, 1, kirby_bullet_orange_material, 1)],
        [null, new Cell(1, k, radius, 2*radius, 1, kirby_bullet_orange_material, 1)]
    ]
    let schematic_1 = new Schematic(schematic_1_cells, bond_material_1)
    schematic_1.build_schematic(new THREE.Vector3(-50, -25, 0));
*/
    let schematic_2_cells = [
        [new Cell(1, k, radius, 2*radius, 1, kirby_bullet_material, 1), null],
        [new Cell(1, k, radius, 2*radius, 1, kirby_bullet_material, 1), new Cell(1, k, radius, 2*radius, 1, kirby_bullet_material, 1)],
        [null, new Cell(1, k, radius, 2*radius, 1, kirby_bullet_material, 1)]
    ]
    let schematic_2 = new Schematic(schematic_2_cells, bond_material_1)
    schematic_2.build_schematic(new THREE.Vector3(0, 0, 0));

    anchor_bond_index_3 = [2, 3];
    let schematic_3_cells = [
        [new Cell(1, k, radius, 2*radius, 1, kirby_bullet_orange_material, 1), null],
        [new Player_Cell(1, k, radius, 2*radius, 1, kirby_material, 2), new Cell(1, k, radius, 2*radius, 1, kirby_bullet_orange_material, 1)],
        //[null, new Cell(1, k, radius, 2*radius, 1, kirby_bullet_orange_material, 1), null]
        [null, new Propulsor(1, k, radius, 2*radius, 1, kirby_bullet_orange_material, 1, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), anchor_bond_index_3, 0, 10)]
    ]
    let schematic_3 = new Schematic(schematic_3_cells, bond_material_1)
    schematic_3.build_schematic(new THREE.Vector3(50, 1, 0), new THREE.Vector3(0, 0, 0));
}

/*class Neuron {
    constructor(inputs, outputs) {
        this.inputs = [];
        this.outputs = [];
        this.x_0 = 0;//this is the center of the activation logistic curve
        this.current_activation_level = 0;
    }
    avtivation_function(x) {
        return 1/( 1 + Math.E**( -(x-this.x_0) ) )//return 1/( 1 + Math.E**( -logistic_k*(x-this.x_0) ) )
    }
}*/

//currently assuming all 
class Bullet{
    constructor(radius, vectors, material, damage){
        this.radius = radius;
        this.vectors = vectors;
        this.dimensions = vectors.length;
        this.damage = damage;
        this.sprite = new THREE.Sprite(material);
        this.sprite.scale.set(radius*2, radius*2, 1);
        universe.add(this.sprite);
    }
    update_bullet(){
        let v = this.vectors;
        let d = this.dimensions;
        if (d>1){
            for (var i = d-1;i>0;i--){
                v[i-1][0] += v[i][0];
                v[i-1][1] += v[i][1];
            }
            this.sprite.position.x = v[0][0];
            this.sprite.position.y = v[0][1];
        }
    }
    check_collision(){
        if ((this.sprite.position.x-player_x)**2+(this.sprite.position.y-player_y)**2 < (this.radius+player_radius)**2){
            health -= this.damage;
            update_dash();
            return true;
        } else {
            return false;
        }
    }
    check_onscreen(){
        if (Math.abs(this.sprite.position.x)+this.radius>camera_width/2||Math.abs(this.sprite.position.y)+this.radius>camera_height/2){
            return true;
        }
        else {
            return false;
        }
    }
    delete_sprite(){
        universe.remove(this.sprite);
    }
}
class Kirby_bullet extends Bullet{
    check_collision(){
        //return false
        let x_pos = this.sprite.position.x;
        let y_pos = this.sprite.position.y;
        for (var i = all_enemies.length; i--;) {
            let enemy = all_enemies[i];
            if ((x_pos-enemy.x)**2+(y_pos-enemy.y)**2 < (this.radius+enemy.radius)**2){
                enemy.hp -= this.damage;
                if (enemy.check_health()){
                    enemy.delete_sprite();
                    all_enemies.splice(i, 1);
                }
                return true;
            }
        }
        return false;
    }
}

class Enemy{//radius, vectors, geometry
    constructor(material, hp, radius, update, bullet_materials, damage = 1, init_x = 0, init_y = 0){
        this.hp = hp;
        this.radius = radius;
        //this.period = period;
        //this.movement = movement;
        //this.rotation = rotation;
        this.bullet_materials = bullet_materials;
        this.sprite = new THREE.Sprite(material);
        this.sprite.scale.set(radius*2, radius*2, 1);
        this.damage = damage;
        universe.add(this.sprite);
        this.update = update;
        this.state = 0;
        this.frame_count = 0;
        this.x = init_x;
        this.y = init_y;
        this.move();
    }
    update(){}
    move(){
        this.sprite.position.x=this.x;
        this.sprite.position.y=this.y;
    }
    /*move(){
        this.graphics.x = half_window_width*Math.cos(time*2*Math.PI/this.period);
        this.graphics.y = 0;
        //this.graphics.y = half_window_height;
        for (a of movement.x.a){
            //something
        }
        something = movement.x.a[0]/2 + Math.cos() + Math.sin()
        //do something  
    }*/
    /*rotate(){}*/
    /*shoot(){
        if (Math.cos(time*2*Math.PI/(this.period/8))**2<.05){
            all_bullets.push(new Bullet(10, [[this.graphics.x,-half_window_height/2],[.3,.2],[0,.01]], this.bullet_geometry));
        }
    }*/
    check_collision(){
        if ((this.sprite.position.x-player_x)**2+(this.sprite.position.y-player_y)**2 < (this.radius+player_radius)**2){
            health -= this.damage;
            update_dash();
            return true;
        } else {
            return false;
        }
    }
    check_health(){
        if (this.hp <= 0){
            return true;
        }
    }
    delete_sprite(){
        universe.remove(this.sprite);
    }
}

class Background {
    constructor(update,mesh){
        this.update = update;
        this.mesh = mesh;
        background.add(this.mesh);
    }
    update(){}
    /*delete_sprite(){
        background.remove(this.sprite);
    }*/
}


/*
//level 1
*/
function set_up_level1() {
    const vertices = [];
    for ( let i = 0; i < 1000; i ++ ) {
        const x = THREE.MathUtils.randFloatSpread( 500 );
        const y = THREE.MathUtils.randFloatSpread( 500 );
        const z = THREE.MathUtils.randFloatSpread( 500 );

        vertices.push( x, y, z );
    }
    var starGeometry = new THREE.BufferGeometry();
	starGeometry.setAttribute('position', new THREE.Float32BufferAttribute( vertices, 3 ));
	var starMaterial = new THREE.PointsMaterial({color:0x888888})
	var stars = new THREE.Points( starGeometry, starMaterial );
	background.add(stars);

    let planel1_geometry = new THREE.IcosahedronGeometry(75);
    let planel1_edges = new THREE.EdgesGeometry( planel1_geometry );
    let planel1_material = new THREE.LineBasicMaterial( { color: 0x00ff00 } );
    const planet1_line = new THREE.LineSegments( planel1_edges, planel1_material);
    background_things.push(new Background(function(){
        this.mesh.rotation.z -= .0005;
        this.mesh.rotation.y += .001;
    }, planet1_line));

    let b_bullet_map = new THREE.TextureLoader().load( 'assets/bullets/bbullet.png' );
    let b_bullet_material = new THREE.SpriteMaterial( { map: b_bullet_map } );
    let dark_matter_map = new THREE.TextureLoader().load( 'assets/enemies/darkmatter.png' );
    let dark_matter_material = new THREE.SpriteMaterial( { map: dark_matter_map } );
    let dark_matter_tear_map = new THREE.TextureLoader().load( 'assets/bullets/darkmattertear.png' );
    let dark_matter_tear_material = new THREE.SpriteMaterial( { map: dark_matter_tear_map } );

    all_enemies.push(new Enemy(
        dark_matter_material, 1000, 8, function(){
            if(this.state == 0) {//phase 1
                this.x = camera_width/2*3/4*Math.sin(Math.PI/60/4*this.frame_count)
                if(this.frame_count%4==0){
                    all_bullets.push(new Bullet(1, [[this.x,this.y],[0,-.5]], this.bullet_materials[0],10));
                }
                this.move();
                this.frame_count++
                if(this.frame_count >= 10*60){
                    this.state = 1;
                }
            }
            else if(this.state == 1){//phase 2
                this.x = camera_width/2*3/4*Math.sin(Math.PI/60/4*this.frame_count)
                this.y = 25+camera_width/6*3/4*Math.sin(Math.PI/60/3*this.frame_count)
                if(this.frame_count%4==0){
                    all_bullets.push(new Bullet(1, [[this.x,this.y],[0,-.5]], this.bullet_materials[1],15));
                }
                this.move();
                this.frame_count++
            }
        }, [
            b_bullet_material,
            dark_matter_tear_material
        ], 1, 0, 25));

    background.position.z = -200;//offset
    //move_background = function() { background.position.y -= .1 }//translate
    move_background = function() { background.rotation.x += .001 }//rotate

    //music.play();
}