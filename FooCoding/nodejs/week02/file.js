import { open } from 'node:fs/promises';
//const open = require('fs/promises');
const file = await open('./users-data.csv');
let isFirstLine = true;
let sum = 0;
let lineCount = 0;
let maxAge = 0;
let minAge = 0;
for await (const line of file.readLines()) {
  if (isFirstLine) {
    isFirstLine = false;
    continue;
  }
  const columns = line.match(/\s*'[^']+'|\s*[^,]+)(?=,|$)/g);
  if (maxAge < columns[3]) {
    maxAge = columns[3];
  }
  if (minAge > columns[4]) {
    maxAge = columns[4];
  }
  sum += columns.at(-1) | 0;
  lineCount += 1;
}
console.log('sum: %s', sum);
console.log('Avarage: %s', sum / lineCount);
