function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  return x / y;
}

function operate(operator, x, y) {
  let result;

  switch(operator) {
    case '+':
      result = add(x, y);
      break;
    case '-':
      result = subtract(x, y);
      break;
    case 'x':
      result = multiply(x, y);
      break;
    case '/':
      result = divide(x, y);
      break;
  }

  return result;
}

const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const output = document.querySelector('#output-primary').querySelector('input');
const equal = document.querySelector('#equal');
const del = document.querySelector('#del');
let result;

function displayDigit(e) {
  // forbid more than one floating point
  if (e.target.textContent === '.' && output.value.includes('.')) return;
  // can't insert operators if there is no number
  if (!output.value && e.target.textContent.match(/[/x]/)) return;


  
  if (e.target.textContent === 'DEL') {
    output.value = output.value.slice(0, -1);
  } else if (e.target.textContent !== '=') {
    output.value += e.target.textContent;
  }
}

function computeResult(e) {
  // handle division by 0
  if (output.value.match(/\/0/)) {
    result = "Can't divide by 0";
    output.value = result;
    return;
  }
  
  // handle cases where = is pressed before entering all of the numbers
  if (output.value.match(/[+-/x]$/)) return;

  // multiplication and division before
  while (output.value.match(/[x/]/g)) {
    output.value = output.value.replace(/^[+-]\d*\.?\d+[/x]\d*\.?\d+|\d*\.?\d+[/x]\d*\.?\d+/, operation => {
      const operator = operation.match(/[/x]/g).toString();
      const x = operation.match(/^[+-]\d*\.?\d+(?=[/x])|\d*\.?\d+(?=[/x])/g).toString();
      const y = operation.match(/(?<=[/x])\d*\.?\d+/g).toString();
      result = operate(operator, x, y);
      return result;
    });
  }
  // addition and subtration
  const operands = output.value.match(/^[+-]\d*\.?\d+|\d*\.?\d+/g);
  const operators = output.value.match(/(?<!^)[+-]/g);
  output.value = operands.reduce((acc, cur, idx) => {
    result = operate(operators[idx - 1], +acc, +cur);
    return result;
  });
}

function clearResult() {
  if (result) output.value = '';
  result = '';
}

numbers.forEach(number => number.addEventListener('click', displayDigit));
operators.forEach(operator => operator.addEventListener('click', displayDigit));
equal.addEventListener('click', computeResult);
del.addEventListener('click', clearResult);
