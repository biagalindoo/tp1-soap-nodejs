# Requisitos do TP1

Checklist transcrita das quatro imagens do enunciado fornecidas pela dupla.
Entrega em **4 de novembro de 2026**. Máximo de duas pessoas por grupo;
defesa individualizada.

Todos os itens funcionais abaixo estão pendentes nesta preparação inicial.

## Serviço e contrato

- [ ] Usar Node.js e SOAP sobre HTTP.
- [ ] Escolher a biblioteca `soap` (recomendada) ou uma equivalente.
- [ ] Implementar `add(a, b)`, devolvendo a soma.
- [ ] Implementar `subtract(a, b)`, devolvendo a diferença de a e b.
- [ ] Implementar `multiply(a, b)`, devolvendo o produto.
- [ ] Implementar `divide(a, b)`, devolvendo o quociente de a por b.
- [ ] Expor um WSDL que descreva as quatro operações, argumentos e respostas.
- [ ] Validar os parâmetros para garantir que são números, atendendo também ao WSDL.
- [ ] Tratar entradas inválidas adequadamente.
- [ ] Tratar divisão por zero com erro ou mensagem apropriada.
- [ ] Separar servidor, cliente e lógica de negócio em módulos claros.
- [ ] Usar nomes significativos, comentários úteis e tratamento de erros.

## Cliente, testes e defesa

- [ ] Criar um cliente SOAP simples em Node.js para todas as operações.
- [ ] Processar as respostas e apresentar resultados ou erros corretamente.
- [ ] Demonstrar chamadas e respostas no terminal ou em logs.
- [ ] Visualizar requisições e respostas ao nível HTTP e SOAP.
- [ ] Verificar as quatro operações, entradas inválidas e divisão por zero.
- [ ] Demonstrar o consumo do serviço também na ferramenta SoapUI.
- [ ] As duas alunas conseguirem justificar o código e demonstrar a utilização individualmente.

## Materiais da entrega

- [ ] Código-fonte do servidor SOAP.
- [ ] Código-fonte do cliente e testes.
- [ ] README com instruções claras de instalação, execução e testes.
- [ ] Ficheiro WSDL do serviço.
- [ ] Exemplos de requisição e resposta.

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
