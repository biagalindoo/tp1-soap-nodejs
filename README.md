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
Ainda não existem servidor, cliente, lógica aritmética ou testes funcionais.

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
fase: ainda não existem dependências. Os comandos para executar o servidor,
o cliente e os testes serão acrescentados quando essas partes existirem.

## Documentação

- [Requisitos e checklist de entrega](docs/requisitos.md)
- [Diário de desenvolvimento](docs/diario.md)

## Próximas etapas

1. Rever o contrato WSDL das quatro operações, já preparado.
2. Implementar a lógica aritmética e a validação.
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
tal como o resultado. O esquema declara os tipos; a validação dos valores
recebidos e o tratamento de divisão por zero ainda serão implementados no servidor.
Será necessário rejeitar também valores não finitos, como `NaN` e infinito.

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
