Regras de Negócio (inicial)
---------------------------

Contabilidade
- Lançamentos devem ter data, conta contábil, histórico, valor e tipo (débito/crédito).
- Saldos são calculados a partir da soma dos lançamentos por conta.
- Movimentações devem permitir conciliação (marcar conciliado).

Engenharia / Construção
- Projetos possuem etapas, medições e estimativas.
- Medições vinculam atividades a quantitativos e valores unitários.
- Orçamentos podem ter múltiplas versões; somente a versão aprovada é considerada para faturamento.

Regras transversais
- Todas as operações mutáveis exigem logs de auditoria (ações, usuário, timestamp) — mesmo em mock.
- Validação de permissões será definida posteriormente (decisão pendente).
