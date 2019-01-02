var elf1 = 3;
var elf2 = 7;
var elf1Index = 0;
var elf2Index = 1;
var recipe = [3, 7];
var match = [1, 9, 0, 2, 2, 1 ];
var matchFound = false;

while (!matchFound)
{
    var total = elf1 + elf2;
    var index = recipe.length;
    if (total >= 10)
    {
        recipe.push(1);
        matchFound = (recipe.length >= match.length) &&
            recipe[index - 0] == match[5] && recipe[index - 1] == match[4] && recipe[index - 2] == match[3] && recipe[index - 3] == match[2] && recipe[index - 4] == match[1] && recipe[index - 5] == match[0];

        if (matchFound) break;
        recipe.push(total - 10);
    }
    else recipe.push(total);



    matchFound = (recipe.length >= match.length) && recipe[index - 0] == match[5] && recipe[index - 1] == match[4] && recipe[index - 2] == match[3] && recipe[index - 3] == match[2] && recipe[index - 4] == match[1] && recipe[index - 5] == match[0];
    elf1Index = (elf1Index + elf1 + 1) % recipe.length;
    elf2Index = (elf2Index + elf2 + 1) % recipe.length;
    elf1 = recipe[elf1Index];
    elf2 = recipe[elf2Index];
}
recipe.length - match.length