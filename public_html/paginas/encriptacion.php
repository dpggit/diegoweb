<?php
// Recoger datos de base de datos remota
// Get data from remote database
$link = mysql_connect('localhost','root',''); 
mysql_select_db("basededatos",$link);
mysql_set_charset('UTF-8');

class informes
{
    function __construct() {
 	return;
    }

    function iniciar()
    {
                global $eof_out;

                // Encriptacion con clave
		// Encriptation with key
 		ini_set("max_execution_time", 300);
		$key1 = 'clave1';
		$key2 = 'clave2';
		$user = 'nombreusuario';
		$pass = 'nombrepass';
		$lengthuser = strlen($user);
		$lengthpass = strlen($pass);
		
		
	    function urlsafe_b64encode($string)
		{
		  $data = base64_encode($string);
		  $data = str_replace(array('+','/','='),array('-','_','.'),$data);
		  return $data;
		}

	    // Abrir el cifrado 
	    // Open the cipher
	    $td = mcrypt_module_open('rijndael-256', '', 'cbc', '');
	
	    /* Crear el IV y determinar la longitud de la clave, usar Create the IV and determine the keysize length, 
	    usar MCRYPT_RAND para windows */
	    /* Create the IV and determine the keysize length, use MCRYPT_RAND on Windows instead */

	    $iv = mcrypt_create_iv(mcrypt_enc_get_iv_size($td), MCRYPT_DEV_RANDOM);

	    $ks = mcrypt_enc_get_key_size($td);
	
	    // Crear clave
	    // Create key
	    $key1 = md5($key1);
	    $key2 = md5($key2);
	
	    $key = substr($key1, 0, $ks/2) . substr(strtoupper($key2), (round(strlen($key2) / 2)), $ks/2);
	
	    $key = substr($key.$key1.$key2.strtoupper($key1),0,$ks);
	
	    // Inicializar encriptación
	    // Initialize encription
	    mcrypt_generic_init($td, $key, $iv);
	
	    // Encriptar los datos
	    // Encrypt data
	    $encrypteduser = urlsafe_b64encode(mcrypt_generic($td, $user));
	    $encryptedpass = urlsafe_b64encode(mcrypt_generic($td, $pass));

	    mcrypt_module_close($td);

       ob_start();
           readfile("http://www.servidorx.com/archivo.php?valorusuario=$encrypteduser&valorpass=$encryptedpass&viv=".urlsafe_b64encode($iv));
           $datos=ob_get_contents();
        ob_end_clean();
        
        if($datos)
        {
        	$arrinsert=explode("#####INSERT#####",$datos);
		$resultado = mysql_query('TRUNCATE TABLE nombretabla');
		$correcto=true;
	        foreach($arrinsert as $query)
	        {
			$ok = mysql_query($query);
		    	if(!$ok) $correcto=false;
	        } 
	        if($correcto) $eof_out['vdatos']="Datos introducidos";
	        else $eof_out['vdatos']="Datos no introducidos correctamente";
        }
       
        include(get_class($this).".htm")
        return;
    }
}

        
        ?>



        <?php
// Desde el servidor donde cogo los datos de una BD
// Get database data from server
$link = mysql_connect('localhost','root',''); 
mysql_select_db("basededatos2",$link);
mysql_set_charset('UTF-8');


function urlsafe_b64decode($string)
{
  $data = str_replace(array('-','_','.'),array('+','/','='),$string);
  $mod4 = strlen($data) % 4;
  if ($mod4) {
    $data .= substr('====', $mod4);
  }
  return base64_decode($data);
}


$key1 = 'key1';
$key2 = 'key2';
$lengthuser = 9;
$lengthpass = 10;
$encrypteduser=urlsafe_b64decode($_GET['valorusuario']);
$encryptedpass=urlsafe_b64decode($_GET['valorpass']);
$viv=urlsafe_b64decode($_GET['viv']);



// Abrir el cifrado
// Open the cipher
$td = mcrypt_module_open('rijndael-256', '', 'cbc', '');


	$ks = mcrypt_enc_get_key_size($td);
	
	// Crear la clave
	// Create key
	$key1 = md5($key1);
	$key2 = md5($key2);
	
	$key = substr($key1, 0, $ks/2) . substr(strtoupper($key2), (round(strlen($key2) / 2)), $ks/2);
	
	$key = substr($key.$key1.$key2.strtoupper($key1),0,$ks);
	
	// Inicializar el m odulo de encroptación para la desencriptación
	// Initialize encryption module for decryption 
	mcrypt_generic_init($td, $key, $viv);
		// Desencriptar el string
		// Desencrypt string
		$decrypteduser = mdecrypt_generic($td, $encrypteduser);
		$decryptedpass = mdecrypt_generic($td, $encryptedpass);
	mcrypt_generic_deinit($td);

mcrypt_module_close($td);


// mysqli_real_escape_string no limpia ciertos valores
// mysqli_real_escape_string does not clean certain values
function limpiar($string)
{
	$filtro=array();
	$filtro[]='%';
	$filtro[]='_';
	foreach($filtro as $valor)
	{
		$string=str_replace($valor,"",strtolower($string));
	}
	return $string;
}

// Mostrar el string
// Show the string
$usuario=mysql_real_escape_string(limpiar(substr($decrypteduser,0,$lengthuser)));
$pass=mysql_real_escape_string(limpiar(substr($decryptedpass,0,$lengthpass)));

$resultado = mysql_query("SELECT * FROM tablausuarios WHERE usuario='".$usuario."' AND password='".$pass."'");
$numrows=mysql_num_rows($resultado);

if($numrows>0)
{
/*
*/
}

?>
