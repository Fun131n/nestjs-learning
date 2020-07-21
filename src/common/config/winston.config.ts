import * as winston from 'winston'
import { LoggerOptions } from 'winston'

require('winston-daily-rotate-file')

// const level
const logDir = 'log'
// @ts-ignore
const transport = new winston.transports.DailyRotateFile({
    dirname: logDir,
    filename: 'app-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
})

export class WinstonConfig implements LoggerOptions {
    format = winston.format.combine(
        winston.format.colorize({
            colors: {
                info: 'green',
                warn: 'yellow',
                debug: 'blue',
                error: 'red'
            }
        }),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(info => {
            if (info.stack) {
                info.message = info.stack
            }
            if (info.trace) {
                info.message = info.trace
            }
            
            return `[${info.pid}] ${info.timestamp} ${info.level}: [${info.context || 'Application'}] ${info.message}`
        })
    );
    defaultMeta = { pid: process.pid };
    transports = [
        transport,
        new winston.transports.Console(),
        new winston.transports.File({ dirname: logDir, filename: 'error.log', level: 'error' })
    ]
}
