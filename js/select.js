class ship_part {
    constructor(mass) {
        self.mass = mass;
    }
}

function select(){
    closeAllWindows();
    document.getElementById("select").hidden = false;
}
function apply_selections(){
    m = 1; // in kg
    engine_power = 1;// units of momentum/s.  this is the maximum momentum output in one second.  
    maneuvering = 1;// units of radians per second
    shield_efficiency = 1;//
    engine_efficiency = 1;// proportion of fuel used usefully.  For example, if 300 joules go into thrust, and the efficiency is 90%, then the actual amount used is 300/.9
    air_resistance = 1;
    brakes = 1; // not sure about this one
    fuel = 0;//current fuel
    fuel_capacity = 0; // in joules?
}