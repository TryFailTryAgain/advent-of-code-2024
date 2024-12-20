// Author: TryFailTryAgain
// Copyright (c) 2024. All rights reserved. For use in Open-Source projects this
// may be freely copied or excerpted with credit to the author.
// Advent of Code 2024 Day 6 part 1-2

const fs = require('fs');

map = prepareData();
guardStartLocation = findGuard(map);
console.log("Part 1: ", part1(map));
console.log("part 2:", part2(map, guardStartLocation));



// Finds the guard on the map and moves it until it exits the map, then counts the positions the guard has visited
function part1(map) {
    let tilesMovedAcross = 0;
    while (guardMove(map, findGuard(map))) {

    }
    map.forEach(row => {
        row.forEach(cell => {
            if (cell === 'X') {
                tilesMovedAcross++;
            }
        });
    });
    return tilesMovedAcross;
}

// Tests every possible position for the placed blocker and returns the number of times we create a loop
function part2(map, guardStartLocation) {
    cleanMap = prepareData();
    let loops = 0;
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            // If the cell is pathed on then we know a blocker here will have the chance to create a loop
            // We also need to make sure the blocker isn't placed on the guard's starting position
            if (map[y][x] === 'X' && (y !== guardStartLocation[0] && x !== guardStartLocation[1])) {
                let tilesMovedAcross = 0;
                let newTestMap = structuredClone(cleanMap);
                newTestMap[y][x] = '#'
                // Now we have a new map with a blocker placed, we can test if the guard will loop
                while (tilesMovedAcross < 10000 && guardMove(newTestMap, findGuard(newTestMap))) {
                    tilesMovedAcross++;
                }
                if (tilesMovedAcross === 10000) {
                    loops++;
                }
            }
        }
    }
    return loops;
}

//Finds the position of the guard on the map and returns it as a pair of coordinates
function findGuard(map) {
    let guard = [0, 0];
    const guardSymbols = ['^', '>', 'v', '<'];
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (guardSymbols.includes(map[y][x])) {
                guard = [y, x];
                return guard;
            }
        }
    }
}

function guardMove(map, guard) {
    // If the guard will go off the map, set its last position and return false as we now know the guard has used all moves
    // If there is no object in front of the guard, move the guard forward, otherwise turn the guard 90 degrees right
    switch (map[guard[0]][guard[1]]) {
        case '^':
            // Set the last position of the guard to an X
            map[guard[0]][guard[1]] = 'X';
            // If the guard will go off the map, return false as it will go off the map
            if (guard[0] === 0) {
                return false;
            }
            // If there is a wall in front of the guard, turn the guard 90 degrees right
            if (map[guard[0] - 1][guard[1]] === '#') {
                map[guard[0]][guard[1]] = '>';
                return true;
            }
            // Otherwise move the guard forward
            map[guard[0] - 1][guard[1]] = '^';
            return true;
        case '>':
            map[guard[0]][guard[1]] = 'X';
            if (guard[1] === map[0].length - 1) {
                return false;
            }
            if (map[guard[0]][guard[1] + 1] === '#') {
                map[guard[0]][guard[1]] = 'v';
                return true;
            }
            map[guard[0]][guard[1] + 1] = '>';
            return true;
        case 'v':
            map[guard[0]][guard[1]] = 'X';
            if (guard[0] === map.length - 1) {
                return false;
            }
            if (map[guard[0] + 1][guard[1]] === '#') {
                map[guard[0]][guard[1]] = '<';
                return true;
            }
            map[guard[0] + 1][guard[1]] = 'v';
            return true;
        case '<':
            map[guard[0]][guard[1]] = 'X';
            if (guard[1] === 0) {
                return false;
            }
            if (map[guard[0]][guard[1] - 1] === '#') {
                map[guard[0]][guard[1]] = '^';
                return true;
            }
            map[guard[0]][guard[1] - 1] = '<';
            return true;
    }
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
