scene.add( universe );
camera.position.z = 100;
camera.lookAt(0,0,0)//Math.sqrt(2)/2,Math.sqrt(2)/2);

universe.matrixAutoUpdate = false;
function animate(timestamp) {



    //insert universe animations
	//cube.rotation.x += 0.01;
	//cube.rotation.y += 0.01;
	//line.rotation.x += 0.02;

	//controls
	if(w){
		camera.rotation.x += .01;
	}
	if(a){
		camera.rotation.y += .01;
	}
	if(s){
		camera.rotation.x -= .01;
	}
	if(d){
		camera.rotation.y -= .01;
	}
	if(q){
		camera.rotation.z += .01;//not sure
	}
	if(e){
		camera.rotation.z -= .01;//not sure
	}
	//direction.x = Math.sqrt(2)/2;//Math.sqrt(2)/2;
    //direction.y = 0;//Math.sqrt(2)/2;
    //direction.z = Math.sqrt(2)/2;
    camera.getWorldDirection(direction);
	//calculating velocity and the like
	p += thrusters/60;//momentum = F*time ... this is assuming 60 fps
	if (p < 0){//NEGATIVE VALUES are squared, so rip
        v = -Math.sqrt((p/m)**2/(1+(p/m)**2/(c**2)));
    }
    else {
        v = Math.sqrt((p/m)**2/(1+(p/m)**2/(c**2)));
    }
    if (hyperdrive){
		length_contraction = Math.sqrt(1-(v/c)**2);
		
		//create the matrix
		var len1 = length_contraction-1;
		var u1 = direction.x;
		var u2 = direction.y;
		var u3 = direction.z;
		universe.matrix.set(
			1+len1*u1*u1, 0+len1*u2*u1, 0+len1*u3*u1, 0,
			0+len1*u1*u2, 1+len1*u2*u2, 0+len1*u3*u2, 0,
			0+len1*u1*u3, 0+len1*u2*u3, 1+len1*u3*u3, 0,
			0,            0,            0,            1
		);
		
		//keeps camera in the right spot in the universe
        camera.position.applyMatrix4(universe.matrix);//this makes the camera move with the universe.  originally, I wasn't a fan of it, but now I actually think it is ok.  either way, nothing should be too dependent on this system, so it would be easy to fix later.
	}
	else {
		//v /= 10;this would need editing.  I don't like it.  
	}
	camera.position.addScaledVector(direction, v);//I need to change everything, but for the time being, this is good.
    //render
	renderer.render(scene,camera);

    //update dashboard
    document.getElementById("speed").innerHTML = "Speed: "+v;

	//returns camera to the unscaled universe.  might change later.
	camera.position.applyMatrix4(universe.matrix.invert());

    //get new frame
	requestAnimationFrame(animate);
}
animate();