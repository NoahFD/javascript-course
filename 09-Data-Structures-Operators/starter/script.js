// // // 'use strict';
// // //
// // // // // Data needed for a later exercise
// // // // const flights =
// // // //   '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';
// // // //
// // // // const italianFoods = new Set([
// // // //   'pasta',
// // // //   'gnocchi',
// // // //   'tomatoes',
// // // //   'olive oil',
// // // //   'garlic',
// // // //   'basil',
// // // // ]);
// // // //
// // // // const mexicanFoods = new Set([
// // // //   'tortillas',
// // // //   'beans',
// // // //   'rice',
// // // //   'tomatoes',
// // // //   'avocado',
// // // //   'garlic',
// // // // ]);
// // // //
// // // // // Data needed for first part of the section
// // // // const restaurant = {
// // // //   name: 'Classico Italiano',
// // // //   location: 'Via Angelo Tavanti 23, Firenze, Italy',
// // // //   categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
// // // //   starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
// // // //   mainMenu: ['Pizza', 'Pasta', 'Risotto'],
// // // //
// // // //   openingHours: {
// // // //     thu: {
// // // //       open: 12,
// // // //       close: 22,
// // // //     },
// // // //     fri: {
// // // //       open: 11,
// // // //       close: 23,
// // // //     },
// // // //     sat: {
// // // //       open: 0, // Open 24 hours
// // // //       close: 24,
// // // //     },
// // // //   },
// // // // };
// // // //
// // // // const a = [2,3,4]
// // // // const a1 = a[0]
// // // // const a2 = a[1]
// // // // const a3 = a[2]
// // // //
// // // // console.log(a1,a2,a3)
// // // // const [x,y,z] = a;
// // // // console.log(x,y,z)
// // // //
// // // //
// // // // const object = {a:1 , b:2 , c:3 , d:4}
// // // // const newObject = {...object,e:5,f:6}
// // // // newObject["a"] = 2
// // // // console.log(newObject)
// // // // console.log(object)
// // // //
// // // //
// // // // const restaurantNew = {
// // // //   name : "ikan totak",
// // // //   location: "Via Angelo Tavanti",
// // // // }
// // // //
// // // // restaurantNew.workersCount ||=10;
// // // // restaurantNew.chefCount ??=10;
// // // // console.log(restaurantNew)
// // //
// // //
// // // // We're building a football betting app (soccer for my American friends 😅)!
// // // //
// // // // Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:
// // // //
// // // // 1. Create one player array for each team (variables 'players1' and 'players2')
// // // // 2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
// // // // 3. Create an array 'allPlayers' containing all players of both teams (22 players)
// // // // 4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
// // // // 5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
// // // // 6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
// // // // 7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.
// // // //
// // // //   TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored
// // //
// // // // const game = {
// // // //   team1: 'Bayern Munich',
// // // //   team2: 'Borrussia Dortmund',
// // // //   players: [
// // // //     [
// // // //       'Neuer',
// // // //       'Pavard',
// // // //       'Martinez',
// // // //       'Alaba',
// // // //       'Davies',
// // // //       'Kimmich',
// // // //       'Goretzka',
// // // //       'Coman',
// // // //       'Muller',
// // // //       'Gnarby',
// // // //       'Lewandowski',
// // // //     ],
// // // //     [
// // // //       'Burki',
// // // //       'Schulz',
// // // //       'Hummels',
// // // //       'Akanji',
// // // //       'Hakimi',
// // // //       'Weigl',
// // // //       'Witsel',
// // // //       'Hazard',
// // // //       'Brandt',
// // // //       'Sancho',
// // // //       'Gotze',
// // // //     ],
// // // //   ],
// // // //   score: '4:0',
// // // //   scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
// // // //   date: 'Nov 9th, 2037',
// // // //   odds: {
// // // //     team1: 1.33,
// // // //     x: 3.25,
// // // //     team2: 6.5,
// // // //   },
// // // // };
// // // //
// // // //
// // // // const player1 = {gk:game.players[0][0],players:game.players[0].slice(1)};
// // // // const player2 = {gk:game.players[1][0],players:game.players[1].slice(1)};
// // // // const allPlayers = {...game.players[1],...game.players[0]}
// // // // const player1Final = {gk:"a1",players:[...player1.players,'Thiago', 'Coutinho' ,'Perisic']}
// // // // const {team1,draw,team2} =game.odds
// // // // function printGoals(...players) {
// // // //   console.log(players);
// // // //   players.forEach(player => {
// // // //     const goal = game.scored.filter((e)=>e===player).length
// // // //     console.log(player + ' with goals '+goal);
// // // //   })
// // // // }
// // // // const winningTeam =  (team1>team2)?"team1" : "team2"
// // // // console.log(winningTeam)
// // // //
// // // // printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
// // //
// // //
// // //
// // // /*
// // // Let's continue with our football betting app!
// // //
// // // 1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
// // // 2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
// // // 3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
// // //       Odd of victory Bayern Munich: 1.33
// // //       Odd of draw: 3.25
// // //       Odd of victory Borrussia Dortmund: 6.5
// // // Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉
// // //
// // // BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
// // //       {
// // //         Gnarby: 1,
// // //         Hummels: 1,
// // //         Lewandowski: 2
// // //       }
// // //
// // // GOOD LUCK 😀
// // // */
// // // const game = {
// // //   team1: 'Bayern Munich',
// // //   team2: 'Borrussia Dortmund',
// // //   players: [
// // //     [
// // //       'Neuer',
// // //       'Pavard',
// // //       'Martinez',
// // //       'Alaba',
// // //       'Davies',
// // //       'Kimmich',
// // //       'Goretzka',
// // //       'Coman',
// // //       'Muller',
// // //       'Gnarby',
// // //       'Lewandowski',
// // //     ],
// // //     [
// // //       'Burki',
// // //       'Schulz',
// // //       'Hummels',
// // //       'Akanji',
// // //       'Hakimi',
// // //       'Weigl',
// // //       'Witsel',
// // //       'Hazard',
// // //       'Brandt',
// // //       'Sancho',
// // //       'Gotze',
// // //     ],
// // //   ],
// // //   score: '4:0',
// // //   scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
// // //   date: 'Nov 9th, 2037',
// // //   odds: {
// // //     team1: 1.33,
// // //     x: 3.25,
// // //     team2: 6.5,
// // //   },
// // // };
// // //
// // // for (const [idx,g] of game.scored.entries()) {
// // //   console.log(`goal ${idx+1} is by ${g}` )
// // // }
// // //
// // // const odds = Object.values(game.odds)
// // // console.log(odds)
// // // console.log(odds.length)
// // // let sum = 0;
// // // for (const g of odds) {
// // //   console.log(g)
// // //   sum += g;
// // // }
// // //
// // // const avg = sum/(odds.length);
// // // console.log(avg)
// // //
// // //
// // // console.log(game.odds)
// // // for (const g in game.odds) {
// // //   console.log(`odds ${game[g] ?? "draw"} is ${game.odds[g]}` )
// // // }
// // //
// // // const scorers = {}
// // // for (const g of game.scored) {
// // //   // if (scorers[g] === undefined){
// // //   // scorers[g]=0
// // //   // } else {
// // //   //   scorers[g] += 1;
// // //   // }
// // //   scorers[g] = (scorers[g] ?? 0) +1;
// // //   console.log(`scorers ${g}`);
// // // }
// // //
// // // console.log(scorers);
// //
// //
// // //////////////////////////////////////
// // // Coding Challenge #3
// //
// // /*
// // Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).
// //
// // 1. Create an array 'events' of the different game events that happened (no duplicates)
// // 2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
// // 3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
// // 4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
// //       [FIRST HALF] 17: ⚽️ GOAL
// //
// // GOOD LUCK 😀
// // */
// //
// // const gameEvents = new Map([
// //   [17, '⚽️ GOAL'],
// //   [36, '🔁 Substitution'],
// //   [47, '⚽️ GOAL'],
// //   [61, '🔁 Substitution'],
// //   [64, '🔶 Yellow card'],
// //   [69, '🔴 Red card'],
// //   [70, '🔁 Substitution'],
// //   [72, '🔁 Substitution'],
// //   [76, '⚽️ GOAL'],
// //   [80, '⚽️ GOAL'],
// //   [92, '🔶 Yellow card'],
// // ]);
// //
// //
// // const events = [...gameEvents.values()];
// //
// // gameEvents.delete(64)
// //
// // for(const [key,value] of gameEvents){
// //   const half = key >45 ? "second half" : "first half";
// //   console.log(`${half} at ${value}`);
// // }
// //
// //
//
//
// ///////////////////////////////////////
// // Coding Challenge #4
//
// /*
// Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.
//
// The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.
//
// THIS TEST DATA (pasted to textarea)
// underscore_case
// first_name
// Some_Variable
// calculate_AGE
// delayed_departure
//
// SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
// underscoreCase      ✅
// firstName           ✅✅
// someVariable        ✅✅✅
// calculateAge        ✅✅✅✅
// delayedDeparture    ✅✅✅✅✅
//
// HINT 1: Remember which character defines a new line in the textarea 😉
// HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
// HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
// HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!
//
// Afterwards, test with your own test data!
//
//     GOOD LUCK 😀
// */
//
// function camelCase(args) {
//   const inputArr = args.split('\n');
//   const outputArr = inputArr.map(e=>{const d  = e.toLowerCase().split("_")
//     console.log(d[0] + d[1].at(0).toUpperCase() + d[1].slice(1))
//     return d[0] + d[1].at(0).toUpperCase() + d[1].slice(1);
//   });
//
//   outputArr.forEach((v,idx)=>{
//     console.log(`${v} ${"✅".repeat(idx+1)}`)
//   })
//   console.log(outputArr);
// }
//
// const multiline = `underscore_case
// first_name
// Some_Variable
// calculate_AGE
// delayed_departure`
// camelCase(multiline);
//
//
// ///////////////////////////////////////
// // String Methods Practice
//
// const flights =
//     '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';
//
// // 🔴 Delayed Departure from FAO to TXL (11h25)
// //              Arrival from BRU to FAO (11h45)
// //   🔴 Delayed Arrival from HEL to FAO (12h05)
// //            Departure from FAO to LIS (12h30)


///////////////////////////////////////
// String Methods Practice

const flights =
    '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

const flightsArray = flights.split('+');
console.log(flightsArray);
flightsArray.map((flight) => {
  const [delay,flightFrom,flightTo,Time] = flight.split(";");
  console.log(delay);
  flight = delay
  return flight;
});
console.log(flightsArray);
