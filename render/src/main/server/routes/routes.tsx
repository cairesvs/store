import * as express from 'express';
import * as React from 'react';
import * as fetch from 'isomorphic-fetch';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from '../../shared/App';
import { Products } from '../../shared/products/Products';

const router = express.Router();

function getMarkup(url: string, searchInfo: { results: any, term: string, page: number, pageSize: number }): string {
  const markup = renderToString(
    <StaticRouter location={url} context={searchInfo}>
      <App />
    </StaticRouter>
  );
  const fullMarkup = `
      <!DOCTYPE html>
      <head>
        <title>Store</title>
        <link rel="stylesheet" href="/css/main.css">
        <script src="/bundle.js" defer></script>
        <script>window.__data__ = ${JSON.stringify(searchInfo.results)}</script>
        <script>window.__term__ = ${JSON.stringify(searchInfo.term)}</script>
      </head>
      <body>
      <div id="root">${markup}</div >
      </body>
      </html>`;
  return fullMarkup;
}

function extractMetadata(params: any): [string, number, number] {
  return [
    params.q,
    parseInt(params.size),
    parseInt(params.page)
  ];
}

router.get('/', (req: express.Request, res: express.Response) => {
  const [term, pageSize, page] = extractMetadata(req.query);
  Products.getInitialData(term, pageSize, page)
    .then(data => {
      const markup = getMarkup(req.url, {
        results: data,
        pageSize: pageSize,
        page: page,
        term: term
      });
      res.send(markup);
    })
    .catch(error => console.log(error));
});

export default router;
