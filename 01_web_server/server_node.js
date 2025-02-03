const http = require('http');

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Gateway', 'CaffeineJS');
        res.end("Hello, Nice to have Coffee!");
    } else if (req.url === '/coffee-time') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Gateway', 'CaffeineJS');
        res.end('Thanks for placing order for Hot Coffee');
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Gateway', 'CaffeineJS');
        res.end('404 Not found');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server listening on http://${hostname}:${port}`);
});
