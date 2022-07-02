import * as http from 'http';

import Controller from './controllers/controller.ts';

const PORT: number = 3000;

const server = http
  .createServer((request, res) => {
    res.setHeader('Content-type', 'application/json');
    const controller = new Controller();
    const resp = controller.getResponse(request);
    res.end(JSON.stringify(resp));
  })
  .listen(PORT, (): void => {
    console.log(
      `Server listening port: ${PORT}`,
    );
  });
