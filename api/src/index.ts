import * as express from 'express';
import * as winston from 'winston';
import * as config from 'config';
import * as routes from './routes/routes';
import { Database } from './database/database';
import { Logger, LoggerInfo } from './logger/logger';

// Create database pool connection
Database.create();

const app = express();
app.use(express.json());
app.use(express.urlencoded());
Logger.create(new LoggerInfo(app.get('env'), config.get('Api.name'), config.get('Api.version')));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use('/', routes);

if (app.get('env') === 'development') {
    app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function (err: any, req: express.Request, res: express.Response, next: Function) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

export = app;
