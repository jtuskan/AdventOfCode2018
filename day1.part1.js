(async () => {
	var input = await fetch("https://adventofcode.com/2018/day/1/input")
    	.then(response => response.text())
      	.then(text => text.split("\n")
			.map(i => i.trim())
			.filter(i => i.length > 0)
            .map(i => +i)
			.reduce((a, b) => a + b));

    console.log(`Answer: ${input}`);
})()