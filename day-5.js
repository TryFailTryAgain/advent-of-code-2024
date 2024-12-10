// Author: TryFailTryAgain
// Copyright (c) 2024. All rights reserved. For use in Open-Source projects this
// may be freely copied or excerpted with credit to the author.
// Advent of Code 2024 Day 5 part 1-2

const fs = require('fs');

let {rules, pages} = prepareData();
console.log(pages);

function prepareData() {
    const inputData = fs.readFileSync('input-5.txt', 'utf8');
    // Split the data into lines
    let data = inputData.split('\n')
    // Remove the last empty row if there is one
    if (data[data.length - 1] === '') {
        data.pop();
    }
    let rules = [];
    let pages = [];
    rules = data.slice(0, data.indexOf(''));
    pages = data.slice(data.indexOf('') + 1);
    return {rules, pages};
}
