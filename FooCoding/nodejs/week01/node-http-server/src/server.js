import http from 'node:http';

import requestHandler from './app.js';
import { initializeData } from './routes.js';
const HOST = '127.0.0.1';
const PORT = process.env.PORT ?? 3000;

const server = http.createServer(requestHandler);
initializeData();
server.listen(PORT, HOST, () => {
  const { address, port } = server.address();
  const serverUrl = `http://${address}:${port}/`;

  console.log('Server running at: %s', serverUrl);
});
