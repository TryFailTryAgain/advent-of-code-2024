// Author: TryFailTryAgain
// Copyright (c) 2024. All rights reserved. For use in Open-Source projects this
// may be freely copied or excerpted with credit to the author.
// Advent of Code 2024 Day 1 part 1-2

const fs = require('fs');

let [left,right] = prepareData();
console.log("Part 1: ", part1(left, right));
console.log("Part 2: ", part2(left, right));


function prepareData() {
    const inputData = fs.readFileSync('input-1.txt', 'utf8');
    // Split the data into rows and then into two columns
    let data = inputData.split('\n').map(row => row.split(/\s+/));
    // Remove the last empty row if there is one
    if (data[data.length - 1] == '') {
        data.pop();
    }
    // Create two arrays for the two columns and sort them
    let left = data.map(row => row[0]).sort();
    let right = data.map(row => row[1]).sort();
    left = left.sort();
    right = right.sort();

    return [left, right];
}

function part1(left, right) {
    // Finds the total difference between each number in the two columns row by row
    let totaldiff = 0;
    left.map((value, index) => { totaldiff += Math.abs(value - right[index]); });
    return totaldiff;

}

function part2(left, right) {
    // Finds the number of occurences that each number in the left row appears in the right row and multiply them
    // for a total similarity score
    let similarityScore = 0;
    left.map((num, index) => {
        similarityScore += num * (right.filter(value => value == num).length);
    });
    return similarityScore;
}








