$(document).ready(function(){
    $("#drpcar").celect({multi:true,title:'Select Cars'});
    $("#drpbike").celect({multi:true,searchable:true,title:'Select Bikes'});
});

function UpdateClass(v){
    if(v==1){
        $("#drpcar").toggleClass("b-red");
    }
    else{
        $("#drpbike").toggleClass("b-red");
    }
}

function UpdateStyle(v){
    if(v==1){
        if(!!$("#drpcar").attr("style") && $("#drpcar").attr("style").length>0)
            $("#drpcar").removeAttr("style");
        else
            $("#drpcar").attr("style","color:red");
    }
    else{
        if(!!$("#drpbike").attr("style") && $("#drpbike").attr("style").length>0)
            $("#drpbike").removeAttr("style");
        else
            $("#drpbike").attr("style","color:red");
    }
}

function UpdateCars(v){
    $("#drpcar").celectUpdate(v);
}

function UpdateBikes(v){
    $("#drpbike").celectUpdate(v);
}