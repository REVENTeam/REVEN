import { createHash } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';

const { Client } = pg;
const here = path.dirname(fileURLToPath(import.meta.url));
const migrationsDir = path.join(here, 'migrations');
const connectionString = process.env.DATABASE_ADMIN_URL;
if (!connectionString) throw new Error('DATABASE_ADMIN_URL is required. Copy .env.example to .env and configure it.');

const client = new Client({ connectionString, application_name: 'reven-migration-runner' });
const appRole = process.env.REVEN_APP_USER || 'reven_app';

try {
  await client.connect();
  await client.query('SELECT pg_advisory_lock($1, $2)', [741205, 2]);
  await client.query('CREATE SCHEMA IF NOT EXISTS reven_meta');
  await client.query(`CREATE TABLE IF NOT EXISTS reven_meta.schema_migrations (
    version text PRIMARY KEY,
    checksum text NOT NULL,
    applied_at timestamptz NOT NULL DEFAULT now()
  )`);

  const files = (await readdir(migrationsDir)).filter((f) => /^\d+_[a-z0-9_-]+\.sql$/i.test(f)).sort();
  for (const file of files) {
    const sql = await readFile(path.join(migrationsDir, file), 'utf8');
    const checksum = createHash('sha256').update(sql).digest('hex');
    const existing = await client.query('SELECT checksum FROM reven_meta.schema_migrations WHERE version = $1', [file]);
    if (existing.rowCount) {
      if (existing.rows[0].checksum !== checksum) throw new Error(`Checksum mismatch for applied migration ${file}; do not edit an applied migration.`);
      console.log(`SKIP ${file}`);
      continue;
    }
    await client.query('BEGIN');
    try {
      await client.query(sql);
      await client.query('INSERT INTO reven_meta.schema_migrations(version, checksum) VALUES ($1, $2)', [file, checksum]);
      await client.query('COMMIT');
      console.log(`APPLIED ${file}`);
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    }
  }

  await client.query(`GRANT USAGE ON SCHEMA public TO ${quoteIdent(appRole)}`);
  await client.query(`GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO ${quoteIdent(appRole)}`);
  await client.query(`GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO ${quoteIdent(appRole)}`);
  await client.query(`ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO ${quoteIdent(appRole)}`);
  await client.query(`ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO ${quoteIdent(appRole)}`);
  console.log(`Migration complete. Runtime grants applied to ${appRole}.`);
} finally {
  try { await client.query('SELECT pg_advisory_unlock($1, $2)', [741205, 2]); } catch {}
  await client.end().catch(() => {});
}

function quoteIdent(value) {
  if (!/^[a-z_][a-z0-9_]*$/i.test(value)) throw new Error('Invalid REVEN_APP_USER identifier');
  return `"${value}"`;
}
