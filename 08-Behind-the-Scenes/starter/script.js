'use strict';
// function calAge(birthYear) {
//     const age = 2037 - birthYear;
//     console.log(firstName)
//
//     function printAge() {
//         console.log(`${firstName} You are ${age} years old!`);
//     }
//
//     if (birthYear < 2037) {
//         console.log(`${firstName} You are ${age} years old! by deduction`);
//     }
//
//     printAge();
//     return age;
//
// }
//
// const firstName = 'John';
// calAge(1991)

// console.log(this);
//
// const calcAge = function (birthYear){
//     console.log(birthYear);
//     console.log(this);
// }
//
// calcAge(1010);
//
//
// const calcAge2 = (birthYear) =>{
//     console.log(birthYear);
//     console.log(this);
// }
//
// calcAge2(1010);
//
// const jonas = {
//     year : 1991,
//     calcAge : function(){
//         console.log(this);
//         console.log(2037-this.year);
//         const millenial = ()=>{
//             console.log(this.year);
//         }
//         millenial();
//     }
// }
//
// jonas.calcAge();

const weiping = {
    firstName : "WEI PING",
    lastName : "TONG",
    age: 27,
}

const rhysGoh = {
    firstName : "RHYS",
    lastName : "GOH",
    age: 26
}

const oldWeiping = weiping;
oldWeiping.firstName = "WEI PING DAMTE";
console.log(oldWeiping.firstName + " " + oldWeiping.lastName);

const newWeiPing = structuredClone(oldWeiping);
newWeiPing.firstName = "WEI PING NOAH";
console.log(newWeiPing);
console.log(oldWeiping)