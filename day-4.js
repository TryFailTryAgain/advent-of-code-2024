// Author: TryFailTryAgain
// Copyright (c) 2024. All rights reserved. For use in Open-Source projects this
// may be freely copied or excerpted with credit to the author.
// Advent of Code 2024 Day 4 part 1-2

const fs = require('fs');

let wordSearch = prepareData();
console.log("Part 1: ", part1(wordSearch));
console.log("Part 2: ", part2(wordSearch));


function part1(wordSearch) {
    // Finds the number of times the word 'XMAS' appears in the word search
    let count = 0;
    for (let i = 0; i < wordSearch.length; i++) {
        for (let j = 0; j < wordSearch[i].length; j++) {
            if (wordSearch[i][j] === 'X') {
                count += findCompleteWords(wordSearch, 'XMAS', i, j);
            }
        }
    }
    return count;
}

function part2(wordSearch) {
    // Finds how many x-MAS crosses are in the word search
    let count = 0;
    for (let i = 0; i < wordSearch.length; i++) {
        for (let j = 0; j < wordSearch[i].length; j++) {
            if (wordSearch[i][j] === 'A') {
                count += findXMass(wordSearch, "MAS", i, j);
            }
        }
    }
    return count;
}

function findCompleteWords(wordSearch, word, i, j) {
    // Takes the location of the start letter and finds the next letter in the word
    regex = new RegExp(word);
    fullWordCount = 0;
    let up = '', down = '', left = '', right = '', upRight = '', upLeft = '', downRight = '', downLeft = '';
    // Up
    for (let k = i; (k - i) < word.length && k < wordSearch.length; k++) {
        up += wordSearch[k][j];
    }
    // Down
    for (let k = i; (i - k) < word.length && k >= 0; k--) {
        down += wordSearch[k][j];
    }
    // Left
    for (let k = j; (j - k) < word.length && k >= 0; k--) {
        left += wordSearch[i][k];
    }
    // Right
    for (let k = j; (k - j) < word.length && k < wordSearch[i].length; k++) {
        right += wordSearch[i][k];
    }
    // Up-Right
    for (let k = i, l = j; (k - i) < word.length && k < wordSearch.length && l < wordSearch[i].length; k++, l++) {
        upRight += wordSearch[k][l];
    }
    // Up-Left
    for (let k = i, l = j; (k - i) < word.length && k < wordSearch.length && l >= 0; k++, l--) {
        upLeft += wordSearch[k][l];
    }
    // Down-Right
    for (let k = i, l = j; (i - k) < word.length && k >= 0 && l < wordSearch[i].length; k--, l++) {
        downRight += wordSearch[k][l];
    }
    // Down-Left
    for (let k = i, l = j; (i - k) < word.length && k >= 0 && l >= 0; k--, l--) {
        downLeft += wordSearch[k][l];
    }
    let fullList = [];
    fullList = fullList.concat(up, down, left, right, upRight, upLeft, downRight, downLeft);
    fullList.map(direction => {
        if (direction.match(regex) !== null) {
            fullWordCount++;
        }
    });
    return fullWordCount;
}

function findXMass(wordSearch, word, i, j) {
    let x1 = '', x2 = '';
    // x1 down-left and up-right
    if (i > 0 && j > 0 && i < wordSearch.length - 1 && j < wordSearch[i].length - 1) {
        x1 = wordSearch[i + 1][j - 1] + wordSearch[i][j] + wordSearch[i - 1][j + 1];
    }
    // x2 up-left and down-right
    if (i > 0 && j > 0 && i < wordSearch.length - 1 && j < wordSearch[i].length - 1) {
        x2 = wordSearch[i - 1][j - 1] + wordSearch[i][j] + wordSearch[i + 1][j + 1];
    }
    // Checks if the x-MAS cross is present either forwards or backwards
    if ((x1 === word || x1 === word.split('').reverse().join('')) &&
        (x2 === word || x2 === word.split('').reverse().join(''))) {
        return 1;
    }
    return 0;
}

function prepareData() {
    const inputData = fs.readFileSync('input-4.txt', 'utf8');
    // Split the data into reports and then into levels
    let data = inputData.split('\n')
    // Remove the last empty row if there is one
    if (data[data.length - 1] === '') {
        data.pop();
    }
    return data;
}
