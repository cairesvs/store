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
    static loggerInfo: LoggerInfo
    static create(loggerInfo: LoggerInfo) {
        this.logger = new winston.Logger();
        this.loggerInfo = loggerInfo;
        const transport = new winston.transports.Console({
            json: true,
            stringify: (obj) => JSON.stringify(obj)
        });
        this.logger.configure({
            transports: [transport],
            level: loggerInfo.getLevel()
        });
    }

    static info(format: string, ...params: any[]) {
        this.logger.log('info', format, params);
    }

    static debug(format: string, ...params: any[]) {
        this.logger.debug('debug', format, params);
    }

    static error(format: string, ...params: any[]) {
        this.logger.log('error', format, params);
    }

    static warn(format: string, ...params: any[]) {
        this.logger.log('warn', format, params);
    }
}