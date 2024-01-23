'use strict';

function threeFive(startIndex, stopIndex, threeCallback, fiveCallback) {
  const numbers = [];

  // Replace this comment and the next line with your code
  for (let i = startIndex; i <= stopIndex; i++) {
    numbers.push(i);
  }
  numbers.forEach(number => {
    if (number % 3 === 0 && number % 5 === 0) {
      threeCallback(number);
      fiveCallback(number);
    } else if (number % 3 === 0) {
      // If divisible by 3, call threeCallback
      threeCallback(number);
    } else if (number % 5 === 0) {
      // If divisible by 5, call fiveCallback
      fiveCallback(number);
    } else {
      console.log('not divid by 5 or 3');
    }
  });
  console.log(startIndex, stopIndex, threeCallback, fiveCallback, numbers);
}

function sayThree(number) {
  // Replace this comment and the next line with your code
  console.log(number + ' is divisible by 3');
}

function sayFive(number) {
  // Replace this comment and the next line with your code
  console.log(number + ' is divisible by 5');
}

threeFive(10, 15, sayThree, sayFive);

// Do not change or remove anything below this line
module.exports = threeFive;
