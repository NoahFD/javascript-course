'use strict';

// const booking = []
//
// const createBooking = (flightNum,passenger=1,price=1) => {
//     const passengerBooking = {
//         flightNum,
//         passenger,
//         price
//     }
//     console.log(passengerBooking);
//     booking.push(passengerBooking);
// }
//
// createBooking("JP123");
// console.log(booking);
//
// const newPassport = function(person){
//     person.passport = Math.floor(person.passport)*1.5;
// }
//
// //first class functions
// // first class citizens
// // function are simply values
// // functions are another type of objects
// // store functions in variables or properties
// // pass functions as arguments to other functions
// // return functions from function
// // call methods on functions
//
// //higher order functions
// // receives another function as an argument that retuns a new function or both
// // this is only possible because of the first class functions
//
// const greet = () =>{
//     console.log("Greeting...");
//     alert("Greeting...");
// }
//
// const btnBuyNewPlane = document.querySelector(".buy");
// btnBuyNewPlane.addEventListener("click", greet)
// //greet here is call callback function which mean call me later kind
//
//
// //high level functions example
//
// const oneWord = (str) => {
//     return str.replace(/ /g,"").toLowerCase();
// }
//
// const upperFirstWord = (str) => {
//     const [first,...others] = str.split(" ");
//     return [first.toUpperCase(),...others].join(" ");
// }
//
// const transformer = (str,fn) =>{
//     console.log(fn(str))
// }
//
// transformer("ali love front end coding",upperFirstWord)
// transformer("ali love front end coding",oneWord)
//
// const greet2 = (greeting) =>{
//     return (name)=>{
//         console.log(`Greeting...${greeting} ${name}`);
//     }
// }
//
// const heyGreeter = greet2('hey');
// heyGreeter("Tong")


const lufthansa = {
    airline : "Lufthansa",
    iataCode: "LM",
    bookings: [],
    book(flightNum,name){
        console.log(flightNum);
        console.log(this.airline);
        console.log(name)
        this.bookings.push({flightNum,name,airline:this.airline});
    }
}

lufthansa.book("12345","TongWP")
console.log(lufthansa)
const eurowings = {
    airline: "EuroWings",
    iataCode : "EW",
    bookings: []
}

const book = lufthansa.book;


// does not work
// book(23,'Sarah Williams');

book.call(eurowings,23,'TongWP')
console.log(eurowings)


const bookEW = book.bind(eurowings)
bookEW("25","Rhys")
console.log(eurowings)

const bookEW23 = book.bind(eurowings,23)
bookEW23("Rhys2")
console.log(eurowings)

lufthansa.planes = 300;
//this got issue because it is error function
// error function this is directly outside of error function
// so in this case it is pointed to the window
// lufthansa.buyPlane = () => {
//     console.log(this);
//     this.planes ++;
//     console.log(this.planes);
// }

// lufthansa.buyPlane = function(){
//   console.log(this);
//   this.planes ++;
//   console.log(this.planes);
// };
//
//
//
// document.querySelector(".buy").addEventListener("click", lufthansa.buyPlane.bind(lufthansa));
// // btnBuyNewPlane.addEventListener("click", )
// // //greet here is call callback function which mean call me later kind
//
//
// const addTax = (rate,value) => value + value * rate;
// const addVat = (value)=> {
//     return addTax(0.23,value)
// }
//
// console.log(addVat(2));


///////////////////////////////////////
// Coding Challenge #1

/*
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)

  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1".
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

/*
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),

 */

const poll = {
    question: 'What is your favourite programming language?',
    options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
    // This generates [0, 0, 0, 0]. More in the next section 😃
    answers: new Array(4).fill(0),
    registerNewAnswer() {
        const userInput = prompt(
            `        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)`
        )
        this.answers[userInput] += 1;
        console.log(this.answers)
        displayResults(userInput);
    }}

document.querySelector(".poll").addEventListener('click', poll.registerNewAnswer.bind(poll))


function displayResults (type){
    Array.isArray(type) ? console.log(type) : console.log("Poll Results are "+(type.join(",")))
}

displayResults( [1, 5, 3, 9, 6, 1])

const headerColorChange = (function () {
    const header = document.querySelector('h1');
    header.style.color = 'red';
    setTimeout(function () {
        header.style.color = 'blue';
    },3000);
}
)

headerColorChange()
