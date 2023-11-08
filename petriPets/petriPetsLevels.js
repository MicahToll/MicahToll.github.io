/*notes for me:
every schematic needs a build from point (could be considered 0,0?). this is the point of the edge of the schematic that the builder/reproducer particle would be located.
every schematic will be considered to have the same orentation as one another. 
therefore: these are the inputs that I require from the user:
Bonds:
    bonds off the edge,
    long bonds,
    short bonds,
    bond weights,
Cells:
    cells
    origin point

cell parameters:
    anchor bond,
    numicial parameters
    keys, (maybe just a char? radio button?)
    schematic
function get_parameters() {

}


part_attributes are in the form [{"name":"", "type":"text, number, bond, schematics, key", "default_value": default_value}, ...]
*/
//function that given a few parameters returns the cell... seems good. how do I get icon

class Part {
    constructor(part_name, cost, icon_path = kirby_bullet_path, part_attributes = [], number_owned = 0) {
        this.part_name = part_name;
        this.cost = cost;
        this.icon_path = icon_path;
        this.part_attributes = part_attributes;
        this.number_owned = number_owned;
        this.number_available = number_owned;
    }
}

let mass = 1;
let spring_dampening = 75;
let charge = Math.sqrt(2500/2);//doesn't do anything currently
let k = 50;
let max_length = 1.5;//proportion of target length -- should I change how k works to be dependent on length? probably...
let engine_power = 25;

let key_decoder = {
    "w": w_key,
    "a": a_key,
    "s": s_key,
    "d": d_key,
    "q": q_key,
    "e": e_key
};

let available_parts = [
    new Part("basic part", 5, kirby_bullet_path, [], 5),
    new Part("basic player part", 25, kirby_path, [], 1),
    new Part("propulsor", 25, kirby_bullet_orange_path, [{"name":"anchor_bond_index", "type":"bond", "default_value": [0,0]}], 5),
    new Part("inverse propulsor", 25, kirby_bullet_orange_path, [{"name":"anchor_bond_index", "type":"bond", "default_value": [0,0]}], 5),
    new Part("key board input", 15, kirby_bullet_lightblue_path, [{"name":"key", "type":"key", "default_value":'w'}], 5),
    new Part("sensor", 20, eye_cell_path, [], 3),
    new Part("eye cell", 20, eye_cell_path, [{"name":"anchor_bond_index", "type":"bond", "default_value": [0,0]}], 3),
    new Part("builder", 25),
    new Part("sticky", 20, sticky_cell_path, [], 3),
    new Part("absorber", 20, absorber_cell_path, [], 3),
    new Part("explosive", 25, bomb_cell_path, [{"name":"explostion_radius", "type":"number", "default_value": 1/2}, {"name":"fragments", "type":"number", "default_value":4}], 5),
    new Part("heavy basic part", 20, gordo_path, [], 3),
    new Part("pulse", 30, pulse_cell_path, [], 3),
    new Part("toggle", 15, toggle_cell_path, [], 3),
    new Part("derivative", 15, toggle_cell_path, [], 3),
    new Part("generator", 30, generator_cell_path, [], 3),
    new Part("energy_cell", 15, energy_storage_cell_path, [], 3),
    //new Part("shield", 30, shield_cell_path, [], 1),
    new Part("player sensor", 30, kirby_bullet_lightblue_path, [{"name":"anchor_bond_index", "type":"bond", "default_value": [0,0]}], 1),
    new Part("fixed cell", 30, fixed_cell_path, [], 5),
    new Part("muscle cell", 30, shield_cell_path, [{"name":"anchor_bond_index", "type":"bond", "default_value": [0,0]}], 5),
    new Part("inverse muscle cell", 30, shield_cell_path, [{"name":"anchor_bond_index", "type":"bond", "default_value": [0,0]}], 5),
    new Part("ejector", 25, kirby_bullet_orange_path, [{"name":"anchor_bond_index", "type":"bond", "default_value": [0,0]}], 5)
];

let available_parts_functions = {
    "basic part": function(part_attributes) {
        return new Cell(mass, k, spring_dampening, max_length, charge, kirby_bullet_material, 1, 0, 10, 0)
    },
    "basic player part": function(part_attributes) {
        return new Player_Cell(mass, k, spring_dampening, max_length, charge, kirby_material, 2, 0, 10, 0)
    },
    "propulsor": function(part_attributes) {
        let anchor_bond_index = part_attributes[0];//kirby_bullet_orange_material
        return new Propulsor(mass, k, spring_dampening, max_length, charge, kirby_bullet_orange_material, 1, 0, 10, 0, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), anchor_bond_index, 0, engine_power);
    },
    "inverse propulsor": function(part_attributes) {
        let anchor_bond_index = part_attributes[0];
        return new Inverse_Propulsor(mass, k, spring_dampening, max_length, charge, kirby_bullet_orange_material, 1, 0, 10, 0, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), anchor_bond_index, 0, 2*friction);
    },
    "key board input": function(part_attributes) {
        let key = key_decoder[part_attributes[0]];
        return new Key_Cell(mass, k, spring_dampening, max_length, charge, kirby_bullet_lightblue_material, 1, 0, 10, 0, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), key);
    },
    "sensor": function(part_attributes) {
        return new Cell(mass, k, spring_dampening, max_length, charge, kirby_bullet_material, 1, 0, 10, 0)
    },
    "eye cell": function(part_attributes) {
        let anchor_bond_id = part_attributes[0];
        return new Eye_Cell(mass, k, spring_dampening, max_length, charge, eye_cell_material, 1, 0, 10, 0, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), anchor_bond_id, 0, 2*radius);
    },
    "builder": function(part_attributes) {
        return new Cell(mass, k, spring_dampening, max_length, charge, kirby_bullet_material, 1, 0, 0, 10);
    },
    "sticky": function(part_attributes) {
        return new Sticky_Cell(mass, k, spring_dampening, max_length, charge, sticky_cell_material, 1, 0, 10, 0, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), radius, k)
    },
    "absorber": function(part_attributes) {
        return new Absorber_Cell(mass, k, spring_dampening, max_length, charge, absorber_cell_material, 1, 0, 10, 0, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), radius, k)
    },
    "explosive": function(part_attributes) {
        let explosive_radius = Math.abs(part_attributes[0])*radius;
        let fragments = Math.abs(Math.round(part_attributes[1]));
        let shrapnel_cell = new Cell(mass/fragments, k, spring_dampening, max_length, charge, shrapnel_cell_material, 1, 0, 10, 0);
        return new Explosive_Cell(4*mass, k, spring_dampening, max_length, charge, bomb_cell_material, 1, 0, 10, 0, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), explosive_radius, fragments, shrapnel_cell);
    },
    "heavy basic part": function(part_attributes) {
        return new Cell(4*mass, 2*k, 2*spring_dampening, .9*max_length, 1.1*charge, gordo_material, 2, 0, 10, 0)
    },
    "pulse": function(part_attributes) {
        return new Pulse_Cell(mass, k, spring_dampening, max_length, charge, pulse_cell_material, 1, 0, 10, 0)
    },
    "toggle": function(part_attributes) {
        return new Toggle_Cell(mass, k, spring_dampening, max_length, charge, toggle_cell_material, 1, 0, 10, 0)
    },
    "derivative": function(part_attributes) {
        return new Derivative_Cell(mass, k, spring_dampening, max_length, charge, toggle_cell_material, 1, 0, 10, 0)
    },
    "generator": function(part_attributes) {
        return new Energy_Generator(mass, k, spring_dampening, max_length, charge, generator_cell_material, 1, 0, 10, 0, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), 1)
    },
    "energy_cell": function(part_attributes) {
        return new Cell(5*mass, k, spring_dampening, max_length, charge, energy_storage_cell_material, 1, 0, 50, 0)
    },
    /*"shield": function(part_attributes) {
        return new Shield_Cell(mass, k, spring_dampening, max_length, charge, shield_cell_material, 1, 0, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), radius, radius*7, 1);
    },*/
    "player sensor": function(part_attributes) {
        let anchor_bond_id = part_attributes[0];
        return new Player_Sensor(mass, k, spring_dampening, max_length, charge, kirby_bullet_lightblue_material, 1, 0, 10, 0, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), anchor_bond_id, 0);
    },
    "fixed cell": function(part_attributes) {
        return new Fixed_Cell(mass, k, spring_dampening, max_length, charge, fixed_cell_material, 1, 0, 10, 0);
    },
    "muscle cell": function(part_attributes) {
        let anchor_bond_id = part_attributes[0];
        return new Muscle_Cell(mass, k, spring_dampening, max_length, charge, shield_cell_material, 1, 0, 10, 0, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), anchor_bond_id, 1.25);
    },
    "inverse muscle cell": function(part_attributes) {
        let anchor_bond_id = part_attributes[0];
        return new Inverse_Muscle_Cell(mass, k, spring_dampening, max_length, charge, shield_cell_material, 1, 0, 10, 0, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), anchor_bond_id, 1);
    },
    "ejector": function(part_attributes) {
        let anchor_bond_index = part_attributes[0];
        return new Ejector_Cell(mass, k, spring_dampening, max_length, charge, kirby_bullet_orange_material, 1, 0, 10, 0, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), anchor_bond_index);
    }
}

function make_empty_list(schematic_cells) {
    let empty_list = [];
    for (let y = 0; y < schematic_cells.length; y++){
        empty_list.push([]);
        for (let x = 0; x < schematic_cells[y].length; x++){
            empty_list[y].push([]);
        }
    }
    return empty_list
}


function set_up_level2() {
    //level 2 goes here i guess
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
    let backdrop_z_position = -200;

    const vertices = [];
    for ( let i = 0; i < 1000; i ++ ) {
        let x = THREE.MathUtils.randFloatSpread( 2*universe_radius );
        let y = THREE.MathUtils.randFloatSpread( 2*universe_radius );
        let z = THREE.MathUtils.randFloat( backdrop_z_position, camera_height );

        vertices.push( x, y, z );
    }
    var starGeometry = new THREE.BufferGeometry();
	starGeometry.setAttribute('position', new THREE.Float32BufferAttribute( vertices, 3 ));
	var starMaterial = new THREE.PointsMaterial({color:0x888888})
	var stars = new THREE.Points( starGeometry, starMaterial );
	background.add(stars);

    /*let bubble_material = new THREE.PointsMaterial({color:0x888888});
    let bubbles = new THREE.Points( starGeometry, bubble_material );
    background.add(bubbles);*/

    //add garage sprite
    let garage_path = 'garage_edited.png';
    const garage_material = new THREE.SpriteMaterial( { map: new THREE.TextureLoader().load( garage_path ) } );
    let garage_sprite = new THREE.Sprite(garage_material);

    let garage_y_height = 59//set for radius of 5
    garage_sprite.scale.set(930*garage_y_height/582, garage_y_height, 1);
    garage_sprite.position.set((930/2-327)*garage_y_height/582, (-582/2+57)*garage_y_height/582, -1);
    universe.add(garage_sprite);
    //582 tall total, 930 wide total
    //475 tall from first to last node
    //origin at 327, 57

    //add backdrop sprite
    let backdrop_path = 'images/place_holder_backdrop.png';
    const backdrop_material = new THREE.SpriteMaterial( { map: new THREE.TextureLoader().load( backdrop_path ) } );
    let backdrop_sprite = new THREE.Sprite(backdrop_material);
    backdrop_sprite.scale.set(2*universe_radius+(max_camera_height-backdrop_z_position)/(window_height/window_width), 2*universe_radius+(max_camera_height-backdrop_z_position)/(window_height/window_width), 1);//currently an over estimate (assumes fov is 90, which it is not)
    backdrop_sprite.position.set(0, 0, backdrop_z_position);
    universe.add(backdrop_sprite);


    /*
    let planel1_geometry = new THREE.IcosahedronGeometry(75);
    let planel1_edges = new THREE.EdgesGeometry( planel1_geometry );
    let planel1_material = new THREE.LineBasicMaterial( { color: 0x00ff00 } );
    const planet1_line = new THREE.LineSegments( planel1_edges, planel1_material);
    background_things.push(new Background(function(){
        this.mesh.rotation.z -= .0005;
        this.mesh.rotation.y += .001;
    }, planet1_line));

    
    background.position.z = -200;//offset*/
    //move_background = function() { background.position.y -= .1 }//translate
    //move_background = function() { background.rotation.x += .001 }//rotate

    //music.play();
    /*
    //me trying to get caustics. might revisit
    const vertices2 = [];
    for ( let x = 0; x < 200; x ++ ) {
        for ( let y = 0; y < 200; y ++ ) {
            vertices2.push( refract(x), refract(y), -1 );
        }
    }

    var waterGeometry = new THREE.BufferGeometry();
	waterGeometry.setAttribute('position', new THREE.Float32BufferAttribute( vertices2, 3 ));
	var water = new THREE.Points( waterGeometry, starMaterial );
	background.add(water);*/
}
/*
//me trying to get caustics. might revisit
let d = 12;
let dx = .01;
let wave_height = 1;
let n_a = 1;
let n_w = 1.33;
//consider making d variable: like d -> (x/100*d)
function refract(x) {
    let slope = ( f(x+dx)-f(x-dx) )/(2 * dx);
    let angle_a = slope_to_angle(slope);
    let angle_w = Math.acos( (n_a/n_w) * Math.cos(angle_a));
    let new_x = x + (d + f(x)) * Math.cos(angle_w);
    return new_x;
}

function refract(y) {
    let slope = ( g(y+dx)-g(y-dx) )/(2 * dx);
    let angle_a = slope_to_angle(slope);
    let angle_w = Math.acos( (n_a/n_w) * Math.cos(angle_a));
    let new_y = y + (d + g(y)) * Math.cos(angle_w);
    return new_y;
}

function angle_to_slope(theta) {
    let slope = Math.tan(theta);
    return slope;
}

function slope_to_angle(slope) {
    let angle = Math.atan(slope);
    return angle;
}
function f(x) {
    return Math.sin(x);
}
function g(y) {
    return Math.sin(y);
}*/