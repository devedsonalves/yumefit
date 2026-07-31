# Yume Fit Software

Boilerplate backend em monorepo PNPM/Turborepo com uma API Express em TypeScript e autenticação pronta.

## Estrutura

```text
apps/
  api/        # API HTTP com auth e usuarios
infra/
  docker/     # Docker Compose, Postgres, Redis e Dockerfile da API
tooling/
  prettier/   # Configuracao compartilhada de formatacao
```

## Funcionalidades Implementadas

- Cadastro de usuario em `POST /users`.
- Login com cookies HTTP-only em `POST /auth/login`.
- Refresh token com rotacao em `POST /auth/refresh`.
- Logout de sessao atual e todas as sessoes.
- Perfil autenticado em `GET /auth/me`.
- Alteracao de senha autenticada.
- Reset de senha por token.
- Verificacao de e-mail por token.
- Listagem e revogacao de sessoes.
- Health check em `GET /health`.

## Desenvolvimento

```bash
pnpm install
pnpm dev
```

## Docker

```bash
docker compose -f infra/docker/docker-compose.yml up --build -d
```

A API sobe em `http://localhost:3000` e a documentacao em `http://localhost:3000/docs`.

## Testes

```bash
pnpm --filter api test
docker compose -p yumefit-test -f infra/docker/docker-compose.test.yml up -d --wait
pnpm test:integration
docker compose -p yumefit-test -f infra/docker/docker-compose.test.yml down -v
```
