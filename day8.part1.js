(async () => {
    var x = await fetch("https://adventofcode.com/2018/day/8/input")
      .then(response => response.text());
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
    var mapMeta = (node) => {
        var metas = node.meta;
        for (var i = 0; i < node.children.length; i++) {
            metas = metas.concat(mapMeta(node.children[i]));
        }
        
        return metas;
    }
    console.log(tree);
    var sum = mapMeta(tree).reduce((a,b) => a+b)
    console.log(sum);
})()
