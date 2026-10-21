const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const soap = require('soap');
const calculator = require('./calculator');

// Não usar parseFloat: por exemplo, parseFloat('2abc') aceita o prefixo 2.
function parseDouble(text) {
  const value = text.trim();
  const numberPattern = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/;
  return numberPattern.test(value) ? Number(value) : NaN;
}

function soapOperation(calculate) {
  return (args = {}) => {
    try {
      return { result: calculate(args?.a, args?.b) };
    } catch (error) {
      const inputError = error instanceof TypeError || error instanceof RangeError;
      throw {
        Fault: {
          faultcode: inputError ? 'soap:Client' : 'soap:Server',
          faultstring: inputError ? error.message : 'Erro interno do serviço.',
          statusCode: 500,
        },
      };
    }
  };
}

async function createServer() {
  const xml = fs.readFileSync(path.join(__dirname, '../wsdl/calculator.wsdl'), 'utf8');
  const server = http.createServer((request, response) => {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Recurso não encontrado. WSDL: /calculator?wsdl');
  });

  const services = {
    CalculatorService: {
      CalculatorPort: {
        add: soapOperation(calculator.add),
        subtract: soapOperation(calculator.subtract),
        multiply: soapOperation(calculator.multiply),
        divide: soapOperation(calculator.divide),
      },
    },
  };

  await new Promise((resolve, reject) => {
    soap.listen(server, {
      path: '/calculator',
      services,
      xml,
      customDeserializer: { double: parseDouble },
      suppressStack: true,
      returnFault: true,
      callback: (error) => error ? reject(error) : resolve(),
    });
  });

  return server;
}

if (require.main === module) {
  createServer().then((server) => {
    server.on('error', (error) => {
      console.error(`Não foi possível iniciar o servidor: ${error.message}`);
      process.exitCode = 1;
    });
    server.listen(8000, 'localhost', () => {
      console.log('Servidor SOAP: http://localhost:8000/calculator');
      console.log('WSDL: http://localhost:8000/calculator?wsdl');
    });
  }).catch((error) => {
    console.error(`Não foi possível carregar o serviço: ${error.message}`);
    process.exitCode = 1;
  });
}

module.exports = { createServer };
