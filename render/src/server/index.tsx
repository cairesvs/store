import * as express from 'express';
import * as winston from 'winston';
import * as config from 'config';
import * as routes from './routes/routes';

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));

app.use('*', routes);

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
    res.json({
        message: err.message,
        error: {}
    });
});

export = app;
