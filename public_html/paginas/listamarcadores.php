<!DOCTYPE html>


<script>
	$("#close").bind("click", function(e) {
		$("#listamarcadores").toggle();
	});
</script>

<?php 
include("conexion.php");

class listamarcadores
{
	function __construct() 
	{
		$resultado = mysql_query('SELECT * FROM markers');
		$numrows = mysql_num_rows($resultado);
		$fila=mysql_fetch_array($resultado);
		if($fila)
		{
			$numfilas=(count($fila)-2)/2;
		}
		if($numrows==0) die;
		$mensaje='';
		$marcadores='';
		$marcadores.="<div style='float:right;margin-bottom:5px'><a href='#' id='close'><img src='imagenes/close.gif'></a></div>";
		$marcadores.="<div id='contlistamarcadores' style='width:".($numfilas*102)."px'>";
		$color='';
		$a=0;
		
		$marcadores.="<div>";
			$resultado = mysql_query("SELECT * FROM markers");
			mysql_data_seek($resultado, 0);
			$fila=mysql_fetch_array($resultado);
			if($fila)
			{
				foreach($fila as $key => $value) 
				{
					if($key=='id' || is_numeric($key)) continue;
					if($a%2==0) $color='#CCCC88';
					else $color='#CCCC99';
					
					if($_GET['ingles']=='true')
					{
						if($key=='titulo') $key='title';
						if($key=='calle') $key='street';
						if($key=='numero') $key='number';
						if($key=='codigopostal') $key='pc';
						if($key=='ciudad') $key='city';
						if($key=='provincia') $key='province';
						if($key=='region') $key='region';
						if($key=='pais') $key='country';
					}
					else if($key=='codigopostal') $key='cp';

					$marcadores.='<div class="listamarc" style="width:100px;background-color:'.$color.'">'.strtoupper($key).'</div>';
					$a++;
				}
			}
		$marcadores.="</div>";
		
			$a=0;
			$resultado = mysql_query("SELECT * FROM markers");
			$i=0;
			while ($fila = mysql_fetch_assoc($resultado)) 
			{
				$marcadores.="<div style='clear:both'>";
				foreach($fila as $key => $value) 
				{
					if($key=='id' || is_numeric($key)) continue;
					if($key=='codigopostal') $key='cp';
					if($i%2!=0)
					{
						if($a%2==0) $color='#CCCC88';
						else $color='#CCCC99';
					}
					else
					{
						if($a%2==0) $color='#CCCC99';
						else $color='#CCCC88';
					}
					$marcadores.='<div class="listamarcb" style="width:100px;background-color:'.$color.'">'.($value).'</div>';
					$a++;
				}
				$i++;
				$marcadores.="</div>";
			}
		$marcadores.="</div>";
		echo $marcadores;
	}
}

$obj = new listamarcadores();
?>
