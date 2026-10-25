# Requisitos do TP1

Checklist transcrita das quatro imagens do enunciado fornecidas pela dupla.
Entrega em **4 de novembro de 2026**. Máximo de duas pessoas por grupo;
defesa individualizada.

O WSDL e a lógica aritmética estão integrados num servidor HTTP/SOAP, com cliente
Node.js e testes das quatro operações e de erros. A demonstração prática no
SoapUI foi realizada em 25 de outubro de 2026; a defesa individual continua a
depender da dupla.

## Serviço e contrato

- [x] Usar Node.js e SOAP sobre HTTP.
- [x] Escolher a biblioteca `soap` (recomendada) ou uma equivalente.
- [x] Implementar `add(a, b)`, devolvendo a soma (lógica local).
- [x] Implementar `subtract(a, b)`, devolvendo a diferença de a e b (lógica local).
- [x] Implementar `multiply(a, b)`, devolvendo o produto (lógica local).
- [x] Implementar `divide(a, b)`, devolvendo o quociente de a por b (lógica local).
- [x] Expor um WSDL que descreva as quatro operações, argumentos e respostas.
- [x] Validar os parâmetros para garantir que são números, atendendo também ao WSDL.
- [x] Tratar entradas inválidas adequadamente (SOAP Fault).
- [x] Tratar divisão por zero com erro ou mensagem apropriada (SOAP Fault).
- [x] Separar servidor, cliente e lógica de negócio em módulos claros.
- [x] Usar nomes significativos e tratamento de erros.

## Cliente, testes e defesa

- [x] Criar um cliente SOAP simples em Node.js para todas as operações.
- [x] Processar as respostas e apresentar resultados ou erros corretamente.
- [x] Demonstrar chamadas e respostas no terminal ou em logs.
- [x] Visualizar requisições e respostas ao nível HTTP e SOAP no SoapUI; envelope, cabeçalhos e registo HTTP verificados.
- [x] Verificar as quatro operações, entradas inválidas e divisão por zero, nos testes automatizados e no SoapUI.
- [x] Demonstrar o consumo do serviço na ferramenta SoapUI: quatro operações, divisão por zero e argumento inválido.
- [ ] As duas alunas conseguirem justificar o código e demonstrar a utilização individualmente.

## Materiais da entrega

- [x] Código-fonte do servidor SOAP.
- [x] Código-fonte do cliente e testes do servidor/serviço.
- [x] README com instruções de instalação, execução, testes e demonstração SoapUI.
- [x] Ficheiro WSDL do serviço, exposto por HTTP e usado nos testes SOAP.
- [x] Exemplos de requisição e resposta SOAP no README.

## Critérios de avaliação

| Critério | Pontuação máxima |
| --- | ---: |
| Funcionamento das operações e tratamento de erros | 20 |
| Estrutura e organização do código | 10 |
| Implementação do WSDL | 20 |
| Validação de entrada | 10 |
| Clientes funcionais e demonstração, incluindo SoapUI | 20 |
| Documentação (README) | 10 |
| Estilo e boas práticas | 10 |
| **Total** | **100** |

## Organização da dupla

O diário de desenvolvimento é uma ferramenta de acompanhamento da dupla.
Nas imagens fornecidas não está indicado um número mínimo de commits.
O histórico deverá refletir as etapas realmente realizadas, com alterações
pequenas que ambas consigam compreender e explicar.
