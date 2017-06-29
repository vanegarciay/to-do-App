$(document).ready(function(){
    var tareas = new Array();
    
    cargarTareasExistentes();

    /* Cuando hace click en el botòn enviar */
    $("button#enviar").click(function(e){
        e.preventDefault();
        var nueva_tarea = $("#tarea").val();

        if(esValidaLaNuevaTarea(nueva_tarea)) {
            guardarNuevaTarea(nueva_tarea);
            mostrarNuevaTareaEnListado(nueva_tarea);
            limpiarInput();
        } else {
            mostrarErrorEnNuevaTarea();
        }
    });

    /* Cuando se ponga en checked la tarea */
    $("#padre-lista input").click(function(e){ // Selecciona todas las tareas y detecta cuando se le hace click (pone chulito)
        e.preventDefault();
        marcarTareaCompletada(this);
    });

    /* Eliminar por medio de la X las tareas del To Do Items */
    $("#padre-lista button").click(function(e){ // Selecciona todas las tareas y detecta cuando se le hace click (pone chulito)
        e.preventDefault();
        eliminarTarea(this);
    });

    function cargarTareasExistentes() {
        if (localStorage.length > 0) {
            tareas = JSON.parse(localStorage.getItem("tareas"));
            tareas.forEach(function(tarea, index) {
                $("#padre-lista").append('<li><input type="checkbox" class="filled-in" id="'+index+'"><label for="'+index+'">' +tarea+'</label><button>X</button></li>');
            });
        }
    }

    function esValidaLaNuevaTarea(nueva_tarea) {
        if(nueva_tarea == "") {
            return false;
        } else {
            return true;
        }
    }

    function mostrarErrorEnNuevaTarea() {
        alert("Debes ingresar una tarea");
    }

    function guardarNuevaTarea(nueva_tarea) {
        tareas.push(nueva_tarea);
        localStorage.setItem("tareas", JSON.stringify(tareas));
    }

    function mostrarNuevaTareaEnListado(nueva_tarea) {
        var id_nueva_tarea = tareas.length;
        $("#padre-lista").append('<li><input type="checkbox" class="filled-in" id="'+id_nueva_tarea+'"><label for="'+id_nueva_tarea+'">' +nueva_tarea+'</label><button>X</button></li>');
    }

    function limpiarInput() {
        $("#tarea").val("");
    }

    function marcarTareaCompletada(checkbox) {
        var tarea = $(checkbox).parent("li").find("label").text(); // Trae el id especifico de cada li de tarea.
        var index = tareas.indexOf(tarea);

        $("#padre-completed").append('<li><input type="checkbox" checked disabled class="filled-in" id="'+index+'"><label for="'+index+'">' +tarea+'</label><button>X</button></li>');
        tareas.splice(index, 1);
        localStorage.setItem("tareas", JSON.stringify(tareas));

        $(checkbox).parent("li").remove(); //Selecciona la tarea en especifica a la que se le hace check y la remueve.
    }

    function eliminarTarea(checkbox) {
        var tarea = $(checkbox).parent("li").find("label").text(); // Trae el id especifico de cada li de tarea.
        var index = tareas.indexOf(tarea);

        tareas.splice(index, 1);
        localStorage.setItem("tareas", JSON.stringify(tareas));

        $(checkbox).parent("li").remove(); //Selecciona la tarea en especifica a la que se le hace check y la remueve.
    }
});