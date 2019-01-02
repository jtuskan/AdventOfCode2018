var elf1 = 3;
var elf2 = 7;
var elf1Index = 0;
var elf2Index = 1;
var recipe = "37";
var iterations = 190221;
for(var i = 0; i < iterations+10; i++) {
    var total = elf1 + elf2;
    recipe += total.toString();
    elf1Index = (elf1Index + elf1 + 1) % recipe.length;
    elf2Index = (elf2Index + elf2 + 1) % recipe.length;
    elf1 = +recipe.charAt(elf1Index);
    elf2 = +recipe.charAt(elf2Index);
}
recipe.substr(iterations, 10)