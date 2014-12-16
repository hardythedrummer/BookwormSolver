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

			var letterNode = document.createTextNode(letter);
			tile.appendChild(letterNode);
			columnList.appendChild(tile);
		}		
	}

	var game = new Game();
}

// Game definition and functions

var Game = function() {
	this.score = 0;
	this.longestWord = "";
	this.bestWord = "";

	this.validWordsTree = new WordTree();
	this.validWordsTree.buildTree(Words, this.validWordsTree.root);
};

Game.prototype.isValidWord = function(word) {
	
};

// WordTree definition and functions

var WordTree = function() {
	this.root = new WordTreeNode();
};

WordTree.prototype.buildTree = function(data, node) {
	// iterate through all the word lists and build the tree up
	for(var letter in data) {
		if(data.hasOwnProperty(letter)) {

			var newNode = new WordTreeNode(node, letter);
			node.AddChild(newNode);

			this.buildTreeByLetter(data[letter], newNode); 
		}
	}
};

WordTree.prototype.buildTreeByLetter = function(word, node) {
	
};

WordTree.prototype.buildTreeByWord = function(word, node) {
	
};

// WordTreeNode definition and functions

var WordTreeNode = function(parentNode, data) {
	this.data = data;
	this.parent = parentNode;
	this.children = new Array();
};

WordTreeNode.prototype.AddChild = function(node) {
	this.children.push(node);		
};