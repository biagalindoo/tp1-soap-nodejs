const soap = require('soap');

const URL = process.env.SOAP_URL || 'http://localhost:8000/calculator?wsdl';

function formatResult(operation, result) {
  const value = result?.result ?? result;
  console.log(`${operation}: ${value}`);
}

function formatError(operation, error) {
  const message = error?.message || String(error || 'Erro desconhecido.');
  console.error(`${operation}: ${message}`);
}

async function callOperation(operation, args) {
  try {
    const client = await soap.createClientAsync(URL, {}, 'http://localhost:8000/calculator');
    const result = await new Promise((resolve, reject) => {
      client[operation](args, (error, response) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(response);
      });
    });

    formatResult(operation, result);
    return result;
  } catch (error) {
    formatError(operation, error);
    throw error;
  }
}

async function demo() {
  console.log('Cliente SOAP - demonstração');
  console.log(`WSDL: ${URL}`);

  await callOperation('add', { a: 2, b: 3 });
  await callOperation('subtract', { a: 10, b: 4 });
  await callOperation('multiply', { a: 6, b: 7 });
  await callOperation('divide', { a: 9, b: 3 });

  try {
    await callOperation('divide', { a: 5, b: 0 });
  } catch {
    // Erro já exibido no formato pedido.
  }

  try {
    await callOperation('add', { a: 'abc', b: 2 });
  } catch {
    // Erro já exibido no formato pedido.
  }
}

if (require.main === module) {
  demo().catch((error) => {
    console.error('Falha no cliente:', error?.message || error);
    process.exitCode = 1;
  });
}

module.exports = { callOperation, demo };
