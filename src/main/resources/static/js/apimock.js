//@author hcadavid

apimock=(function(){

	var mockdata=[];

	mockdata["johnconnor"]=	[{author:"johnconnor","points":[{"x":150,"y":120},{"x":215,"y":115}],"name":"house"},
	 {author:"johnconnor","points":[{"x":340,"y":240},{"x":15,"y":215}],"name":"gear"}];
	mockdata["maryweyland"]=[{author:"maryweyland","points":[{"x":140,"y":140},{"x":115,"y":115}],"name":"house2"},
	 {author:"maryweyland","points":[{"x":140,"y":140},{"x":115,"y":115}],"name":"gear2"}];
	mockdata["andrea"]=[{author:"andrea","points":[{"x":156,"y":185},{"x":171,"y":155}],"name":"anotherBp"},
		{author:"andrea","points":[{"x":489,"y":159},{"x":453,"y":456}],"name":"guiones"}];
	mockdata["camilo"]=[{author:"camilo","points":[{"x":0,"y":500},{"x":0,"y":200}, {"x":250,"y":0}, {"x":500,"y":200}, {"x":0,"y":200},
			{"x":500,"y":500}, {"x":0,"y":500}, {"x":500,"y":200}, {"x":500,"y":500}],"name":"House"}]


	return {
		getBlueprintsByAuthor:function(authname,callback){
			callback(
				mockdata[authname]
			);
		},

		getBlueprintsByNameAndAuthor:function(authname,bpname,callback){

			callback(
				mockdata[authname].find(function(e){return e.name===bpname})
			);
		}
	}	

})();

/*
Example of use:
var fun=function(list){
	console.info(list);
}

apimock.getBlueprintsByAuthor("johnconnor",fun);
apimock.getBlueprintsByNameAndAuthor("johnconnor","house",fun);*/