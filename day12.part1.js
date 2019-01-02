
(async () => {
    var x = await fetch("https://adventofcode.com/2018/day/12/input")
      .then(response => response.text());
    var [initial, ...states] = x.split('\n').filter(i => i);
    var initialState = "..." + initial.substr(15);
    var matchedStates = states.filter(s => s.match(/([.#]{5}) => #/)).map(s => s.match(/([.#]{5}) => #/)[1]);

    var processState = (state) => {
        let newState = "";
        for(var i = 0; i < state.length + 4; i++) {
            var test = ""; 
            if (i < 3) test = Array(2-i).fill('.').join(".") + state.substr(0, 5-(2-i));
            else if (i > (state.length - 3)) test = (state + "......").substr(i - 2, 5);
            else test = state.substr(i - 2, 5);

            newState += matchedStates.some(s => s == test) ? "#" : ".";
        }
        return newState;
    }
    console.log(initialState);
    for(var x= 0; x < 20; x++) {
        initialState = processState(initialState);
        console.log(initialState);
        console.log(Array.from(initialState).reduce((acc, curr, index) => acc + (curr === "#" ? index - 3 : 0), 0))
    }
})()