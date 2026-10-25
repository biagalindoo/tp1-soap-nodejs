# TP1 - Serviço SOAP em Node.js

Trabalho de Desenvolvimento de Aplicações Web 2026/27, Universidade do Algarve.

**Entrega:** 4 de novembro de 2026. Grupo de duas alunas, com defesa individualizada.

## Dupla

- Beatriz Pedrosa Monteiro Galindo - [biagalindoo](https://github.com/biagalindoo)
- Bruna Ineida da Graça Lima Correia- [bcorreia-netizen](https://github.com/bcorreia-netizen)

## Objetivo

Desenvolver um serviço SOAP sobre HTTP em Node.js para adição, subtração,
multiplicação e divisão. O projeto deverá incluir um WSDL, validação dos
parâmetros, tratamento de erros e um cliente Node.js para consumir o serviço.

## Estado atual

O WSDL das quatro operações está definido em [wsdl/calculator.wsdl](wsdl/calculator.wsdl).
A lógica aritmética e a validação estão implementadas em [src/calculator.js](src/calculator.js),
com testes unitários em [tests/calculator.test.js](tests/calculator.test.js).
O servidor SOAP está em [src/server.js](src/server.js) e o cliente de demonstração
em [src/client.js](src/client.js). Os testes HTTP/SOAP estão em
[tests/server.test.js](tests/server.test.js). A demonstração prática no SoapUI foi
realizada em 25 de outubro de 2026 com o projeto
[Calculadora-SOAP-soapui-project.xml](Calculadora-SOAP-soapui-project.xml).

O campo `private` do `package.json` impede publicação acidental no npm;
a visibilidade do repositório no GitHub é independente desse campo.

## Preparação do ambiente

Ter Node.js 20.19 ou superior com npm, Git e VS Code instalados.
A biblioteca SOAP exige essa versão mínima. Verificar no terminal:

```sh
node --version
npm --version
git --version
```

Abrir esta pasta no VS Code e instalar as dependências:

```sh
npm ci
```

A dependência `soap` está registada no `package.json`. O `package-lock.json`
guarda as versões utilizadas e deve ser incluído no commit; `node_modules` fica fora.

No PowerShell do Windows, se aparecer um erro a dizer que `npm.ps1` não pode
ser carregado por causa da política de execução, usa `npm.cmd` no lugar de
`npm` (por exemplo, `npm.cmd ci`, `npm.cmd start`, `npm.cmd test` e
`npm.cmd run client`). Não é necessário alterar a política de execução.

## Executar o servidor SOAP

```sh
npm start
```

Manter esse terminal aberto. O serviço fica em `http://localhost:8000/calculator`
e o WSDL pode ser consultado no navegador em `http://localhost:8000/calculator?wsdl`.
Parar com `Ctrl+C`. O serviço recebe pedidos SOAP por HTTP POST; ainda não há
interface gráfica. Se a porta 8000 estiver ocupada, parar o outro processo que a utiliza.

## Executar o cliente SOAP

Com o servidor em execução noutro terminal:

```sh
npm run client
```

O cliente chama as quatro operações e apresenta também exemplos de divisão por
zero e de argumento inválido. Por omissão, usa
`http://localhost:8000/calculator?wsdl`.

## Demonstrar no SoapUI

A demonstração foi feita com o projeto SOAPUI incluído neste repositório. Foram
confirmados `add(2,3)=5`, `subtract(5,2)=3`, `multiply(5,2)=10` e
`divide(6,3)=2`. A divisão por zero devolveu um SOAP Fault com a mensagem
`Não é possível dividir por zero.`; o argumento `abc` também foi rejeitado com
um SOAP Fault (`Os argumentos a e b devem ser números finitos.`). O envelope
SOAP, os cabeçalhos HTTP e o registo HTTP foram consultados no SoapUI.

1. Iniciar o servidor com `npm start` e mantê-lo em execução.
2. No SoapUI, escolher **File > New SOAP Project**.
3. Dar um nome ao projeto, por exemplo `Calculadora SOAP`, e indicar como
   **Initial WSDL** `http://localhost:8000/calculator?wsdl`. Deixar ativa a
   criação das requests de exemplo e confirmar.
4. Abrir a request da operação `add`, preencher `a` com `2` e `b` com `3` e
   carregar em **Submit** (ícone verde). A resposta deve conter `result` igual a `5`.
5. Repetir para `subtract`, `multiply` e `divide`, usando valores que permitam
   confirmar cada resultado.
6. Para ver o tratamento de erros, enviar `divide` com `a=5` e `b=0`. A resposta
   deve ser um SOAP Fault com a mensagem `Não é possível dividir por zero.` e
   estado HTTP 500. Para testar a validação, enviar `abc` como um dos valores
   numéricos; o serviço deve responder com um SOAP Fault.
7. O projeto SoapUI e exemplos de pedido/resposta estão incluídos no repositório.
   Guardar capturas adicionais se forem pedidas pelo professor.

Se aparecer `Invalid XML — Could not find message add`, atualiza a definição da
interface SOAP no projeto. Se a opção não estiver disponível, remove o projeto
antigo do SoapUI e cria um novo usando novamente
`http://localhost:8000/calculator?wsdl` como **Initial WSDL**. Confirma que o
endpoint da request é `http://localhost:8000/calculator` (sem `?wsdl`) e que o
SOAPAction é `urn:ualg:calculator/add`. A operação do corpo é `add`, no namespace
`urn:ualg:calculator`; os argumentos `a` e `b` também pertencem a esse namespace.

Exemplo de request SOAP para a soma:

```xml
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <add xmlns="urn:ualg:calculator">
      <a>2</a>
      <b>3</b>
    </add>
  </soap:Body>
</soap:Envelope>
```

Exemplo de resposta SOAP:

```xml
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <addResponse xmlns="urn:ualg:calculator">
      <result>5</result>
    </addResponse>
  </soap:Body>
</soap:Envelope>
```

Os prefixos de namespace podem variar na resposta sem alterar o significado
do XML.

## Cálculos e testes locais

No terminal da pasta do projeto (pode ser um segundo terminal):

```sh
npm test
```

Os testes cobrem as quatro operações, números negativos, zero, decimais,
argumentos inválidos, divisão por zero e resultados fora do intervalo numérico.
São 7 testes da lógica local e 15 de integração HTTP/SOAP. Os testes de integração
iniciam um servidor temporário numa porta livre e fecham-no no fim; não dependem
do servidor iniciado com `npm start`.

Exemplo de utilização da soma no terminal:

```sh
node -e "const { add } = require('./src/calculator'); console.log(add(2, 3));"
```

O resultado esperado é `5`. As funções recebem dois valores JavaScript do tipo
`number` e devolvem um número. Texto, mesmo numérico como `"2"`, não é convertido
automaticamente. Argumentos inválidos lançam `TypeError`; divisão por zero e
resultados não finitos lançam `RangeError`, com mensagens em português.
Os cálculos usam a precisão habitual dos números JavaScript, sem arredondamento
automático. O servidor adapta os pedidos XML às funções e devolve `{ result }`.
Erros esperados são convertidos em SOAP Faults 1.1, com código `soap:Client`,
mensagem em português e HTTP 500.

## Documentação

- [Requisitos e checklist de entrega](docs/requisitos.md)
- [Diário de desenvolvimento](docs/diario.md)

## O que falta para a entrega

1. Rever as alterações no Git, incluir o ficheiro SoapUI e fazer commit/push do
   projeto para o repositório da dupla.
2. Preparar a defesa individual: ambas as alunas devem conseguir explicar o código
   e repetir a demonstração. Confirmar com o professor as regras de declaração do
   uso de IA.

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
`NaN`, infinito e divisão por zero. O servidor usa essa lógica e faz uma conversão
numérica estrita do XML: texto como `2abc` não é aceite como o número 2.
O esquema não substitui a validação dos valores recebidos.

- `types`: estrutura XML dos pedidos e respostas.
- `message`: associação das mensagens aos elementos XML.
- `portType`: interface com as quatro operações.
- `binding`: utilização de SOAP 1.1 sobre HTTP, no estilo `document/literal`.
- `service`: serviço `CalculatorService` e porta `CalculatorPort`.

Com o servidor iniciado, o serviço está em `http://localhost:8000/calculator`
e o WSDL em `http://localhost:8000/calculator?wsdl`. O namespace `urn:ualg:calculator`
identifica o contrato e não corresponde a uma página web.

Referência para a futura integração: [documentação da biblioteca node-soap](https://github.com/vpulim/node-soap).
