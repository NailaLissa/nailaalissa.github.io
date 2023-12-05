//1. Strings
let myString = "hello,this,is,a,difficult,to,read,sentence";
console.log(myString);
let stringWithoutCommas= "";
for (i=0; i< myString.length;i++){ 
if (myString[i]=== ","){
 stringWithoutCommas += " ";}
else {  stringWithoutCommas += myString[i]; }
}
console.log(stringWithoutCommas);
//2. Arrays!
let favoriteAnimals = ["blowfish", "capricorn", "giraffe"];
console.log(favoriteAnimals);
console.log(favoriteAnimals.length);
//2.1 Add a statement that adds Mauro's favorite animal 'turtle' to the existing array.
favoriteAnimals.push('turtle');
console.log(favoriteAnimals);
console.log(favoriteAnimals.length);
// Now add Jim's favorite animal to the array, it's 'meerkat', but make sure it will be placed after 'blowfish' and before 'capricorn'.
favoriteAnimals.unshift('meerkat');
console.log(favoriteAnimals);
console.log(favoriteAnimals.length);
// Log the length of the array, add a message: 'The array has a length of: ' (here you should show the length of the array).
console.log('The array has a length of:' , favoriteAnimals.length);
 //Jason does not like 'giraffe', delete this animal from the array.
// we can delet it direct if we know the index of giraffe 
const indexofGiraffe =3;
 favoriteAnimals.splice(indexofGiraffe, 1); 
console.log(favoriteAnimals);
// or by using this condition if we don't know the index 
const index = favoriteAnimals.indexOf("giraffe");
if (index > -1) { 
  favoriteAnimals.splice(index, 1); 
}
console.log(favoriteAnimals);
// Delete 'meerkat' and without knowing the position or the index of the item in the array
const indexOfMeerkat = favoriteAnimals.indexOf("meerkat");
if (indexOfMeerkat > -1) { 
  favoriteAnimals.splice(indexOfMeerkat, 1); 
}
console.log('The item you are looking for is at index: ',indexOfMeerkat );
console.log(favoriteAnimals);
//More JavaScript 
// 1-Create a function that takes 3 arguments and returns the sum of the these arguments.
function sum(x,y,z){
  return x+y+z;
}
sum(5,3,2);
function colorCar(color){
  console.log("a "+ color+" car");
}
colorCar("blue");
colorCar("red");
//2-Create an object and a function that takes the object as a parameter and prints out all of its properties and values.
let person = {
  name: "John",
  age: 18
};
function printObject(person) {
  for (let key in person) {
    console.log(key + ": " + person[key]);
  }
}
// Call the function to print the object
printObject(person);
//4-Create a function named vehicleType that receives a color, and a code, 1 for car, 2 for motorbike. And prints 'a blue motorbike' for example when called as vehicleType("blue", 2)

function vehicleType(color, code){
  if (code === 1){
    console.log("a "+ color +" car");
  }
  else if (code === 2){
     console.log("a "+ color +" motorbike")
  } else {
    console.log(" you should enter 1 or 2")
  }
}
vehicleType("blue", 1);
vehicleType("red", 2);  
vehicleType("green", 3); 
//5-rewrite the condition statement 
console.log(3===3 ? "yes": "no");
//6-Create a function called vehicle, like before, but takes another parameter called age, so that vehicle("blue", 1, 5) prints 'a blue used car'
// this section will change in the step 9  
// function vehicle(color,code, age){
//   if (age >= 3){
//      if (code === 1){
//     console.log("a "+ color +" used car");
//   }
//   else if (code === 2){
//      console.log("a "+ color +" used motorbike")
//   } else {
//     console.log(" you should enter 1 or 2")
//   }
//   }else {
//     console.log(" It's new vehicle")
//   } 
// }
// vehicle("blue",1,5);
// vehicle("blue",1,2);
//7-Make a list of vehicles, you can add "motorbike", "caravan", "bike", or more.
let vehicles =["car","motorbike", "caravan", "bike"];
console.log(vehicles);
//11-What if you add one more vehicle to the list, can you have that added to the advertisement without changing the code for question 10?
vehicles.push("track");
//8- get the third element from that list
vehicles[2];
//9-Change the function vehicle to use the list of question 7. So that vehicle("green", 3, 1) prints "a green new bike".
function vehicle(color,typeOfVehicle, age){
  if (age >= 3){
    console.log("a "+ color +" used " + vehicles[typeOfVehicle]);
                }
   else {
    console.log("a "+ color +" new " + vehicles[typeOfVehicle]);
  }
}

vehicle("green", 3,1);
vehicle("red", 1,4);
//10-Use the list of vehicles to write an advertisement. So that it prints something like: "Amazing Joe's Garage, we service cars, motorbikes, caravans and bikes.".
let advertisement= "Amazing Joe's Garage, we service ";
for (let i=0; i< vehicles.length;i++){
  advertisement += vehicles[i]+"s " ;
    if (i < vehicles.length - 1) { // except the last one without comma
    advertisement += ", "; 
  }
}
console.log(advertisement);

//12-Create an empty object
let myObject = {};
//13-Create an object that contains the teachers that you have had 
let teachers = {
  teacher1: { name: "Tommy" },
  teacher2: { name: "Seif" },
  teacher3: { name: "Sahin" }
};
//14- Add a property to the object containing the languages they have taught
teachers.teacher1.languages = ["HTML", "CSS"];
teachers.teacher2.languages = ["CSS"];
teachers.teacher3.languages = [ "JavaScript"];
console.log(teachers);
// Add the teachers object to myObject
myObject.teachers = teachers;
console.log(myObject);

//15-some code to test two arrays for equality using == and ===.
let x = [1, 2, 3];
let y = [1, 2, 3];
let z = y;
// compare Arrays with strict equality 
console.log(x == y);  
console.log(x === y); 
console.log(z == y);  
console.log(z == x);  
// it does't work because JavaScript arrays have a type of Object.
console.log(typeof(x));
console.log(typeof(y));
console.log(typeof(z));
// so I create function to compare Arrays
function areArraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}
// diferent outputs 
console.log(areArraysEqual(x, y)); 
console.log(areArraysEqual(x, z));  
console.log(areArraysEqual(z, y)); 
// 16- how assignment operations and changes to the objects affect them
let o1 = { foo: "bar" };
let o2 = { foo: "bar" };
let o3 = o2;
console.log("Before changes:");
console.log(o2);  
console.log(o3);  
// Changing o2
o2.foo = "baz";
console.log("After changing o2:");
console.log("o2 =",o2);  
console.log("o3 =",o3);  
// Changing o1
o1.foo = "qux";
console.log("After changing o1:");
console.log("o1 =",o1);  
console.log("o2 =",o2);
console.log("o2 =",o3);  // (changing o1 does not affect o3) because just o2 is assign to o3
//17-does the following code return? (And why?)
let bar = 42;
typeof bar; // bar is assigned to value 42, output of typeof bar is evaluated as "number" (which is returned as a string),
typeof typeof bar; // return string, because the output of typeof("number") is evaluated as "string”.