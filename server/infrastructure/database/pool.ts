import pg from 'pg';

const { Pool } = pg;
const connectionString = process.env.DATABASE_URL;

export const databasePool = connectionString
  ? new Pool({ connectionString, max: 10, idleTimeoutMillis: 30_000, connectionTimeoutMillis: 5_000, application_name: 'reven-api' })
  : null;

export async function checkDatabaseReady(): Promise<boolean> {
  if (!databasePool) return false;
  try {
    await databasePool.query('SELECT 1');
    return true;
  } catch {
    return false;
  }
}
