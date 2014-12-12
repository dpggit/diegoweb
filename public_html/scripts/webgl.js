var claseWebGL = function( ) {
	this.camera;
	this.scene;
	this.renderer;
	this.cube;
	this.objects=new Array();
	this.mouse = new THREE.Vector2();
	this.videoTextures=[];
	this.projector=new THREE.Projector();
	this.rotando=true;
	this.videoCamTexture;
	this.videocam;
	this.pararanim=false;
};

claseWebGL.prototype = {
	init:function() 
	{
		if(c.ingles) $('#datosp').html('Use arrow keys to rotate');
		else $('#datosp').html('Usa las teclas de flecha para rotar');
		c.centrarAbs($('#datosp'),$('#centro'),'soloancho')
		$('#centro,#contenedor').css({'background-color':'#000'});
		$('#centro').css({"height":$(window).height()+'px'});
		$('body').css({'overflow':'hidden'});
		c.centrarAbs($('#cargando'),$('#centro'))
		w.scene = new THREE.Scene();
		w.camera = new THREE.PerspectiveCamera( 70, $(window).width() / $(window).height(), 1, 10000);
		w.camera.position.y = 200;
		w.camera.position.z = 1050;
		w.scene.add( w.camera );
		var materials = [];

		for ( var i = 1; i <= 6; i ++ ) 
		{

			c.arrvidwebgl[i] = document.getElementById('vvideo'+i);
			c.arrvidwebgl[i].width = 320;c.arrvidwebgl[i].height = 240;
			c.arrvidwebgl[i].autoplay=false;c.arrvidwebgl[i].loop = true; 
			c.arrvidwebgl[i].volume = 0.5;c.arrvidwebgl[i].play();
		    $('#cargando').css('display','block');	
			w.videoTextures[i] = new THREE.Texture(c.arrvidwebgl[i]);
			materials.push(new THREE.MeshBasicMaterial({map : w.videoTextures[i]}))
		}
		w.cube = new THREE.Mesh( new THREE.CubeGeometry( $(window).width(), $(window).height(), $(window).width(), 10, 10, 10, materials ), new THREE.MeshFaceMaterial() );
		w.cube.position.y = $(window).height()*0.25;
		w.cube.position.x = 0;
		w.cube.position.z = -c.mitadancho;
		w.cube.overdraw = true;
		w.objects.push(w.cube);
		w.scene.add( w.cube );
		//w.renderer = new THREE.CanvasRenderer();
		w.renderer = new THREE.WebGLRenderer();
		w.renderer.setSize( $('#centro').width()*0.8, $('#contenedor').width());
		//w.renderer.setSize( $(window).width(), $(window).height());
		document.getElementById("contenedor").appendChild( w.renderer.domElement );
		w.renderer.domElement.setAttribute('id','canvaswebgl');
		w.renderer.domElement.style.display='none';
		document.addEventListener( 'keydown', w.onDocumentKeyboard, false );
		document.addEventListener( 'keyup', w.pararRotar, false );
		w.renderer.domElement.addEventListener( 'mousemove', w.onDocumentMouseMove, false );
		document.addEventListener( 'mousedown', w.onDocumentMouseDown, false );
		$('#muestravideos').css({'margin-top':c.mitadalto-w.renderer.domElement.height*0.5+'px'});
	}
	,
	pararRotar:function(){w.rotando=true;}
	,
	animate:function() 
	{
		if(!w.pararanim)
		{
		requestAnimationFrame( w.animate );
		w.render();
		}
	}
	,
	render:function() {
		w.renderer.render( w.scene, w.camera );
		var cargados=true;
		for ( var i = 1; i <= 6; i ++ ) 
		{
			if(c.arrvidwebgl[i].readyState<2) cargados = false;
		}
		if(cargados)
		{
			for ( var i = 1; i <= 6; i ++ ) 
			{
				w.videoTextures[i].needsUpdate = true;
				$('#cargando').css('display','none');
				w.renderer.domElement.style.display='block';
			}
		}
		if(w.rotando) w.cube.rotation.y +=0.02 ;
	}
	,
	onDocumentKeyboard:function(e) {
		  $('#datosp').fadeOut('slow')
		  var keyCode = document.all ? e.which : e.keyCode;
		  w.rotando=false;
		  if (keyCode == 39) w.cube.rotation.y +=0.02 ; 
 		  else if (keyCode == 40) w.cube.rotation.x +=0.02 ;
		  else if (keyCode == 38) w.cube.rotation.x -=0.02 ;
		  else if (keyCode == 37) w.cube.rotation.y -=0.02 ; 
	}
	,
	onDocumentMouseMove:function(event) {
		event.preventDefault();		
		/*
		w.mouse.x = ((event.clientX - $('#canvaswebgl').offset().left) / $('#canvaswebgl').width()) * 2 - 1;
		w.mouse.y = - ((event.clientY - $('#canvaswebgl').offset().top) / $('#canvaswebgl').height()) * 2 + 1;
		*/
		w.mouse.x = ( event.clientX / $(window).width() ) * 2 - 1;
		w.mouse.y = - ( event.clientY / $(window).height() ) * 2 + 1;
		/*
		w.cube.rotation.x = event.clientX/10;
		w.cube.rotation.y = event.clientY/10;
		*/
	}
	,
	onDocumentMouseDown:function(event) 
	{
		//event.preventDefault();
		var vector = new THREE.Vector3( w.mouse.x, w.mouse.y, 0.5 );
		w.projector.unprojectVector( vector, w.camera );
		var ray = new THREE.Ray( w.camera.position, vector.subSelf( w.camera.position ).normalize() );
		var intersects = ray.intersectObjects( w.objects );
		if (intersects.length > 0) 
		{   
			//alert(intersects[0].face.materialIndex)
			//w.isplay[intersects[0].face.materialIndex-1]=true;
  			//intersects[0].object.geometry.materials[intersects[0].face.materialIndex ].map=THREE.ImageUtils.loadTexture("http://i755.photobucket.com/albums/xx194/veganjack/muro14.png")
		}
	}
	,
	initcam:function() 
	{
		w.videocam = document.createElement('video');w.videocam.width = 320;w.videocam.height = 240;w.videocam.autoplay = true; 
		w.scene = new THREE.Scene();
		w.camera = new THREE.PerspectiveCamera( 70, $(window).width() / $(window).height(), 1, 10000);
		w.camera.position.y = 200;w.camera.position.z = 1050;w.scene.add( w.camera );
		w.renderer = new THREE.WebGLRenderer();
		var hasUserMedia = navigator.webkitGetUserMedia ? true : false;
		/*
		navigator.getMedia = ( navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia ||
                         navigator.msGetUserMedia);
		*/
		navigator.webkitGetUserMedia('video', function(stream){
			w.videocam.src = webkitURL.createObjectURL(stream);
		}, function(error){console.log("Failed to get a stream due to", error)}); 
		w.videoCamTexture = new THREE.Texture( w.videocam );
		var material = new THREE.MeshLambertMaterial({map : w.videoCamTexture}); 
	}
	,
	animatecam:function() 
	{
		requestAnimationFrame( w.animatecam );w.rendercam();
	}
	,
	rendercam:function() {
		w.renderer.render( w.scene, w.camera );
		if( videocam.readyState === videocam.HAVE_ENOUGH_DATA ){w.videoCamTexture.needsUpdate = true;} 
	}
	,
	pararVideos:function()
	{
		w.pararanim=true;$('#cargando').css('display','none');
		$('video').each(
			function(i)
			{
				//$(this)[0].currentTime=0;
				$(this)[0].pause();
				$(this)[0].src=null;
			})
	}
}
