const { log } = require('./logger');
const http = require('http');
const config = require('./config');


http.createServer((req, res) => {
    log('New incoming request');
    res.writeHeader(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Hello world!' }));
}).listen(config.PORT, () => log(`Server is listening on port ${config.PORT}. Env is ${config.ENV}`));