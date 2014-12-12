var clase = function( ) {
this.altomenuini;
this.ventanaTeams;
this.postvalue;
this.elementn;
};
clase.prototype = {
	start:function()
	{
		c.fevents();
		c.fstyles();
	}
	,
	startteams:function()
	{
		$("#goback").bind("click", function(e) {
			document.location.href="http://"+window.location.hostname+"/killerproblem";
		});
		$("#divplayers").css("left",'50%');
		$("#divplayers").css("margin-left",-($("#divplayers").width()*0.5)+'px');

		if(typeof(Storage)!=="undefined")
		{
			$.ajax({
			   url: "http://193.144.232.141:8080/football/Servlet?function=getTeam&team="+sessionStorage.teamname,
			   type: "GET",
			   dataType : "jsonp json",
			   success: function(data)
				{
						data = data.response;
						$("#divteamnamecontent").html(data.name);
						$("#divteamdescripcontent").html(data.description);
						$.each(data.players, function(i,valor)
							{
								$("#divplayers").append('<tr><td>'+valor.name+'</td><td>'+valor.points+'</td></tr>');
						   });
				}
				,
			   error: function(jqXHR, textStatus, errorThrown) {
				alert(JSON.stringify(jqXHR));
			 }
			});

		}
	}
	,
	funcfrm:function(e) 
	{
		e.stopPropagation();			
		$("#frm").toggle("slow",function(){
			if($("#frmpoints").css("display")=="block") $("#frmpoints").toggle("slow");
			if($("#frmaddplayer").css("display")=="block") $("#frmaddplayer").toggle("slow");
			$("#teamname").val("Team name");
		});	
	}
	,
	funcfrmpoints:function(e)
	{
		e.stopPropagation();
		$("#frmpoints").toggle("slow",function(){
			if($("#frm").css("display")=="block") $("#frm").toggle("slow");
			if($("#frmaddplayer").css("display")=="block") $("#frmaddplayer").toggle("slow");
			$("#playername").val("Player name");
		});
	}
	,
	funcfrmadd:function(e)
	{
		e.stopPropagation();
		$("#frmaddplayer").toggle("slow",function(){
		if($("#frm").css("display")=="block") $("#frm").toggle("slow");
		if($("#frmpoints").css("display")=="block") $("#frmpoints").toggle("slow");
		$("#addplayername").val("");
		$("#addteamname").val("");
		});
	}
	,
	funcloadteams:function(e)
	{
		if($("#teamname").val().match(/[a-zA-Z0-9]/) && $("#teamname").val()!='') 
		{
			c.loadTeams(e);
		}
		else c.alertWindow("You must write a proper team name of numbers or letters");
	}
	,
	funcbuttongetplayer:function(e)
	{
		$.ajax({
		   url: "http://193.144.232.141:8080/football/Servlet?function=getPoints&player="+$("#playername").val(),
		   type: "GET",
		   dataType : "jsonp json",
		   success: function(data)
			{
				if(data.response_status=="401") c.alertWindow(data.response);
				else
				{
					data = data.response;
					if($("#tableplayer").css("display")=="none") 
					{
						$("#frmpoints").css("height","40%")
						$("#tableplayer").toggle("slow");
					}

					$("#playersfloat").html(data.name);
					$("#pointsfloat").html(data.points);
				}
			}
			,
		   error: function(jqXHR, textStatus, errorThrown) {
			alert(JSON.stringify(jqXHR));
		 }
		});
	}
	,
	funcfblike:function(e)
	{
		e.stopPropagation();
		if($(".fb-comments").css("display")=="none") 
		{
			$(".fb-comments").fadeIn("slow");
			if($(window).width()<1024) $(".menumain").fadeOut("slow");
		}
		else 
		{
			$(".fb-comments").fadeOut("slow");
			if($(window).width()<1024) $(".menumain").fadeIn("slow");
		}
	}
	,
	resizeWindow:function()
	{
		if($(window).width()>1280)
		{
			$(".fb-comments").css({"position":"fixed","width":"30%","height":"100%","left":"0px","top":"0px"})
			$("body").css("font-size","1.5em");
			$(".tinput").css({"width":"72%","margin-top":"5px"});
			$(".boton").css("width","");
			$(".menumain").css({"width":"30%","left":"35%"});
			$("#botonaddplayer").css("float","right");
			$("#contfblike").css({"width":"30%","top":"5%","left":"75%"});
			$("#fb-likebuttons").css({"width":"100%"});
			$(".frm").css("height","20%");
		}
		if($(window).width()<=1280)
		{
			$(".tinput").css("width","65%");
		}
		if($(window).width()<=1024)
		{
			$(".fb-comments").css({"display":"none","left":"10%","width":"40%","height":"30%","margin":"10px","margin-left":"0px"})
			$("body").css("font-size","1.2em");
			$(".boton").css({"width:;margin-left":"3px"});
			$(".tinput").css("width","60%");
			$("#botonaddplayer").css("float","none");
		}
		if($(window).width()<=800)
		{
			$("body").css("font-size","1em");
			$(".boton").css("width","97%");
			$(".tinput").css("width","93%");
			$(".frm").css("height","50%");
		}
		if($(window).width()<=480)
		{
			$(".tinput").css({"width":"93%","margin-top":"0px"});
			$(".boton").css("width","95%");
			$("body").css("font-size","0.8em");
			$(".centertext").css({"font-size":"1.5em"});
			$(".menumain").css({"width":"50%","left":"25%"});
			$("#contfblike").css({"width":"100%","top":"5%","left":"25%","height":"50%"});
			$(".fb-like").css({"width":"50% !important"});
			$("#fb-likebuttons").css({"left":"25%"});
			$(".fb-comments").css({"left":"0%","width":"100%","height":"65%","top":"30% !important"});
			$(".frm").css("height","60%");
		}
		c.altomenuini = $(".menumain").height()*0.25;
		$(".menusecond").css("height",c.altomenuini+'px');
		$(".wraptext").css("padding-top",($(".menusecond").height()*0.5)-($(".wraptext").height()*0.5)+'px')
	}
	,
	fevents:function()
	{
		$("#botonaaccept").on("click", function(e) {
			if($("#flotante").css("display")=="block") 
			{
				$("#flotante").toggle("slow");
				$("#blackshadow").toggle();
			}
		});		
		
		if(!Modernizr.mq('only all'))
		{
			$(window).on("resize", function(e) {
				c.resizeWindow();
			});
			c.resizeWindow();
		}	

			
		$("#team,#teaminfo").on({click: function(e) {c.funcfrm(e)},tap: function(e) {c.funcfrm(e)}});
		$("#playerpoints,#ppoints").on({click: function(e) {c.funcfrmpoints(e)},tap: function(e) {c.funcfrmpoints(e)}});
		$("#addplayer,#aplayer").on({click: function(e) {c.funcfrmadd(e)},tap: function(e) {c.funcfrmadd(e)}});
		$("#botonteamname").on({click: function(e) {c.funcloadteams(e)},tap: function(e) {c.funcloadteams(e)}});
		$("#botonpoints").on({click: function(e) {c.funcbuttongetplayer(e)},tap: function(e) {c.funcbuttongetplayer(e)}});
		$("#botonadddescrip").on({click: function(e) {c.addDescripPost(e)},tap: function(e) {c.addDescripPost(e)}});
		$("#botonaddplayer").on({click: function(e) {c.addPlayerPost(e)},tap: function(e) {c.addPlayerPost(e)}});
		$("#fb-likebuttons").on({click: function(e) {c.funcfblike(e)},tap: function(e) {c.funcfblike(e)}});

		$(".tinput").on("click", function(e) {
			$(this).val("");
		});
		
		$(".menusecond").hover(
				  function(e) {
							var anchosencond = $(".menusecond").width()*0.4+'px';
								 if(!c.sobreobj)
								 {
								 	$(document.body).css("cursor","pointer")
									 c.sobreobj=true;
									 var obja = $(this).find(c.elementn);
									 if(Modernizr.textshadow) obja.css('text-shadow','5px 0px 5px #FFF')
									 obja.animate(
										  {
											'margin-left': anchosencond
										  }, 
										  200, 
										  function() 
										  {
											    obja.css('margin-left','-'+anchosencond);
												obja.animate(
												{
												'margin-left': '0px'
												}
												,200,function()
												{
		
												});
										  }
									  );
									  
								 }
				 }
				 ,
				 function(e)
				 {				
					 $(this).find(c.elementn).css('color','#fff')
					 if(Modernizr.textshadow)  $(this).find(c.elementn).css('text-shadow','none')
					 c.sobreobj=false;
				 }
		);
	}
	,
	fstyles:function()
	{
		if($(window).width()>480) $(".fb-like").attr("send","true")
		$(".fb-comments").css("display","none");
		// Media queries by javascript
		if(!Modernizr.opacity) $("#blackshadow").remove()
		if(!Modernizr.cssgradients)
		{
				//$(".wraptext").css({"background-image":"url(images/gradient.png)","background-repeat":"no-repeat","height":$(".menusecond").height()+"px"});
				$("#teaminfo").html("<a>Team information</a>")
				$("#ppoints").html("<a>Player points</a>")
				$("#aplayer").html("<a>Add new player</a>")
				c.elementn="a";
		}
		else c.elementn="div";
		c.altomenuini = $(".menumain").height()*0.25;
		$(".menusecond").css("height",c.altomenuini+'px');
		$(".wraptext").css("padding-top",($(".menusecond").height()*0.5)-($(".wraptext").height()*0.6)+'px')
	}
	,
	addPlayerPost:function()
	{

		var wrong=false;
		c.postvalue = '{';
		var alertmsg='';
		
		if($("#addplayername").val().match(/[a-zA-Z0-9]/) && $("#addplayername").val()!='') 
		{
			c.postvalue+= '"player":"'+$("#addplayername").val()+'"' 
		}
		else 
		{
			wrong = true;
			alertmsg = "You must write a proper player name of numbers or letters";
		}
		if($("#addteamname").val().match(/[a-zA-Z0-9]/) && $("#addteamname").val()!='' && !wrong) 
		{
			c.postvalue+= ',"team":"'+$("#addteamname").val()+'"' 
			c.postvalue += '}';
			$.ajax({
			   url: "http://193.144.232.141:8080/football/Servlet?function=getTeam&team="+$("#addteamname").val() ,
			   type: "GET",
			   dataType : "jsonp json",
			   success: function(data)
				{
					if(data.response_status=="401")
					{
						$("#blackshadow").css({'display':'block'});
						$("#divdescrip").fadeIn("slow");
						wrong = true;
						$("#divdescrip").fadeIn("slow");
						$("#divdescrip").draggable({
							   opacity: .75,
							   cursor: 'move'
							});
					}
					else c.sendAddPlayer();
				}
				,
				error: function(jqXHR, textStatus, errorThrown) {
					alert(JSON.stringify(jqXHR));
				 }
			});
		}
		else 
		{
			wrong = true;
			if(alertmsg!='') alertmsg+="<br></br>";
			alertmsg+= "You must write a proper team name of numbers or letters";
		}
/*
		if($("#teamdescrip").css("display")=='block')
		{
			if($("#teamdescrip").val().match(/[a-zA-Z0-9]/) || $("#teamdescrip").val()=='') 
			{
				c.postvalue+= ',"name":"'+$("#teamdescrip").val()+'"' 
			}
			else 
			{
				wrong = true;
				if(alertmsg!='') alertmsg+"\n";
				alertmsg+="You must write a proper description";
			}
		}
*/
		//c.postvalue+= ',"points":100'
		
		
		if(wrong) c.alertWindow(alertmsg);
	}
	,
	sendAddPlayer:function()
	{
		$.ajax({
		   url: "http://193.144.232.141:8080/football/Servlet?function=addPlayer",
		   type: "POST",
		   dataType : "jsonp json",
		   data: $.parseJSON(c.postvalue),
		   contentType: "application/json",
		   success: function(data)
			{
				$("#divdescrip").fadeOut("slow");
				c.alertWindow("Player added successfully");
			}
			,
		   error:  function(jqXHR, textStatus, errorThrown) {
				alert(JSON.stringify(jqXHR));
			 }
		});
	}
	,
	addDescripPost:function()
	{
		$("#blackshadow").css({'display':'none'});
		$("#divdescrip").fadeOut("slow");
/*
		$.ajax({
		   url: "http://193.144.232.141:8080/football/Servlet?function=modifyDescrip",
		   type: "POST",
		   dataType : "jsonp json",
		   data: {"description",$("#teamdescrip").val()},
		   contentType: "application/json",
		   success: function(data)
			{
				c.alertWindow("Description added successfully");
			}
			,
		   error:  function(jqXHR, textStatus, errorThrown) {
				alert(JSON.stringify(jqXHR));
			 }
		});
*/
	}
	,
	alertWindow:function(texto,timep)
	{
		if(texto!='')
		{
			clearTimeout(this.timein);
			clearTimeout(this.timeout);
			$("#blackshadow").css({'display':'block'});
			$("#contentfloating").html(texto);
			this.timein=setTimeout(function(){$("#flotante").show("slow")},50);
			if(timep) this.timeout=setTimeout(function(){$("#flotante").fadeOut()},timep);
		}
	}
	,
	loadTeams:function(e)
	{
		e.stopPropagation();

		$.ajax({
		   url: "http://193.144.232.141:8080/football/Servlet?function=getTeam&team="+$("#teamname").val(),
		   type: "GET",
		   dataType : "jsonp json",
		   success: function(data)
			{
				if(data.response_status=="401") c.alertWindow(data.response);
				else
				{
					data = data.response;
					if(Modernizr.sessionStorage)
					{
						 sessionStorage.teamname = data.name;
						window.location.href="templates/tableteams.htm";

					}
					else
					{
						c.ventanaTeams=window.open('templates/tableteams.htm','_blank','')
						setTimeout(function(){
						c.ventanaTeams.$("#divteamnamecontent").html(data.name);
						c.ventanaTeams.$("#divteamdescripcontent").html(data.description);
						$.each(data.players, function(i,valor)
							{
								c.ventanaTeams.$("#divplayers").append('<tr><td>'+valor.name+'</td><td>'+valor.points+'</td></tr>');
						   });
							},400
						);
					}
				}
			}
			,
		   error: function(jqXHR, textStatus, errorThrown) {
			alert(JSON.stringify(jqXHR));
		 }
		});
	}	
}

