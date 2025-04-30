'use strict';

const booking = []

const createBooking = (flightNum,passenger=1,price=1) => {
    const passengerBooking = {
        flightNum,
        passenger,
        price
    }
    console.log(passengerBooking);
    booking.push(passengerBooking);
}

createBooking("JP123");
console.log(booking);

const newPassport = function(person){
    person.passport = Math.floor(person.passport)*1.5;
}

//first class functions
// first class citizens
// function are simply values
// functions are another type of objects
// store functions in variables or properties
// pass functions as arguments to other functions
// return functions from function
// call methods on functions

//higher order functions
// receives another function as an argument that retuns a new function or both
// this is only possible because of the first class functions

const greet = () =>{
    console.log("Greeting...");
    alert("Greeting...");
}

const btnBuyNewPlane = document.querySelector(".buy");
btnBuyNewPlane.addEventListener("click", greet)
//greet here is call callback function which mean call me later kind


//high level functions example

const oneWord = (str) => {
    return str.replace(/ /g,"").toLowerCase();
}

const upperFirstWord = (str) => {
    const [first,...others] = str.split(" ");
    return [first.toUpperCase(),...others].join(" ");
}

const transformer = (str,fn) =>{
    console.log(fn(str))
}

transformer("ali love front end coding",upperFirstWord)
transformer("ali love front end coding",oneWord)