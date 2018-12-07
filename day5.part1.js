(async () => {
    var input = await fetch("https://adventofcode.com/2018/day/5/input")
      .then(response => response.text());
    var blocks = Array.from(input)
      .reduce((a, b) => a.substr(-1, 1).toUpperCase() === b.toUpperCase() && a.substr(-1, 1) !== b ? a.substring(0, a.length - 1) : (a+b), "")
      .trim();

    console.log(blocks);
    console.log(`Answer: ${blocks.length}`);
  })()