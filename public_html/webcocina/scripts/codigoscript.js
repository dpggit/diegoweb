var clase = function( ) {
this.altomenuini;
this.ventanaTeams;
this.postvalue;
this.elementn;
this.altura;
this.anchura;
};
clase.prototype = {
	start:function()
	{
		c.fevents();
		c.fstyles();
	}
	,
	fevents:function()
	{
		$("#mainsection>div:nth-of-type(2)>div:nth-of-type(1)>select:nth-of-type(1)").on("change", function(e) {
			$("#mainsection>div:nth-of-type(2)>div:nth-of-type(1)>div:nth-of-type(1)>span").html($("option:selected",this).text())
		});	
		$("#mainsection>div:nth-of-type(2)>div:nth-of-type(1)>select:nth-of-type(2)").on("change", function(e) {
			$("#mainsection>div:nth-of-type(2)>div:nth-of-type(1)>div:nth-of-type(2)>span").html($("option:selected",this).text())
		});	
		$("#mainsection>div:nth-of-type(2)>div:nth-of-type(1)>select:nth-of-type(3)").on("change", function(e) {
			$("#mainsection>div:nth-of-type(2)>div:nth-of-type(1)>div:nth-of-type(3)>span").html($("option:selected",this).text())
		});	
	}
	,
	fstyles:function()
	{
		$("#container").css({"height":$(document).height()+'px'})
		// header main
		$("#contheader").find("#numtelephone,li,img,a").each(function(){c.centrar($(this),'soloalto')})	
		c.centrar($("#bag"),'soloalto');
		c.centrar($("#itemsbagtext"),'fondo')
		c.centrar($("#bcheckout"),'soloalto');
		$("#bcheckout").css({"left":$("#itemsbagtext").width()*0.5-$("#bcheckout").outerWidth(true)*0.5+'px'});
		//header2
		$(".contsubheader>div:first-of-type").css({"margin-left":$("#bag").width()+20+"px"})
		$(".middletext").each(function(){c.centrar($(this),'soloancho')})	
		$(".middletext").eq(0).css({"margin-top":"10px"})
		$(".middletext").eq(1).css({"margin-top":"-10px"})
		c.centrar($("#search"),'soloalto')
		c.centrarAbs($("#search"),$(".contsubheader"),'dcha');		
		$("#search").css({"margin-left":$("#search").offset().left-$("#contsearch").outerWidth(true)-8+"px"})
		$("#contsearch").css({"margin-left":$("#search").width()+"px"})
		if($.browser.chrome) $("#contsearch").css({"margin-top":"1px"})
		$("#headerimg>img:nth-of-type(2)").css("margin-top",$("#headerimg").outerHeight()-$("#headerimg>img:nth-of-type(2)").height()-6+"px")
		var ancho=$("#contheader3").width();
		$("#contheader3>div").each(function(){ancho-=$(this).width()})
		$("#contheader3>div").css("margin-left",ancho/$("#contheader3>div").length-10+'px')
		$("#contheader3>div,input").each(function(){c.centrar($(this),'soloalto')})
		$("#mainsection>div:nth-of-type(2)>div:nth-of-type(1)>div:nth-of-type(1)").css("left",$("#mainsection>div:nth-of-type(2)>div:nth-of-type(1)>select:nth-of-type(1)").position().left+'px')
		$("#mainsection>div:nth-of-type(2)>div:nth-of-type(1)>div:nth-of-type(2)").css("left",$("#mainsection>div:nth-of-type(2)>div:nth-of-type(1)>select:nth-of-type(2)").position().left+'px')
		$("#mainsection>div:nth-of-type(2)>div:nth-of-type(1)>div:nth-of-type(3)").css("left",$("#mainsection>div:nth-of-type(2)>div:nth-of-type(1)>select:nth-of-type(3)").position().left+'px')
		$("#featuredprod>div:last-of-type").css("margin-left",$("#featuredprod").width()-$("#featuredprod>div:last-of-type").width()+10+"px")
		if($.browser.safari)
		{
			$("#headerimg>img:nth-of-type(1)").css("margin-top","20%")
			$("#headerimg>div>div:nth-of-type(1)").css("margin-top","20%")
			$("#headerimg>div>div:nth-of-type(2)").css("margin-top","65%")
			$("#headerimg>div>div:nth-of-type(1)").css("margin-top","20%")
		}
	}
	,
	centrar:function(elemento,tipo)
	{
		var padre = elemento.offsetParent();
	  	if(tipo=='fondo') elemento.css({"margin-top":padre.height()-elemento.outerHeight(true)+'px'})
		else
		{
		  	if(tipo!='soloancho') 
		  	{
		  	  	var vtop = (padre.height()*0.5-elemento.outerHeight(true)*0.5);
		  		if(vtop<0) vtop=0;
		  		elemento.css({"margin-top":vtop+'px'});
		  	}
		  	if(tipo!='soloalto') elemento.css({"margin-left":padre.width()*0.5-elemento.width()*0.5+'px'});
	  	}
	}
	,
	centrarAbs:function(elemento,target,tipo)
	{
	  	elemento.css({"top":"0px","left":"0px"});
	  	if(tipo=='dcha') elemento.css({"margin-left":target.offset().left+target.width()-elemento.width()+'px'})
	  	else
	  	{
		    if(tipo!='soloancho') 
		  	{
		  	  	var vtop=0;
			  	vtop=target.offset().top+target.outerHeight(true)*0.5-elemento.outerHeight(true)*0.5;
			  	if(vtop<0) vtop=0;
			  	elemento.css({"margin-top":vtop+'px'});
			}
		  	if(tipo!='soloalto') elemento.css({"margin-left":target.offset().left+target.width()*0.5-elemento.width()*0.5+'px'});
	  	}
	}
}

