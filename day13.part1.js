
(async () => {
    var x = await fetch("https://adventofcode.com/2018/day/13/input")
      .then(response => response.text());
    var network = x.split('\n').filter(i => i).map(i => i.split(''));
    var carts = [];
    var addCart = (x, y, n) => ({
        x,
        y,
        nextDirection: -1,
        currentPiece: determinePiece(x, y, n),
        handled: false
    });

    var determinePiece = (x, y, n) => {
        var topRow = n[y-1];
        var bottomRow = n[y+1];
        var topRowPiece = (topRow && topRow[x].trim()) || "";
        var bottomRowPiece = (bottomRow && bottomRow[x].trim()) || "";
        var leftColumnPiece = (n[y][x-1] || "").trim();
        var rightColumnPiece = (n[y][x+1] || "").trim();
        var validTop = (topRowPiece === "|" || topRowPiece === "/" || topRowPiece === "\\" || topRowPiece === "+");
        var validBottom = (bottomRowPiece === "|" || bottomRowPiece === "/" || bottomRowPiece === "\\" || bottomRowPiece === "+");
        var validLeft = (leftColumnPiece === "-" || leftColumnPiece === "/" || leftColumnPiece === "\\" || leftColumnPiece === "+");
        var validRight = (rightColumnPiece === "-" || rightColumnPiece === "/" || rightColumnPiece === "\\" || rightColumnPiece === "+");
        if (validTop && validBottom && validLeft && validRight) return "+";
        else if (validTop && validBottom) return "|";
        else if (validLeft && validRight) return "-";
        else if ((validTop && validRight) || (validBottom && validLeft)) return "\\";
        else if ((validTop && validLeft) || (validBottom && validRight)) return "/";
        else return "";
    };

    var findCart = (x, y) => carts.filter(i => i.x === x && i.y === y)[0];
    for(var i = 0; i < network.length; i++) {
        for(var y = 0; y < network[i].length; y++) {
            var piece = network[i][y];
            switch (piece) {
                case ">":
                case "<":
                case "v":
                case "^":
                    carts.push(addCart(y, i, network));
                    break;
            }
        }
    }
    console.log(carts);
    var processNetwork = (n) => {
        for(var i = 0; i < n.length; i++) {
            for(var y = 0; y < n[i].length; y++) {
                var piece = n[i][y];
                if (/[<>^v]/g.test(piece)) {
                    var cart = findCart(y, i);
                    if (cart.handled) continue;

                    var nextX = 0;
                    var nextY = 0;
                    var cartPiece = piece;
                    switch (piece) {
                        case ">":
                            if (cart.currentPiece === "\\") {
                                nextY = 1;
                                cartPiece = "v";
                            } else if (cart.currentPiece === "/") {
                                nextY = -1;
                                cartPiece = "^";
                            } else if (cart.currentPiece === "+") {
                                if (cart.nextDirection === -1) {
                                    nextY = -1;
                                    cartPiece = "^";
                                    cart.nextDirection = 0;
                                } else if (cart.nextDirection === 0) {
                                    nextX = 1;
                                    cart.nextDirection = 1;
                                } else {
                                    nextY = 1;
                                    cart.nextDirection = -1;
                                    cartPiece = "v";
                                }
                            } else nextX = 1;
                            break;
                        case "<":
                            if (cart.currentPiece === "/") {
                                nextY = 1;
                                cartPiece = "v";
                            } else if (cart.currentPiece === "\\") {
                                nextY = -1;
                                cartPiece = "^";
                            } else if (cart.currentPiece === "+") {
                                if (cart.nextDirection === -1) {
                                    nextY = 1;
                                    cartPiece = "v";
                                    cart.nextDirection = 0;
                                } else if (cart.nextDirection === 0) {
                                    nextX = -1;
                                    cart.nextDirection = 1;
                                } else {
                                    nextY = -1;
                                    cart.nextDirection = -1;
                                    cartPiece = "^";
                                }
                            } else nextX = -1;
                            break;
                        case "v":
                            if (cart.currentPiece === "/") {
                                nextX = -1;
                                cartPiece = "<";
                            } else if (cart.currentPiece === "\\") {
                                nextX = 1;
                                cartPiece = ">";
                            } else if (cart.currentPiece === "+") {
                                if (cart.nextDirection === -1) {
                                    nextX = 1;
                                    cartPiece = ">";
                                    cart.nextDirection = 0;
                                } else if (cart.nextDirection === 0) {
                                    nextY = 1;
                                    cart.nextDirection = 1;
                                } else {
                                    nextX = -1;
                                    cart.nextDirection = -1;
                                    cartPiece = "<";
                                }
                            } else nextY = 1;
                            break;
                        case "^":
                            if (cart.currentPiece === "/") {
                                nextX = 1;
                                cartPiece = ">";
                            } else if (cart.currentPiece === "\\") {
                                nextX = -1;
                                cartPiece = "<";
                            } else if (cart.currentPiece === "+") {
                                if (cart.nextDirection === -1) {
                                    nextX = -1;
                                    cartPiece = "<";
                                    cart.nextDirection = 0;
                                } else if (cart.nextDirection === 0) {
                                    nextY = -1;
                                    cart.nextDirection = 1;
                                } else {
                                    nextX = 1;
                                    cart.nextDirection = -1;
                                    cartPiece = ">";
                                }
                            } else nextY = -1;
                            break;
                    }

                    n[i][y] = cart.currentPiece;
                    var nextPiece = n[i + nextY][y + nextX];
                    cart.x = y + nextX;
                    cart.y = i + nextY;
                    cart.handled = true;
                    cart.currentPiece = nextPiece;
                    n[i + nextY][y + nextX] = cartPiece;
                    if (/[<>^v]/g.test(nextPiece)) {
						console.dir(network.reduce((a, b) => a += b.join('') + "\n", ""));
                        console.log(y + nextX, i + nextY);
                        return false;
                    }
                }
            }
        }
        carts.forEach(cart => cart.handled = false);
        console.dir(network.reduce((a, b) => a += b.join('') + "\n", ""));
        return true;
    };
	var tick = 0;
	while(processNetwork(network)) { tick++; }
	console.log(tick);
})();