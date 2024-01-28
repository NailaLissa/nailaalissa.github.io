'use strict';

const x = 9;
function f1(val) {
  val = val + 1;
  return val;
}

f1(x); // We call the function f1 with x, but it doesn't change x.

console.log(x); // We print the value of x, which is still 9.

const y = { x: 9 }; // We have an object named y with a property x having a value of 9.
function f2(val) {
  val.x = val.x + 1; // We add 1 to the x property of the object, and it changes y.
  return val; // We return the modified object
}

f2(y); // We call the function f2 with y, and it changes the x property of the object.

console.log(y); // We print the modified object y, now with x: 10.

// Add your explanation as a comment here
// In the case of the number x, the function f1 receives a copy of the value of x (pass by value). Any changes made inside the function do not affect the original variable x.
// In the case of the object y, the function f2 receives a reference to the object (pass by reference). Modifying the object inside the function does affect the original object y.
// This behavior is a result of how JavaScript handles primitive types (like numbers) and objects when they are passed to functions. Primitive types are passed by value, meaning a copy of the value is passed, while objects are passed by reference, meaning a reference to the original object is passed.
