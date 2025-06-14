'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
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
    '2025-05-02T10:51:36.790Z',
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

const startLogOutTimer = function () {
  // Clear any existing timer
  if (timer) clearInterval(timer);

  let time = 120;

  const tick = () => {
    const min = String(Math.trunc(time / 60)).padStart(2, '0');
    const sec = String(time % 60).padStart(2, '0');
    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }

    time--;
  };

  tick(); // Call immediately
  timer = setInterval(tick, 1000);
  return timer;
};


const formatMov = function(locale,currency,value){
  return new Intl.NumberFormat(locale,{style:"currency",currency:currency}).format(value);
}

const formatMovementDate = function (acc,date) {
  const calcDayPassed = (date1,date2) => {
    return Math.round(Math.abs(date2-date1)/(1000*60*60*24));
  }
  const dayPassed = calcDayPassed(date,new Date());
  if (dayPassed === 0){
    return 'Today';
  }
  if (dayPassed === 1){
    return 'Yesterday';
  }

  if (dayPassed <= 7){
    return `${dayPassed} days ago`;
  }

  else{
    return Intl.DateTimeFormat(acc.locale).format(date);
    // const day = `${date.getDay()}`.padStart(2, '0');
    // const month = `${date.getMonth()+1}`.padStart(2, '0');
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`;
  }
}


const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';
  const combinedMovsDates = acc.movements.map((movement,index) => {
    return {
      date: acc.movementsDates[index],
      movement: movement
    }
  })
  const movs = sort ? combinedMovsDates.sort((a, b) => a.movement - b.movement) :combinedMovsDates;

  movs.forEach(function (movsDate, i) {
    const mov = movsDate.movement;
    const formatedMov = formatMov(acc.locale,acc.currency,mov);
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const now = new Date(movsDate.date);
    // const day = `${now.getDay()}`.padStart(2, '0');
    // const month = `${now.getMonth()+1}`.padStart(2, '0');
    // const year = now.getFullYear();
    // const movDate = `${day}/${month}/${year}`;
    const movDate = formatMovementDate(acc,now);
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
        i + 1
    } ${type}</div>
                  <div class="movements__date">${movDate}</div>
        <div class="movements__value">${formatedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = `${formatMov(acc.locale,acc.currency,acc.balance)}`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
      .filter(mov => mov > 0)
      .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${formatMov(acc.locale,acc.currency,incomes)}`;

  const out = acc.movements
      .filter(mov => mov < 0)
      .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${formatMov(acc.locale,acc.currency,out)}`;

  const interest = acc.movements
      .filter(mov => mov > 0)
      .map(deposit => (deposit * acc.interestRate) / 100)
      .filter((int, i, arr) => {
        // console.log(arr);
        return int >= 1;
      })
      .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${formatMov(acc.locale,acc.currency,interest)}`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
        .toLowerCase()
        .split(' ')
        .map(name => name[0])
        .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount,timer;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
      acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
        currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    if (timer){
      clearInterval(timer);
    }
    timer = startLogOutTimer()

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    const now = new Date();
    const options ={
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    }
    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale,options).format(now);

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +(inputTransferAmount.value);
  const receiverAcc = accounts.find(
      acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
      amount > 0 &&
      receiverAcc &&
      currentAccount.balance >= amount &&
      receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    currentAccount.movementsDates.push(new Date().toISOString())
    receiverAcc.movementsDates.push(new Date().toISOString());
    // Update UI
    clearInterval(timer);
    timer = startLogOutTimer();
    updateUI(currentAccount);
  }

});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(+(inputLoanAmount.value));

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    setTimeout(()=>{    currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());
      // Update UI
      console.log(timer)
      clearInterval(timer);
      timer = startLogOutTimer();
      updateUI(currentAccount);},3000)



  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
      inputCloseUsername.value === currentAccount.username &&
      +(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
        acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const now = new Date();
// const day = `${now.getDay()}`.padStart(2, '0');
// const month = `${now.getMonth()+1}`.padStart(2, '0');
// const year = now.getFullYear();
// const hour = `${now.getHours()}`.padStart(2, '0');
// const min = `${now.getMinutes()}`.padStart(2, '0');
// labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;


