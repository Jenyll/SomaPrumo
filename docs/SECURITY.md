Segurança (frontend)
--------------------

Principais pontos
- Nunca confiar em validações apenas no cliente — backend deverá revalidar (quando existir).
- Evitar armazenar segredos no frontend; usar variáveis de ambiente no build.
- Sanitizar dados exibidos para prevenir XSS.

Autenticação/Autorização
- Padrões a definir: JWT/OAuth2 (decisão pendente). Documentar em docs/DECISIONS.md quando definido.

Dependências
- Manter dependências atualizadas; auditar vulnerabilidades periodicamente.
