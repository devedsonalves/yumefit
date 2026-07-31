# API

API Express + TypeScript com autenticacao, usuarios, sessoes, PostgreSQL, Redis, TypeORM, Tsyringe e Jest.

## Endpoints

### Users

- `POST /users`: cria uma conta.
- `GET /users`: lista usuarios, somente admin.
- `GET /users/:id`: mostra o proprio perfil ou qualquer perfil como admin.
- `PUT /users/:id`: atualiza o proprio perfil ou qualquer perfil como admin.
- `DELETE /users/:id`: remove usuario, somente admin.

Papeis disponiveis: `admin` e `user`.

### Auth

- `GET /auth/me`
- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout`
- `POST /auth/logout-all`
- `PUT /auth/password`
- `POST /auth/password-reset/request`
- `POST /auth/password-reset/confirm`
- `POST /auth/email-verification/request`
- `POST /auth/email-verification/confirm`
- `GET /auth/sessions`
- `DELETE /auth/sessions/:id`

### Health

- `GET /health`

## Ambiente

Copie `.env.example` para `.env` e ajuste os segredos e conexoes.

```bash
pnpm --filter api dev
pnpm --filter api test
pnpm --filter api build
```
