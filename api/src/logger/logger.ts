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
    static create(loggerInfo: LoggerInfo) {
        this.logger = new winston.Logger();
        const transport = new winston.transports.Console({
            json: true,
        });
        this.logger.configure({
            transports: [transport],
            level: loggerInfo.getLevel(),
        });
    }

    static info(format: string, ...params: any[]) {
        winston.log.apply(this, ['debug', 'carlos - ' + format].concat(params));
    }


}