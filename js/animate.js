scene.add( universe );
camera.position.z = 100;
camera.lookAt(0,0,0);

universe.matrix.matrixAutoUpdate = false;
function animate() {



    //insert universe
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	line.rotation.x += 0.02;

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
	camera.getWorldDirection(direction);
	var T = new THREE.Matrix4();
	//calculating velocity and the like
	p += thrusters/60;//momentum = F*time ... this is assuming 60 fps
	if (hyperdrive){
		if (p < 0){//NEGATIVE VALUES are squared, so rip
			v = -Math.sqrt((p/m)**2/(1+(p/m)**2/(c**2)));
		}
		else {
			v = Math.sqrt((p/m)**2/(1+(p/m)**2/(c**2)));
		}
		length_contraction = Math.sqrt(1-(v/c)**2);
		
		//create the matrix
		var len1 = length_contraction-1;
		var u1 = direction.x;
		var u2 = direction.y;
		var u3 = direction.z;
		T.set(
			1+len1*u1*u1, 0+len1*u2*u1, 0+len1*u3*u1, 0,
			0+len1*u1*u2, 1+len1*u2*u2, 0+len1*u3*u2, 0,
			0+len1*u1*u3, 0+len1*u2*u3, 1+len1*u3*u3, 0,
			0,            0,            0,            1
		);
        //apply matrix
		universe.applyMatrix4(T);
	}
	else {
		v = p/m; // v*m = p
	}
	camera.position.addScaledVector(direction, v);//I need to change everything, but for the time being, this is good.
    //render
	renderer.render(scene,camera);
    //reset the scale of the universe
	universe.position.set(0,0,0);
	universe.rotation.set(0,0,0);
	universe.scale.set(1,1,1);
    //get new frame
	requestAnimationFrame(animate);
}
animate();