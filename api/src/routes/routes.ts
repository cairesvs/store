import * as express from 'express';
import { Product } from '../products/model';
import { ProductRespository } from '../products/repository';
import { Logger } from '../logger/logger';

const router = express.Router();
const productRepository = new ProductRespository();

router.get('/products', (req: express.Request, res: express.Response) => {
    const id = req.query.id;
    productRepository.get(id)
        .then((product) => res.json(product))
        .catch((reason) => res.json({
            error: `Error fetching id ${id} caused by: ${reason}`
        }));
});

router.post('/products', (req: express.Request, res: express.Response) => {
    const product = new Product(req.body.name, req.body.description, req.body.photos, req.body.price, req.body.discount, req.body.category);
    productRepository.add(product)
        .then((result) => res.json({
            inserted: true,
        }))
        .catch((reason) => res.json({
            inserted: false,
            error: `Error inserting product caused by ${reason}`
        }));
});

router.get('/products/search', (req: express.Request, res: express.Response) => {
    const text = req.query.q;
    const size = parseInt(req.query.size) || 16;
    const page = parseInt(req.query.page, 10) || 1;
    productRepository.search(text, size, page)
        .then((result) => res.json({
            results: result.results,
            total: result.total
        }))
        .catch((reason) => res.json({
            error: `Error searching for products with text ${text} caused by ${reason}`
        }));
});

export = router;
