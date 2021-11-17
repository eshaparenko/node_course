import {createServer} from 'http';
import logger from "./logger";
const config = require('./config');

createServer(async (req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        logger.info('Navigation to the Home Page')
        return res.end('Home Page');
    } else if (req.url === '/add-user' && req.method === 'POST') {
        const chunkArray: any = [];
        for await (const chunk of req) {
            chunkArray.push(...chunk);
        }
        const data = Buffer.from(chunkArray).toString();
        return res.end(data);
    } else {
        res.end('Unhandled Path');
    }
}).listen(config.PORT, () => logger.info(`Server is listening on port ${config.PORT}. Env is ${config.ENV}`))