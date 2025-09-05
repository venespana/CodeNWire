import fastify, { FastifyRequest } from 'fastify';
import cors from '@fastify/cors';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { spawnSync } from 'child_process';
import path from 'path';
import { existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from 'fs';

// Crear la instancia de Fastify con soporte para TypeBox
const server = fastify({
  logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

// Registrar plugins
async function registerPlugins() {
  await server.register(cors, {
    origin: true // Permitir todas las origenes en desarrollo
  });
}

// Definir rutas
async function registerRoutes() {
  server.post('/api/build', async (request: FastifyRequest) => {
    const { code, board } = request.body as { code: string, board: string }

    const basePath = path.join(__dirname, '../arduino/');
    const command = path.join(basePath, 'arduino-cli');

    const tmpPath = path.join(basePath, 'sketch');
    if (!existsSync(tmpPath)) {
      mkdirSync(tmpPath);
    }

    writeFileSync(path.join(tmpPath, 'sketch.ino'), code as string, 'utf-8');

    const result = spawnSync(command, ['compile', '-b', board, tmpPath, '-e']);

    const outputString = result.stdout.toString();
    const binaryData = readFileSync(path.join(tmpPath, './build', `./${board.replaceAll(':', '.')}`, `./sketch.ino.hex`), 'utf-8');

    const response = {
      binary: binaryData,
      message: outputString.split('\n').filter((line) => !!line)
    }

    return response;
  });

  server.get('/api/status', async () => {
    return {
      status: 'online',
      timestamp: new Date().toISOString(),
      service: 'CodeNWire API'
    };
  });
}

// Iniciar el servidor
async function startServer() {
  try {
    await registerPlugins();
    await registerRoutes();

    const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;
    const host = process.env.HOST || '0.0.0.0';

    await server.listen({ port, host });
    console.log(`Server running at http://${host}:${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

// Ejecutar el servidor
startServer();
