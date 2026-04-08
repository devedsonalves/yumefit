# 🧠 ForgeFit Monorepo Guidelines

Este documento define os padrões oficiais de organização, arquitetura e desenvolvimento do projeto **ForgeFit**.

O objetivo é garantir:

- Escalabilidade
- Padronização
- Facilidade de manutenção
- Evitar complexidade desnecessária no build (especialmente com React Native)

---

# 📦 Estrutura do Monorepo

```
apps/
  api/
  web/
  mobile/

packages/
  core/
  api-client/
  types/
  schemas/
  utils/
  ui-web/
  ui-mobile/
  config/

tooling/
infra/
docs/
```

---

# 🧱 Princípios Gerais

## 1. Separação por responsabilidade

- `apps/` → aplicações executáveis
- `packages/` → código compartilhado
- `core/` → regras de negócio puras
- `ui-*` → componentes específicos de plataforma

---

## 2. Regra de ouro

> Código compartilhado DEVE ser agnóstico de ambiente

Isso significa:

❌ Não pode:

- usar DOM
- usar APIs do Node (`fs`, `path`, etc.)
- usar React
- usar React Native

✅ Pode:

- lógica pura
- validações
- transformação de dados
- regras de negócio

---

## 3. Evitar acoplamento entre plataformas

- `ui-web` NÃO pode ser usado no mobile
- `ui-mobile` NÃO pode ser usado no web
- `core` NÃO pode depender de UI

---

# 🧩 Organização de Features

Toda feature deve ser organizada por domínio de negócio.

---

## 📁 Estrutura padrão (Frontend)

```
features/
  <feature-name>/
    components/
    hooks/
    services/
    types/
    schemas/
    utils/
    index.ts
```

---

## 📌 Exemplo

```
features/
  auth/
    components/
      login-form.tsx
    hooks/
      use-login.ts
    services/
      auth.service.ts
    schemas/
      login.schema.ts
    types/
      auth.types.ts
    utils/
      auth.mapper.ts
```

---

## 🧠 Regras importantes

- Tudo relacionado à feature fica dentro dela
- Evite dependências cruzadas entre features
- Se algo for reutilizável → mover para `packages/`

---

# 🧠 Organização do Backend (API)

## 📁 Estrutura

```
src/
  modules/
    <feature>/
      domain/
      application/
      infra/
      http/
  shared/
```

---

## 📌 Exemplo

```
modules/
  auth/
    domain/
      user.entity.ts
    application/
      login.use-case.ts
    infra/
      auth.repository.ts
    http/
      auth.controller.ts
```

---

## 🧠 Camadas

### domain/

- entidades
- regras de negócio puras

### application/

- casos de uso
- orquestração

### infra/

- banco de dados
- serviços externos

### http/

- controllers
- rotas

---

# 📦 Organização dos Packages

---

## core/

Responsável por lógica de negócio compartilhada.

```
core/
  domain/
  use-cases/
  services/
```

---

## api-client/

Cliente HTTP compartilhado.

```
api-client/
  http.ts
  modules/
    auth.ts
    users.ts
```

---

## types/

Apenas tipos TypeScript.

```
types/
  user.ts
  auth.ts
```

---

## schemas/

Validação (Zod).

```
schemas/
  auth/
  user/
```

---

## utils/

Funções utilitárias puras.

```
utils/
  date/
  string/
  format/
```

---

## ui-web/

Componentes React (web only).

---

## ui-mobile/

Componentes React Native (mobile only).

---

## config/

Configurações compartilhadas:

- ESLint
- Prettier
- TSConfig

---

# 🚫 Regras de Dependência

## Permitido

```
apps → packages
packages → packages (com cuidado)
```

## Proibido

```
packages/ui-web → ui-mobile
packages/core → react
packages/types → zod
packages/utils → node APIs
```

---

# 🧠 Naming Convention

## Arquivos

- `*.service.ts`
- `*.controller.ts`
- `*.use-case.ts`
- `*.repository.ts`
- `*.schema.ts`
- `*.types.ts`

---

## Pastas

- kebab-case
- singular quando possível

```
user/
auth/
payment/
```

---

# 🧠 Imports

Sempre usar aliases:

```ts
import { createUser } from "@repo/core";
```

Nunca usar:

```ts
../../../../../../
```

---

# ⚡ Performance & Build

## Regras

- Evitar build de packages no início
- Usar TypeScript direto
- Compartilhar apenas código leve
- Evitar dependências pesadas em packages

---

# 🧠 Boas práticas

## 1. Não criar packages desnecessários

Só extrair quando houver reuso real.

## 2. Preferir feature-based

Evitar separar tudo por tipo global.

## 3. Manter lógica no backend ou core

Frontend não deve conter regra crítica.

## 4. Evitar “shared global bagunçado”

Se algo pertence a uma feature → fica nela.

---

# 🚀 Evolução futura

Quando o projeto crescer:

- adicionar `services/` (workers, filas)
- separar `BFF`
- introduzir eventos (event-driven)
- versionar packages

---

# 🧠 Filosofia do Projeto

> Simples primeiro. Escalável sempre.

- Não super arquitetar no início
- Mas estruturar para crescer sem dor

---

# ✅ Resumo

- Monorepo com `apps + packages`
- Backend modular + clean
- Frontend por feature
- Packages com código puro
- UI separada por plataforma
- Evitar acoplamento

---

Se tiver dúvida:

👉 Prefira simplicidade
👉 Evite abstração precoce
👉 Organize por domínio

---

**ForgeFit © Architecture Guidelines**
