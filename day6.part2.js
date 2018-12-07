// Day 6 Part 2
var MAX_DISTANCE = 10000;
(async () => {
  var input = await fetch("https://adventofcode.com/2018/day/6/input")
    .then(response => response.text())
	.then(text => text.split("\n")
		.filter(i => i.length > 1)
		.map(i => ({
		    x: +i.match(/(?<x>\d+),\s(?<y>\d+)/).groups.x,
			y: +i.match(/(?<x>\d+),\s(?<y>\d+)/).groups.y
		})));
		
  let maxX = Math.max.apply(null, input.map(i => i.x)) + 2;
  let maxY = Math.max.apply(null, input.map(i => i.y)) + 1;
  let normalized = input.map((i, index) => ({
      index: index,
	  x: i.x,
	  y: i.y
  }));
  
  var matrix = new Array(maxY);
  for(var idx = 0; idx < maxY; idx++) {
    matrix[idx] = new Array(maxX);
  }  

  let counts = 0;
  for (let y = 0; y < maxY; y++) {
    for (let x = 0; x < maxX; x++) {
		let distance = normalized.reduce((a, b) => a + Math.abs(x - b.x) + Math.abs(y - b.y), 0);
		matrix[y][x] = distance;
		if (distance < MAX_DISTANCE) {
			counts++;
		}
	}
  }

  console.log(matrix);
  console.log(`Answer: ${counts}`);
})()