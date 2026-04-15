# ForgeFit API 🏋️‍♂️

A robust, scalable, and highly maintainable REST API built with **Node.js** and **TypeScript**, following **Clean Architecture** patterns and **SOLID** principles. This package serves as the core authentication and user management backend for the ForgeFit ecosystem.

## 🚀 Overview

This API handles core business logic, user management, and authentication. It is designed to be performant, type-safe, and easily extensible through Dependency Injection and a modular structure.

## 🛠 Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Web Framework**: [Express](https://expressjs.com/)
- **Architecture**: Clean Architecture / Domain-Driven Design (DDD)
- **Dependency Injection**: [Tsyringe](https://github.com/microsoft/tsyringe)
- **Database (ORM)**: [TypeORM](https://typeorm.io/) with PostgreSQL
- **Caching**: [Redis](https://redis.io/)
- **Validation**: [Celebrate](https://github.com/arb/celebrate) (Joi)
- **Testing**: [Jest](https://jestjs.io/)

## 📂 Architecture & Folder Structure

The project follows a modular structure where each business domain is encapsulated in its own module.

```text
src/
├── config         # Configuration files (auth, redis, etc.)
├── modules        # Business modules (Users, etc.)
│   └── users
│       ├── dtos            # Data Transfer Objects
│       ├── infrastructure  # Implementation details (HTTP, TypeORM)
│       │   ├── http
│       │   │   ├── controllers  # Express Controllers
│       │   │   └── routes       # Express Routes
│       │   └── typeorm
│       │       ├── entities      # TypeORM Entities
│       │       └── repositories  # TypeORM Repository implementations
│       ├── providers       # Module-specific providers (BCrypt, etc.)
│       ├── repositories    # Interface definitions (Contract)
│       └── services        # Use Cases / Business logic
├── shared         # Shared resources across all modules
│   ├── container           # Dependency injection container setup
│   ├── errors              # Global error handling (AppError)
│   ├── infrastructure      # Shared DB, HTTP, Server logic
│   └── utils               # Common utility functions
└── types          # Global type definitions
```

## 📋 API Endpoints

### 👤 Users

- `POST /users`: Register a new user.
- `GET /users`: List all registered users (Utilizes Redis for high-performance caching).

### 🔐 Authentication

- `POST /session`: Authenticate a user and receive a JWT token.

## ⚙️ Environment Variables

Create a `.env` file based on `.env.example`:

```env
SECRET=your_jwt_secret
EXPIRES_IN=1d

TYPEORM_TYPE=postgres
TYPEORM_HOST=localhost
TYPEORM_PORT=5432
TYPEORM_USERNAME=postgres
TYPEORM_PASSWORD=docker
TYPEORM_DATABASE=forgefit

REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
```

## 🛠 Development

In the context of the ForgeFit monorepo, you can manage this app from the root:

```bash
# Install dependencies
pnpm install

# Run in development mode
pnpm dev --filter api

# Run tests
pnpm test --filter api

# Build for production
pnpm build --filter api
```

### TypeORM Commands

If you need to run migrations specifically for this package:

```bash
# In apps/api directory
pnpm typeorm migration:run
pnpm typeorm migration:revert
```

## 🧪 Testing

The API uses **Jest** for unit and integration tests. Services are tested in isolation using Mock Repositories to ensure the business logic is decoupled from infrastructure.

---

Built with ❤️ as part of the **ForgeFit** Monorepo.
