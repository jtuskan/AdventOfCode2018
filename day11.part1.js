var gridCell = ((x, y, serial) => {
    var rackId = (x + 10);
	var value = (rackId * y + serial) * rackId;
	var power = ((((value - ((value / 1000) | 0) * 1000)) / 100) | 0) - 5;
	return {
		power,
		rackId
    };
});

var height = 300;
var width = 300;
var serial = 2568
var grid = Array(height).fill('');
for(var i = 0; i < grid.length; i++) {
    grid[i] = Array(width).fill('').map((_, y) => gridCell(i, y, serial).power);
}
console.log(grid);
var sumSquare = (x, y, size) => {
    let total = 0;
    for(var t = 0; y < size; y++)
        for(var l = 0; x < size; x++)
            total += grid[x + l][y + t];
    return total;  
}
var max = { sum : 0 };
for(var y = 0; y < grid.length - 2; y++) {
    for(var x = 0; x < grid[y].length - 2; x++) {
		var sum = sumSquare(x, y, 3);
		if (sum > max.sum) max = { sum, x, y };
    }
}
max