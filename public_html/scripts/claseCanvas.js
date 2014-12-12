var claseCanvas = function( ) 
{
	this.vcanvas;
	this.ctx;
	this.playvid;
	this.pausavid;
	this.timoutvid;
	this.mouseIsDown = 0,
	this.pixeles;
	this.pixelesData;
	this.rojo = [];
	this.verde = [];
	this.azul = [];
	this.amplitud=30;
	this.incsatura=1;
	this.possat;
	//this.postol;
	this.poscolor;
	this.poslumi;
	this.velocidadvid=0;
	this.drag=false;
	this.is_webkit=false;
	this.alpha=255;
	this.color=1;
	this.luminosidad=1;
	this.vendorURL;
	this.anchocara=20;
	this.eshtml5=false;
	this.tiemporefresco=40;
	this.timeoutvideo;
	this.pararcontador=false;
};


claseCanvas.prototype = { 
		feventoscam:function()
		{
			$("#contsaturabar,#sathtml5").on({click: function(e) {v.moverSat(e)},tap: function(e) {v.moverSat(e)}});
			$("#contlumibar,#lumihtml5").on({click: function(e) {v.moverLuminosidad(e)},tap: function(e) {v.moverLuminosidad(e)}});
			$("#asave").on({click: function(e) {v.takepicture(e)},tap: function(e) {v.takepicture(e)}});
		}
		,
		festiloscam:function()
		{
			$('#centro').css({"height":$(window).height()+'px'});
			var vleft = $('#contenedor').width()/2-$('#idcanvasconfig').width()/2;
			var vtop = $('#centro').height()/4-$('#idcanvasconfig').height()/2-$(document).height()*0.05;
			$('#asave').css({'margin-left':vleft+$('#idcanvasconfig').width()-$('#asave').width()+'px',
			'margin-top':'1%'})
			$('#idcanvasconfig').css({'margin-top':'10px','margin-left':vleft+'px','margin-top':'10px'})
			$('.contbar,.bar').css('width',$('#idcanvasconfig').width()+'px');
			$('#marcadorsat').css('margin-left',$('#idcanvasconfig').width()/2+'px');
			$('#marcadorlumi').css('margin-left',$('#idcanvasconfig').width()/2+'px');
			if(c.ingles)
			{
			$('.datosp').html('You need to have a web camera installed<br>Click on the video to change pixels of a similar color, depending on the tolerance range set, to black color<br> Click on each bar to move the different configuration markers<br>You can take a picture clicking on the icon in the right top corner of the image.');
			}
			else
			{
			$('.datosp').html('Necesita tener una cámara web Instalada<br>Pulse sobre el vídeo para cambiar los píxeles de un color parecido, según el grado de tolerancia configurado, al negro.<br> Pulse sobre la barra para mover los marcadores de configuración<br>Se puede sacar una fotografía pulsando sobre el icono en la esquina superior derecha de la imagen.');
			}
			$('.datosp').css('top',$(document).height()/2-$('.datosp').height()/2+'px');
		}
		,
		feventos:function()
		{
			$('#iniciovid').on('click',function(){v.iniciarvideo();})
			$('#pausavid').on('click',function(){c.video.pause();})
			$('#stopvid').on('click',function()
			 {
				v.amplitud=30;v.rojo = [];v.verde = [];v.azul = [];	v.velocidadvid = 0;
				if(v.ctx) v.ctx.clearRect(0,0,v.vcanvas.width,v.vcanvas.height)
				c.video.currentTime = 1;
				c.video.pause();
				v.poster();
				if(v.eshtml5) $('#controlhtml5').attr("value",1)
				else $('#marcadorcontrol').css('margin-left','0px');
			})
		   $('#rewindvid').on('click',function()
				 {
				 	if(c.video.currentTime>0)
					{
						if($.browser.opera)
						{
							if(c.ingles) c.ventanaEmergente('Opera does not support fast motion viewing');
							else c.ventanaEmergente('Opera no soporta visionado a cámara rápida');
						}
						else v.velocidadvid-=0.2;
					}
				})
			$('#forwardvid').on('click',function()
			 {
				if(c.video.currentTime>0)
				{
					if($.browser.opera)
					{
						if(c.ingles) c.ventanaEmergente('Opera does not support fast motion viewing');
						else c.ventanaEmergente('Opera no soporta visionado a cámara rápida');
					}
					else v.velocidadvid+=0.2;
				}
			})
			$('#slowrewindvid').on('click',function()
				 {
				 	if(c.video.currentTime>0)
					{
						if($.browser.opera) 
						{
							if(c.ingles) c.ventanaEmergente('Opera does not support slow motion viewing');
							else c.ventanaEmergente('Opera no soporta visionado a cámara lenta');
						}
						else v.velocidadvid-=0.01;
					}
				})
			$('#slowforwardvid').on('click',function()
			 {
				if(c.video.currentTime>0)
				{
					if($.browser.opera) 
					{
						if(c.ingles) c.ventanaEmergente('Opera does not support slow motion viewing');
						else c.ventanaEmergente('Opera no soporta visionado a cámara lenta');
					}
					else v.velocidadvid+=0.01;
				}
			})
			$('#idcanvasconfig').on('mousedown',function(e){v.datospix(e)})
			$('#marcadorsat').on('mouseup',function(){v.inipossat=0;})
			$('#contsaturabar,#sathtml5').on('click',function(e){v.moverSat(e)})
			$('#contcontrolesbar,#controlhtml5').on('click',function(e){v.moverControl(e)})
		  	$('#contlumibar,#lumihtml5').on('click',function(e){v.moverLuminosidad(e)})
			$(window).on('resize',function(e){v.festilos(e)})
		}
		,
		festilos:function()
		{
			$('#centro').css({"height":$(window).height()+'px'});
			$('#idcanvasconfig').css('height',$('#idcanvasconfig').width()*0.4+'px')
			var ancho=0;
			$(".cimage").each(function(){ancho+=$(this).width()})
			$('#divcontroles').css('padding-left',$('#centro').width()*0.5-ancho*0.5+'px')
			//c.centrarAbs($('#marcadorsat'),$('#contsaturabar'),'soloancho');
			c.centrar($('#contenedor'));
		}
		,
		feshtml5:function()
		{
		/*
			if(($.browser.opera && parseFloat($.browser.version)>=9.0) ||
			($.browser.safari && parseFloat($.browser.version)>=4.0) ||
			($.browser.msie && parseFloat($.browser.version)>=10.0) ||
			($.browser.chrome && parseFloat($.browser.version)>=6.0)) 
			{
				v.eshtml5 = true;
				$('.rangebar').css("display","block");
				$('.norangebar').css("display","none");
				$('.english,.spanish').css("margin-left","10px");
				$('.rangebar').css("width",$("#idcanvasconfig").width()+"px");
			}
			else
			{
				$('.bar').css("width",$("#idcanvasconfig").width()+"px");
				$('.rangebar').css("display","none");
			}
			*/
			$('.bar').css("width",$("#idcanvasconfig").width()+"px");
			$('.rangebar').css("display","none");
		}
		,
		iniciar:function()
		{	
			v.feventos();
			$("#contenedor").animate({'opacity':'1','margin-left':'0px'},1000)
			//$("#contenedor").css("border","1px solid red")
			v.festilos();
			v.feshtml5();
			c.fidioma();
			c.video = document.getElementById("idvideoconfig");
            v.playvid = document.getElementById("iniciovid");
			v.pausavid = document.getElementById("pausavid");
            v.vcanvas = document.getElementById("idcanvasconfig");
            v.ctx = v.vcanvas.getContext('2d');
			v.poster();
		}
		,
		poster:function()
		{
			var imgposter = new Image();
            imgposter.onload = function(){  
     			v.ctx.drawImage(imgposter,0,0);
   			 };  
           	imgposter.src = "videos/darkmoor.png";
		}
		,
		pasarCamaCanvas:function()
		{
			c.video = document.getElementById("idvideoconfig");
            v.vcanvas = document.getElementById("idcanvasconfig");
            v.ctx = v.vcanvas.getContext('2d');
			v.refrescarVideo(true);
		}
		,
		refrescarVideo:function(cam)
		{
			// Ademas del movimiento del video en si, se reemplazan los pixeles del canvas y se mueve el cursor de posicionamiento
			// recargar pixeles canvas
			if(!c.video.paused || cam) 
			{
				v.recargarPix()
				v.timeoutvideo = setTimeout(v.refrescarVideo, v.tiemporefresco, cam);
			}
			// movimiento contador video
			if(!cam && !c.video.paused && !v.pararcontador) 
			{
				if(v.velocidadvid!=0)
				{
					if(v.velocidadvid>-0.01 && v.velocidadvid<0.01) v.velocidadvid = 0;
					if(v.velocidadvid>-0.02 && v.velocidadvid<0.02) c.video.muted=true;
				}
				else if(v.pixelesData) c.video.muted = false;
				if(v.velocidadvid!=0) c.video.currentTime +=v.velocidadvid;
				v.posicionarControl();
			}
			if(v.pixelesData)$('#cargando').css('display','none');
		}
		,
		moverControl:function(e)
		{
			if(v.eshtml5) 
			{
				clearTimeout(v.timeoutvideo);
				c.video.currentTime = Math.floor(($('#controlhtml5').val()*c.video.duration)/100);
				v.refrescarVideo(false);
			}
			else
			{
				var poscontrol = e.pageX-$('#contcontroles').offset().left-$('#marcadorcontrol').width()/2;
				if(poscontrol<0) poscontrol=0;
				if(poscontrol>$('#idcanvasconfig').width()) poscontrol=$('#idcanvasconfig').width();
				$('#marcadorcontrol').css('margin-left',poscontrol+'px');	
				c.video.currentTime = Math.floor((c.video.duration*poscontrol)/$('#idcanvasconfig').width());
			}
			if(c.video.paused) 
			{
				c.video.play();
				v.refrescarVideo(false);
			}
		}
		,
		posicionarControl:function()
		{
			if(v.eshtml5)
			{
				var mleft = Math.floor(c.video.currentTime*100/c.video.duration);
				if(mleft<1) mleft=1;
				$("#controlhtml5").attr("value",mleft)
			}
			else
			{
				var mleft = Math.floor(c.video.currentTime*$('#idcanvasconfig').width()/c.video.duration);
				$('#marcadorcontrol').css('margin-left',mleft+'px');
			}
		}
		,
	    datosPix:function(e) 
		{
			var x = Math.floor(e.pageX - $('#idcanvasconfig').offset().left);
			var y = Math.floor(e.pageY - $('#idcanvasconfig').offset().top);	
			if(x>0 && y>0)
			{
				v.arrColores(x,y);
			}
			if(c.video.paused) v.recargarPix()
        }
		,
		recargarPix:function()
		{
			v.ctx.drawImage(c.video, 0, 0);
			v.pixeles = v.ctx.getImageData(0, 0, v.vcanvas.width, v.vcanvas.height);
			v.pixelesData = v.pixeles.data;
			var valorrOr;var valorvOr;var valoraOr;var valorr;var valorv;var valora;var p=0;
			for (i = 0; i < v.vcanvas.width*v.vcanvas.height; i++) 
			{
				p=i*4;valorrOr = v.pixelesData[p + 0];valorvOr = v.pixelesData[p + 1];valoraOr = v.pixelesData[p + 2];
				var gris= (valorrOr + valorvOr + valoraOr);
				var mgris= (valorrOr + valorvOr + valoraOr)/3;
				valorr = (gris-((valorvOr+valoraOr))*v.incsatura-(mgris*(1-v.incsatura)))*v.luminosidad;
				valorv = (gris-((valorrOr+valoraOr))*v.incsatura-(mgris*(1-v.incsatura)))*v.luminosidad;
				valora = (gris-((valorrOr+valorvOr))*v.incsatura-(mgris*(1-v.incsatura)))*v.luminosidad;
				if(valorr<0) valorr=0;if(valorr>255) valorr=255;
				if(valorv<0) valorv=0;if(valorv>255) valorv=255;
				if(valora<0) valora=0;if(valora>255) valora=255;
				if(v.rojo.length>0)
				{
					if(v.in_array(valorrOr,v.rojo) && v.in_array(valorvOr,v.verde) && v.in_array(valoraOr,v.azul))
					{
						valorr =0;valorv =0;valora =0;
					}
				}
				v.pixelesData[p + 0] = valorr;v.pixelesData[p + 1] = valorv;v.pixelesData[p + 2] = valora;
				
				/*
				var valorcolor = (valorr+valorv+valora);
				if(valorcolor>v.inicioblanco && valorcolor<765)
				{
					if(valorr>170) valorr +=v.incblanco;
					if(valorv>170) valorv +=v.incblanco;
					if(valora>170) valora +=v.incblanco;
				}
				if(valorcolor<v.inicionegro && valorcolor>0)
				{
					if(valorr<85) valorr -=v.incnegro;
					if(valorv<85) valorv -=v.incnegro;
					if(valora<85) valora -=v.incnegro;
				}
				*/	
			}
			v.pixeles.data = v.pixelesData;v.ctx.putImageData(v.pixeles, 0, 0);
		}
		,
		arrColores:function(x,y)
		{
			for(var a=-v.amplitud;a<v.amplitud;a++)
			{
				var valor = v.pixelesData[(y*v.vcanvas.width+x)*4+0]+a;
				if(valor<=255 && valor>=0) v.rojo.push(v.pixelesData[(y*v.vcanvas.width+x)*4+0]+a)
			}
			for(var a=-v.amplitud;a<v.amplitud;a++)
			{
				var valor = v.pixelesData[(y*v.vcanvas.width+x)*4+1]+a;
				if(valor<=255 && valor>=0) v.verde.push(v.pixelesData[(y*v.vcanvas.width+x)*4+1]+a)
			}
			for(var a=-v.amplitud;a<v.amplitud;a++)
			{
				var valor = v.pixelesData[(y*v.vcanvas.width+x)*4+2]+a;
				if(valor<=255 && valor>=0) v.azul.push(v.pixelesData[(y*v.vcanvas.width+x)*4+2]+a)
			}
		}
		,
		moverSat:function(e)
		{
			if(v.eshtml5) v.incsatura = ($('#sathtml5').val()*2)/100;
			else
			{
				v.possat = e.pageX-$('#contsat').offset().left-$('#marcadorsat').width()/2;
				if(v.possat<0) v.possat=0;
				if(v.possat>$('#idcanvasconfig').width()) v.possat=$('#idcanvasconfig').width();
				$('#marcadorsat').css('margin-left',v.possat+'px');	
				v.incsatura = (2*v.possat)/$('#idcanvasconfig').width();
				if(c.video.paused) v.recargarPix();
			}
		}
		,
		/*
		moverTol:function(e)
		{
		
			if(v.eshtml5) v.amplitud = $('#tolhtml5').val();
			else
			{
				v.postol = e.pageX-$('#conttol').offset().left-$('#marcadortol').width()/2;
				if(v.postol<0) v.postol=0;
				if(v.postol>$('#idcanvasconfig').width()) v.postol=$('#idcanvasconfig').width();
				$('#marcadortol').css('margin-left',v.postol+'px');	
				v.amplitud = Math.floor((100*v.postol)/$('#idcanvasconfig').width());
			}
		}
		,
		*/
		/*
		,
		moverColor:function(e)
		{
			v.poscolor = e.pageX-$('#contcolor').offset().left-$('#marcadorcolor').width()/2;
			if(v.poscolor<0) v.poscolor=0;
			if(v.poscolor>$('#idcanvasconfig').width()) v.poscolor=$('#idcanvasconfig').width();
			$('#marcadorcolor').css('margin-left',v.poscolor+'px');	
			v.color = ((2*v.poscolor)/$('#idcanvasconfig').width());
		}
		*/
		moverLuminosidad:function(e)
		{
			if(v.eshtml5) v.luminosidad = ($('#lumihtml5').val()*2)/100;
			else
			{
				v.poslumi = e.pageX-$('#contlumi').offset().left-$('#marcadorlumi').width()/2;
				if(v.poslumi<0) v.poslumi=0;
				if(v.poslumi>$('#idcanvasconfig').width()) v.poslumi=$('#idcanvasconfig').width();
				$('#marcadorlumi').css('margin-left',v.poslumi+'px');	
				v.luminosidad = ((2*v.poslumi)/$('#idcanvasconfig').width());
			}
		}
		,
		in_array:function(valor,arr)
		{
			for(var i=0;i<arr.length;i++)
			{
				if(arr[i]==valor) return true
			}
			return false;
		}
		, 
	  initcam:function()
	  {
	  		v.feshtml5();
			navigator.getUserMedia = ( navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia ||
                         navigator.msGetUserMedia);
			
			c.vendorURL = window.URL || window.webkitURL  || window.msURL || window.mozURL;
						
    		navigator.getUserMedia({video: true}, v.onSuccess, v.onError);
			c.video = document.getElementById('idvideoconfig');	
			v.vcanvas = document.getElementById("idcanvasconfig");
			/*
			var htracker = new headtrackr.Tracker();
			  htracker.init(c.video, document.getElementById('inputCanvas'));
			  htracker.start();
			  */
	  }
	  ,
	  onSuccess:function(stream)
	  {
			c.video.autoplay = true; 
			if($.browser.opera) c.video.src = stream;
			else c.video.src = c.vendorURL.createObjectURL(stream);
			v.pasarCamaCanvas();
	  }
	  ,
	  onError:function() 
	  {
		if(c.ingles) c.ventanaEmergente('There has been an error in the data',5000,false);
		else c.ventanaEmergente('Ha habido un error en los datos',5000,false);
	  }
	  ,
	  takepicture:function() 
	  {
			var data = '<img src="'+v.vcanvas.toDataURL("image/png")+'" height="270" width="480"/>';
			c.ventanaEmergenteGrande(data);
	  }
	  ,
	  moverCanvas:function(e)
	  {
		  var mleft = $(v.vcanvas).width()/2-(e.x*v.vcanvas.width/30);
		  if(mleft<-$(v.vcanvas).width()*0.1) mleft = -$(v.vcanvas).width()*0.1;
		  if(mleft>$(v.vcanvas).width()*0.5) mleft = $(v.vcanvas).width()*0.5;
		  /*
		  $(v.vcanvas).stop().animate(
			  {
				'margin-left': mleft+'px'
			  }, 
			  100, 
			  function() 
			  {
			  }
		  );
		  */
		  $(v.vcanvas).css('margin-left',mleft+'px');
	  }
	  ,
	  iniciarvideo:function()
	  {
	  		c.centrarAbs($('#cargando'),$('#idcanvasconfig'));c.video.play();c.video.muted = true;
		    $('#cargando').css('display','block');
			v.timoutvid=setTimeout(function()
			{
				if(c.video.readyState>=2) 
				{
					v.refrescarVideo(false);
					clearTimeout(v.timoutvid);
				}
			},0)
	  }
}
