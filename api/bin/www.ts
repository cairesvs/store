/**
 * Module dependencies.
 */
import * as app from '../src/index';
import * as http from 'http';
import * as debug from 'debug';
import { Logger } from '../src/logger/logger';

/**
 * Get port from environment and store in Express.
 */
let PORT = process.env.PORT || '3000';

function getPort(val: string) {
    /**
     * Normalize a port into a number, string, or false.
     */
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}

app.set('port', PORT);
/**
 * Create HTTP server.
 */
const server = http.createServer(app);
Logger.info(`Server is up on ${PORT}`);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(PORT);

server.on('error', (error: Error) => {
    Logger.error(`Caught an error ${error.stack}`);
    throw error;
});

server.on('listening', () => {
    /**
     * Event listener for HTTP server "listening" event.
     */
    const addr = server.address();
    const bind = (typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`);
    (`Listening on ${bind}`);
});