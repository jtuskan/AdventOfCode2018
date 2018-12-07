(async () => {
    var input = await fetch("https://adventofcode.com/2018/day/5/input")
      .then(response => response.text());
    
    var output = Array
      .from(input.toLowerCase())
      .filter((l, i, a) => a.lastIndexOf(l) === i)
      .reduce((a, b) => {
          var cleaned = input.split(new RegExp(b, "ig")).join('');
          var parsed = Array.from(cleaned)
              .reduce((a, b) => a.substr(-1, 1).toUpperCase() === b.toUpperCase() && a.substr(-1, 1) !== b ? a.substring(0, a.length - 1) : (a+b), "")
              .trim();
          a[b] = {
              parsed,
              len: parsed.length
          };
          
          return a;
      }, {});
    
    const [minimum] = Object.keys(output)
      .sort((a, b) => output[a].len - output[b].len)
      .map(i => output[i].len);

    console.log(`Answer: ${minimum}`);
  })()