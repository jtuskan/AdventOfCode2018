// Part 2
(async () => {
    var input = await fetch("https://adventofcode.com/2018/day/4/input")
      .then(response => response.text());
    
    var sorted = input
      .split("\n")
      .filter(i => i.length > 0)
      .map(line => {
          var matches = line.match(/\[(?<date>\d+-\d+-\d+\s\d+:\d+)\]\s((?<wakes>wakes up)|(?<sleeps>falls asleep)|(?<shift>Guard #(?<id>\d+) begins shift))/).groups;
          return {
              date: new Date(matches.date),
              minutes: +matches.date.substr(-2, 2),
              wakes: !!matches.wakes,
              sleeps: !!matches.sleeps,
              id: +(matches.id || -1)
          }
      })
      .sort(function (a, b) {
          return a.date.getTime() - b.date.getTime();
      });
      
      var blocks = sorted
          .reduce((acc, line) => {
              if (line.id && line.id !== -1) {
                  acc.currentGuard = line.id;
              } else if (line.sleeps) {
                  acc.currentSleep = line.minutes;
              } else if (line.wakes) {
                  var minutes = acc[acc.currentGuard] || {};
                  var start = line.minutes;
                  var duration = start - acc.currentSleep;
                  // && (start + i < 60)
  
                  for(let i = 0; i < duration; i++) {
                      var current = minutes[acc.currentSleep + i] || 0;
                      var newCount = current + 1;
                      minutes[acc.currentSleep + i] = newCount;
                      
                      if (newCount > acc.maxSleep) {
                          acc.maxSleep = newCount;
                          acc.minutes = acc.currentSleep + i;
                          acc.choiceGuard = acc.currentGuard;
                      }
                  }
                  
                  acc[acc.currentGuard] = minutes;
              }
              
              return acc;
          }, { maxSleep: 0, choiceGuard: 0 });
      
    console.log(blocks);
    console.log(`Answer: ${blocks.choiceGuard * blocks.minutes}`)
  })();