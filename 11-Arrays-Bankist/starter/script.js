'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 2500, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions
let currentAccount;

function displayMovements(account) {
  containerMovements.innerHTML = "";
  account.movements.forEach((mov, i) => {
    console.log(`${mov} ${i}`)
    const type =  mov > 0 ? 'deposit' : 'withdrawal';
    const htmlTemplate = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
<!--    <div className="movements__date">3 days ago</div>-->
    <div class="movements__value">${mov}</div>
  </div>`
    containerMovements.insertAdjacentHTML("afterbegin", htmlTemplate);
  })
  console.log(containerMovements);
}

// displayMovements(account1.movements);

const name = "tong wei ping"
const nameFirst =  name.split(" ").map(n=>n.at(0).toUpperCase()).join("");
console.log(nameFirst);

// function generateUserName(name){
//   name.split(" ").map(n=>n.at(0).toUpperCase()).join("");
// }

function generateUserName(accounts){
  accounts.forEach(acc => {acc.userName =  acc.owner.split(" ").map(n=>n.at(0).toUpperCase()).join("")})
}
/////////////////////////////////////////////////
/////////////////////////////////////////////////

generateUserName(accounts)

const final_value = account1.movements.reduce((acc,value,idx)=>{
  return acc + value
},0)
console.log(final_value)

function generateFinalMov(account){
  account.balance = account.movements.reduce((acc, value, idx) => {
    return Math.ceil(acc + value)
  }, 0)
  labelBalance.innerText = account.balance +" " + account.currency;
}

function generateSummary(account){
  labelSumIn.innerText = account.movements.filter(m=>m>0).reduce((acc, value, idx) => {return acc+value})
  labelSumOut.innerText = account.movements.filter(m=>m<0).reduce((acc, value, idx) => {return acc+value})
  labelSumInterest.innerText = account.movements.filter(m=>m>0).reduce((acc, value, idx) => {
    return acc + value*account.interestRate/100
  })
}
const updateAccount = function(acc){
  displayMovements(acc);
  generateSummary(acc)
  generateFinalMov(acc)
}

function userLogin(event){
  event.preventDefault();
  const username = inputLoginUsername.value;
  const password = Number(inputLoginPin.value);
  if (username && password){
    currentAccount = accounts.find((account) => {return account.userName===username});

    if (currentAccount?.pin === password){
      console.log("login successful");
      displayMovements(currentAccount);
      generateSummary(currentAccount)
      generateFinalMov(currentAccount)
      labelWelcome.innerText = `Welcome back,${currentAccount.owner.split(" ")[0]}`
    }
  }
  containerApp.style.opacity = 1;
}

btnLogin.addEventListener('click', userLogin);

function transfer(event){
  event.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find((r)=>r.userName===inputTransferTo.value);
  if (amount>0 && currentAccount.balance > amount && receiverAcc.userName !== currentAccount.userName) {
    console.log(currentAccount);
    console.log(receiverAcc);
    currentAccount.balance -= amount;
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    console.log(currentAccount);
    console.log(receiverAcc);
    updateAccount(currentAccount);
  }
}

btnTransfer.addEventListener('click', transfer);

btnClose.addEventListener('click', function(e){
  e.preventDefault();
  const userName = inputCloseUsername.value
  const pin = inputClosePin.value;

  if (userName && pin && userName === currentAccount.userName && Number(pin)=== currentAccount.pin){
    console.log("deleting account")
    const index = accounts.findIndex(account => userName === currentAccount.userName);
    accounts.splice(index,1);
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = ""
});