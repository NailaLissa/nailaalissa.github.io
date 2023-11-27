console.log('Hello World !')
console.log('Halo, dunia!')
console.log('Ciao, mondo')
console.log('Hola, mundo!')
console.log('I\'m awesome');
let x
console.log("the value of my variable x will be: undefined")
console.log(x)
x=15
console.log("the value of my variable x will be: number")
console.log("the value of my variable x will be:", x, "and the tye of x is", typeof(x))
let y ="This is a String"
console.log("the value of my string is:", y)
console.log(y)
y="This is a new string for y"
console.log("the value of my string x will be:", y, "and the tye of x is", typeof(y))
console.log(Math.round(7.25))
let z=7.25
let a=Math.round(z)
console.log(a)
let heighstValue = a>z ? a : z
console.log(heighstValue)
//6. Arrays
let myItems=[]
console.log("The value of the array 'myItems' is expected to be an empty array.")
console.log("The actual value of the array 'myList' is:", myItems)
let myFavoriteAnimals =['cat','dog','dolphin','birds']
console.log(myFavoriteAnimals)
myFavoriteAnimals.push('baby pig')
console.log(myFavoriteAnimals)
//7. More strings
let myString = "this is a test"
console.log(myString)
console.log("The length of myString is:", myString.length)
//8.Compare 4 variables
let variable1=15
let variable2=true
let variable3='Hello'
let variable4=['apple', 'orange', 'banana']
let variable5= 3
let variable6= '15'
console.log("The value of my variable1 is: " + variable1)
console.log("The type of variable1:", typeof(variable1))
console.log("The value of my variable2 is: " + variable2)
console.log("The type of variable2:", typeof(variable2))
console.log("The value of my variable3 is: " + variable3)
console.log("The type of variable3:", typeof(variable3))
console.log("The value of my variable4 is: " + variable4)
console.log("The type of variable4:", typeof(variable4))

function compareTypes(variableX,variableY){
  if (typeof variableX === typeof variableY) {
  console.log(" variables have the same type: " + typeof variableX)
} else {
  console.log("variables have different types", typeof variableX , "and", typeof variableY)
}
}
compareTypes(variable1,variable2)
compareTypes(variable4,variable3)
compareTypes(variable1,variable5)
compareTypes(variable3,variable6)
// 9 test what % does
let b=7
console.log("value of b:", b)
console.log("New value of b :", b %=3)
b=15
console.log("New value of b :", b %=3)
b=17
console.log("New value of b :", b %=3)
b=43
console.log("New value of b :", b %=5)
// 10 . Declare an array with multiple types
let mixedArray = [42, 'Hello', true, 3.14]
console.log(mixedArray)
// Output: Infinity
console.log(Infinity);
console.log(6/0);
console.log(10/0);

function compareInfinity(x, y) {
  if (x === y) {
    console.log("Both infinities are equal.");
  } else {
    console.log("Infinities are not equal.");
  }
}

// Call the function without logging its result
compareInfinity(6/0, 10/0);
