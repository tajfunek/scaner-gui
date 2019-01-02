function showVisual(id, path) {
	var container = document.getElementById("render-" + id);
	if(container.classList.contains("d-none")) {
		container.classList.remove("d-none");
		visualise(document.getElementById("canvas-" + id), path);
	}
}

function hideVisual(id) {
	var container = document.getElementById("render-" + id);
	container.classList.add("d-none");
	var children = container.children;
	for (var i = children.length - 1; i >= 0; i--) {
		if(children[i].id == ("canvas-" + id)) {
			children[i].children.item(0).remove()
		}
	}
}

function getFile(path) {
	var ret;
	jQuery.get(path, function( data ) {
    	ret = data;
  	});
	console.log(ret);
  	return ret;
}

function visualise(container, path) {
	var container = container;
	var sample = 24;
	var n = 10;
	var scene;
	var camera;
	var renderer;

	function callback(data) {
		init(data);
		render();
	}

	function init(text) {
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(45, $(container).width()/$(container).height(), 1, 1000);
		camera.position.set(200, 100, 150);
		camera.lookAt( 0, 0, 0 );

		renderer = new THREE.WebGLRenderer({antialiasing: true});
		renderer.setSize($(container).width(), $(container).height());

		renderer.autoClear = false;

		renderModel = new THREE.RenderPass(scene, camera);

		effectCopy = new THREE.ShaderPass(THREE.CopyShader);
		effectCopy.renderToScreen = true;
		composer = new THREE.EffectComposer(renderer);

		composer.setSize($(container).width() * sample, $(container).height() * sample);
		composer.addPass(renderModel);
		composer.addPass(effectCopy);

		container.appendChild(renderer.domElement);

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

		scene.add( points );
		//renderer.render( scene, camera );
	}

	function render() {
		renderer.clear();
		composer.render();
	}

	jQuery.get({
		url: 'static/' + path, 
		success: callback
  	});
}