# Diário de desenvolvimento

Atualizar este ficheiro junto das alterações de cada commit, para a outra
colega perceber o que foi feito e como continuar. Registar apenas trabalho
realizado e verificações efetivamente executadas.


### Alterações preparadas

- `package.json` mínimo, sem dependências e sem scripts de execução.
- `.gitignore` para dependências, logs e ficheiros locais.
- README com objetivo, dupla, prazo, estado atual e preparação do ambiente.
- Checklist dos requisitos, entregáveis e critérios de avaliação do enunciado.
- Este diário e uma sequência das próximas etapas no README.

### Verificações

- Node.js, npm e Git disponíveis no ambiente de preparação.
- Validade JSON e conteúdo mínimo do `package.json` conferidos.
- Checklist conferida com as quatro imagens fornecidas do enunciado.
- Estado Git conferido: apenas os cinco ficheiros previstos, sem commits.
- Não há testes funcionais nesta etapa: a aplicação ainda não foi implementada.

### Próximo passo

## Etapa 4 - Servidor SOAP sobre HTTP

- **Data de preparação:** 21 de outubro de 2026.

### O que mudou

- Criado `src/server.js`, que carrega o WSDL e liga as quatro operações à calculadora.
- Instalado `soap` 1.14.0, com versões guardadas em `package-lock.json`.
- Definido Node.js 20.19 ou superior, conforme a versão mínima da biblioteca.
- Acrescentado `npm start`, com servidor em `http://localhost:8000/calculator` e WSDL em `/calculator?wsdl`.
- Erros de argumentos e divisão por zero devolvem SOAP Faults com mensagem em português.
- A conversão XML rejeita números malformados, como `2abc`.
- Criados testes HTTP/SOAP em `tests/server.test.js` e atualizados README e checklist.

### Verificação

- `npm test`: 21 testes aprovados (7 de cálculos e 14 de integração).
- Verificados WSDL por HTTP, operações, erros, argumentos em falta, valores vazios e resultados não finitos.
- `git diff --check`: sem erros nas alterações desta etapa.
- Servidor de demonstração verificado com `npm start` e pedido HTTP real.

### Próximo passo

Rever e fazer o commit desta etapa. Depois criar um cliente Node.js simples
que consuma as operações e mostre resultados e erros no terminal.

## Modelo para as próximas entradas

Copiar e preencher este modelo em cada nova etapa:

```text
## Etapa N - Título da alteração
Data:
Responsável:
Estado:
Mensagem do commit:
Alterações:
Verificação executada e resultado:
Pendências e próximo passo:
```
