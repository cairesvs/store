import * as express from 'express';
import { Product } from '../products/model';
import { ProductService } from '../products/service';
import { ProductRespository } from '../products/repository';
import { ProductSearch } from '../products/search';
const router = express.Router();
const productRepository = new ProductRespository();
const productSearch = new ProductSearch();
const productService = new ProductService(productRepository, productSearch);

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
    productService.add(product)
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
    const size = req.query.size || 16;
    const page = req.query.page || 1;
    productSearch.search(text, size, page)
        .then((result) => res.json({
            results: result
        }))
        .catch((reason) => res.json({
            error: `Error searching for products with text ${text} caused by ${reason}`
        }));
});

export = router;