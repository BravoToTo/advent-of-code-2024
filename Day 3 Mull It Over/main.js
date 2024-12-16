const { match } = require('assert');
const fs = require('fs');
const path = require('path');

function part1() {
    const input_raw = procInput();
    let regex = /mul\(\d{1,3},\d{1,3}\)/g;
    const oper_array = input_raw.match(regex);
    let acc = 0;
    for (let i = 0; i < oper_array.length; i++) {
        let nums = oper_array[i].match(/\d+/g)
        acc += parseInt(nums[0]) * parseInt(nums[1])
    }
    return acc
}

function part2() {
    const input_raw = procInput();
    const idx_do = Array.from(input_raw.matchAll(/do\(\)/g)).map(val => val.index);
    const idx_dont = Array.from(input_raw.matchAll(/don't\(\)/g)).map(val => val.index);

    const matchIterator = input_raw.matchAll(/mul\(\d{1,3},\d{1,3}\)/g);
    let acc = 0;
    for (const match of matchIterator) {
        
        let last_pos_dont = -1  
        idx_dont.forEach((val, index)=>{
            if(val < match.index)
                last_pos_dont = index
        })

        let last_pos_do = -1; 
        idx_do.forEach((val, index)=>{
            if(val < match.index)
                last_pos_do = index
        })
        if (last_pos_dont < 0 || (idx_do[last_pos_do] > idx_dont[last_pos_dont])) {
            let nums = match[0].match(/\d+/g)
            acc += parseInt(nums[0]) * parseInt(nums[1])
        }
    }

    return acc;
}

function part2_2() {
    const input_raw = procInput();
    const idx_do = Array.from(input_raw.matchAll(/do\(\)/g)).map(val => val.index);
    const idx_dont = Array.from(input_raw.matchAll(/don't\(\)/g)).map(val => val.index);

    const mulMatches = input_raw.matchAll(/mul\(\d{1,3},\d{1,3}\)/g);
    let acc = 0;
    for (const mul of mulMatches) {
        const filtered_idx_do = idx_do.filter(indices => indices < mul.index);
        const filtered_idx_dont = idx_dont.filter(indices => indices < mul.index);
        if (filtered_idx_dont.length === 0 || (filtered_idx_do.length > 0 && filtered_idx_do[filtered_idx_do.length - 1] > filtered_idx_dont[filtered_idx_dont.length - 1]))
            acc += multiply(mul[0]);
    }
    return acc;
}

function multiply(operation) {
    const nums = operation.match(/\d+/g)
    return parseInt(nums[0]) * parseInt(nums[1])
}

// Auxiliares
function procInput() {
    const input_raw = fs.readFileSync(path.join(__dirname, 'input.txt')).toString();

    return input_raw
}


const resP1 = part1();
const resP2 = part2();
const resP2_2 = part2_2();
console.log(resP1);
console.log(resP2);
console.log(resP2_2);