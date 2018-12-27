var numberOfPlayers = 446;
var lastMarbleValue = 7152200;
var players = new Array(numberOfPlayers).fill(0);
var board = [0];
var currentMarble = 0;
var score = 0;
for(var i = 1; i <= lastMarbleValue; i++) {
	if (i%23 === 0) {
		var pointIndex = (board.indexOf(currentMarble) - 7 + board.length) % board.length;
		score = i + board.splice(pointIndex, 1)[0];
		players[i%numberOfPlayers] += score;
		currentMarble = board[pointIndex];
    } else {
        var index = (board.indexOf(currentMarble) + 2) % board.length;
        if (index == 0) index = board.length;
        board.splice(index, 0, i);
        currentMarble = i;
    }
}
Math.max.apply(Math, players);