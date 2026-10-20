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

Apenas a preparação inicial: metadados Node.js, regras de exclusão Git e
documentação. Ainda não existem servidor, cliente, operações, WSDL ou testes.

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
etapa: ainda não existem dependências. Os comandos para executar o servidor,
o cliente e os testes serão acrescentados quando essas partes existirem.

## Documentação

- [Requisitos e checklist de entrega](docs/requisitos.md)
- [Diário de desenvolvimento](docs/diario.md)

## Próximas etapas

1. Definir o contrato WSDL das quatro operações.
2. Implementar a lógica aritmética e a validação.
3. Disponibilizar o servidor SOAP sobre HTTP, separado da lógica de negócio.
4. Criar o cliente Node.js, separado do servidor.
5. Verificar operações e erros e apresentar requisições/respostas HTTP e SOAP.
6. Demonstrar o consumo no SoapUI.
7. Rever instruções de instalação, execução e testes e reunir exemplos de entrega.

Cada commit deve corresponder a uma alteração real e verificada. Atualizar o
diário no mesmo commit, indicando o que mudou, a verificação e o próximo passo.
