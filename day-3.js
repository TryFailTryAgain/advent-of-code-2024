// Author: TryFailTryAgain
// Copyright (c) 2024. All rights reserved. For use in Open-Source projects this
// may be freely copied or excerpted with credit to the author.
// Advent of Code 2024 Day 3 part 1-2

const fs = require('fs');

let commands = prepareData();
console.log("Part 1: ", part1(commands));
//console.log("Part 2: ", part2(reports));


function prepareData() {
    const inputData = fs.readFileSync('input-3.txt', 'utf8');
    // Splits the data into commands
    let data = inputData.match(/mul\(\d{1,3},\d{1,3}\)/g)
    // Parses the commands into number pairs for multiplication, then takes each pair and ensures they are ints
    data = data.map(multiplier => multiplier.match(/\d{1,3}/g).map(num => parseInt(num)));
    return data;
}

function part1(commands){
    // Multiplies the pairs of numbers in the commands
    let total = 0;
    for (let i = 0; i < commands.length; i++){
        total += commands[i][0] * commands[i][1];
    }
    return total;
}
