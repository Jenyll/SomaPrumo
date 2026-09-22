Arquitetura Geral
-----------------

Princípios
- Clean Architecture adaptada ao frontend
- SOLID
- Arquitetura orientada por domínio / features
- Separation of concerns entre apresentação, casos de uso e infraestrutura

Camadas (frontend adaptado)
- Presentation: componentes Vue, páginas, roteamento
- Application / UseCases: orquestração de regras de negócio por feature
- Domain: entidades, value objects, regras de negócio puras
- Infrastructure: Repositories, Adapters (mock ou real quando houver backend)

Nota: Scaffold inicial do frontend foi implementado em branch `feat/frontend-foundation`.
Estrutura de diretórios criada em `src/` com as camadas: `app`, `core`, `domain`, `application`, `infrastructure`, `presentation`, `assets`, `styles`.

Padrões
- Repository Pattern para acesso a dados
- Dependency Inversion: injetar implementações de Repositories via factories ou providers
- Feature folders por domínio (ex: projects/, accounting/)

Observações
- Backend ainda não existe — usar Mock Repositories que implementam as interfaces definidas no Domain/Ports


Landing institucional (2026-09-13, ADR-010)
- Home.vue compõe SiteHeader, HeroSection, SolutionsSection, AutomationSection, AuditSection, TeamSection, ContactSection e SiteFooter.
- Componentes reutilizados em src/components/brand e src/components/home; não movidos para evitar quebrar o trabalho local existente.
- Conteúdo comercial de pilares/metodologia em src/data/solutions.ts; marca, navegação e contato em src/config/brand.ts; retratos em src/data/team.ts.
- Estado de navegação e carrossel é local ao componente. Pinia e Router existentes permanecem intactos.
- Tokens e tipografia centralizados em src/assets/styles; estilos comuns em src/styles/main.css.
- Domain/Application/Infrastructure e contratos de API não foram alterados; nenhuma integração ou backend adicionado.

Núcleo financeiro — 2026-09-22 (ADR-012)
- Domain: entidades, Money, validações, parcelas/provisões e porta FinancialRepository.
- Application: serviços puros e FinancialWorkspace, com comandos que atualizam saldos e auditam em uma unidade de trabalho.
- Infrastructure: MockFinancialRepository vazio, sem dados pessoais, com cópias serializadas e confirmação atômica.
- Presentation permanece desacoplada. A próxima tela deverá usar FinancialWorkspace, sem recalcular fórmulas no componente.
