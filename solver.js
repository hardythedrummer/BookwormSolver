document.addEventListener("DOMContentLoaded", function(event) {
	
	doSetup();
});

function doSetup()
{
	for(var column = 0; column < 7; column++) {
		
		var id = "col-" + column;
		var columnList = document.getElementById(id);

		var tileMax = column % 2 == 0 ? 7 : 8;
		for(var tileCount = 0; tileCount < tileMax; tileCount++) {

			var tile = document.createElement("li");
			tile.className = "letter-tile";

			var letter = String.fromCharCode(Math.floor((Math.random() * 26) + 65));
			console.log(letter);

			var letterNode = document.createTextNode(letter);
			tile.appendChild(letterNode);
			columnList.appendChild(tile);
		}		
	}
}