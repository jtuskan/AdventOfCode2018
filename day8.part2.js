(async () => {
    var x = await fetch("https://adventofcode.com/2018/day/8/input").then(response => response.text());
	//var x = "2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2";
    var input = x.split(" ").map(i => +i);
    var processNode = (stream) => {
        var entry = stream.splice(0, 1)[0];
        var meta = stream.splice(0, 1)[0];
        return  {
            numOfChildren: entry,
            metaCount: meta,
            children: new Array(entry).fill('').map(i => processNode(stream)),
            meta: meta > 0 ? stream.splice(0, meta) : []
        };
    };
    var tree = processNode(input);
    var sumNode = (node) => {
        var metas = node.meta;
        var sum = 0;
		if (node.numOfChildren === 0) return node.meta.reduce((a,b) => a+b);
		return metas.map(i => node.children[i-1]).filter(i => i).reduce((a, b) => {
			return a + (sumNode(b)||0);
        }, sum);
    }
    console.log(tree);
    var sum = sumNode(tree);
    console.log(sum);
})()
