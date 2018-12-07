(async () => {
    var input = await fetch("https://adventofcode.com/2018/day/3/input")
      .then(response => response.text());
    
    var blocks = input
      .split("\n")
      .filter(i => i.length > 0)
      .map(line => {
          var [head, ...rest] = line.match(/#(\d+)\s+@\s+(\d+),(\d+):\s+(\d+)x(\d+)/);
          return {
              id: +rest[0],
              columnOffset: +rest[1],
              rowOffset: +rest[2],
              columnCount: +rest[3],
              rowCount: +rest[4],
              columnMax: +rest[1] + (+rest[3]),
              rowMax: +rest[2] + (+rest[4])
          }
      });
      
      var maximums = blocks.reduce((acc, block) => {
          if (acc.rowMax < block.rowMax) acc.rowMax = block.rowMax;
          if (acc.columnMax < block.columnMax) acc.columnMax = block.columnMax;
          return acc;
      }, { rowMax: 0, columnMax: 0 });
      
      var result = blocks
          .reduce((acc, block) => {
          var collides = false;
          for (let c = 0; c < block.columnCount; c++) {
              var column = acc.matrix[block.columnOffset + c];
              if (column == null || column.length === 0) {
                  column = new Array(maximums.rowCount);
                  acc.matrix[block.columnOffset + c] = column;
              }
              
              for(let i = 0; i < block.rowCount; i++) {
                  let patch = column[block.rowOffset + i];
                  if (patch && patch.length > 0) {
                      if (patch !== "X") acc.collisions++;
                      collides = true;
                      acc.matrix[block.columnOffset + c][block.rowOffset + i] = "X";
                  } else {
                      acc.matrix[block.columnOffset + c][block.rowOffset + i] = block.id.toString();
                  }
              }
          }
          
          if (!collides) {
              block.validClaim = true;
              acc.validClaim = block.id;
          }
          
          return acc;
      }, { matrix: new Array(maximums.columnMax), collisions: 0, validClaim: 0 })
      console.log(result);
      
      var finalResult = blocks.reduce((acc, block) => {
          var collides = false;
          for (let c = 0; c < block.columnCount; c++) {
              var column = acc.matrix[block.columnOffset + c];
              if (column == null || column.length === 0) {
                  column = new Array(maximums.rowCount);
                  acc.matrix[block.columnOffset + c] = column;
              }
              
              for(let i = 0; i < block.rowCount; i++) {
                  let patch = column[block.rowOffset + i];
                  if (patch != block.id.toString()) {
                      if (patch && patch.length > 0) {
                          if (patch !== "X") acc.collisions++;
                          collides = true;
                          acc.matrix[block.columnOffset + c][block.rowOffset + i] = "X";
                      } else {
                          acc.matrix[block.columnOffset + c][block.rowOffset + i] = block.id.toString();
                      }
                  }
              }
          }
          
          if (!collides) {
              block.validClaim = true;
              acc.validClaim = block.id;
          }
          
          return acc;
      }, { matrix: Array.from(result.matrix), collisions: 0, validClaim: 0 });
      
	  console.log(finalResult);
	  console.log(`Answer: ${result.validClaim}`);
  })()