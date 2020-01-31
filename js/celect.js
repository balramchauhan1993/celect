$(document).ready(function () {
	$.fn.extend({
	  celectUpdate: function(v) {
		  if($.isArray(v)){
			  ums(this, v);
		  }
		  else{
			$(this).val(v);
			uv(this);
		  }
	  },
	  celect: function(op){		  
		  if(!!op && op.multi)
			cms(this, op);
		  else
        	csd(this);
	  },
	  celectGet: function(){
		  return gv(this);
	  }
	});

	jQuery(document).ready(function () {
		jQuery(window).keydown(function (event) {
			if (event.keyCode == 13) {
				var ele=$(this.document.activeElement);
				if(ele.parent().parent().hasClass("select-selected")){
					ele.closest(".celect").find(".select-search").find("div:eq(0)").click();
					return false
				}
			}
			else if(event.keyCode == 8){
				var ele=$(this.document.activeElement);
				if(ele.parent().parent().hasClass("select-selected")){
					if($(ele).val().length==0){
						ele.prev().click();
						ele.focus();
						return false
					}
				}
			}
		});
	});
});

function csd(ctrl){
	var x, j, selElmnt, a, b, c, selOpt;	
	selElmnt=$(ctrl)[0];
	$(selElmnt).wrap("<div class='celect'></div>");
	x=$(selElmnt).parent();
	obs.observe($(selElmnt)[0], {attributes: true});	
	/*for each element, create a new DIV that will act as the selected item:*/
	selOpt =$(selElmnt).find("option[value="+$(selElmnt).val()+"]");
    a = $("<div></div>", { class: "select-selected " + $(selElmnt).attr("class"), text: $(selOpt).html() }).attr('data-val', $(selElmnt).val()).attr('style', $(selElmnt).attr('style'));
	$(x).append(a); 
	
	/*for each element, create a new DIV that will contain the option list:*/
	b = $("<div></div>", {class: "select-items select-hide"});
	
	for (j = 0; j < selElmnt.length; j++) {
		/*for each option in the original select element,
		create a new DIV that will act as an option item:*/
		c = $("<div></div>", {text: $(selElmnt.options[j]).html()}).attr('data-val', $(selElmnt.options[j]).attr("value"));
		
		$(c).on("click", function(e) {
			/*when an item is clicked, update the original select box,
			and the selected item:*/
			var r,s,sd,si;
			r = $(this).closest(".celect");
			s = $(r).find("select");
			sd = $(r).find(".select-selected");
			si = $(r).find(".select-items");
			$(si).find(".same-as-selected").removeClass("same-as-selected");
			$(this).addClass("same-as-selected");
			$(sd).removeAttr("data-val").attr("data-val",$(this).attr("data-val")).html($(this).html());
            s.val($(this).attr("data-val"));
            s.change();
		});
		$(b).append(c);
	}
	
	$(x).append(b);
	
	$(a).on("click", function(e) {
	  /*when the select box is clicked, close any other select boxes,
	  and open/close the current select box:*/
	  e.stopPropagation();
      cd(this);
      if ($(this).attr("disabled") == undefined || $(this).attr("disabled")==null || $(this).attr("disabled").length == 0) {
          $(this).next().toggleClass("select-hide");
          $(this).toggleClass("select-arrow-active");
      }
	});	
		
	/*if the user clicks anywhere outside the select box,
	then close all select boxes:*/
	$(document).on("click",function (){
		cd();
	});
}

function uv(ctrl) {
    var r, s, sd, si, slOp;
	ctrl=$(ctrl);
    slOp = $(ctrl).find("option[value=" + $(ctrl).val() + "]");
    r = $(ctrl).closest(".celect");
    sd = $(r).find(".select-selected");
    si = $(r).find(".select-items");
    $(si).find(".same-as-selected").removeClass("same-as-selected");
    $(si).find("div[data-val=" + $(ctrl).val() + "]").addClass("same-as-selected");
    $(sd).removeAttr("data-val").attr("data-val", $(ctrl).val()).html($(slOp).html());
    ctrl.change();
}

function cd(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x, y, i, arrNo = [];
  x = $(".select-items");
  y = $(".select-selected");
  $(".select-search").remove();
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      $(y[i]).removeClass("select-arrow-active");
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      $(x[i]).addClass("select-hide");
    }
  }
}

var obs = new MutationObserver(function( mutations ) {
  mutations.forEach(function( mutation ) {
    if (mutation.type === 'attributes') {
      var val=$(mutation.target).attr(mutation.attributeName);
	  var a=$(mutation.target).parent().find(".select-selected");
	  var c="";
	  c=(a.hasClass("multi"))?"select-selected multi":"select-selected";
	  if(mutation.attributeName=="class"){
		a.removeAttr("class").attr("class",c+" "+val);
	  }
	  else{
		a.removeAttr(mutation.attributeName).attr(mutation.attributeName,val);
	  }
    }
  });    
});

function cms(ctrl,op){
	var x, j, selElmnt, a, b, c, p,d,t;
	selElmnt=$(ctrl)[0];
	$(selElmnt).wrap("<div class='celect'></div>");
	x=$(selElmnt).parent();
	$(selElmnt).val(null);
	obs.observe($(selElmnt)[0], {attributes: true});
	t=	(!!op.title && op.title.length>0)?op.title:'';
	/*for each element, create a new DIV that will act as the selected item:*/
	a = $("<div></div>", { class: "select-selected multi " + $(selElmnt).attr("class")}).attr('style', $(selElmnt).attr('style')).attr('data-t', t);
	p=$("<div></div>", { class:'inner', text: (!!op.searchable && op.searchable)?'':t });	
	if(!!op.searchable && op.searchable){
		d=$("<input type='text' placeholder='"+t+"' />");
		p.append(d);
		$(d).on("keyup", function(){ srh(this);});
	}
	a.append(p);
	$(x).append(a); 
	
	/*for each element, create a new DIV that will contain the option list:*/
	b = $("<div></div>", {class: "select-items select-hide"});
	
	for (j = 0; j < selElmnt.length; j++) {
		/*for each option in the original select element,
		create a new DIV that will act as an option item:*/
		c = $("<div></div>", {text: $(selElmnt.options[j]).html()}).attr('data-val', $(selElmnt.options[j]).attr("value"));
		
		$(c).on("click", function(e) {
			/*when an item is clicked, update the original select box,
			and the selected item:*/
			e.stopPropagation();
			var r,s,sd,si;
			r = $(this).closest(".celect");
			sd = $(r).find(".select-selected").find(".inner");
			if($(this).hasClass("same-as-selected")){
				$(this).removeClass("same-as-selected");
				$(sd).find("span[data-val="+$(this).attr("data-val")+"]").remove();
				if($(sd).find("span").length==0){
					if(!!op.searchable && op.searchable){
						$(sd).html('').append(d);
						$(d).on("keyup", function(){ srh(this);});
					}
					else
						$(sd).html(t);
				}
			}
			else{				
				if($(sd).find("span").length==0){
					$(sd).html('');
				}
				$(this).addClass("same-as-selected");
				s=$("<span></span>").attr("data-val",$(this).attr("data-val")).html($(this).html());
				sd.find("input").remove();
				sd.append(s);
				if(!!op.searchable && op.searchable){
					var iw=sd.innerWidth();
					var tw=0;
					sd.find("span").each(function(){
						if(tw+$(this).outerWidth()+3>iw){
							tw=$(this).outerWidth()+3;
						}
						else{
							tw=tw+$(this).outerWidth()+3;
						}
					});
					var fw=(iw-tw);
					if(fw<=20){
						fw=iw;
					}							
					sd.append("<input type='text' style='width:"+fw+"px;' />");	
					sd.find("input").focus().on("keyup", function(){ srh(this);});
				}
				$(s).on("click",function(q){	
					q.stopPropagation();			
					$(this).parent().parent().next().find("div[data-val="+$(this).attr("data-val")+"]").removeClass("same-as-selected");;
					$(this).remove();
					if($(sd).find("span").length==0){
						if(!!op.searchable && op.searchable){
							sd.html('').append(d);
							$(d).on("keyup", function(){ srh(this);});
						}
						else
							sd.html(t);
					}
					else{
						sd.find("input").remove();
						if(!!op.searchable && op.searchable){
							var iw=sd.innerWidth();
							var tw=0;
							sd.find("span").each(function(){
								if(tw+$(this).outerWidth()+3>iw){
									tw=$(this).outerWidth()+3;
								}
								else{
									tw=tw+$(this).outerWidth()+3;
								}
							});
							var fw=(iw-tw);
							if(fw<=20){
								fw=iw;
							}							
							sd.append("<input type='text' style='width:"+fw+"px;' />");	
							sd.find("input").focus().on("keyup", function(){ srh(this);});
						}
					}
					$(sd).closest(".celect").find("select").change();
				});
			}
            $(r).find("select").change();
		});
		$(b).append(c);
	}
	
	$(x).append(b);
	
	$(a).on("click", function(e) {
	  /*when the select box is clicked, close any other select boxes,
	  and open/close the current select box:*/
	  e.stopPropagation();
      cd(this);
      if ($(this).attr("disabled") == undefined || $(this).attr("disabled")==null || $(this).attr("disabled").length == 0) {
          $(this).next().toggleClass("select-hide");
		  $(this).toggleClass("select-arrow-active");
		  $(this).find(".inner").find("input").focus().keyup();
      }
	});	
		
	/*if the user clicks anywhere outside the select box,
	then close all select boxes:*/
	$(document).on("click",function (){
		cd();
	});	
}

function srh(ctrl){
	var v=$.trim($(ctrl).val()).toLowerCase();
	$(ctrl).closest(".celect").find(".select-search").remove();
	if(v.length>0){		
		var si=$(ctrl).closest(".celect").find(".select-items");
		var sn=$("<div></div>", {class: "select-items select-hide select-search"});
		var c;
		var sd=$(ctrl).closest(".celect").find(".select-selected").find(".inner");
		var x=sd.find("input").length>0;
		var t=sd.parent().attr("data-t");
		if(x){
			d=$("<input type='text' placeholder='"+t+"' />");
			$(d).focus().on("keyup", function(){ srh(this);});
		}
		si.find("div").each(function(){
			if($(this).html().toLowerCase().indexOf(v) != -1  && !$(this).hasClass("same-as-selected")){
				c = $("<div></div>", {text: $(this).html()}).attr('data-val', $(this).attr("data-val"));
				$(c).on("click", function(e) {
					/*when an item is clicked, update the original select box,
					and the selected item:*/
					e.stopPropagation();
					var r,s,sdn,sin;
					r = $(this).closest(".celect");
					sdn = $(r).find(".select-selected").find(".inner");
					sin = $(r).find(".select-items");
					if($(this).hasClass("same-as-selected")){
						$(this).removeClass("same-as-selected");
						sin.find("div[data-val="+$(this).attr("data-val")+"]").removeClass("same-as-selected");
						$(sdn).find("span[data-val="+$(this).attr("data-val")+"]").remove();
						if($(sdn).find("span").length==0){
							if(x){
								$(sdn).html('').append(d);
								$(d).focus().on("keyup", function(){ srh(this);});
							}
							else
								$(sdn).html(t);
						}
					}
					else{				
						if($(sdn).find("span").length==0){
							$(sdn).html('');
						}
						$(this).addClass("same-as-selected");
						sin.find("div[data-val="+$(this).attr("data-val")+"]").addClass("same-as-selected");
						s=$("<span></span>").attr("data-val",$(this).attr("data-val")).html($(this).html());
						sdn.find("input").remove();
						sdn.append(s);
						if(x){
							var iw=sdn.innerWidth();
							var tw=0;
							sdn.find("span").each(function(){
								if(tw+$(this).outerWidth()+3>iw){
									tw=$(this).outerWidth()+3;
								}
								else{
									tw=tw+$(this).outerWidth()+3;
								}
							});
							var fw=(iw-tw);
							if(fw<=20){
								fw=iw;
							}							
							sdn.append("<input type='text' style='width:"+fw+"px;' />");	
							sdn.find("input").focus().on("keyup", function(){ srh(this);});
						}
						$(s).on("click",function(q){	
							q.stopPropagation();			
							$(this).parent().parent().next().find("div[data-val="+$(this).attr("data-val")+"]").removeClass("same-as-selected");;
							$(this).remove();
							if($(sdn).find("span").length==0){
								if(x){
									sdn.html('').append(d);
									$(d).focus().on("keyup", function(){ srh(this);});
								}
								else
									sdn.html(t);
							}
							else{
								sdn.find("input").remove();
								if(x){
									var iw=sdn.innerWidth();
									var tw=0;
									sdn.find("span").each(function(){
										if(tw+$(this).outerWidth()+3>iw){
											tw=$(this).outerWidth()+3;
										}
										else{
											tw=tw+$(this).outerWidth()+3;
										}
									});
									var fw=(iw-tw);
									if(fw<=20){
										fw=iw;
									}							
									sdn.append("<input type='text' style='width:"+fw+"px;' />");	
									sdn.find("input").focus().on("keyup", function(){ srh(this);});
								}
							}
							$(sdn).closest(".celect").find("select").change();
						});
					}
					$(r).find("select").change();
				});
				$(sn).append(c);
			}
		});
		if(sn.find("div").length>0){
			si.addClass("select-hide");
			sn.removeClass("select-hide");
			$(ctrl).closest(".celect").append(sn);
		}
	}
}

function gv(ctrl){
	if(ctrl.parent().hasClass("multi")){
		var v=[];
		ctrl.next().find(".inner").find("span").each(function(){
			v.push($(this).attr('data-val'));
		});
		return v;
	}
	else{
		return ctrl.val();
	}
}

function ums(ctrl, v){
	var si, sd, d, s, x, t;
	si=$(ctrl).parent().find(".select-items");
	sd=$(ctrl).parent().find(".select-selected");
	x=sd.find(".inner").find("input").length>0;
	t=sd.attr("data-t");
	sd.find(".inner").html('');
	si.find(".same-as-selected").removeClass("same-as-selected");
	for(var i=0; i<v.length; i++){
		d=si.find("div[data-val="+v[i]+"]");
		d.addClass("same-as-selected");
		s=$("<span></span>").attr("data-val",v[i]).html(d.html());
		sd.find(".inner").append(s);		
		$(s).on("click",function(q){	
			q.stopPropagation();			
			$(this).parent().parent().next().find("div[data-val="+$(this).attr("data-val")+"]").removeClass("same-as-selected");;
			$(this).remove();
			if($(sd).find(".inner").find("span").length==0){
				if(x){
					sd.find(".inner").html('').append("<input type='text' placeholder='"+t+"' />");
					sd.find(".inner").find("input").on("keyup", function(){ srh(this);});
				}
				else
					sd.find(".inner").html(t);
			}
		});
	}
	if($(sd).find(".inner").find("span").length==0){
		if(x){
			sd.find(".inner").html('').append("<input type='text' placeholder='"+t+"' />");
			sd.find(".inner").find("input").on("keyup", function(){ srh(this);});
		}
		else
			sd.find(".inner").html(t);
	}
	else if(x){
		var iw=sd.find(".inner").innerWidth();
		var tw=0;
		sd.find(".inner").find("span").each(function(){
			tw=tw+$(this).outerWidth()+3;
		});
		var fw=(iw-tw);
		if(fw<=0){
			tw=tw-(parseInt(tw/iw)*iw);
			fw=(iw-tw);
		}
		else if(fw>0 && fw< 20){
			tw=0;
			fw=(iw-tw);
		}
		sd.find(".inner").append("<input type='text' style='width:"+fw+"px;' />");
		sd.find(".inner").find("input").on("keyup", function(){ srh(this);});
	}
}