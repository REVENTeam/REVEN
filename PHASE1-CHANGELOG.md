# REVEN Phase 1 — PostgreSQL Foundation

## Added
- PostgreSQL 17 service in Docker Compose with localhost-only port binding and persistent volume.
- Separate administrative and runtime database credentials.
- Initial migration containing 14 business tables, foreign keys, constraints, and indexes.
- Migration ledger with SHA-256 checksums, transactional application, and advisory locking.
- Append-only, hash-linked audit log behavior for ordinary runtime access.
- PostgreSQL connection pool and API liveness/readiness endpoints.
- Database setup, verification, backup/restore notes, and conceptual ERD.

## Not included in this phase
- Production authentication/session management and RBAC middleware.
- Business CRUD APIs and frontend integration.
- MinIO/object storage integration.
- Ollama plan generation/validation, MCP server, or execution runner.
- Report generation, complete audit UI, and end-to-end acceptance test suite.

## Validation boundary
The source archive and resulting ZIP were structurally checked. This environment did not run Docker Engine or a live PostgreSQL instance, and did not execute `pnpm install`, TypeScript compilation, migrations against PostgreSQL, or API integration tests. Run the documented setup and verification commands on the Kali VM before treating this phase as runtime-validated.
