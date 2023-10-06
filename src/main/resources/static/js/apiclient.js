apiclient = (function () {

    let _handleError = function () {
        alert("Nombre no válido.");
    }

    return {
        getBlueprintsByAuthor:function(authname,callback){
            $.get(`http://localhost:8080/blueprints/${authname}`, (data) => {
                callback(data);
            }).fail(_handleError);
        },

        getBlueprintsByNameAndAuthor:function(authname,bpname,callback){
            $.get(`http://localhost:8080/blueprints/${authname}/${bpname}`, (data) => {
                callback(data);
            }).fail(_handleError);
        },
    }

})();