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
    for(var t = 0; t < size; t++)
        for(var l = 0; l < size; l++)
            total += grid[x + l][y + t];
    return total;  
}
var max = { sum : 0 };
for(var s = 1; s <= 300; s++) 
for(var y = 0; y < grid.length - (s - 1); y++) {
    for(var x = 0; x < grid[y].length - (s - 1); x++) {
		var sum = sumSquare(x, y, s);
		if (sum > max.sum) max = { sum, x, y, size: s };
    }
}
max