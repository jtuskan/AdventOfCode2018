(async () => {
	var input = await fetch("https://adventofcode.com/2018/day/2/input")
    	.then(response => response.text())
      	.then(text => text.split("\n")
			.map(i => i.trim())
			.filter(i => i.length > 0)
			.reduce((acc, x) => { 
				var values = Object.values(Array.from("aabbalskskjsaabccrr").reduce((acc, s) => {
                    var val = acc[s] || 0;
                    acc[s] = 1 + val;
                    return acc;
                }, {}));

                if (values.indexOf(2) >= 0) acc.two++;
                if (values.indexOf(3) >= 0) acc.three++;
				return acc;
            }, { two: 0, three: 0 }));

    console.log(input, `Answer: ${input.two * input.three}`);
})()