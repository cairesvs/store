import * as express from 'express';
import * as React from 'react';
import * as fetch from 'isomorphic-fetch';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from '../../shared/App';
import { Products } from '../../shared/products/Products';

const router = express.Router();

router.get('*', (req: express.Request, res: express.Response) => {
  const query = req.query.q;
  const pageSize = req.query.size || 16;
  const page = req.query.page || 1;
  Products.getInitialData(query, pageSize, page)
    .then(data => {
      const searchInfo = {
        results: data,
        term: query,
        pageSize: pageSize
      };
      const markup = renderToString(
        <StaticRouter location={req.baseUrl} context={searchInfo}>
          <App />
        </StaticRouter>
      );
      res.send(`
      <!DOCTYPE html>
      <head>
        <title>Store</title>
        <link rel="stylesheet" href="/css/main.css">
        <script src="/bundle.js" defer></script>
        <script>window.__data__ = ${JSON.stringify(data)}</script>
        <script>window.__term__ = ${JSON.stringify(query)}</script>
      </head>
      <body>
      <div id="root">${markup}</div >
      </body>
      </html>`);
    })
    .catch(err => console.log(err));
});


export = router;
