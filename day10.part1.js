
var runIt = (async () => {
    var x = await fetch("https://adventofcode.com/2018/day/10/input")
      .then(response => response.text());

    var points = x.split('\n').filter(i => i).map(i => { const [x, y, vx, vy] = i.match(/(-?\d+)/ig); return { x: +x, y: +y, vx: +vx, vy: +vy}; })

    var normalizePoints = () => {
        var mins = points.reduce((a, i) => {
            if (a.x > i.x) a.x = i.x;
            if (a.y > i.y) a.y = i.y;
            return a;
        }, { x: Number.MAX_SAFE_INTEGER, y: Number.MAX_SAFE_INTEGER });
        return points.concat().map(i => { i.x += -mins.x; i.y += -mins.y; return i; });
    }

    var draw = () => {
		var xpoints = normalizePoints();
        var maxs = xpoints.reduce((a, i) => {
            if (a.x < i.x) a.x = i.x;
            if (a.y < i.y) a.y = i.y;
            return a;
        }, { x: Number.MIN_SAFE_INTEGER, y: Number.MIN_SAFE_INTEGER });

        var matrix = new Array(maxs.y + 1).fill("").map(i => i = new Array(maxs.x + 1).fill("."));
        xpoints.forEach(point => {
            matrix[point.y][point.x] = "#";
        })
        matrix.forEach((i, l) => console.log(i.join('')))
    };
    var applyVelocity = (round) => {
		points.forEach(point => { point.x += (round * point.vx); point.y += (round * point.vy); });
		return points;
    };
    return {
        normalizePoints,
        draw,
        applyVelocity
    };
})().then(runner => {runner.applyVelocity(10136 /*part2*/); runner.draw();});