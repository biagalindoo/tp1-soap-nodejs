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

## Etapa 5 - Cliente SOAP e documentação final

- **Data:** 24 de outubro de 2026.
- **Implementação:** assistida por IA; código e testes executados localmente.
- **Revisão pela dupla:** por confirmar.
- **Estado:** implementação e validação local concluídas.
- **Mensagem do commit:** "Adicionar cliente SOAP e atualizar documentação"

### Alterações

- Criado `src/client.js`, um cliente demo para `add`, `subtract`, `multiply` e `divide`.
- Adicionado o script `npm run client` em `package.json`.
- Atualizado o README com informação acerca das etapas concluídas e do cliente disponível.
- Ajustado o diário do projeto para refletir o estado real do trabalho e o próximo passo.

### Verificação executada e resultado

- `npm ci` concluído com sucesso para instalar as dependências do projeto.
- `node --test` executado após a instalação; todos os testes de lógica passaram e o servidor foi validado em execução local.
- Cliente de demonstração testado em execução local contra um servidor temporário: `add` e `divide` responderam corretamente, incluindo erro de divisão por zero.

### Pendências e próximo passo

- Realizar a demonstração final no SoapUI, caso o ambiente e o teste em laboratório permitam.
- Revisar exemplos de requisição/resposta HTTP e SOAP para incluir no README ou num documento complementar.
- Confirmar a entrega final do projeto com a dupla e preparar a defesa individual.

## Etapa 6 - Guia de demonstração no SoapUI

- **Data:** 24 de outubro de 2026.
- **Estado:** instruções documentadas; demonstração gráfica por executar.
- **Nota:** documentação preparada com assistência de IA; dupla deve rever e
  confirmar que corresponde ao que efetivamente demonstrou.

### Alterações

- O README agora explica como importar o WSDL no SoapUI, executar operações,
  testar SOAP Faults e observar requests/responses HTTP e SOAP.
- Incluídos exemplos de request e response SOAP da operação `add`.
- Atualizado o checklist para refletir o cliente e os testes já implementados,
  sem marcar como realizada a demonstração prática no SoapUI.

### Verificação executada e resultado

- A documentação foi conferida com o endereço, operações e exemplos do WSDL
  existente. Não foi executado o SoapUI nesta etapa.

### Pendências e próximo passo

- Executar no PC da dupla os passos de demonstração documentados e guardar
  evidências, se forem pedidas na entrega.
- Preparar e praticar a defesa individual.

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


## Etapa 7 - Verificação final no SoapUI

- **Data:** 25 de outubro de 2026.
- **Estado:** operações e tratamento de erros verificados no SoapUI.
- **Responsável:** sessão de demonstração assistida por IA; dupla deve rever e conseguir repetir.

### Verificação executada e resultado

- `add(2, 3)` devolveu `5`.
- `subtract(5, 2)` devolveu `3`.
- `multiply(5, 2)` devolveu `10`.
- `divide(6, 3)` devolveu `2`.
- `divide(6, 0)` devolveu SOAP Fault: `Não é possível dividir por zero.`
- `add("abc", 3)` devolveu SOAP Fault: `Os argumentos a e b devem ser números finitos.`
- Consultados o envelope SOAP, os cabeçalhos HTTP e o registo HTTP no SoapUI.
- `npm.cmd test`: 22 testes aprovados (7 de lógica e 15 de integração).
- O projeto SoapUI no repositório contém requests de exemplo com valores numéricos; os exemplos de resposta estão no README.

### Pendências

- Rever as alterações e incluir os ficheiros novos no commit da dupla; publicar no GitHub.
- Preparar a defesa individual e confirmar com o professor as regras de declaração do uso de IA.
