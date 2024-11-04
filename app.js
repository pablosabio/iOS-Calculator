// SELECT DOM ELEMENTS TO INTERACT WITH THEM

const hourEl = document.querySelector('.hour');
const minuteEl = document.querySelector('.minute');
const valueEl = document.querySelector('.value');

// CALCULATOR BUTTONS

const acEl = document.querySelector('.ac');
const pmEl = document.querySelector('.pm');
const percentEl = document.querySelector('.percent');

const additionEl = document.querySelector('.addition');
const subtractionEl = document.querySelector('.subtraction');
const multiplicationEl = document.querySelector('.multiplication');
const divisionEl = document.querySelector('.division');
const equalEl = document.querySelector('.equal');

const decimalEl = document.querySelector('.decimal');
const number0El = document.querySelector('.number-0');
const number1El = document.querySelector('.number-1');
const number2El = document.querySelector('.number-2');
const number3El = document.querySelector('.number-3');
const number4El = document.querySelector('.number-4');
const number5El = document.querySelector('.number-5');
const number6El = document.querySelector('.number-6');
const number7El = document.querySelector('.number-7');
const number8El = document.querySelector('.number-8');
const number9El = document.querySelector('.number-9');

// ARRAY OF NUMBER ELEMENTS
const numberElArray = [
  number0El, number1El, number2El, number3El, number4El,
  number5El, number6El, number7El, number8El, number9El
];

// VARIABLES TO STORE DATA 
let valueStrInMemory = null;
let operatorInMemory = null;

// FUNCTIONS

// GETS VALUE AS STRING
const getValueAsStr = () => valueEl.textContent.split(',').join('');

// MAKE VALUE A NUMBER
const getValueAsNum = () => {
  return parseFloat(getValueAsStr());
};

// SET VALUE AS STRING
const setStrAsValue = (valueStr) => {
    const [wholeNumStr, decimalStr] = valueStr.split('.'); //DIVIDE PART DECIMAL AND WHOLE NUMBER
    if (decimalStr !== undefined) { //IF DECIMAL EXISTS
        valueEl.textContent = parseInt(wholeNumStr).toLocaleString() + '.' + decimalStr;
    } else { // WITHOUT DECIMAL
        valueEl.textContent = parseInt(wholeNumStr).toLocaleString();
    }
};

// HANDLE NUMBER CLICK 
const handleNumberClick = (numStr) => {
  const currentValueStr = getValueAsStr();
  if (currentValueStr === '0') {
    setStrAsValue(numStr); 
  } else {
    setStrAsValue(currentValueStr + numStr);
  }
};

// PERFORMS THE SELECTED OPERATION AND RETURNS RESULT AS STRING
const getResultOfOperationAsStr = () => {
  const currentValueNum = getValueAsNum();
  const valueNumInMemory = parseFloat(valueStrInMemory);
  let newValueNum;
  if (operatorInMemory === 'addition') {
    newValueNum = valueNumInMemory + currentValueNum;
  } else if (operatorInMemory === 'subtraction') {
    newValueNum = valueNumInMemory - currentValueNum;
  } else if (operatorInMemory === 'multiplication') {
    newValueNum = valueNumInMemory * currentValueNum;
  } else if (operatorInMemory === 'division') {
    newValueNum = valueNumInMemory / currentValueNum;
  }

  return newValueNum.toString();
};

// HANDLE OPERATOR CLICK 
const handleOperatorClick = (operation) => {
  const currentValueStr = getValueAsStr();
// IF NO VALUE IN MEMORY 
  if (!valueStrInMemory) {
    valueStrInMemory = currentValueStr;
    operatorInMemory = operation;
    setStrAsValue('0');  // SET VALUE TO 0 AFTER OPERATOR CLICK
    return;
  }
  valueStrInMemory = getResultOfOperationAsStr();
  operatorInMemory = operation;
  setStrAsValue('0');
};


// ADD EVENT LISTENERS TO FUNCTION 
acEl.addEventListener('click', () => {
  setStrAsValue('0');
  valueStrInMemory = null; // RESET MEMORY
  operatorInMemory = null; // RESET OPERATOR
});
pmEl.addEventListener('click', () => {
  const currentValueNum = getValueAsNum();
  const currentValueStr = getValueAsStr();

  // +/- CURRENT VALUE
  if (currentValueStr === '-0') {
    setStrAsValue('0');
    return;
  }
  if (currentValueNum >= 0) {
    setStrAsValue('-' + currentValueStr);
  } else {
    setStrAsValue(currentValueStr.substring(1)); // REMOVES - SIGN
  }
});
percentEl.addEventListener('click', () => {
  const currentValueNum = getValueAsNum();
  const newValueNum = currentValueNum / 100; // DIVIDES BY 100 FOR %
  setStrAsValue(newValueNum.toString());
  valueStrInMemory = null;
  operatorInMemory = null;
});

// ADD EVENT LISTENERS TO OPERATORS
additionEl.addEventListener('click', () => {
  handleOperatorClick('addition');
});
subtractionEl.addEventListener('click', () => {
  handleOperatorClick('subtraction');
});
multiplicationEl.addEventListener('click', () => {
  handleOperatorClick('multiplication');
});
divisionEl.addEventListener('click', () => {
  handleOperatorClick('division');
});
equalEl.addEventListener('click', () => {
  if (valueStrInMemory) {
    setStrAsValue(getResultOfOperationAsStr());
    valueStrInMemory = null; // RESET MEMORY AFTER EQUAL CLICK
    operatorInMemory = null; // RESET OPERATOR AFTER CALCULATION
  }
});

// ADD EVENT LISTENERS TO NUMBERS AND DECIMAL
for (let i=0; i < numberElArray.length; i++) {
  const numberEl = numberElArray[i];
  numberEl.addEventListener('click', () => {
    handleNumberClick(i.toString());
  });
}
decimalEl.addEventListener('click', () => {
  const currentValueStr = getValueAsStr();
  if (!currentValueStr.includes('.')) {  // PREVENTS MULTIPLE DECIMALS
    setStrAsValue(currentValueStr + '.');
  }
});

// UPDATE TIME FUNCTION FOR CLOCK DISPLAY
const updateTime = () => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    // MAKE SURE HOUR AND MINUTE ARE ALWAYS 2 DIGITS
    hourEl.textContent = currentHour.toString().padStart(2, '0');
    minuteEl.textContent = currentMinute.toString().padStart(2, '0');
};

// CALLS UPDATE TIME EVERY SECOND
setInterval(updateTime, 1000);
updateTime(); // CALLS FUNCTION ONCE TO DISPLAY TIME IMMEDIATELY
