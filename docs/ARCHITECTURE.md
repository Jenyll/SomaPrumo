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
