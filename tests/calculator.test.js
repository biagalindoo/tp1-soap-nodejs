const test = require('node:test');
const assert = require('node:assert/strict');
const { add, subtract, multiply, divide } = require('../src/calculator');

test('add soma inteiros, negativos, zero e decimais', () => {
  assert.equal(add(2, 3), 5);
  assert.equal(add(-4, 2), -2);
  assert.equal(add(0, 0), 0);
  assert.equal(add(1.5, 2.25), 3.75);
});

test('subtract respeita a ordem dos argumentos', () => {
  assert.equal(subtract(8, 3), 5);
  assert.equal(subtract(3, 8), -5);
  assert.equal(subtract(-4, -2), -2);
  assert.equal(subtract(0, 0), 0);
  assert.equal(subtract(2.5, 0.25), 2.25);
});

test('multiply calcula produtos, incluindo negativos e zero', () => {
  assert.equal(multiply(4, 3), 12);
  assert.equal(multiply(-4, 3), -12);
  assert.equal(multiply(-4, -3), 12);
  assert.equal(multiply(0, 5), 0);
  assert.equal(multiply(1.5, 2), 3);
});

test('divide calcula quocientes, incluindo resultados decimais', () => {
  assert.equal(divide(8, 2), 4);
  assert.equal(divide(3, 2), 1.5);
  assert.equal(divide(-9, 3), -3);
  assert.equal(divide(-9, -3), 3);
  assert.equal(divide(0, 5), 0);
});

test('todas as operações rejeitam argumentos inválidos em ambas as posições', () => {
  const invalidValues = ['2', '', 'abc', null, undefined, true, false, {}, [], NaN, Infinity, -Infinity];

  for (const operation of [add, subtract, multiply, divide]) {
    for (const value of invalidValues) {
      assert.throws(() => operation(value, 2), {
        name: 'TypeError',
        message: 'Os argumentos a e b devem ser números finitos.',
      });
      assert.throws(() => operation(2, value), TypeError);
    }

    assert.throws(() => operation(), TypeError);
    assert.throws(() => operation(2), TypeError);
  }
});

test('divide rejeita zero, zero negativo e zero dividido por zero', () => {
  for (const [a, b] of [[5, 0], [5, -0], [0, 0]]) {
    assert.throws(() => divide(a, b), {
      name: 'RangeError',
      message: 'Não é possível dividir por zero.',
    });
  }
});

test('as operações rejeitam resultados que excedem o intervalo numérico', () => {
  const max = Number.MAX_VALUE;
  assert.throws(() => add(max, max), RangeError);
  assert.throws(() => subtract(-max, max), RangeError);
  assert.throws(() => multiply(max, 2), RangeError);
  assert.throws(() => divide(max, 0.5), RangeError);
});
