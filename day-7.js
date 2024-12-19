// Author: TryFailTryAgain
// Copyright (c) 2024. All rights reserved. For use in Open-Source projects this
// may be freely copied or excerpted with credit to the author.
// Advent of Code 2024 Day 7 part 1-2

const fs = require('fs');

class EquationTree {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.middle = null;
        this.right = null;
    }
    // Recursively adds children to the tree
    addChildren(newValue) {
        if (this.left === null) {
            this.left = new EquationTree(this.value + newValue);
        } else {
            this.left.addChildren(newValue);
        }
        if (this.right === null) {
            this.right = new EquationTree(this.value * newValue);
        } else {
            this.right.addChildren(newValue);
        }
    }
    // Recursively adds children to the tree
    addChildrenP2(newValue) {
        // Ensure recursive calls use addChildrenP2 for consistent behavior
        if (this.left === null) {
            this.left = new EquationTree(this.value + newValue);
        } else {
            this.left.addChildrenP2(newValue);
        }
        if (this.middle === null) {
            this.middle = new EquationTree(parseInt(this.value.toString() + newValue.toString()));
        } else {
            this.middle.addChildrenP2(newValue);
        }
        if (this.right === null) {
            this.right = new EquationTree(this.value * newValue);
        } else {
            this.right.addChildrenP2(newValue);
        }
    }
}

// Main function
const equations = prepareData();
console.log('Part 1: ' + part1(equations));
console.log('Part 2: ' + part2(equations));

// Finds if each equation is valid with any combination of operators
function part1(equations) {
    let totalValidTestValues = 0;
    for (let i = 0; i < equations.length; i++) {
        let tree = buildTreeFromEquation(equations[i]);
        if (checkTree(tree, equations[i][0])) {
            totalValidTestValues += equations[i][0];
        }
    }
    return totalValidTestValues;
}

function part2(equations) {
    let totalValidTestValues = 0;
    for (let i = 0; i < equations.length; i++) {
        let tree = buildTreeFromEquationP2(equations[i]);
        if (checkTreeP2(tree, equations[i][0])) {
            totalValidTestValues += equations[i][0];
        }
    }
    return totalValidTestValues;
}

// Builds out the tree. Looks linear but is actually recursive due to the addChildren function in EquationTree
function buildTreeFromEquation(equation) {
    let root = new EquationTree(equation[1]);
    for (let i = 2; i < equation.length; i++) {
        root.addChildren(equation[i]);
    }
    return root;
}

function buildTreeFromEquationP2(equation) {
    let root = new EquationTree(equation[1]);
    for (let i = 2; i < equation.length; i++) {
        root.addChildrenP2(equation[i]);
    }
    return root;
}

// Checks if the last nodes in the tree is equal to the target value. If so, return true
function checkTree(tree, testValue) {
    if (tree.left === null && tree.right === null) {
        return tree.value === testValue;
    }
    return checkTree(tree.left, testValue) || checkTree(tree.right, testValue);
}

function checkTreeP2(tree, testValue) {
    if (tree.left === null && tree.middle === null && tree.right === null) {
        return tree.value === testValue;
    }
    return checkTreeP2(tree.left, testValue) || checkTreeP2(tree.middle, testValue) || checkTreeP2(tree.right, testValue);
}

// Pulls data and prepares it for use from the input file
function prepareData() {
    const inputData = fs.readFileSync('input-7.txt', 'utf8');
    // Split the data into lines then into individual map objects
    let data = inputData.split('\n')
    // Remove the last empty row if there is one
    if (data[data.length - 1] === '') {
        data.pop();
    }
    data = data.map(line => line.match(/\d+/g).map(Number));
    return data;
}