// Author: TryFailTryAgain
// Copyright (c) 2024. All rights reserved. For use in Open-Source projects this
// may be freely copied or excerpted with credit to the author.
// Advent of Code 2024 Day 3 part 1-2

const fs = require('fs');

let { mul, dos, donts } = prepareData();
console.log("Part 1: ", part1(mul));
console.log("Part 2: ", part2(mul, dos, donts));

function prepareData() {
    const inputData = fs.readFileSync('input-3.txt', 'utf8');
    const mulRegex = /mul\(\d{1,3},\d{1,3}\)/g;
    const doRegex = /do\(\)/g;
    const dontRegex = /don't\(\)/g;
    let match = null;
    let mul = [];
    let dos = [];
    let donts = [];

    while ((match = mulRegex.exec(inputData)) !== null) {
        mul.push({
            match: match[0],
            index: match.index
        });
    }
    while ((match = doRegex.exec(inputData)) !== null) {
        dos.push({
            match: match[0],
            index: match.index
        });
    }
    while ((match = dontRegex.exec(inputData)) !== null) {
        donts.push({
            match: match[0],
            index: match.index
        });
    }
    // Parses the mul commands into number pairs for multiplication, then takes each pair and ensures they are ints
    mul.map(mul => {
        let pair = mul.match.match(/\d{1,3}/g);
        mul.match = [parseInt(pair[0]), parseInt(pair[1])];
    });
    return { mul, dos, donts };
}

function part1(mul) {
    // Multiplies the pairs of numbers in the commands
    let total = 0;
    mul.map(mul => {
        total += mul.match[0] * mul.match[1];
    });
    return total;
}

function part2(mul, dos, donts) {
    // Multiplies the number pairs only if they are after a do() command but not after a don't() command
    let total = 0;
    // mul commands start off accepted
    let counting = true

    // Concats all the matches and sorts them by their index
    let allMatches = mul.concat(dos, donts);
    allMatches.sort((a, b) => a.index - b.index);

    for (let i = 0; i < allMatches.length; i++) {
        if (allMatches[i].match === "do()") {
            counting = true;
        }
        if (allMatches[i].match === "don't()") {
            counting = false;
        }
        if (counting == true && allMatches[i].match !== "do()" && allMatches[i].match !== "don't()") {
            total += allMatches[i].match[0] * allMatches[i].match[1];
        }
    }
    return total;
}
