# Diário de desenvolvimento

Atualizar este ficheiro junto das alterações de cada commit, para a outra
colega perceber o que foi feito e como continuar. Registar apenas trabalho
realizado e verificações efetivamente executadas.

## Etapa 1 - Preparação inicial

- **Data:** 20 de outubro de 2026.
- **Estado:** concluída e registada no commit `9aee9b2` pela Beatriz.
- **Mensagem sugerida:** `chore: preparar estrutura inicial do TP1 SOAP`.

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

Preparação concluída. Continuar com a definição do WSDL, descrita na etapa 2.

## Etapa 2 - Contrato WSDL

- **Data:** 20 de outubro de 2026.
- **Estado:** alterações preparadas; revisão e commit pendentes.
- **Mensagem sugerida:** `feat: definir contrato WSDL da calculadora`.

### Alterações preparadas

- Criado `wsdl/calculator.wsdl`, com `add`, `subtract`, `multiply` e `divide`.
- Definidos argumentos obrigatórios `a` e `b` e resposta `result`, do tipo `xsd:double`.
- Definidos mensagens, interface, binding SOAP 1.1 e endereço local previsto.
- README atualizado com explicação de cada secção do contrato e estado do projeto.
- Checklist atualizada para indicar a existência do ficheiro WSDL local.

### Verificações

- XML analisado e estrutura do contrato conferida: quatro operações,
  referências internas, argumentos e resultados numéricos e binding HTTP/SOAP.
- Conferidos os tipos do esquema e exemplos de pedidos/respostas das quatro operações.
- `git diff --check` executado sem erros de espaços em branco.
- Ainda falta importar o contrato no node-soap e no SoapUI e testar chamadas reais.

### Próximo passo

Rever o WSDL e fazer o segundo commit. Depois implementar a lógica das operações
e a validação dos argumentos, incluindo divisão por zero e valores não finitos.

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
