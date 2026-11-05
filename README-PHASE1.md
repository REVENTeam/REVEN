# REVEN — Phase 1 delivery

See `docs/database/README.md` for setup and operation, `docs/database/ERD.md` for the initial model, and `PHASE1-CHANGELOG.md` for scope and validation limits.

Quick start: copy `.env.example` to `.env`, set unique passwords, run `pnpm install --no-frozen-lockfile`, `docker compose up -d postgres`, `pnpm db:migrate`, and `pnpm db:verify`.
