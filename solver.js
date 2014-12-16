var game;

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

	game = new Game();
}

// Game definition and functions

var Game = function() {
	this.score = 0;
	this.longestWord = "";
	this.bestWord = "";

	this.validWordsTree = new WordTree(WordTreeNode); // inject the node type ctor
	this.validWordsTree.buildTree(Words, this.validWordsTree.root);
};

Game.prototype.isValidWord = function(word) {
	return this.validWordsTree.root.isValidWord(word, 0);
};

// WordTree definition and functions

var WordTree = function(nodeCtor) {
	this.nodeCtor = nodeCtor;
	this.root = new this.nodeCtor();
};

WordTree.prototype.buildTree = function(data, node) {
	for(var index in data) {
		this.buildTreeByWord(data[index], node);
	}
};

// recursively build a letter tree, removing the first letter of the word each recursion
WordTree.prototype.buildTreeByWord = function(word, parentNode) {
	
	var nextNode = null;
	if(!parentNode.children[word.charAt(0)]) {
		nextNode = new this.nodeCtor(parentNode, word.charAt(0));
	} else {
		nextNode = parentNode.children[word.charAt(0)];
	}

	if(word.length > 1) {
		this.buildTreeByWord(word.substr(1), nextNode);
	} else {
		nextNode.isWord = true;
	}
};

// WordTreeNode definition and functions

var WordTreeNode = function(parentNode, data) {

	this.data = data;
	this.parent = parentNode;
	if(parentNode != null) {
		parentNode.addChild(this);
	}

	this.children = {};
	this.isWord = false;
};

WordTreeNode.prototype.addChild = function(node) {
	this.children[node.data] = node;
};

WordTreeNode.prototype.isValidWord = function(word, cursorPosition) {

	var retVal = false;

	if(this.children[word.charAt(cursorPosition)]) {
		var childNode = this.children[word.charAt(cursorPosition)];
		if(childNode.isWord && word.length === cursorPosition + 1) {
			retVal = true;
		} else if(word.length >  cursorPosition) {
			retVal = childNode.isValidWord(word, cursorPosition + 1);
		}
	}

	return retVal;
};