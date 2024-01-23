'use strict';

const values = ['a', 'b', 'c', 'd', 'a', 'e', 'f', 'c'];
const numbers = [1, 2, 3, 1, 2, 3, 2, 5, 6, 1];

function makeUnique(arr) {
  // Replace this comment and the next line with your code
  console.log(arr);
  const result = arr.filter((item, index) => arr.indexOf(item) === index);
  return result;
}

const uniqueValues = makeUnique(values);
console.log(uniqueValues);
const uniqueNumbers = makeUnique(numbers);
console.log(uniqueNumbers);
// Do not change or remove anything below this line
module.exports = makeUnique;
