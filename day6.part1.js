(async () => {
    var input = await fetch("https://adventofcode.com/2018/day/6/input")
      .then(response => response.text())
      .then(text => text.split("\n")
          .filter(i => i.length > 1)
          .map(i => ({
              x: +i.match(/(?<x>\d+),\s(?<y>\d+)/).groups.x,
              y: +i.match(/(?<x>\d+),\s(?<y>\d+)/).groups.y
          })));
          
    let maxX = Math.max.apply(null, input.map(i => i.x)) + 20;
    let maxY = Math.max.apply(null, input.map(i => i.y)) + 100;
    let indexed = input.map((i, index) => ({
        index: index,
        x: i.x,
        y: i.y
    }));
    console.log(indexed);
    var matrix = new Array(maxY);
    for(var idx = 0; idx < maxY; idx++) {
      matrix[idx] = new Array(maxX);
    }  
  
    let counts = Array(indexed.length).fill(0);
      for (let y = 0; y < maxY; y++) {
  for (let x = 0; x < maxX; x++) {
          let distances = indexed.map(i => ({
              distance: Math.abs(x - i.x) + Math.abs(y - i.y),
              index: i.index
          }));
          let minDistance = Math.min.apply(null, distances.map(i => i.distance));
          let validPoints = distances.filter(i => i.distance === minDistance);
          if (validPoints.length > 1) matrix[y][x] = -1;
          else {
              matrix[y][x] = validPoints[0].index;
              counts[validPoints[0].index]++;
          }
      }
    }
  
    let top = matrix[0].filter((v, i, a) => a.indexOf(v) === i);
    let bottom = matrix[matrix.length - 1].filter((v, i, a) => a.indexOf(v) === i);
    let leftSide = Array(maxY).fill(0).map((_, i) => matrix[i][0]).filter((v, i, a) => a.indexOf(v) === i);
    let rightSide = Array(maxY).fill(0).map((_, i) => matrix[i][maxX - 1]).filter((v, i, a) => a.indexOf(v) === i);
    let infiniteAreas = top.concat(bottom).concat(leftSide).concat(rightSide);
    console.log(top, bottom, leftSide, rightSide);
    console.log(matrix);
    let greatestArea = Math.max.apply(null, counts.map((v, i) => infiniteAreas.indexOf(i) !== -1 ? 0 : v));
    console.log(counts.map((v, i) => infiniteAreas.indexOf(i) !== -1 ? 0 : v), infiniteAreas, greatestArea, counts.indexOf(greatestArea));
    console.log(`Answer: ${greatestArea}`);
  })()