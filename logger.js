const moment = require('moment');
const { createLogger, format, transports } = require('winston');
const { combine, colorize, simple, timestamp, label, printf } = format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `[${label}] ${timestamp} - ${level}: ${message}`;
});
const LOGGER = createLogger({
    level: 'debug',
    format: combine(
        simple(),
        colorize(),
        timestamp({ format: moment().format('DD-MM-YYYY HH:MM:ss') }),
        label({ label: 'chat-socket' }),
        myFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'chat-socket.log' })
    ]
});

module.exports = LOGGER;