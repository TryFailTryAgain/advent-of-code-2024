// Author: TryFailTryAgain
// Copyright (c) 2024. All rights reserved. For use in Open-Source projects this
// may be freely copied or excerpted with credit to the author.
// Advent of Code 2024 Day 6 part 1-2

const fs = require('fs');

map = prepareData();
//console.log(map);
//console.log("Part 1: ", part1(map));


function part1(map) {

}

// Pulls data and prepares it for use from the input file
function prepareData() {
    const inputData = fs.readFileSync('input-6.txt', 'utf8');
    // Split the data into lines then into individual map objects
    let data = inputData.split('\n')
    // Remove the last empty row if there is one
    if (data[data.length - 1] === '') {
        data.pop();
    }
    data = data.map(row => row.split(''));
    return data;
}
