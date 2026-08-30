Mocks e Mock Repositories
------------------------

Objetivo
- Fornecer implementações substitutas das interfaces de repositório para desenvolvimento e testes enquanto o backend não existir.

Diretriz
- Cada interface de repositório deve ter uma implementação mock em infra/mock que suporte operações CRUD básicas e latência configurável.
- Os mocks devem ser puramente determinísticos por fixture (possibilitar seeds) e permitir simulação de erros.

Fixtures
- Manter fixtures em docs/fixtures ou src/__mocks__/fixtures para testes.

Exemplo de comportamento
- MockProjectRepository: list(), getById(), create(), update(), delete()

Integração com DI
- Fornecer um provider/factory que injete implementações mock nas camadas superiores.
