var claseGMaps = function( ) 
{
	this.initialLocation;
	this.map;
	this.geocoder;
	this.lat;
	this.lng;
	this.calle;
	this.numero;
	this.codigo_postal;
	this.ciudad;
	this.provincia;
	this.region;
	this.pais;
	this.arrlatlng=new Array();
	this.markerBounds;
	this.listainfowindows=new Array();
	this.cargando;
};

claseGMaps.prototype = { 
  feventos:function()
  {
		$("#titulo,#tituloen").on("focus", function() {$("#titulo,#tituloen").val('');});
		$("#idcalle,#idcalleen").on("click", function(e) {g.codeAddress();});
		$("#address,#addressen").on("keydown", function(e) {if(e.which==13) c.codeAddress();});
		$("#bd,#bden").on("click", function(e) {g.guardarbd();});
		$("#mostrarmarca").on("click", function(e) {
			$('#listamarcadores').css('height', ($(window).height()*0.6)+'px')
			$('#listamarcadores').css('width', ($(window).width()*0.8)+'px')
			$('#listamarcadores').css('margin-top', c.mitadalto-$('#listamarcadores').height()/2+'px')
			$('#listamarcadores').css('margin-left', c.mitadancho-$('#listamarcadores').width()/2+'px')
			$("#listamarcadores").draggable({opacity: .75, containment :'#cuerpo',cursor: 'move'});
			g.cargarbd();
		});
		$("#infogmaps,#infogmapsen").on("click", function(e) {
			e.preventDefault();
			if(c.ingles) $('#datosp').html(c.geolocenglish);
			else $('#datosp').html(c.geolocspanish);
			$('#datosp').css({'margin-left':'0px','width':$("#centro").width()-50+'px','background-color':'#000'});
			var alturadatosp = $("div.nuevomarcador").eq(0).height()+$(this).outerHeight(true);
			if(c.esmobile) alturadatosp+=10;
			if($('#datosp').css("top")==-$(window).height()+'px') $("#datosp").animate({'top':alturadatosp+'px'},$('#datosp').outerHeight(true)*5);
			else $("#datosp").animate({'top':-$(window).height()+'px'},$('#datosp').outerHeight(true)*5);
		});
  }
  ,
  festilos:function()
  {
  		$('#centro').css({"height":$(window).height()+'px'});
  		$("#datosp").css("top",-$(window).height()+'px')
  		$("#contenedor").animate({'opacity':'1','margin-left':'0px'},1000)
	  	var alto=$(window).height()*0.6;
	  	var altomax=$("#map_canvas").width();
	  	if(alto>altomax) alto = altomax;
	  	$('#map_canvas').css({'height':alto+'px','width':$('#map_canvas').width()-25+'px'})
		$('div.nuevomarcador,div.titulogmaps').css('top', ($('#contenedor').offset().top-60)+'px')
		$('.headergmaps').css('margin-left', ($('#map_canvas').width()-$('div.nuevomarcador').eq(0).width()-$('div.nuevomarcador').eq(1).width())+'px')
		var anchocanvas = $('#map_canvas').width()+'px';
		$('#titulo,#tituloen').css('width',anchocanvas)
		$('#address,#addressen').css('width',anchocanvas)
		$('.address').css('margin-left','0px')
		$('#titulo,#tituloen').css('margin-left','0px')
  }
  ,
  initialize:function() 
  {
  	  c.fidioma();g.feventos();g.festilos();
	  g.geocoder = new google.maps.Geocoder();
      var myOptions = {zoom: 16,mapTypeId: google.maps.MapTypeId.HYBRID};
      g.map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);
	  if(navigator.geolocation) 
	  {
		  var MonitorearPosicion = navigator.geolocation.getCurrentPosition(g.manejarPosicion, g.geolocFail, { maximumAge: 600000, timeout: 1000 });
	  }
	  else 
	  {
		if(c.ingles) c.ventanaEmergente("Your browser doesn't support geolocation");
		else c.ventanaEmergente('El navegador no soporta geolocalización');
	  }
  }
  ,
  geolocFail:function()
  {
	if(c.ingles) c.ventanaEmergente("Your browser doesn't support geolocation correctly. Try using wif or other web browser");
	else c.ventanaEmergente('El navegador no soporta geolocalización correctamente. Pruebe a usar wifi u otro navegador');
  }
  ,
  manejarPosicion:function(posicion) 
  {
	  g.lat = posicion.coords.latitude;
	  g.lng = posicion.coords.longitude;
  	  g.map.setCenter(new google.maps.LatLng(posicion.coords.latitude,posicion.coords.longitude));
	  g.codeLatLng(posicion.coords.latitude,posicion.coords.longitude,1);
  }
  ,
  codeAddress:function() 
  {
	if(c.ingles) var valordir = 'addressen';
	else var valordir = 'address';
   	var address = document.getElementById(valordir).value;
	if(address=='Dirección'){alert('Establezca una dirección');return;}
     g.geocoder.geocode( { valordir: address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
		g.calle=''
		g.numero=''
		g.codigopostal=''
		g.ciudad=''
		g.provincia=''
		g.region=''
		g.pais=''
		  
        g.map.setCenter(results[0].geometry.location);
		g.map.setZoom(18);
		g.codeLatLng(results[0].geometry.location.lat(),results[0].geometry.location.lng(),0);
		g.lat = results[0].geometry.location.lat();
		g.lng = results[0].geometry.location.lng();
      } else {
      }
    });
  }
  ,
  codeLatLng:function(lat,lng,nivel) 
  {
	  var latlng = new google.maps.LatLng(lat, lng);
      g.geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) 
	  {
        if (results[nivel]) {
		  var infowindow = new google.maps.InfoWindow({
				content: results[nivel].formatted_address,
				position: g.map.getCenter()
			});
		  g.listainfowindows.push(infowindow);
		  var arrdireccion=results[0].formatted_address.split(",");
		  g.calle = arrdireccion[0];
          infowindow.open(g.map);
		  for(var i=0;i<results.length;i++)
		  {
			  for(var j=0;j<results[i].types.length;j++)
			  {
				  if(results[i].types[j]=='street_address') g.numero=results[i].address_components[0].long_name
				  if(results[i].types[j]=='postal_code') g.codigopostal=results[i].address_components[0].long_name
				  else if(results[i].types[j]=='locality') g.ciudad=results[i].address_components[0].long_name
				  else if(results[i].types[j]=='administrative_area_level_2')  g.provincia=results[i].address_components[0].long_name
				  else if(results[i].types[j]=='administrative_area_level_1') g.region=results[i].address_components[0].long_name
				  else if(results[i].types[j]=='country') g.pais=results[i].address_components[0].long_name
			  }
		  }
        }
      } 
	  else if (status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) 
	  {    
		setTimeout(function() {
			g.codeLatLng(lat,lng,nivel);
		}, 200);
	  }
    });
  }
  ,
  guardarbd:function() 
  {
	  var valorpost = '{';
	  var mensaje=false;
	  if(g.calle.match(/[a-zA-Z0-9]/) || g.calle=='') valorpost+= '"calle":"'+g.calle+'"' 
	  else mensaje=true;
	  valorpost+= ',"numero":"'+g.numero+'"'  
	  if(g.codigopostal.match(/[a-zA-Z0-9]/) || g.codigopostal=='') valorpost+= ',"codigopostal":"'+g.codigopostal+'"' 
	  else mensaje=true;
	  if(g.ciudad.match(/[a-zA-Z0-9]/) || g.ciudad=='') valorpost+= ',"ciudad":"'+g.ciudad+'"' 
	  else mensaje=true;
	  if(g.provincia.match(/[a-zA-Z0-9]/) || g.provincia=='') valorpost+= ',"provincia":"'+g.provincia+'"' 
	  else mensaje=true;
	  if(g.region.match(/[a-zA-Z0-9]/) || g.region=='') valorpost+= ',"region":"'+g.region+'"' 
	  else mensaje=true;
	  if(g.pais.match(/[a-zA-Z0-9]/) || g.pais=='') valorpost+= ',"pais":"'+g.pais+'"' 
	  else mensaje=true;
	  if(c.ingles)
	  {
		  if($('#tituloen').val().match(/[a-zA-Z0-9]/) && $('#tituloen').val()!='') valorpost+= ',"titulo":"'+$('#tituloen').val()+'"' 
		  else {alert('You must introduce an alphanumeric value for the title');return}
	   }
	   else
	   {
		  if($('#titulo').val().match(/[a-zA-Z0-9]/) && $('#titulo').val()!='') valorpost+= ',"titulo":"'+$('#titulo').val()+'"' 
		  else { alert('Debe introducir un valor alfanumérico para el título');return}
	  }
	  if(!isNaN(g.lat) && !isNaN(g.lng)) 
	  {
		  valorpost+= ',"lat":"'+g.lat.toFixed(6)+'"'
		  valorpost+= ',"lng":"'+g.lng.toFixed(6)+'"'
	  }
	  else mensaje=true;
	  valorpost += '}';
	  if(!mensaje)
	  {
		  $.post("paginas/guardarGooglePos.php",
		  $.parseJSON(valorpost),
		   function(data){
			   if(data)
			   {
				   $('#ventana').css('display','block')
				   $('#ventana').html(data);
				   $('#ventana').css("width",$('#ventana').width()+20+'px');
				   $('#ventana').css("margin-left",c.mitadancho-$('#ventana').width()/2);
				   $('#ventana').css("margin-top",$(window).height()/5-$('#ventana').height()/2);
				   $('#ventana').css("padding-top",$('#ventana').height()/2-5+'px');
				   $('#ventana').fadeOut(5000);
			   }
		   }
		); 
	  }
	  else alert("Google no ha facilitado los datos de localización");
  }	
  ,
  cargarbd:function() 
  {
		$.ajax({
			url: "paginas/listamarcadores.php",
			success: function(datos){
				if(datos)
				{
					$('#listamarcadores').html(datos)
					if($('#listamarcadores').css('display')=='none') $('#listamarcadores').toggle()
				}
		  }
		});
	  
		$.getJSON('paginas/guardarGooglePos.php?ingles='+c.ingles, function(data) {
		if(data) 
		{
			$('#cargando').toggle();
			g.cargando=true;
			g.arrlatlng=new Array();
			g.markerBounds = new google.maps.LatLngBounds();
			if(g.listainfowindows.length>0)
			{
				for(var i=0;i<g.listainfowindows.length;i++)
				{
					g.listainfowindows[i].close();
				}
			}
			g.listainfowindows=new Array();
			$.each(data.userdata, function(i,valor)
			{
				g.arrlatlng[i]=false;
				g.geocode(i,valor);
		   });
		   g.map.fitBounds(g.markerBounds);
		   var parar=setInterval(function(){
								  var fin=true;
								  for(var j=0;j<g.arrlatlng.length;j++)
								  {
									  if(!g.arrlatlng[j]) fin=false;
								  }
								  if(fin) {$('#cargando').toggle();clearInterval(parar)}
							 },10);
		}
	});
  }
  ,
  geocode:function(i,valor)
  {
	  var latlng = new google.maps.LatLng(valor.lat, valor.lng);
	  g.markerBounds.extend(latlng);
	  g.geocoder.geocode({'latLng': latlng}, function(results, status) {
	  if (status == google.maps.GeocoderStatus.OK) {
		  g.arrlatlng[i]=true;
		 
		if (results[0]) {
		  var marker = new google.maps.Marker({position: latlng,title : results[0].formatted_address,map: g.map});
		  google.maps.event.addListener(marker, 'click', function() {infowindow.open(g.map,marker)});
		  var infowindow = new google.maps.InfoWindow();
		  infowindow.setContent('<div style="font-weight:bold">'+valor.titulo+'</div><div>'+results[0].formatted_address+'</div>');
		  g.listainfowindows.push(infowindow)
		}
	  } 
	  else if (status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) 
	  {    
		setTimeout(function() {g.geocode(i,valor)}, 200);
	  }
	});
  }
}
