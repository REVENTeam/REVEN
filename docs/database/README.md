# REVEN — Database Phase 1

This phase establishes the PostgreSQL persistence foundation for REVEN. It does not claim that authentication, business CRUD endpoints, the approved execution runner, Ollama, MCP, or report generation are complete.

## Architecture

- PostgreSQL 17 is the system of record.
- `reven_admin` is the database bootstrap/migration owner and must not be used by the API.
- `reven_app` is the restricted runtime login used by the API through `DATABASE_URL`.
- SQL migrations are versioned under `database/migrations/` and tracked in `reven_meta.schema_migrations` with SHA-256 checksums.
- The migration runner obtains a PostgreSQL advisory lock and applies each migration in a transaction.
- The API exposes liveness and readiness endpoints. Readiness checks the database connection.
- Audit records are append-only for the runtime role and linked by a SHA-256 hash chain. This is tamper-evident, not immutable against a database owner/superuser.

## Prerequisites

- Node.js 24.x (the project was previously reported with Node 24.18).
- pnpm 10.x.
- Docker Engine and Docker Compose v2 plugin. Compose 2.40.x is suitable; verify Docker Engine separately with `docker --version`.

## Setup

```bash
cp .env.example .env
```

Edit `.env` and replace both example passwords with strong, unique values. Keep `.env` out of version control. The database port is bound to `127.0.0.1` only.

Install dependencies and refresh the lockfile for the new `pg` dependency:

```bash
pnpm install --no-frozen-lockfile
```

Start PostgreSQL:

```bash
docker compose up -d postgres
docker compose ps
```

The initialization script creates the `reven_app` login on the first initialization of the named volume. If you change the app password after the volume has already been initialized, update the role password in PostgreSQL explicitly; init scripts are not rerun on an existing data volume.

Apply migrations:

```bash
pnpm db:migrate
```

Verify the schema and restricted role:

```bash
pnpm db:verify
```

Start the existing web application:

```bash
pnpm dev
```

Start the API server with database health endpoints:

```bash
pnpm dev:api
```

- `GET /api/health/live` returns process liveness.
- `GET /api/health/ready` returns HTTP 200 only when the database is reachable; otherwise HTTP 503.

## Schema inventory

The initial migration creates 14 business tables:

`users`, `engagements`, `targets`, `tasks`, `tool_calls`, `findings`, `vulnerabilities`, `approvals`, `evidences`, `reports`, `audit_logs`, `human_reviews`, `threat_mappings`, `priority_decisions`.

The separate technical ledger `reven_meta.schema_migrations` records applied migrations and checksums.

## Migration rules

1. Never edit a migration after it has been applied to a shared database.
2. Add a new, sequentially numbered SQL file for schema changes.
3. Run `pnpm db:migrate` and `pnpm db:verify` in development and CI.
4. Back up the database before applying migrations to important environments.

## Backup and restore

```bash
docker compose exec -T postgres pg_dump -U reven_admin -d reven -Fc > reven-backup.dump

docker compose exec -T postgres pg_restore -U reven_admin -d reven --clean --if-exists < reven-backup.dump
```

For a clean restore, create an empty database first and restore into it. Protect backup files as sensitive project data.

## Security notes

- Never commit `.env`, database passwords, real target data, or evidence files.
- Keep PostgreSQL bound to localhost unless a documented network design requires otherwise.
- The API must use `DATABASE_URL` and never `DATABASE_ADMIN_URL`.
- Store only password hashes in `users.password_hash`; password hashing and login flows are a later authentication phase.
- The runtime role has DML access to application tables, but it is not a superuser, database creator, or role creator. Audit mutation triggers reject updates/deletes through normal runtime operations.
- Hash chaining provides tamper evidence. A database owner or superuser can still alter data or disable triggers; stronger immutability requires external append-only storage or independent log anchoring.
- Do not execute tests against systems without explicit written authorization and an approved scope.
