const winston = require('winston');
const util = require('util');
const config = require('../config');
const printFormat = winston.format.printf((info) => {
    return `${info.level ? info.level + ':' : ''}${info.timestamp ? info.timestamp + ':' : ''} ${info.message}`;
});
winston.addColors({
    error: 'red',
    warn: 'yellow',
    info: 'green',
    debug: 'magenta'
});
const winstonLogger = winston.createLogger({
    transports: [
        new (winston.transports.Console)({
            format: (() => {
                const formats = [
                    winston.format.simple(),
                    winston.format.errors({stack: true}),
                    winston.format.colorize(),
                    winston.format.colorize({
                        all: true,
                    }),
                    printFormat
                ];
                return winston.format.combine(...formats);
            })(),
            level: config.logLevel
        })
    ],
});
if (process.env.NODE_ENV === 'production') {
    winstonLogger.add(new winston.transports.File({
        filename: 'log/error.log',
        level: 'error',
    }));
    winstonLogger.add(new winston.transports.File({filename: 'log/combined.log'}));
}

const writeLogType = (logLevel) => {
    return function () {
        const args = Array.from(arguments);
        winstonLogger[logLevel](util.format(...args));
    };
};
module.exports = {
    silly: writeLogType('silly'),
    debug: writeLogType('debug'),
    verbose: writeLogType('verbose'),
    info: writeLogType('info'),
    warn: writeLogType('warn'),
    error: writeLogType('error'),
};
