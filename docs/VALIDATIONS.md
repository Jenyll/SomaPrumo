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

Financeiro — 2026-09-22
- Dinheiro: decimal completo, finito, centavos inteiros seguros; não aceitar parse parcial de texto nem confundir zero com ausência.
- Datas: validar calendário e reidratar ISO na leitura. Competências: mês 1–12 e ano 1900–9999.
- Parcelas: inteiras, positivas e no máximo 1200 por compra; o cronograma conserva o total.
- Divisões: pessoas únicas, um pagador, valores personalizados completos e soma exata.
- Faturas: pagamentos positivos, sem exceder saldo, sem duplicidades ou referências a outra fatura.
- Recebimentos: positivos, limitados ao saldo; baixa exige motivo; não receber depois da baixa.
- Investimentos: valores positivos, tipo conhecido, referência correta, sem movimentos duplicados; resgate não excede saldo.
- Transferência interna: origem/destino distintos e ativos.
