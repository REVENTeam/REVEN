import express from 'express';
import { createServer } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { checkDatabaseReady, databasePool } from './infrastructure/database/pool.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);
  app.disable('x-powered-by');
  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health/live', (_req, res) => res.status(200).json({ status: 'ok' }));
  app.get('/api/health/ready', async (_req, res) => {
    const database = await checkDatabaseReady();
    res.status(database ? 200 : 503).json({ status: database ? 'ready' : 'not_ready', checks: { database } });
  });

  const staticPath = process.env.NODE_ENV === 'production'
    ? path.resolve(__dirname, 'public')
    : path.resolve(__dirname, '..', 'dist', 'public');
  app.use(express.static(staticPath));
  app.get('*', (_req, res) => res.sendFile(path.join(staticPath, 'index.html')));

  const port = Number(process.env.PORT || 3000);
  server.listen(port, () => console.log(`REVEN server listening on port ${port}`));
  const shutdown = () => server.close(async () => { await databasePool?.end(); process.exit(0); });
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

startServer().catch((error) => { console.error('Failed to start REVEN server:', error); process.exitCode = 1; });
