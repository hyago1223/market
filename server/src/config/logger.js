import { createLogger,format,transports } from "winston";

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss'}),
        format.errors({ stack: true }),
        format.json()
    ),
    transports: [

        new transports.File({ filename: 'logs/all.log'}),
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/info.log', level: 'info' }),
        new transports.File({ filename: 'logs/warn.log', level: 'warn' }),

        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.simple()
            )
        })
    ]
})

export default logger;