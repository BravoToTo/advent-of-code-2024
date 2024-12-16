const fs = require('fs');
const path = require('path');

function part1() {
    const reports = procInput();

    const MIN_DIFFERENCE = 1;
    const MAX_DIFFERENCE = 3;
    let safe_count = 0;
    for (let i = 0; i < reports.length; i++) {
        let ascending = false;
        let errorOccurred = false;
        for (let j = 0; j < reports[i].length - 1; j++) {
            if (j === 0)
                ascending = parseInt(reports[i][j]) < parseInt(reports[i][j + 1])

            if (Math.abs(parseInt(reports[i][j]) - parseInt(reports[i][j + 1])) < MIN_DIFFERENCE || Math.abs(parseInt(reports[i][j]) - parseInt(reports[i][j + 1])) > MAX_DIFFERENCE) {
                errorOccurred = true;
                break;
            }

            if ((parseInt(reports[i][j]) > parseInt(reports[i][j + 1]) && ascending) || (parseInt(reports[i][j]) < parseInt(reports[i][j + 1]) && !ascending)) {
                errorOccurred = true;
                break;
            }
        }
        if (!errorOccurred)
            safe_count++;

        errorOccurred = false
    }
    return safe_count;
}

function part2() {
    const reports = procInput();

    let safe_count = 0;
    for (let i = 0; i < reports.length; i++) {
        if (checkReportSafety(reports[i]))
            safe_count++;
    }
    return safe_count;
}

// Auxiliares
function procInput() {
    const input_raw = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().split('\r\n').map(row => row.split(' '));

    return input_raw
}

function checkReportSafety(report, iter = 0) {
    const MIN_DIFFERENCE = 1;
    const MAX_DIFFERENCE = 3;
    let ascending;
    for (let j = 0; j < report.length - 1; j++) {
        if (j === 0)
            ascending = parseInt(report[j]) < parseInt(report[j + 1])

        if (Math.abs(parseInt(report[j]) - parseInt(report[j + 1])) < MIN_DIFFERENCE || Math.abs(parseInt(report[j]) - parseInt(report[j + 1])) > MAX_DIFFERENCE) {
            if (iter === 1)
                return false;
            return checkReportSafety(report.filter((val, idx) => idx != j), 1) || checkReportSafety(report.filter((val, idx) => idx != j + 1), 1)
        }

        if ((parseInt(report[j]) > parseInt(report[j + 1]) && ascending) || (parseInt(report[j]) < parseInt(report[j + 1]) && !ascending)) {
            if (iter === 1)
                return false;
            return checkReportSafety(report.filter((val, idx) => idx != j - 1), 1) || checkReportSafety(report.filter((val, idx) => idx != j), 1) || checkReportSafety(report.filter((val, idx) => idx != j + 1), 1)
        }
    }
    return true;
}

const resP1 = part1();
const resP2 = part2();
console.log(resP1);
console.log(resP2);