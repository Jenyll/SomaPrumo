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

Padrões
- Repository Pattern para acesso a dados
- Dependency Inversion: injetar implementações de Repositories via factories ou providers
- Feature folders por domínio (ex: projects/, accounting/)

Observações
- Backend ainda não existe — usar Mock Repositories que implementam as interfaces definidas no Domain/Ports
