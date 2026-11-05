import pg from 'pg';
const { Client } = pg;
const connectionString = process.env.DATABASE_ADMIN_URL || process.env.DATABASE_URL;
if (!connectionString) throw new Error('DATABASE_ADMIN_URL or DATABASE_URL is required.');
const client = new Client({ connectionString, application_name: 'reven-db-verification' });
const expected = ['users','engagements','targets','tasks','tool_calls','findings','vulnerabilities','approvals','evidences','reports','audit_logs','human_reviews','threat_mappings','priority_decisions'];
try {
  await client.connect();
  const tables = await client.query(`SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE'`);
  const present = new Set(tables.rows.map((r) => r.table_name));
  const missing = expected.filter((t) => !present.has(t));
  const migrations = await client.query('SELECT version, checksum, applied_at FROM reven_meta.schema_migrations ORDER BY version');
  const triggers = await client.query(`SELECT trigger_name FROM information_schema.triggers WHERE event_object_schema='public' AND event_object_table='audit_logs'`);
  const role = process.env.REVEN_APP_USER || 'reven_app';
  const roleCheck = await client.query('SELECT rolname, rolsuper, rolcreatedb, rolcreaterole FROM pg_roles WHERE rolname=$1', [role]);
  console.log(JSON.stringify({
    status: missing.length === 0 && migrations.rowCount > 0 && triggers.rowCount >= 2 && roleCheck.rowCount === 1 && !roleCheck.rows[0].rolsuper && !roleCheck.rows[0].rolcreatedb && !roleCheck.rows[0].rolcreaterole ? 'PASS' : 'FAIL',
    expectedTables: expected.length, presentTables: expected.length - missing.length, missingTables: missing,
    migrations: migrations.rows, auditTriggers: triggers.rows.map((r) => r.trigger_name),
    runtimeRole: roleCheck.rows[0] || null
  }, null, 2));
  if (missing.length || migrations.rowCount === 0 || triggers.rowCount < 2 || roleCheck.rowCount !== 1 || roleCheck.rows[0].rolsuper || roleCheck.rows[0].rolcreatedb || roleCheck.rows[0].rolcreaterole) process.exitCode = 1;
} finally { await client.end().catch(() => {}); }
