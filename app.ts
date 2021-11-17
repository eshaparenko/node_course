import {NextFunction, Request, Response} from "express";
const express = require('express')
const config = require('./config');
import logger from './logger';
const app = express();
import * as winston from "winston";
const expressWinston = require('express-winston');

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        return next(err)
    }
    res.status(500);
    res.json({ error: err })
}

app.use((req: Request, res: Response, next: NextFunction) => {
    logger.info(`Request info - url: ${req.url}, params: ${JSON.stringify(req.params)}.`);
    next();
});

app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
    ),
    meta: false,
    msg: "HTTP  ",
    expressFormat: true,
    colorize: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req: any, res:any) => {
    res.end('Hello World')
    logger.info(req.url)
});

app.post('/user', (req: Request, res: Response) => {
    logger.info('body', req.body);
    res.send('Hello User!')
});

app.get('*', function(req: any, res: any){
    res.status(404).send('Page not found.');
});

app.use(errorHandler);

app.listen(config.PORT, () => {
    logger.info(`Server is listening on port ${config.PORT}. Env is ${config.ENV}.`);
})

process.on('unhandledRejection', (reason, promise) => {
    logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
})

process.on('uncaughtException', (err, origin) => {
    logger.error(`Unhandled Exception at: ${origin}, reason: ${err}`);
});