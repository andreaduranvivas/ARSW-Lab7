apiclient = (function () {

    let _handleError = function (msg) {
        alert(msg);
    }

    return {
        getBlueprintsByAuthor:function(authname,callback){
            if (authname === ""){
                _handleError("No especificó el autor")
            }else{
                $.get(`http://localhost:8080/blueprints/${authname}`, (data) => {
                    callback(data);
                }).fail(() => { _handleError("No se encontró el autor especificado")});
            }
        },

        getBlueprintsByNameAndAuthor:function(authname,bpname,callback){
            $.get(`http://localhost:8080/blueprints/${authname}/${bpname}`, (data) => {
                callback(data);
            }).fail(() => { _handleError("Error al buscar el BLuePrint")});
        },

        putBlueprint: function (blueprint) {
            return $.ajax({
                url: `http://localhost:8080/blueprints/${blueprint.author}/${blueprint.name}`,
                type: 'PUT',
                data: JSON.stringify(blueprint),
                error: () => {_handleError("Error al actualizar el BluePrint")},
                contentType: "application/json",
                success: function (result) {
                    alert("Se guardado o actualizado el blueprint");
                }
            });
        },

        postBlueprint: function (blueprint) {
            return $.ajax({
                url: `http://localhost:8080/blueprints`,
                type: 'POST',
                data: JSON.stringify(blueprint),
                error: ()=> {_handleError("Error al crear el BluePrint")},
                contentType: "application/json",
                success: function (result) {
                    alert("Se creo el blueprint exitosamente");
                }
            });
        },

        deleteBluePrint: function (blueprint) {
            return $.ajax({
                url: `http://localhost:8080/blueprints/${blueprint.author}/${blueprint.name}`,
                type: 'DELETE',
                error: () => {_handleError("Error al eliminar el BluePrint")},
                contentType: "application/json",
                success: function (result) {
                    alert("Se ha eliminado el blueprint exitosamente");
                }
            });
        }
    }

})();