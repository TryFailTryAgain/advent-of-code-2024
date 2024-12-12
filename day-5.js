// Author: TryFailTryAgain
// Copyright (c) 2024. All rights reserved. For use in Open-Source projects this
// may be freely copied or excerpted with credit to the author.
// Advent of Code 2024 Day 5 part 1-2

const fs = require('fs');

let { rules, updates } = prepareData();
console.log("Part 1: ", part1(updates, rules));
console.log("Part 2: ", part2(updates, rules));

// Finds all the valid updates and returns the total of the center values
function part1(updates, rules) {
    let validUpdateCenterTotal = 0;

    // Checks each update against each rule
    updates.forEach(update => {
        let validUpdate = true;
        rules.forEach(rule => {
            if (checkUpdateVSRule(update, rule) === false) {
                validUpdate = false;
            }
        });
        // If the update is valid, adds the center page value to the total
        if (validUpdate === true) {
            validUpdateCenterTotal += update[(update.length - 1) / 2];
        }
    });
    return validUpdateCenterTotal;
}
// Finds all the invalid updates, orders them and return the total of their center values
function part2(updates, rules) {
    let invalidUpdateCenterTotal = 0;
    let invalidUpdates = [];

    // Gets all the invalid updates by checking each update against all the rules
    updates.forEach(update => {
        let validUpdate = true;
        rules.forEach(rule => {
            if (checkUpdateVSRule(update, rule) === false) {
                validUpdate = false;
            }
        });
        if (validUpdate === false) {
            invalidUpdates.push(update);
        }
    });

    // Reorders the invalid updates until they are valid against all the rules
    invalidUpdates.forEach((update, index) => {
        let updateCorrect = false;
        while (!updateCorrect) {
            updateCorrect = true;
            rules.forEach(rule => {
                if (!checkUpdateVSRule(update, rule)) {
                    update = reOrderPage(update, rule);
                    updateCorrect = false;
                }
            });
        }
        invalidUpdates[index] = update;
    });

    // Calculates the total of the center values of the invalid updates
    for (let i = 0; i < invalidUpdates.length; i++) {
        invalidUpdateCenterTotal += invalidUpdates[i][(invalidUpdates[i].length - 1) / 2];
    }

    return invalidUpdateCenterTotal;
}

// Reorders the update pages based on the rule provided
function reOrderPage(update, rule) {
    let newUpdate = update;
    const [firstRule, secondRule] = rule;
    const firstIndex = update.indexOf(firstRule);
    const secondIndex = update.indexOf(secondRule);

    // Check if both rule values are present
    if (firstIndex !== -1 && secondIndex !== -1) {
        // If the firstRule comes after the secondRule, swap them
        if (firstIndex > secondIndex) {
            [newUpdate[firstIndex], newUpdate[secondIndex]] = [newUpdate[secondIndex], newUpdate[firstIndex]];
        }
    }
    return newUpdate;
}

function checkUpdateVSRule(update, rule) {
    const firstRuleIndex = update.indexOf(rule[0]);
    const secondRuleIndex = update.indexOf(rule[1]);

    if (firstRuleIndex === -1 || secondRuleIndex === -1) {
        return true;
    }
    if (firstRuleIndex < secondRuleIndex) {
        return true;
    }
    return false;
}

function prepareData() {
    const inputData = fs.readFileSync('input-5.txt', 'utf8');
    // Split the data into lines
    let data = inputData.split('\n')
    // Remove the last empty row if there is one
    if (data[data.length - 1] === '') {
        data.pop();
    }
    let rules = [];
    let updates = [];
    rules = data.slice(0, data.indexOf(''));
    rules = rules.map(rule => rule.split('|').map(num => parseInt(num)));
    updates = data.slice(data.indexOf('') + 1);
    updates = updates.map(page => page.split(',').map(num => parseInt(num)));
    return { rules, updates };
}
