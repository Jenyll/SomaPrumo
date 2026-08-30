Modelo de Domínio (inicial)
---------------------------

Entidades principais
- Company: id, nome, cnpj, endereço
- User: id, nome, email, roles
- Account (contábil): id, código, nome, tipo
- LedgerEntry: id, date, accountId, description, amount, type

Construção/Projeto
- Project: id, nome, cliente, status
- Task/Activity: id, projectId, descrição, unidade, quantidade, unitPrice
- Measurement: id, taskId, measuredQuantity, date

Value Objects
- Money, Percentage, DateRange

Observações
- Modelagem inicial deve permanecer simples; ajustes seguirão decisões e feedbacks do produto.
