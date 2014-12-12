<html>
<body>
<div class="divcodejem">
	<?php 
	ob_start();
	readfile("encriptacion.php");
	$salida = ob_get_contents();
	ob_end_clean();
	highlight_string($salida);
	?>
</div>
</body>
</html>