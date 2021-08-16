scene.add( universe );
scene.add( spaceship );
position_vector.z = 100;

universe.matrixAutoUpdate = false;
var last_timestamp = Date.now();

function animate(timestamp) {//note about timestamp - delta from last render is the most useful metric for reletivity I think in case you want to use that.
	//create delta time //consider adding special reletivity here.
	var delta_t = timestamp - last_timestamp;//in milliseconds usually equal to 1/60*1000 = 16.6-
	last_timestamp = timestamp;
	
    //insert universe animations
	cube.rotation.x += 0.001*delta_t;//.1 per 1/60 sec
	cube.rotation.y += 0.001*delta_t;
	line.rotation.x += 0.001*delta_t;

	//controls
	if(w){
		spaceship.rotation.x += .01;
	}
	if(a){
		spaceship.rotation.y += .01;
	}
	if(s){
		spaceship.rotation.x -= .01;
	}
	if(d){
		spaceship.rotation.y -= .01;
	}
	if(q){
		spaceship.rotation.z += .01;//not sure
	}
	if(e){
		spaceship.rotation.z -= .01;//not sure
	}
	spaceship.getWorldDirection(direction);
	//calculating velocity and the like
	p_vector.addScaledVector(direction, thrusters/60);
	p = p_vector.length()
	var v_unit_vector = new THREE.Vector3;
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
	var length_contraction;
    if (hyperdrive){
		var length_contraction = Math.sqrt(1-(v/c)**2);
		
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
	}
	else {
		length_contraction = 1;//v /= 10;this would need editing.  I don't like it.  
	}
	position_vector.addScaledVector(v_unit_vector, v/length_contraction);//camera.position.addScaledVector(direction, v/p);//camera.position.addScaledVector(direction, v);//I need to change everything, but for the time being, this is good.
	spaceship.position.copy(position_vector);
	spaceship.position.applyMatrix4(universe.matrix);
	
    //render
	
	renderer.render(scene,camera);
	
    //update dashboard
    document.getElementById("speed").innerHTML = "Speed: "+v;

    //get new frame
	requestAnimationFrame(animate);
}
animate(last_timestamp - 1);//the very first tick has a delta of 1 ms no matter what.