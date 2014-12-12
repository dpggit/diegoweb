<?php
include("conexion.php");

class guardarGooglePos
{
	function __construct() 
	{
		if($_POST)
		{	
			foreach($_POST as $key=>$p)
			{
				$_POST[$key]=mysql_real_escape_string($p);
				if($key=='codigopostal' && $p=='') $_POST['codigopostal']=0;
			}
			$resultado = mysql_query('SELECT lat,lng FROM markers WHERE lat='.$_POST['lat'].' AND lng='.$_POST['lng']);
			$numrows = mysql_num_rows($resultado);
			$mensaje='';
			if($numrows==0)
			{
				$query = utf8_decode('INSERT INTO markers(titulo,calle,numero,lat,lng,codigopostal,ciudad,provincia,region,pais) VALUES("'.utf8_encode($_POST['titulo']).'","'.utf8_encode($_POST['calle']).'","'.$_POST['numero'].'",'.$_POST['lat'].','.$_POST['lng'].',"'.utf8_encode($_POST['codigopostal']).'","'.utf8_encode($_POST['ciudad']).'","'.utf8_encode($_POST['provincia']).'","'.utf8_encode($_POST['region']).'","'.utf8_encode($_POST['pais']).'")');
				$resultado = mysql_query($query);
				if($resultado) $mensaje='Ha creado un marcador con éxito';
				else $mensaje='Error en la consulta a la base de datos'.'INSERT INTO markers(titulo,calle,numero,lat,lng,codigopostal,ciudad,provincia,region,pais) VALUES("'.utf8_encode($_POST['titulo']).'","'.utf8_encode($_POST['calle']).'","'.$_POST['numero'].'",'.$_POST['lat'].','.$_POST['lng'].','.$_POST['codigopostal'].',"'.utf8_encode($_POST['ciudad']).'","'.utf8_encode($_POST['provincia']).'","'.utf8_encode($_POST['region']).'","'.utf8_encode($_POST['pais']).'")';
			}
			else $mensaje='Ya existe un marcador con esas coordenadas geográficas';
			echo $mensaje;
		}
		else 
		{
			$resultado = mysql_query('SELECT lat,lng FROM markers');
			$numrows = mysql_num_rows($resultado);
			if($numrows>0)
			{
				$json='{"userdata":';
				
					$query='SELECT CONCAT("[" , GROUP_CONCAT( 
				CONCAT("{\"lat\":\"" , `lat` , "\"" ),
				CONCAT(",\"titulo\":\"" , `titulo` , "\"" ),
				CONCAT(",\"lng\":\"" , `lng` , "\"}" )
				 ) , "]" ) AS json FROM markers';
			
				$resultado = mysql_query($query);
				mysql_data_seek($resultado, 0);
				$fila=mysql_fetch_array($resultado);
				$json.=$fila['json'];
			
				$json.='}';
				echo ($json);
			}
		}
	}
}

$obj = new guardarGooglePos();

mysql_close($link); 
?>