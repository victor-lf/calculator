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

function displayDigit(e) {
  if (e.target.textContent === 'DEL') {
    output.value = output.value.slice(0, -1);
  } else if (e.target.textContent !== '=') {
    output.value += e.target.textContent;
  }
}

function computeResult() {
  if (output.value.match(/[+-/x]$/)) return undefined;
  // multiplication and division before
  while (output.value.match(/[x/]/g)) {
    output.value = output.value.replace(/^[+-]\d*\.?\d+[/x]\d*\.?\d+|\d*\.?\d+[/x]\d*\.?\d+/, operation => {
      const operator = operation.match(/[/x]/g).toString();
      const x = operation.match(/^[+-]\d*\.?\d+(?=[/x])|\d*\.?\d+(?=[/x])/g).toString();
      const y = operation.match(/(?<=[/x])\d*\.?\d+/g).toString();
      return operate(operator, x, y);
    });
  }
  // addition and subtration
  const operands = output.value.match(/^[+-]\d*\.?\d+|\d*\.?\d+/g);
  const operators = output.value.match(/(?<!^)[+-]/g);
  output.value = operands.reduce((acc, cur, idx) => {
    return operate(operators[idx - 1], +acc, +cur);
  });
}

numbers.forEach(number => number.addEventListener('click', displayDigit));
operators.forEach(operator => operator.addEventListener('click', displayDigit));
equal.addEventListener('click', computeResult);
