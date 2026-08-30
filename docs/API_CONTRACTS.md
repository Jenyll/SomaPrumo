Contratos de API (contratos para mocks e futuro backend)
-----------------------------------------------------

Princípios
- Definir contratos simples REST/JSON para cada Resource para facilitar substituição por backend real.
- Usar versões nas rotas (/v1/) e manter payloads concisos.

Exemplos iniciais (mock)
- GET /v1/projects -> { data: Project[] }
- GET /v1/projects/:id -> { data: Project }
- POST /v1/projects -> { data: Project }
- GET /v1/accounts -> { data: Account[] }
- POST /v1/ledger-entries -> { data: LedgerEntry }

Formato de resposta padrão
- { success: boolean, data: any, errors?: string[] }

Status codes
- 200: OK
- 201: Created
- 400: Bad Request
- 404: Not Found
- 500: Server Error (mock)

Notas
- Enquanto não houver backend, mocks devem respeitar esses contratos para facilitar migração futura.
