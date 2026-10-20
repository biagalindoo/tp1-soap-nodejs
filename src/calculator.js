function validateOperands(a, b) {
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    throw new TypeError('Os argumentos a e b devem ser números finitos.');
  }
}

function validateResult(result) {
  if (!Number.isFinite(result)) {
    throw new RangeError('O resultado excede o intervalo numérico suportado.');
  }

  return result;
}

function add(a, b) {
  validateOperands(a, b);
  return validateResult(a + b);
}

function subtract(a, b) {
  validateOperands(a, b);
  return validateResult(a - b);
}

function multiply(a, b) {
  validateOperands(a, b);
  return validateResult(a * b);
}

function divide(a, b) {
  validateOperands(a, b);

  if (b === 0) {
    throw new RangeError('Não é possível dividir por zero.');
  }

  return validateResult(a / b);
}

module.exports = { add, subtract, multiply, divide };
