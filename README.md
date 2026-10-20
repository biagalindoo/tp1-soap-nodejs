# TP1 - Serviço SOAP em Node.js

Trabalho de Desenvolvimento de Aplicações Web 2026/27, Universidade do Algarve.

**Entrega:** 4 de novembro de 2026. Grupo de duas alunas, com defesa individualizada.

## Dupla

- Beatriz Pedrosa Monteiro Galindo - [biagalindoo](https://github.com/biagalindoo)
- Bruna - [bcorreia-netizen](https://github.com/bcorreia-netizen)

## Objetivo

Desenvolver um serviço SOAP sobre HTTP em Node.js para adição, subtração,
multiplicação e divisão. O projeto deverá incluir um WSDL, validação dos
parâmetros, tratamento de erros e um cliente Node.js para consumir o serviço.

## Estado atual

A preparação inicial está concluída e o contrato WSDL das quatro operações
está definido em [wsdl/calculator.wsdl](wsdl/calculator.wsdl).
A lógica aritmética e a validação estão implementadas em `src/calculator.js`,
com testes unitários em `tests/calculator.test.js`.
Ainda não existem servidor, cliente ou testes de integração SOAP.

O campo `private` do `package.json` impede publicação acidental no npm;
a visibilidade do repositório no GitHub é independente desse campo.

## Preparação do ambiente

Ter Node.js com npm, Git e VS Code instalados. Verificar no terminal:

```sh
node --version
npm --version
git --version
```

Abrir esta pasta no VS Code. Não é necessário executar `npm install` nesta
fase: ainda não existem dependências externas. Os comandos para executar o
servidor e o cliente serão acrescentados quando essas partes existirem.

## Cálculos e testes locais

Usar Node.js 18 ou superior, com suporte ao executor de testes `node:test`.
No terminal da pasta do projeto:

```sh
npm test
```

Os testes cobrem as quatro operações, números negativos, zero, decimais,
argumentos inválidos, divisão por zero e resultados fora do intervalo numérico.
São testes da lógica local; ainda não fazem chamadas HTTP/SOAP.

Exemplo de utilização da soma no terminal:

```sh
node -e "const { add } = require('./src/calculator'); console.log(add(2, 3));"
```

O resultado esperado é `5`. As funções recebem dois valores JavaScript do tipo
`number` e devolvem um número. Texto, mesmo numérico como `"2"`, não é convertido
automaticamente. Argumentos inválidos lançam `TypeError`; divisão por zero e
resultados não finitos lançam `RangeError`, com mensagens em português.
Os cálculos usam a precisão habitual dos números JavaScript, sem arredondamento
automático. A adaptação destas funções às mensagens SOAP fica para o servidor.

## Documentação

- [Requisitos e checklist de entrega](docs/requisitos.md)
- [Diário de desenvolvimento](docs/diario.md)

## Próximas etapas

1. Rever o contrato WSDL das quatro operações, já preparado.
2. Rever a lógica aritmética e a validação, já implementadas e testadas localmente.
3. Disponibilizar o servidor SOAP sobre HTTP, separado da lógica de negócio.
4. Criar o cliente Node.js, separado do servidor.
5. Verificar operações e erros e apresentar requisições/respostas HTTP e SOAP.
6. Demonstrar o consumo no SoapUI.
7. Rever instruções de instalação, execução e testes e reunir exemplos de entrega.

Cada commit deve corresponder a uma alteração real e verificada. Atualizar o
diário no mesmo commit, indicando o que mudou, a verificação e o próximo passo.

## Contrato WSDL

O WSDL funciona como o contrato entre servidor e cliente: descreve as mensagens
que o serviço deverá aceitar e devolver. Não executa os cálculos.

| Operação | Entrada | Resposta |
| --- | --- | --- |
| `add` | `a`, `b` | `result`: soma |
| `subtract` | `a`, `b` | `result`: diferença de a e b |
| `multiply` | `a`, `b` | `result`: produto |
| `divide` | `a`, `b` | `result`: quociente de a por b |

Os dois argumentos são obrigatórios e usam o tipo numérico `xsd:double`,
tal como o resultado. A lógica local já rejeita argumentos não numéricos,
`NaN`, infinito e divisão por zero. Ainda falta integrar essa validação no
servidor e verificar o comportamento das entradas recebidas por SOAP.

- `types`: estrutura XML dos pedidos e respostas.
- `message`: associação das mensagens aos elementos XML.
- `portType`: interface com as quatro operações.
- `binding`: utilização de SOAP 1.1 sobre HTTP, no estilo `document/literal`.
- `service`: serviço `CalculatorService` e porta `CalculatorPort`.

O endereço previsto é `http://localhost:8000/calculator`. Ainda não está ativo;
quando existir servidor, o WSDL deverá ficar acessível em
`http://localhost:8000/calculator?wsdl`. O namespace `urn:ualg:calculator`
identifica o contrato e não corresponde a uma página web.

Referência para a futura integração: [documentação da biblioteca node-soap](https://github.com/vpulim/node-soap).
