Validações e Estratégia
----------------------

Principais pontos
- Validar no cliente regras de formato, obrigatoriedade e coerência (ex: datas, valores positivos).
- Reutilizar validadores puros (funções) para teste e possível reutilização no backend.
- Usar schemas (ex: Zod) se apropriado, mas manter a independência do domínio quando necessário.

Regras comuns de formulário
- Campos obrigatórios: nome, data, valor, conta (quando aplicável)
- Valores monetários: número com duas casas decimais
- Datas: ISO 8601

Testes
- Cobrir validadores com suite de testes unitários (Vitest)
