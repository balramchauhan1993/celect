$(document).ready(function () {
	$.fn.extend({
	  celectUpdate: function(v) {
          $(this).val(v);
          uv(this);
	  },
	  celect: function(){
        csd(this);
	  }
	});
});

function csd(ctrl){
	var x, i, j, selElmnt, a, b, c, selOpt, os,p;	
	os = $(ctrl)[0];
	selElmnt=$(os).clone()[0];
	x=$("<div></div>", {class: "celect"});
	$(x).append(selElmnt);
	$(os).replaceWith(x);
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
	  if(mutation.attributeName=="class"){
		a.removeAttr("class").attr("class","select-selected "+val);
	  }
	  else{
		a.removeAttr(mutation.attributeName).attr(mutation.attributeName,val);
	  }
    }
  });    
});