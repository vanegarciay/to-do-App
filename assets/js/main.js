$(document).ready(function(){
    var tareas = new Array();
    
    if (localStorage.length > 0) {
        tareas = JSON.parse(localStorage.getItem("tareas"));
        tareas.forEach(function(tarea, index) {
            $("#padre-lista").append('<li><input type="checkbox" class="filled-in" id="'+index+'"><label for="'+index+'">' +tarea+'</label><button>X</button></li>');
        });
    }

    /*Guarda en local Storage las tareas dentro de un array, verifica q el campo no este vacio y crea la lista de tareas, limpiando el boton cada vez q se envia la tarea*/
    $("button#enviar").click(function(e){
        e.preventDefault();
        var tarea = $("#tarea").val();
        tareas.push(tarea);
        localStorage.setItem("tareas", JSON.stringify(tareas));

        if(tarea =="") {
            alert("Debes ingresar una tarea");
        } else {
            var id_nueva_tarea = $("input[type=checkbox]").length;
            $("#padre-lista").append('<li><input type="checkbox" class="filled-in" id="'+id_nueva_tarea+'"><label for="'+id_nueva_tarea+'">' +tarea+'</label><button>X</button></li>');
            $("#tarea").val("");
        }
    });

    /* Funcion para eliminar cuando se ponga en checked la tarea */
    $("#padre-lista input").click(function(e){ // Selecciona todas las tareas y detecta cuando se le hace click (pone chulito)
        e.preventDefault();
        var id_tarea = $(this)[0].id; // Trae el id especifico de cada li de tarea.
        $("#padre-completed").append('<li><input type="checkbox" checked disabled class="filled-in" id="'+id_tarea+'"><label for="'+id_tarea+'">' +tareas[id_tarea]+'</label><button>X</button></li>');

        tareas.splice(id_tarea, 1);
        localStorage.setItem("tareas", JSON.stringify(tareas));

        $(this).parent("li").remove(); //Selecciona la tarea en especifica a la que se le hace check y la remueve.


    });

    /* Funcion para eliminar por medio de la X las tareas del To Do Items */
    $("#padre-lista button").click(function(e){ // Selecciona todas las tareas y detecta cuando se le hace click (pone chulito)
        e.preventDefault();
        var id_tarea = $(this).parent("li").find("input")[0].id; // va al li padre del boton X y trae el id del input dentro de ese li.
        tareas.splice(id_tarea, 1); // Elimina todo el li de tarea del array en localStorage.
        localStorage.setItem("tareas", JSON.stringify(tareas));

        $(this).parent("li").remove(); //Selecciona la tarea en especifica a la que se le hace check y la remueve.
    });
});