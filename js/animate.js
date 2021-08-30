scene.add( universe );
scene.add( spaceship );
position_vector.z = 100;

universe.matrixAutoUpdate = false;
var last_timestamp = Date.now();

function animate(timestamp) {//note about timestamp - delta from last render is the most useful metric for reletivity I think in case you want to use that.
	//create delta time //consider adding special reletivity here.
	//var delta_t = timestamp - last_timestamp;//in milliseconds usually equal to 1/60*1000 = 16.6-
	//last_timestamp = timestamp;
	spaceship_time += 1/60;

	//controls
	if(w){
		spaceship.rotateX(-.01);
	}
	if(a){
		spaceship.rotateY(.01);
	}
	if(s){
		spaceship.rotateX(.01);
	}
	if(d){
		spaceship.rotateY(-.01);
	}
	if(q){
		spaceship.rotateZ(.01);//not sure
	}
	if(e){
		spaceship.rotateZ(-.01);//not sure
	}
	if(space){
		if (v>.05){
			var scale_p = p*.95;
			p = scale_p;
			p_vector.setLength(scale_p);
			thrusters = 0;
		} else {
			p = 0;
			p_vector.set(0,0,0);
			thrusters = 0;
		}
	}
	spaceship.getWorldDirection(direction);
	//calculating velocity and the like
	p_vector.addScaledVector(direction, thrusters/60);
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
	cube.position.y = spaceship_time/10;
	//for


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
	position_vector.addScaledVector(v_unit_vector, v/length_contraction/60);//camera.position.addScaledVector(direction, v/p);//camera.position.addScaledVector(direction, v);//I need to change everything, but for the time being, this is good.
	spaceship.position.copy(position_vector);
	spaceship.position.applyMatrix4(universe.matrix);
	
    //render
	renderer.render(scene,camera);
	
    //update dashboard
    document.getElementById("speed").innerHTML = "Speed: "+v;
	document.getElementById("propulsion").innerHTML = "Propulsion: "+thrusters;

    //get new frame
	requestAnimationFrame(animate);
}
animate(last_timestamp - 1);//the very first tick has a delta of 1 ms no matter what.