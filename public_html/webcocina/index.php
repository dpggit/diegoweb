<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">	
<head>
	<meta name="author" content="Diego Pena Gayo"></meta>
	<meta name="description" content="Aplicacion de productos de cocina"></meta>
	<meta name="keywords" content="cocina,productos"></meta>
	<meta name="copyright" content="Diego Pena Gayo 2013"></meta>
	<meta http-equiv="Cache-Control" content="max-age=3600, must-revalidate"></meta>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"></meta>
	<meta name="viewport" content="width=device-width, initial-scale=1,user-scalable=no"></meta>
	<link href="estilos/estilos.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="scripts/jquery-1.8.0.min.js"></script>
	<script type="text/javascript" src="scripts/codigoscript.js"></script>
	<script type="text/javascript" src="scripts/modernizr.js"></script>
	<script type="text/javascript">
	    var c=new clase();        
	    $(document).ready(
              function()
              {
                if(!$.browser.chrome)c.start()
              }
        );
    </script>
    <title>Productos de cocina</title>
</head>
<body onload="if($.browser.chrome)c.start()">
<form method="POST" id="container">		
	<noscript><div class="noscript">You need to have javascript enabled</div></noscript>
	<div id="fondo"></div>
	<header id="header">
		<nav id="contheader">
			<a href="#">Account Sign In</a>
			<ul>
				<li><a href="#">Register</a></li>
				<li><a href="#">Buyers Guide</a></li>
				<li><a href="#">About</a></li>
				<li><a href="#">Blog</a></li>
				<li><a href="#">Contact</a></li>
			</ul>
			<div>
				<img id="telephone" src="images/telephone.png"></img>
				<div id="numtelephone">123.456.7890</div>
				<img id="chat" src="images/chat.png"></img>
				<a id="livehelp" href="#">Live Help</a>
				<img id="canadaflag" src="images/canadaflag.png" width="20" height="11"></img>
				<img id="usflag" src="images/usflag.png" width="20" height="11"></img>
			</div>
		</nav>
	</header>
	<section id="header2">
		<img id="bag" src="images/bag.png"></img>
		<div id="search">
			<input name="search" value="Search website"  data-role="none"></input>
			<div id="contsearch">GO</div>
		</div>
		<div id="subheaderTop">
			<div class="contsubheader">
				<div id="itemsbagtext">0 items in your bag</div>
				<div class="middletext">ECOMMERCE</div>
			</div>
		</div>
		<div id="subheaderBottom">
			<div class="contsubheader">
				<div id="bcheckout"><input type="button" value="Check Out" data-role="none"></input></div>
				<div class="middletext">WEBSITE</div>
			</div>
		</div>
	</section>
	<section id="header3">
		<nav id="contheader3">
				<div><a>FREEBIES</a></div>
				<div><a>GIFT CARDS</a></div>
				<div><a>SALE</a></div>
				<div><a>BRAND</a></div>
				<div><a>KIDS</a></div>
				<div><a>WOMEN'S</a></div>
				<div><a>NEWS</a></div>
				<div><a>LATEST ARRIVALS</a></div>
				<input type="button" value="HOME" data-role="none"></input>
		</nav>
	</section>
	<section id="headerimg">
		<div>
			<div>Festival Offer</div>
			<div>SALE</div>
		</div>
		<img src="images/brandy.png" ></img>
		<div></div>
		<div></div>
		<div>PRODUCT TITLE</div>
		<div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras suspicit lacus dapibus ante mattis in adispicing nibh placerat. Creas bitendum porta diam, non dignissim sapien malesuada vitae</div>			
	</section>
	<section id="mainsection">
		<div>
			<div>Browse Categories</div>
			<div>
				<div><a href="#">Lorem ipsum dolor sit</a></div>
				<div><a href="#">Amet consectetur</a></div>
				<div><a href="#">Adipiscing elit</a></div>
				<div><a href="#">Cras suspicit lacus</a></div>
				<div><a href="#">Dapibus ante mattis</a></div>
				<div><a href="#">Adispicing nibh placerat</a></div>
				<div><a href="#">Creas bitendum</a></div>
				<div><a href="#">Porta diam elit</a></div>
				<div><a href="#">Adispicing nibh placerat</a></div>
				<div><a href="#">Creas bitendum</a></div>
				<div><a href="#">Porta diam elit</a></div>
			</div>
			<!--
			<div>
				<div>
					<div>Join our newsletter list to get the latest updates</div>
					<input></input>
					<input type="button" value="Join Now"></input>
					<div><img src="images/twitter.png"></img>Follow us in Twitter</div>
					<div><img src="images/facebook.png"></img><span>Become our fan in Facebook</span></div>
					<div><img src="images/linkedin.png"></img><span>Connect with us on LinkedIn</span></div>
					<div><img src="images/mail.png"></img><span>Send us your email enquiries</span></div>
				</div>
			</div>
			-->
		</div>
		<div>
			<div>
				<span>Sort by</span>
				<div>
					<span>Ascending</span>
					<div><img src="images/downarrow.png"></img></div>
				</div>
				<select data-role="none">
					<option selected value="0">Ascending</option>
					<option selected value="1">Ascending 2</option>
					<option selected value="2">Ascending 3</option>
				</select>
				<div>
					<span>Product Name</span>
					<div><img src="images/downarrow.png"></img></div>
				</div>
				<select data-role="none">
					<option selected value="0">Product Name</option>
					<option selected value="1">Ascending 2</option>
					<option selected value="2">Ascending 3</option>
				</select>
				<div>
					<span>Brand Name</span>
					<div><img src="images/downarrow.png"></img></div>
				</div>
				<select data-role="none">
					<option selected value="0">Brand Name</option>
					<option selected value="1">Ascending 2</option>
					<option selected value="2">Ascending 3</option>
				</select>
				<span>Items per page</span>
				<div>
					<span><a>12&nbsp;</a>/</span>
					<span><a>20&nbsp;</a>/</span>
					<span><a>30&nbsp;</a>/</span>
					<span><a>50</a></span>
				</div>
			</div>
			<div class="encabezados">OUR PRODUCTS</div>
			<?php $n=0;
			for($i=1;$i<=3;$i++){?>
			<div class="anuncios">
				<?php for($j=1;$j<=4;$j++)
				{ $n++;?>
				<div class="anunciossub">
					<img src="<?php echo 'images/imagen'.$n.'.png'?>"></img>
					<div>Product Name</div>
					<div>Categoría</div>
					<div>Descripción</div>
				</div>
				<?php } ?>
			</div>
			<?php } ?>
			<div id="paginacion">
				<?php for($j=1;$j<=4;$j++){?><span><a><?php echo $j?></a></span><?php } ?>
				<span><a>Next&nbsp;></a></span><span><a>Last&nbsp;>></a></span>
			</div>
			<div class="encabezados" id="featured">FEATURED PRODUCTS</div>
			<div id="featuredprod">
				<div class="label"><img src="images/leftarrow.png"></img><img src="images/sublabel.png"></img></div>
				<div>
					<img src="images/imagen13.png"></img>
					<div>Elegant MP3 play player skin PSD download</div>
				</div>
				<div>
					<img src="images/imagen14.png"></img>
					<div>Download shopping bag & icons (PSD & PNG)</div>
				</div>
				<div>
					<img src="images/imagen15.png"></img>
					<div>High resolution abstract bokeh background</div>
				</div>
				<div class="label"><img src="images/leftarrow.png"></img><img src="images/sublabel.png"></img></div>
			</div>
		</div>
	</section>
</form>			
</body>
</html>
