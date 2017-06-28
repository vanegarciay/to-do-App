$(document).ready(function(){
    $("button").click(function(e){
        e.preventDefault();
        var tarea = $("#tarea").val();
        if(tarea =="") {
            alert("Debes ingresar una tarea");
        } else {
            $("#padre-lista").append('<li><input type="checkbox" class="filled-in" id="filled-in-box" checked="checked"><label>' +tarea+'</label></li>');
            $("#tarea").val("");
        }
    });
});