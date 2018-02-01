import * as express from 'express';
import * as React from 'react';
import * as fetch from 'isomorphic-fetch';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from '../../shared/App';
import Products from '../../shared/products/Products';

const router = express.Router();

router.get('*', (req: express.Request, res: express.Response) => {
  Products.getResponse(req.query.q)
    .then(data => {
      const markup = renderToString(
        <StaticRouter location={req.baseUrl} context={data}>
          <App />
        </StaticRouter>
      );
      res.send(`
      <!DOCTYPE html>
      <head>
        <title>mmartan</title>
        <link rel="stylesheet" href="/css/main.css">
        <script src="/bundle.js" defer></script>
        <script>window.__data__ = ${JSON.stringify(data.results)}</script>
      </head>
      <body>
      <div id="root">${markup}</div >
      </body>
      </html>`);
    })
    .catch(err => console.log(err));
});


export = router;
