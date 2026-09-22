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


Escopo público atual — 2026-09-13 (ADR-010)
- Regras de Engenharia/Construção acima pertencem à visão futura interna; não habilitam área, menu ou comunicação pública nesta fase.
- Landing atual: financeiro, contabilidade, fiscal e investimentos, com automação personalizada e auditoria fiscal.
- Não publicar métricas, clientes, depoimentos, integrações específicas ou resultados tributários sem evidência.
- Processos críticos devem comunicar validação humana, evidências, responsabilidades e rastreabilidade.
- A Home não executa nenhuma operação de domínio nem simula aprovação ou envio de dados.
