const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const soap = require('soap');
const { createServer } = require('../src/server');

let server;
let baseUrl;

before(async () => {
  server = await createServer();
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  if (server?.listening) {
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
});

async function request(operation, fields) {
  const response = await fetch(`${baseUrl}/calculator`, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      SOAPAction: `"urn:ualg:calculator/${operation}"`,
    },
    body: `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body><${operation} xmlns="urn:ualg:calculator">${fields}</${operation}></soap:Body>
    </soap:Envelope>`,
  });
  return { status: response.status, body: await response.text() };
}

test('o servidor disponibiliza o WSDL por HTTP', async () => {
  const response = await fetch(`${baseUrl}/calculator?wsdl`);
  assert.equal(response.status, 200);
  const xml = await response.text();
  for (const operation of ['add', 'subtract', 'multiply', 'divide']) {
    assert.ok(xml.includes(`name="${operation}"`));
  }
});

test('o cliente SOAP consegue carregar o WSDL e chamar add', async () => {
  const client = await soap.createClientAsync(
    `${baseUrl}/calculator?wsdl`,
    {},
    `${baseUrl}/calculator`,
  );
  const [result] = await client.addAsync({ a: 2, b: 3 });
  assert.equal(result.result, 5);
});

for (const [operation, a, b, expected] of [
  ['add', 2, 3, 5],
  ['subtract', 3, 8, -5],
  ['multiply', -1.5, 2, -3],
  ['divide', 3, 2, 1.5],
]) {
  test(`${operation} devolve o resultado num envelope SOAP`, async () => {
    const response = await request(operation, `<a>${a}</a><b>${b}</b>`);
    assert.equal(response.status, 200);
    assert.match(response.body, new RegExp(`<(?:\\w+:)?result>${expected}</(?:\\w+:)?result>`));
    assert.match(response.body, /Envelope/);
    assert.doesNotMatch(response.body, /faultstring/);
  });
}

for (const [label, operation, fields, message] of [
  ['divisão por zero', 'divide', '<a>5</a><b>0</b>', 'Não é possível dividir por zero.'],
  ['argumento ausente', 'add', '<a>2</a>', 'números finitos'],
  ['texto', 'add', '<a>abc</a><b>3</b>', 'números finitos'],
  ['número com sufixo', 'add', '<a>2abc</a><b>3</b>', 'números finitos'],
  ['argumento vazio', 'add', '<a></a><b>3</b>', 'números finitos'],
  ['infinito', 'add', '<a>INF</a><b>3</b>', 'números finitos'],
  ['NaN', 'add', '<a>NaN</a><b>3</b>', 'números finitos'],
  ['resultado não finito', 'multiply', '<a>1e308</a><b>1e308</b>', 'intervalo numérico'],
]) {
  test(`${label} devolve SOAP Fault`, async () => {
    const response = await request(operation, fields);
    assert.equal(response.status, 500);
    assert.match(response.body, /<soap:Fault>/);
    assert.match(response.body, /<faultcode>soap:Client<\/faultcode>/);
    assert.ok(response.body.includes(message), response.body);
    assert.doesNotMatch(response.body, /server\.js|calculator\.js/);
  });
}

test('um endereço desconhecido devolve 404', async () => {
  const response = await fetch(`${baseUrl}/nao-existe`);
  assert.equal(response.status, 404);
});
