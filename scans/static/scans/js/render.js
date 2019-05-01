// function hideVisual(id) {
// 	var container = document.getElementById("render-" + id);
// 	container.classList.add("d-none");
// 	var children = container.children;
// 	for (var i = children.length - 1; i >= 0; i--) {
// 		if(children[i].id == ("canvas-" + id)) {
// 			children[i].children.item(0).remove()
// 		}
// 	}
// }

// function getFile(path) {
// 	var ret;
// 	jQuery.get(path, function( data ) {
//     	ret = data;
//   	});
// 	console.log(ret);
//   	return ret;
// }

function visualize(pk, path) {
	var id;
	var canvas;
	var sample = 8;
	var n = 10;
	var scene, camera, renderer, composer;
	var points;
	var up = false;
	var down = false;
	var left = false;
	var right = false;
	var a_press = false;
	var d_press = false;

	var clock = new THREE.Clock();
	var delta = 0;
	// 30 fps
	var interval = 1 / 60;

	function keyDown(event) {
		event.preventDefault();
		// event.stopPropagination();
		if(event.keyCode == 37) {
			left = true;
		} else if(event.keyCode == 38) {
			up = true;
		} else if(event.keyCode == 39) {
			right = true;
		} else if(event.keyCode == 40) {
			down = true;
		}  else if(event.keyCode == 65) {
			a_press = true;
		} else if(event.keyCode == 68) {
			d_press = true;
		} 
	}

	function keyUp(event) {
		event.preventDefault();
		// event.stopPropagination();
		if(event.keyCode == 37) {
			left = false;
		} else if(event.keyCode == 38) {
			up = false;
		} else if(event.keyCode == 39) {
			right = false;
		} else if(event.keyCode == 40) {
			down = false;
		} else if(event.keyCode == 65) {
			a_press = false;
		} else if(event.keyCode == 68) {
			d_press = false;
		} 
	}

	window.addEventListener('keydown', keyDown, false);
	window.addEventListener('keyup', keyUp, false);

	function callback(data) {
		init(data);
		animate();
	}

	function init(text) {		
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(45, $(canvas).width()/$(canvas).height(), 1, 1000);
		camera.position.set(200, 0, 0);
		camera.lookAt( 0, 50, 0 );

		renderer = new THREE.WebGLRenderer({antialiasing: true});
		renderer.setSize($(canvas).width(), $(canvas).height());

		renderer.autoClear = false;

		renderModel = new THREE.RenderPass(scene, camera);

		effectCopy = new THREE.ShaderPass(THREE.CopyShader);
		effectCopy.renderToScreen = true;
		composer = new THREE.EffectComposer(renderer);

		composer.setSize($(canvas).width() * sample, $(canvas).height() * sample);
		composer.addPass(renderModel);
		composer.addPass(effectCopy);

		canvas.appendChild(renderer.domElement);

		//scene.fog = new THREE.Fog( 0x050505, 2000, 3500 );

		var geometry = new THREE.BufferGeometry();
		rows = text.split('\n');
		//console.log(rows.length);

		var values = new Float32Array(rows.length * 3);
		var colors = [];
		var color = new THREE.Color();

		for (var i = 0; i < rows.length; i++) {
			var tmp = rows[i].split(';');
			values[3*i] = tmp[0];
			values[3*i + 1] = tmp[1];
			values[3*i + 2] = tmp[2];
			

			var vx = ( tmp[0] / n ) + 0.5;
			var vy = ( tmp[1] / n ) + 0.5;
			var vz = ( tmp[2] / n ) + 0.5;

			color.setRGB( vx, vy, vz );
			colors.push( color.r, color.g, color.b );
		}
		//console.log(values[0]);
		//console.log(values.length);

		geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( values, 3 ) );
		geometry.addAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );

		//console.log(geometry.getAttribute('position'));
		
		var material = new THREE.PointsMaterial({ size: 15, vertexColors: THREE.VertexColors });
		points = new THREE.Points( geometry, material );
		points.rotateX(-0.5*3.1415);

		scene.add( points );
		//renderer.render( scene, camera );
	}

	function render() {
   	}

	function animate() {
		id = requestAnimationFrame(animate);
		delta += clock.getDelta();
   		if (delta  > interval) {
	   		if(up == true) {
	   			points.rotateY(0.0027*3.14159);
	   		}
	   		if(down == true) {
	   			points.rotateY(-0.0027*3.14159);
	   		}
	   		if(left== true) {
	   			points.rotateX(0.0027*3.14159);
	   		}
	   		if(right == true) {
	   			points.rotateX(-0.0027*3.14159);
	   		}
	   		if(a_press == true) {
	   			points.rotateZ(-0.0027*3.14159*1.5);
	   		}
	   		if(d_press == true) {
	   			points.rotateZ(0.0027*3.14159*1.5);
	   		}

			renderer.clear();
			composer.render();
	        
	        delta = delta % interval;
   		}
	}

	function showVisual(pk) {
		if(document.getElementById("canvas-" + pk) == null) {
			row = document.getElementById(pk);
	
			var container = document.createElement("DIV");
			container.classList.add("render-div");
			container.id = "render-" + pk;
	
			canvas = document.createElement("DIV");
			canvas.classList.add("render-div");
	
			var button_div = document.createElement("DIV");
			button_div.classList.add("cancel-button");
	
			var button_cancel = document.createElement("BUTTON");
			button_cancel.classList.add("button-visual-cancel");
			button_cancel.innerHTML = "Cancel";

			button_div.appendChild(button_cancel);
	
			container.appendChild(button_div);
			container.appendChild(canvas);
			row.appendChild(container);
			button_cancel.addEventListener("click", function(event) {
				cancelAnimationFrame(id)
				window.removeEventListener('keydown', keyDown, false);
				window.removeEventListener('keyup', keyUp, false);			
				renderer.domElement.addEventListener('dblclick', null, false);
				scene = null;
				camera = null;
				renderer = null;
				container = null;
				points = null;
				composer = null;
				button_div.removeChild(button_cancel)
				container = document.getElementById("render-" + pk)
				while(container.firstChild){
					container.removeChild(container.firstChild);
				}
				row.removeChild(container);				
			})
		}	
	}

	showVisual(pk)

	jQuery.get({
		url: 'static/' + path, 
		success: callback
  	});


}