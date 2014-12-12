<!DOCTYPE html>
<html lang="es" xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=Edge"/>
	<meta name="author" content="Diego Pena Gayo"></meta>
	<meta name="description" content="Persona webpage of Diego Pena Gayo"></meta>
	<meta name="keywords" content="PHP,HTML,CSS,Jquery,JavaScript,Json,WebGL,WebRTC,Zend"></meta>
	<meta name="application-name" content="Personal Web Page"></meta>
	<meta name="copyright" content="Diego Pena Gayo 2013"></meta>
	<meta http-equiv="Cache-Control" content="max-age=3600, must-revalidate"></meta>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"></meta>
	<meta name="viewport" content="width=device-width, initial-scale=1,user-scalable=no"></meta>
	<link rel="stylesheet" href="fuentes/juergen/stylesheet.css" type="text/css" />
	<link rel="stylesheet" href="fuentes/stylesheet.css" type="text/css" />
	<link href="estilos/estilos.css" rel="stylesheet" type="text/css" />
	<!--[if lt IE 7]>
	<script src="http://ie7-js.googlecode.com/svn/version/2.1(beta4)/IE7.js"></script>
	<![endif]-->
	<script type="text/javascript" src="http://apis.google.com/js/plusone.js"></script>
	<script type="text/javascript" src="scripts/js/jquery-1.8.0.min.js"></script>
	<script type="text/javascript" src="scripts/js/jquery-ui-1.8.24.custom.min.js"></script>
	<script type="text/javascript" src="https://maps.google.com/maps/api/js?sensor=true"></script>
	<script type="text/javascript" src="scripts/codigoscript.js"></script>
	<script>
        var c=new clasebase();
        $(document).ready(
              function()
              {
                c.iniciar();
                c.abrirRect($(window).height()/2,$(document).width()*0.4,$(window).height()*0.5,$(document).width()*0.2,3,$("#centro").width(),1,"#centro");
              }
        );
    </script>
    <title>Diego Pena Gayo</title>
</head>

<body>
<div id="datosp"></div>
<noscript><div class="noscript">Para mostrar correctamente el sitio necesita tener Javascript activo</div></noscript>
<div id="divmenu"><a href="#" class="galeriaimg">Menu</a></div>
<div class="uk">
	<div class="english"><a href="#" class="imglang"><img src="imagenes/banderaspain.png" width="20" height="20"/></a></div>
	<div class="spanish"><a href="#" class="imglang"><img src="imagenes/United_Kingdom_flag_Icon_16.png" width="20" height="20"/></a></div>
</div>
<div id="centro">
	<div id="contenedor"><?php include("paginas/curriculum.html")?></div>
	<div class="black_blend"></div>
</div>
<div id="enlaces" >
	<div class="spanish">
		<div id="contacto" class="menu"><a class='menu' href='mailto:diegopenagayo@hotmail.com'>diegopenagayo@hotmail.com</a></div>
		<div id="curriculum" class="menu"><a href="#" class="menu">Currículum</a></div>
		<div id="progweb" class="menu"><a href="#" class="menu">Programación web</a></div>
		<div id="pweb" class="menu">
			<div class="menu"><a href="paginas/mvc.zip" class="menu">PHP MVC Zip</a></div>
			<div class="menu"><a href="paginas/csvcli.zip" class="menu" >Código PHP Zip</a></div>
			<div class="menu"><a href="paginas/zend.zip" class="menu">PHP ZEND Zip</a></div>
			<div id="gmaps" class="menu"><a href="#" class="menu">Google Maps</a></div>
			<div id="webgl" class="menu"><a href="#" class="menu">WebGL</a></div>
			<div id="canvasconfig" class="menu"><a href="#" class="menu">Vídeo</a></div>
			<div id="videocam" class="menu"><a href="#" class="menu">WebRTC</a></div>
		</div>	
		<!--<div class="menu"><a target="_blank" href="http://dpg.16mb.com/webcocina/" class="menu">Web demo cocina/Ecommerce</a></div>-->
		<div class="menu"><a target="_blank" href="http://dpg.16mb.com/footballmobile/" class="menu">Web demo Football Mobile</a></div>
		<div class="menu"><a target="_blank" href="http://www.youtube.com/user/TheGorflick/videos?flow=grid&view=0" class="menu">Unity3D</a></div>
		<div class="menu"><a href="paginas/unity.zip" class="menu">Códigos Unity3D C# Zip</a></div>
	</div>
	<div class="english">
		<div id="contactoen" class="menu"><a class='menu' href='mailto:diegopenagayo@hotmail.com'>diegopenagayo@hotmail.com</a></div>
		<div id="curriculumen" class="menu"><a href="#" class="menu">Currículum</a></div>
		<div id="progweben" class="menu"><a href="#" class="menu">Web programming</a></div>
		<div id="pweben" class="menu">
			<div class="menu"><a href="paginas/mvc.zip" class="menu">PHP MVC Zip</a></div>
			<div class="menu"><a href="paginas/csvcli.zip" class="menu" >PHP Code Zip</a></div>
			<div class="menu"><a href="paginas/zend.zip" class="menu">PHP ZEND Zip</a></div>
			<div id="gmapsen" class="menu"><a href="#" class="menu">Google Maps</a></div>
			<div id="webglen" class="menu"><a href="#" class="menu">WebGL</a></div>
			<div id="canvasconfigen" class="menu"><a href="#" class="menu">Video</a></div>
			<div id="videocamen" class="menu"><a href="#" class="menu">WebRTC</a></div>
		</div>
		<div class="menu"><a target="_blank" href="http://dpg.16mb.com/footballmobile/" class="menu">Web demo Football Mobile</a></div>
		<div class="menu"><a target="_blank" href="http://www.youtube.com/user/TheGorflick/videos?flow=grid&view=0" class="menu">Unity3D</a></div>
		<div class="menu"><a href="paginas/unity.zip" class="menu">Códigos Unity3D C# Zip</a></div>
	</div>
</div>

<div id="pgpercent">
</div>

<div id="ventana">
</div>

<div id="ventana2">
<div style='float:right;margin-top:-25px' id='divventana2'><a href='#' id='closebig'><img src='imagenes/close.gif'></a></div>
<div id='contventana2'></div>
</div>

<div id='cargando'>
<img src="imagenes/bigrotation2.gif" />
</div>

<div id='listamarcadores'>
</div>

<!--[if gte IE 9]><!-->
	<audio id='audioclic'>
	  <source src="sonidos/clic.oga" type="audio/ogg" >
	  <source src="sonidos/clic.wav" type="audio/wave">
	  <source src="sonidos/clic.mp3" type="audio/mpeg">
	  <embed  hidden=true loop=false volume=100 autostart=true type="application/x-mplayer2" src="sonidos/clic.mp3" ></embed>
	</audio>
<![endif]-->

<div id="bgaudioclic">
</div>

<?php
    $OSList = array
    (
            // Match user agent string with operating systems
            'Windows 3.11' => 'Win16',
            'Windows 95' => '(Windows 95)|(Win95)|(Windows_95)',
            'Windows 98' => '(Windows 98)|(Win98)',
            'Windows 2000' => '(Windows NT 5.0)|(Windows 2000)',
            'Windows XP' => '(Windows NT 5.1)|(Windows XP)',
            'Windows Server 2003' => '(Windows NT 5.2)',
            'Windows Vista' => '(Windows NT 6.0)',
            'Windows 7' => '(Windows NT 7.0)|(WinNT 4.0)',
            'Windows NT 4.0' => '(Windows NT 4.0)|(WinNT4.0)|(WinNT)|(Windows NT)',
            'Windows ME' => 'Windows ME',
            'Open BSD' => 'OpenBSD',
            'Sun OS' => 'SunOS',
            'Linux' => '(Linux)|(X11)',
            'Mac OS' => '(Mac_PowerPC)|(Macintosh)',
            'QNX' => 'QNX',
            'BeOS' => 'BeOS',
            'OS/2' => 'OS/2',
            'Search Bot'=>'(nuhk)|(Googlebot)|(Yammybot)|(Openbot)|(Slurp)|(MSNBot)|(Ask Jeeves/Teoma)|(ia_archiver)'
    );
     
    // Loop through the array of user agents and matching operating systems
	$so='';
    foreach($OSList as $CurrOS=>$Match)
    {
            // Find a match
            if (preg_match('/'.$Match.'/', $_SERVER['HTTP_USER_AGENT']))
            {
                    $so=$CurrOS;
					break;
            }
    }
    echo "<div id='os' style='display:none'>".$so."</div>";
?>
</body>
</html>
