scene.add( universe );
scene.add( spaceship );

universe.matrixAutoUpdate = false;
var last_timestamp = Date.now();

function animate(timestamp) {//note about timestamp - delta from last render is the most useful metric for reletivity I think in case you want to use that.
	//create delta time //consider adding special reletivity here.
	//var delta_t = timestamp - last_timestamp;//in milliseconds usually equal to 1/60*1000 = 16.6-
	//last_timestamp = timestamp;

	//controls
	if (gamepad_is_connected){
		update_gamepad();
	}
	else{
		if(w){
			spaceship.rotateX(invertY*maneuvering_per_tick);
		}
		if(a){
			spaceship.rotateY(maneuvering_per_tick/2);
		}
		if(s){
			spaceship.rotateX(-invertY*maneuvering_per_tick);
		}
		if(d){
			spaceship.rotateY(-maneuvering_per_tick/2);
		}
		if(q){
			spaceship.rotateZ(-maneuvering_per_tick);
		}
		if(e){
			spaceship.rotateZ(maneuvering_per_tick);
		}
		if(space){
			if (v>.05){// this number is arbitrary
				var scale_p = p*.95;// this number is also arbitrary, I might relate this to air resistance
				p = scale_p;
				p_vector.setLength(scale_p);
				thrusters = 0;
			} else {
				p = 0;
				p_vector.set(0,0,0);
			}
		}
		//if (){
		//	thrusters = -engine_power*1/60;
		//}
	}
	spaceship.getWorldDirection(direction);
	//calculating velocity and the like
	p_vector.addScaledVector(direction, thrusters);
	p = p_vector.length()
	if (p!=0){
		v_unit_vector.set(p_vector.x/p,p_vector.y/p,p_vector.z/p);
	}
	else{
		v_unit_vector.set(0,0,0)
	}
	if (p!=0){

	}
	if (p < 0){//NEGATIVE VALUES are squared, so rip
        v = -Math.sqrt((p/m)**2/(1+(p/m)**2/(c**2)));
    }
    else {
        v = Math.sqrt((p/m)**2/(1+(p/m)**2/(c**2)));
    }
	var length_contraction = Math.sqrt(1-(v/c)**2);
	
	//more time update here
	spaceship_time += 1/60;
	universe_time += 1/60/length_contraction;
	for (var time_dependent_obj of time_dependent_objects){
		time_dependent_obj.F(length_contraction);
		//time_dependent_obj.update_bounding_box();
	}
	for (var obj of all_objects){
		obj.update_bounding_box();
	}

	//create the matrix
	var len1 = length_contraction-1;
	var u1 = v_unit_vector.x;
	var u2 = v_unit_vector.y;
	var u3 = v_unit_vector.z;
	universe.matrix.set(
		1+len1*u1*u1, 0+len1*u2*u1, 0+len1*u3*u1, 0,
		0+len1*u1*u2, 1+len1*u2*u2, 0+len1*u3*u2, 0,
		0+len1*u1*u3, 0+len1*u2*u3, 1+len1*u3*u3, 0,
		0,            0,            0,            1
	);

	position_vector.addScaledVector(v_unit_vector, v/length_contraction/60);//camera.position.addScaledVector(direction, v/p);//camera.position.addScaledVector(direction
	spaceship.position.copy(position_vector);
	spaceship.position.applyMatrix4(universe.matrix);
	
	//collision detection
	//bounding box for space ship
	position_vector_for_collision_detection.copy(spaceship.position);
	min_vec.set(position_vector_for_collision_detection.x-shield_radius,position_vector_for_collision_detection.y-shield_radius,position_vector_for_collision_detection.z-shield_radius);
	max_vec.set(position_vector_for_collision_detection.x+shield_radius,position_vector_for_collision_detection.y+shield_radius,position_vector_for_collision_detection.z+shield_radius);
	//this places all the raycasters in the rigth spot
	for (var i = 0; i<raycasters.length-1; i++){
		raycasters[i].set(position_vector_for_collision_detection, raycaster_angles[i]);
	}
	raycasters[20].set(position_vector_for_collision_detection, v_unit_vector);
	//var results_array = []; moved inside
	var distance_to_collided_obj = shield_radius+1;//this is just a big number;
	for (var obj of all_objects){
		if (obj.check_for_bounding_box_collision()){
			console.log("checking")
			for (var i = 0; i<raycasters.length; i++){
				var results_array = raycasters[0].intersectObject(obj.mesh);
				if (results_array.length != 0){
					if (results_array[0].distance<distance_to_collided_obj){
						///console.log("might hit yet");
						distance_to_collided_obj = results_array[0].distance;
					}
				}
			}
		}		
	}
	if (distance_to_collided_obj < shield_radius){
		//console.log("hit");
		position_vector.addScaledVector(v_unit_vector, -v/length_contraction/60);
		shield_line_material.opacity = 1;
	}
	else if (shield_line_material.opacity>.1) {
		shield_line_material.opacity *= .95;
	}



    //render
	renderer.render(scene,camera);
	
    //update dashboard
    document.getElementById("speed").innerHTML = "Speed: "+v;
	document.getElementById("propulsion").innerHTML = "Propulsion: "+Math.abs(thrusters);
	document.getElementById("fuel").innerHTML = "Fuel: "+fuel+"/"+fuel_capacity;
	document.getElementById("log").innerHTML = "_";

    //get new frame
	requestAnimationFrame(animate);
}
animate(last_timestamp - 1);//the very first tick has a delta of 1 ms no matter what.