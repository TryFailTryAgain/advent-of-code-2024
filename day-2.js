// Author: TryFailTryAgain
// Copyright (c) 2024. All rights reserved. For use in Open-Source projects this
// may be freely copied or excerpted with credit to the author.
// Advent of Code 2024 Day 2 part 1-2

const fs = require('fs');

let reports = prepareData();
console.log("Part 1: ", part1(reports));
console.log("Part 2: ", part2(reports));



function prepareData() {
    const inputData = fs.readFileSync('input-2.txt', 'utf8');
    // Split the data into reports and then into levels
    let data = inputData.split('\n').map(report => report.split(/\s+/));
    // Remove the last empty row if there is one
    if (data[data.length - 1] == '') {
        data.pop();
    }
    // Parse the levels into numbers
    data = data.map(report => report.map(num => parseInt(num)));
    return data;
}

function invalidLevelChange(report) {
    // Finds if the report has an invalid change in levels
    // Track errors per report
    let errorIndexs = [];
    for (let i = 0; i < report.length - 1; i++) {
        if (Math.abs(report[i] - report[i + 1]) > 3 || (report[i] - report[i + 1]) == 0) {
            errorIndexs.push(i);
        }
    }
    return errorIndexs;
}

function increasingOrDecreasing(report) {
    // Finds if the report is increasing or decreasing
    let increasing = true;
    let decreasing = true;
    let errorIndexsI = [];
    let errorIndexsD = [];
    for (let i = 0; i < report.length - 1; i++) {
        if (report[i] > report[i + 1]) {
            increasing = false;
            errorIndexsI.push(i);
        }
        if (report[i] < report[i + 1]) {
            decreasing = false;
            errorIndexsD.push(i);
        }
    }
    if (increasing === true) {
        return [];
    }
    if (decreasing === true) {
        return [];
    }
    if (errorIndexsI.length < errorIndexsD.length) {
        return errorIndexsI;
    }
    else {
        return errorIndexsD;
    }
}

function part1(reports) {
    // Find the number of safe reports with no errors
    let safeReports = 0;
    reports.map((report) => {
        if (invalidLevelChange(report).length == 0 && increasingOrDecreasing(report).length == 0) {
            safeReports++;
        }
    });
    return safeReports;
}

function part2(reports) {
    let safeReports = 0;
    reports.map((report) => {
        if (invalidLevelChange(report).length == 0 && increasingOrDecreasing(report).length == 0) {
            safeReports++;
        } else {
            for (let i = 0; i < report.length; i++) {
                // Removes one element at a time from the report to find the safe reports that can be made if one element is removed
                const beforeRemoval = report.slice(0, i);
                const afterRemoval = report.slice(i + 1);
                const modifiedReport = beforeRemoval.concat(afterRemoval);
                
                // Checks if the modified report is safe
                if (invalidLevelChange(modifiedReport).length == 0 && increasingOrDecreasing(modifiedReport).length == 0) {
                    safeReports++;
                    break; // No need to check further removals for this report
                }
            }
        }
    });
    return safeReports;
}
