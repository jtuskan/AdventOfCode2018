(async () => {
	var input = await fetch("https://adventofcode.com/2018/day/1/input")
    	.then(response => response.text())
      	.then(text => text.split("\n")
			.map(i => i.trim())
			.filter(i => i.length > 0)
            .map(i => +i));
    var frequencies = {};
    var noDuplicateFrequency = true;
	var startingFrequency = 0;
    while (noDuplicateFrequency) {
		startingFrequency = input.reduce((a, b) => {
			let frequency = a + b;
			if (noDuplicateFrequency) {
                let value = (frequencies[frequency] || 0) + 1;
                frequencies[frequency] = value;
                if (value > 1) {
                    noDuplicateFrequency = false;
                    console.log(`Answer: ${frequency}`);
                }
			}

			return frequency;
		}, startingFrequency);
	}
})()