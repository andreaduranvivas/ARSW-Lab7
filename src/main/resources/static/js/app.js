

let app = (function (api){
    let _author = "";
    let publicFunctions = {};
    let _currentBP = "";
    let _newBp = false;

    /*
    * 1. Verifica si el documento html ya se encuentra cargado
    * 2. Convierte los datos en un objeto
    * 3. Crea la tabla con los elementos del objeto
    * 4. Calcula el total de puntos
    * 5. Muestra los resultados
    */
    let _bpTable = (data) => {
        $(document).ready(() => {
            _author = $('#search-bar').val();
            //$('#search-bar').val("");
            let object = _convBpListToObj(data);
            _createTable(object, data);
            _totalPoints(object);
        });
    }

    let _convBpListToObj = (data) => {
        return data.map((elem) => ({
            name: elem.name,
            numPoints: elem.points.length
        }));
    }

    let _createTable = (obj, data) => {
        $("#blueprints").removeClass("hide");
        $("#new-bp").removeClass("hide");
        $("#bp-frame").addClass("hide");
        $("#author").text(`${data[0].author}'s blueprints: `);
        $("#blueprints tbody").text("");
        $('#search-bar').val("");
        obj.map((elem) => {
            let rows = `
            <tr>
                <td>${elem.name}</td>
                <td>${elem.numPoints}</td>
                <td><button class="btn btn-outline-dark" onclick="app.drawBP('${data[0].author}', '${elem.name}')">Open</button></td>
            </tr>`;
            $("#blueprints tbody").append(rows);
        })
    }

    let _totalPoints = (data) => {
        let totalPoints = data.reduce((total, i) => total + i.numPoints, 0);
        $("#user-points").text("Total user points: "+totalPoints);
    }

    let _updateCanvas = (data) => {
        $(document).ready(() => {
            //let bp = _convBpToObj(data);
            _currentBP = data;
            _drawBluePrint(data);
        });
    }

    let _drawBluePrint = (bp) => {
        _showInfoBP(bp);
        let points = bp.points;
        let canvas = $("#canvas-bp")[0];
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            const point = points[i];
            ctx.lineTo(point.x, point.y);
        }
        ctx.stroke();
    }
    let _showInfoBP = (bp) => {
        $("#bp-name").text("Current Blue Print: " + bp.name);
        $("#bp-frame").removeClass("hide");
    }
    let _draw = function (event){
        let canvas = $("#canvas-bp")[0];
        ctx = canvas.getContext("2d");
        let offset  = _getOffset(canvas);
        let pointX = event.pageX - offset.left;
        let pointY = event.pageY - offset.top;
        _currentBP.points.push({x: pointX,y:pointY});
        _drawBluePrint(_currentBP);
    }
    let _getOffset = function (obj) {
        var offsetLeft = 0;
        var offsetTop = 0;
        do {
            if (!isNaN(obj.offsetLeft)) {
                offsetLeft += obj.offsetLeft;
            }
            if (!isNaN(obj.offsetTop)) {
                offsetTop += obj.offsetTop;
            }
        } while(obj === obj.offsetParent );
        return {left: offsetLeft, top: offsetTop};
    }

    let _clearCanvas = () => {
        let canvas = $("#canvas-bp")[0];
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        return ctx;
    }
    let _newBlueprint = () => {
        _currentBP = {
            author:_author,
            points:[],
            name:""
        };
    }

    let _createBp = () => {
        _currentBP.name = $("#new-bpname").val();
    }

    publicFunctions.canvaslistenerInit = function (){
        let canvas = $("#canvas-bp")[0];
        ctx = canvas.getContext("2d");
        if(window.PointerEvent) {
            canvas.addEventListener("pointerdown", _draw, false);
        }
        else {
            canvas.addEventListener("mousedown", _draw, false);
        }
    }
    publicFunctions.setName = function (newName) {
        _author = newName;
    }

    publicFunctions.searchBlueprints = function (authorName){
        api.getBlueprintsByAuthor(authorName, _bpTable);
    }

    publicFunctions.drawBP = function (authorName, bpname) {
        $("#delete").prop("disabled", false);
        $("#input-bpname").addClass("hide");
        publicFunctions.setName(authorName);
        api.getBlueprintsByNameAndAuthor(authorName, bpname, _updateCanvas);
    }

    publicFunctions.updateBluePrint = function (){
        if(_newBp) {
            if (!$("#new-bpname").val()) {
                alert("El campo del nombre debe estar lleno");
                return;
            }
            _newBp = false;
            $("#input-bpname").addClass("hide");
            _createBp();
            $("#delete").prop("disabled", false);
            return api.postBlueprint(_currentBP).then(res => this.searchBlueprints(_currentBP.author));
        }
        return api.putBlueprint(_currentBP).then(() => this.searchBlueprints(_currentBP.author));
    }
    publicFunctions.createBluePrint = function (){
        _newBp = true;
        $('#new-bpname').val("");
        $("#input-bpname").removeClass("hide");
        $("#delete").prop("disabled", true);
        _clearCanvas();
        _newBlueprint();
        _showInfoBP(_currentBP);
    }

    publicFunctions.deleteBluePrint = function (){
        return api.deleteBluePrint(_currentBP).then(() => this.searchBlueprints(_currentBP.author));
    }

    return publicFunctions;

})(apiclient);

$(document).ready(function() {
    $('#search-bar').keyup(function(event) {
        if (event.which === 13)
        {
            event.preventDefault();
            $('#find-bp').click();
        }
    });
});