

let app = (function (api){
    let _author = "";
    let publicFunctions = {};
    let _currenBP = "";

    /*
    * 1. Verifica si el documento html ya se encuentra cargado
    * 2. Convierte los datos en un objeto
    * 3. Crea la tabla con los elementos del objeto
    * 4. Calcula el total de puntos
    * 5. Muestra los resultados
    */
    let _bpTable = (data) => {
        $(document).ready(() => {
            $('#search-bar').val("");
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
        $("#bp-frame").addClass("hide");
        $("#author").text(`${data[0].author}'s blueprints: `);
        $("#blueprints tbody").text("");
        obj.map((elem) => {
            let rows = `
            <tr>
                <td>${elem.name}</td>
                <td>${elem.numPoints}</td>
                <td><button onclick="app.drawBP('${data[0].author}', '${elem.name}')">Open</button></td>
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
            _currenBP = data;
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
        _currenBP.points.push({x: pointX,y:pointY});
        _drawBluePrint(_currenBP);
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
        } while(obj = obj.offsetParent );
        return {left: offsetLeft, top: offsetTop};
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

    publicFunctions.updateBlueprints = function (authorName){
        api.getBlueprintsByAuthor(authorName, _bpTable);
    }

    publicFunctions.drawBP = function (authorName, bpname) {
        publicFunctions.setName(authorName);
        api.getBlueprintsByNameAndAuthor(authorName, bpname, _updateCanvas);
    }

    return publicFunctions;

})(apiclient);

$(document).ready(function() {
    $('input').keyup(function(event) {
        if (event.which === 13)
        {
            event.preventDefault();
            $('#find-bp').click();
        }
    });
});