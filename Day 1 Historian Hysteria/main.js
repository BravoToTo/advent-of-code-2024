const fs = require('fs');
const path = require('path');

function part1() {
    const [list1, list2] = procInput();

    list1.sort((a, b) => a - b);
    list2.sort((a, b) => a - b);

    let result = 0;
    for (let i = 0; i < Math.min(list1.length, list2.length); i++) {
        result += Math.abs(list1[i] - list2[i]);
    }

    return result;
}

function part2() {
    const [list1, list2] = procInput();

    const ocurr = new Map()
    for (let i = 0; i < list2.length; i++) {
        ocurr.set(list2[i], (ocurr.get(list2[i]) || 0) + 1)
    }

    let res = 0;
    for (let i = 0; i < list1.length; i++) {
        res += list1[i] * (ocurr.get(list1[i]) || 0)
    }
    return res;
}

// Auxiliares
function procInput() {
    const input_raw = fs.readFileSync(path.join(__dirname, 'input.txt')).toString().split('\r\n');

    let list1 = [];
    let list2 = [];

    input_raw.forEach(row => {
        const res = row.split("   ")
        list1.push(res[0]);
        list2.push(res[1]);
    })

    return [
        list1,
        list2
    ]
}

const resP1 = part1();
const resP2 = part2();
console.log(resP1);
console.log(resP2);