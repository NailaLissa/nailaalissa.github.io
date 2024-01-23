'use strict';

const arr2d = [[1, 2], [3, 4], [5, 6]];
const arr3d = [[[1, 2], [3, 4]], [[5, 6], [7, 8]]];

function flattenArray2d(arr) {
  // Replace this comment and the next line with your code
  // another solution is to use the methode arr.flat(number of Array dimintion );
  console.log(arr);

  const newArr2 = [];
  arr.forEach(element => {
    if (Array.isArray(element)) {
      element.forEach(innerElement => newArr2.push(innerElement));
    } else {
      newArr2.push(element);
    }
  });

  console.log(newArr2);
  return newArr2;
}

function flattenArray3d(arr) {
  // Replace this comment and the next line with your code

  console.log(arr);

  const newArr3 = [];

  arr.forEach(element => {
    if (Array.isArray(element)) {
      element.forEach(innerElement => {
        if (Array.isArray(innerElement)) {
          innerElement.forEach(x => newArr3.push(x));
        } else {
          newArr3.push(innerElement);
        }
      });
    } else {
      newArr3.push(element);
    }
  });

  console.log(newArr3);
  return newArr3;
}

console.log(flattenArray2d(arr2d)); // -> [1, 2, 3, 4, 5, 6]
console.log(flattenArray3d(arr3d)); // -> [1, 2, 3, 4, 5, 6, 7, 8]

// function flattenArrayKd(arr) {
//   let newArr = [];

//   arr.forEach(element => {
//     if (Array.isArray(element)) {
//       newArr = newArr.concat(flattenArrayKd(element));
//     } else {
//       newArr.push(element);
//     }
//   });

//   return newArr;
// }

// const arrkd = [[[1, 2], [3, 4]], [[5, 6], [7, 8]]];
// flattenArrayKd(arrkd);
// Do not change or remove anything below this line
module.exports = {
  flattenArray2d,
  flattenArray3d,
};
