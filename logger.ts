const winston = require('winston');

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: 'log.txt',
            format: winston.format.simple()
        }),
        new winston.transports.Http({
            level: 'warn',
            format: winston.format.json()
        }),
    ],

});

export default logger;