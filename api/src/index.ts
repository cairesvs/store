import * as express from 'express';
import * as routes from './routes/routes';
import * as winston from 'winston';
import { Database } from './database/database';
import { Search } from './database/search';
// @see https://github.com/bithavoc/express-winston/issues/123
const expressWinston = require('express-winston');

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console({
            json: true,
            colorize: true
        })
    ],
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true,
    colorize: false,
    ignoreRoute: function (req: express.Request, res: express.Response) { return false; }
}));

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

// Create database pool connection
Database.create();
// Create search client
Search.create();

export = app;