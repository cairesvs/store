import * as winston from 'winston';

export class LoggerInfo {
    constructor(readonly env: string, readonly app: string, readonly version: string) { }
    getLevel(): string {
        if (this.env === "development") return "debug";
        return "error";
    }
}

export class Logger {
    static logger: winston.LoggerInstance;
    static defaultFields: {};
    static create(loggerInfo: LoggerInfo) {
        this.logger = new winston.Logger();
        this.defaultFields = {
            version: loggerInfo.version,
            app: loggerInfo.app,
            env: loggerInfo.env
        };
        const transport = new winston.transports.Console({
            json: true,
            stringify: (obj) => JSON.stringify(obj)
        });
        this.logger.configure({
            transports: [transport],
            level: loggerInfo.getLevel()
        });
    }

    static info(message: string) {
        this.logger.log('info', message, this.defaultFields);
    }

    static debug(message: string) {
        this.logger.debug('debug', message, this.defaultFields);
    }

    static error(message: string) {
        this.logger.log('error', message, this.defaultFields);
    }

    static warn(message: string) {
        this.logger.log('warn', message, this.defaultFields);
    }
}