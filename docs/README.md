# 🏋️ ForgeFit

ForgeFit é uma plataforma completa de gestão fitness, projetada para academias, personal trainers e atletas que buscam controle total sobre treinos, evolução e operação.

O sistema é **multiplataforma** e construído como um **monorepo moderno**, com backend, frontend web e aplicativo mobile compartilhando uma base consistente de código.

---

# 🚀 Stack Tecnológica

### Backend

* Node.js
* TypeScript
* Fastify

### Frontend Web

* React
* Vite
* TypeScript

### Mobile

* React Native (Expo)
* TypeScript

### Monorepo

* PNPM Workspaces
* Turborepo

---

# 📦 Estrutura do Projeto

```
forgefit/
├─ apps/
│  ├─ api/        # Backend
│  ├─ web/        # Frontend web
│  └─ mobile/     # App mobile
│
├─ packages/
│  ├─ core/        # Regras de negócio
│  ├─ api-client/  # Cliente HTTP compartilhado
│  ├─ types/       # Tipos globais
│  ├─ schemas/     # Validações (Zod)
│  ├─ utils/       # Funções utilitárias
│  ├─ ui-web/      # UI React (web)
│  ├─ ui-mobile/   # UI React Native
│  └─ config/      # ESLint, TS, Prettier
│
├─ tooling/        # Scripts internos
├─ infra/          # Docker, CI, scripts
├─ docs/           # Documentação
```

---

# 🧠 Arquitetura

O projeto segue uma combinação de:

* **Monorepo (apps + packages)**
* **Backend modular + Clean Architecture**
* **Frontend orientado a features**
* **Compartilhamento via código puro (agnóstico)**

---

# ⚙️ Como rodar o projeto

## 1. Instalar dependências

```bash
pnpm install
```

---

## 2. Rodar todos os apps

```bash
pnpm dev
```

---

## 3. Rodar individualmente

### API

```bash
pnpm --filter api dev
```

### Web

```bash
pnpm --filter web dev
```

### Mobile

```bash
pnpm --filter mobile dev
```

---

# 📦 Packages compartilhados

Os packages são reutilizados entre web, mobile e backend.

### core

Regras de negócio puras.

### api-client

Comunicação com a API.

### types

Contratos de dados.

### schemas

Validação compartilhada.

### utils

Helpers puros.

---

# ⚠️ Regras importantes

## Código compartilhado

Todo código dentro de `packages/` deve ser:

* independente de ambiente
* sem dependência de React
* sem dependência de Node APIs
* reutilizável

---

## UI

* `ui-web` → apenas React (web)
* `ui-mobile` → apenas React Native

---

## Não fazer

* Misturar código web com mobile
* Colocar regra de negócio no frontend
* Criar packages desnecessários

---

# 🧩 Organização de Features

## Frontend

```
features/
  <feature>/
    components/
    hooks/
    services/
    types/
    schemas/
    utils/
```

---

## Backend

```
modules/
  <feature>/
    domain/
    application/
    infra/
    http/
```

---

# 🧠 Filosofia

> Simples para começar. Estruturado para escalar.

* Evitar overengineering
* Compartilhar apenas o necessário
* Priorizar organização por domínio

---

# 🛠️ Scripts úteis

```bash
pnpm dev        # roda tudo
pnpm build      # build geral
pnpm lint       # lint
pnpm test       # testes
```

---

# 🚀 Roadmap (exemplo)

* [ ] Autenticação
* [ ] Gestão de usuários
* [ ] Treinos e planos
* [ ] Dashboard
* [ ] App mobile MVP
* [ ] Sistema de pagamentos
* [ ] Notificações push

---

# 🤝 Contribuição

1. Siga o padrão definido em `INSTRUCTIONS.md`
2. Use naming consistente
3. Evite quebrar isolamento de packages
4. Crie features bem encapsuladas

---

# 📄 Licença

MIT

---

# 🧠 Autor

ForgeFit — Plataforma para forjar sua melhor versão.
