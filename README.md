# NestJS Clean Architecture

A [NestJS](https://github.com/nestjs/nest) boilerplate with a layered architecture
(Controller → Service → Repository), ready to be used as a base for new projects.

Repository: https://github.com/phankieuphu/nestjs_clean_architecture

## Features

- **TypeORM** (MySQL) with migrations
- **Redis** cache via `@nestjs/cache-manager`
- **JWT** authentication (`passport-jwt`) and role based authorization (`@Roles()` + `RolesGuard`)
- **Joi** validation for env variables and request payloads
- **Swagger** docs at `/docs` (disabled when `NODE_ENV` is `stg`, `prd` or `production`)
- Request context via `nestjs-cls`, events via `@nestjs/event-emitter`
- CLI commands via `nestjs-command`
- **Vitest** unit tests with coverage thresholds

## Project structure

```
db/
  typeorm.config.ts     # DataSource used by the TypeORM CLI
  migrations/           # Generated migrations
src/
  commands/             # CLI commands (nestjs-command), see src/commands/README.md
  config/               # env config, database config, env validation schema
  constant/             # Constants (errors, events, user)
  controllers/          # HTTP layer – routing, validation, response formatting
  decorators/           # Custom decorators (@User(), @Roles())
  dtos/                 # DTOs and Joi schemas (dtos/schema)
  entities/             # TypeORM entities and enums
  exceptions/           # Exception filters
  guards/               # JWT, roles and API key guards
  interceptors/         # Logging and request-context interceptors
  interfaces/           # Repository contracts and shared types
  pipes/                # Joi validation pipe
  repositories/         # Data access layer, bound to interfaces in repositories/index.ts
  services/             # Business logic
  strategies/           # Passport strategies
  utils/                # Shared helpers (response, common)
  app.module.ts
  main.ts               # HTTP entry point
  cli.ts                # CLI entry point
```

## Getting started

Requirements: Node.js 20+, Yarn 1.x, MySQL and Redis.

```bash
$ yarn install
$ cp .env.example .env   # then update the values
```

| Variable | Required | Description |
| --- | --- | --- |
| `NODE_ENV` | no | `development` (default) enables TypeORM `synchronize` and query logging |
| `APP_PORT` | no | HTTP port, default `3000` |
| `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` | yes | MySQL connection |
| `REDIS_HOST`, `REDIS_PORT` | yes | Redis connection |
| `JWT_SECRET_KEY`, `JWT_TOKEN_EXPIRE` | yes | JWT signing secret and expiry (e.g. `1d`) |
| `AUTH_TOKEN` | no | Static API key checked by `TokenAuthGuard` (`x-api-key` header) |
| `CORS_ORIGINS` | no | Comma separated allowed origins; empty or `*` allows all |

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn build && yarn start:prod
```

- API base path: `http://localhost:3000/v1`
- Health check: `GET http://localhost:3000/health-check`
- Swagger: `http://localhost:3000/docs`

The user endpoints (`/v1/user/*`) expect a `Bearer` JWT whose payload contains `sub` (user id) and `role`.
This template does not ship a login endpoint; add one that signs tokens with `JwtService`, or plug in your own identity provider.

## Test

```bash
# unit tests
$ yarn test

# watch mode
$ yarn test:watch

# test coverage
$ yarn test:cov
```

Coverage is measured for `services`, `utils`, `guards` and `pipes` (see `vitest.config.mjs`). To exclude a block from coverage:

```ts
/* v8 ignore start */

/* v8 ignore stop */
```

## Migrations

```bash
# generate a migration from entity changes
$ yarn migration:generate --name=MIGRATION_NAME

# create an empty migration
$ yarn migration:create --name=MIGRATION_NAME

# run / revert / show
$ yarn migration:run
$ yarn migration:revert
$ yarn migration:show
```

## Commands

```bash
$ yarn cli hello world
```

See [src/commands/README.md](src/commands/README.md).

## CRUD generator ([more information](https://docs.nestjs.com/recipes/crud-generator))

When building new features we often need to add new resources, which require the same repetitive operations each time.

### Generating a new resource

```bash
$ nest g resource
```

## Request lifecycle ([documentation](https://docs.nestjs.com/faq/request-lifecycle))

1. **Incoming Request**
2. **Middleware**
   - Global-bound middleware
   - Module-bound middleware
3. **Guards**
   - Global guards
   - Controller guards
   - Route guards
4. **Interceptors (Pre-controller)**
5. **Pipes**
   - DTO transformation/validation
6. **Controller**
   - Handles the incoming request
7. **Service**
   - Business logic layer
8. **Interceptors (Post-controller)**
   - Response transformation
9. **Exception Filters**
   - Handles errors and exceptions
10. **Response**

## Creating an API

Follow these steps (see the `User` module for a complete example):

1. **Create Entity (if required)** – add the entity to `src/entities` and export it from `src/entities/index.ts`
   (all exported entities are registered with `TypeOrmModule.forFeature`). Generate a migration afterwards.
2. **Create DTO, validation schema and interface** – DTO in `src/dtos`, Joi schema in `src/dtos/schema`,
   repository contract in `src/interfaces`.
3. **Create Repository** – implement the interface in `src/repositories` and bind it in `src/repositories/index.ts`.
4. **Create Service** – business logic in `src/services`, injecting the repository through its interface token.
   Export it from `src/services/index.ts`.
5. **Create Controller** – routes in `src/controllers`, validate input with `JoiValidationPipe`
   and format the output with `ResponseUtils`. Export it from `src/controllers/index.ts`.
6. **Add tests** – `*.spec.ts` next to the file under test.

## Branch flow

1. **Create a branch** with a descriptive name related to the task or feature.
2. **Make changes** following the steps above.
3. **Test** – run `yarn lint` and `yarn test` before committing.
4. **Commit** using descriptive messages; each commit should be one logical unit of work.
5. **Merge or rebase** onto the target branch and resolve any conflicts.
6. **Push** the branch and open a pull request for review.
7. **Deploy** once the pull request is approved.

## License

[MIT](LICENSE)
