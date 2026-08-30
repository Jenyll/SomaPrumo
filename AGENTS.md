Instruções para agentes e colaboradores

ANTES DE PROGRAMAR

1. Ler PROJECT_STATE.md
2. Ler docs/PRODUCT.md
3. Ler docs/ARCHITECTURE.md
4. Ler docs/BUSINESS_RULES.md
5. Ler docs/VALIDATIONS.md
6. Ler docs/DECISIONS.md
7. Inspecionar o código existente no repositório

DEPOIS DE PROGRAMAR

1. Executar checagem de tipos (type-check)
2. Rodar lint
3. Executar todos os testes (unitários e integração)
4. Tentar um build local (build do frontend)
5. Atualizar documentação relevante em docs/ e PROJECT_STATE.md
6. Registrar progresso em docs/PROGRESS.md
7. Abrir Pull Request com descrição clara das mudanças e instruções de teste

Notas
- Sempre referencie os ADRs em docs/DECISIONS.md ao tomar decisões técnicas.
- Para tarefas que mudam a modelagem de domínio, atualize docs/DOMAIN_MODEL.md e docs/API_CONTRACTS.md.
