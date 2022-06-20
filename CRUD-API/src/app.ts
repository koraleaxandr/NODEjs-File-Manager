import * as http from 'http';

const PORT: number = 3000;

const server = http
  .createServer( (request, res) => {
    res.setHeader("Content-type", "application/json");
    res.write('<h1>HELLO</h1>');
    const data = JSON.stringify([
    { name: 'Alex', age: 22}
    ]);
    res.end(data);
    console.log('Server request:');
    console.log(request.url, request.method);    
  })
  .listen(PORT, '127.0.0.1', (error: Error) => {
    error ? console.error(error) : console.log(
      `Server listening port: ${PORT}`
    );
  })