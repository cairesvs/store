import { Product } from './model';
import { Database } from '../database/database';
import { QueryResult } from 'pg';

export class ProductSearchResponse {
    constructor(readonly results: Product[], readonly total: { count: number }) { }
}

export class ProductRespository {
    async add(product: Product): Promise<Product> {
        let promise: Promise<Product>;
        try {
            const client = await Database.getConnection().connect();
            const tsvector = `'${product.name}' || '. ' || '${product.description}'`;
            const sql = `INSERT INTO products(name, description, photos, price, discount, category, document)
                         VALUES($1,$2,$3,$4,$5,$6,to_tsvector(${tsvector})) RETURNING id`;
            const result = await client.query(
                sql,
                [product.name, product.description, product.photos, product.price, product.discount, product.category]);
            client.release();
            const productWithID = new Product(product.name, product.description, product.photos, product.price, product.discount, product.category, result.rows[0].id);
            promise = Promise.resolve(productWithID);
        } catch (err) {
            promise = Promise.reject(`Problem executing the query ${err}`);
        }
        return promise;
    }

    async get(id: number): Promise<Product> {
        let promise: Promise<Product>;
        try {
            const client = await Database.getConnection().connect();
            const result = await client.query('SELECT * FROM products WHERE id = $1', [id]);
            client.release();
            const pr = result.rows[0];
            if (pr) {
                promise = Promise.resolve(new Product(pr.name, pr.description, pr.photos, pr.price, pr.discount, pr.category, pr.id));
            } else {
                promise = Promise.reject(`Couldn't find product with id ${id}`);
            }
        } catch (err) {
            promise = Promise.reject(`Problem executing the query ${err}`);
        }
        return promise;
    }

    async search(text: string, size: number, page: number): Promise<ProductSearchResponse> {
        let promise: Promise<ProductSearchResponse>;
        try {
            const client = await Database.getConnection().connect();
            const resultSearch = await client.query(`SELECT * FROM products WHERE document @@ to_tsquery('${text}') LIMIT $1 OFFSET $2`, [size, page === 1 ? 0 : size * page]);
            const resultTotal = await client.query(`SELECT count(*) FROM products WHERE document @@ to_tsquery('${text}')`, []);
            client.release();
            const products = resultSearch.rows.map(p => {
                const product = new Product(p.name, p.description, p.photos, p.price, p.discount, p.category, p.id);
                return product;
            });
            promise = Promise.resolve(new ProductSearchResponse(products, resultTotal.rows[0]));
        } catch (err) {
            promise = Promise.reject(`Problem executing the query ${err}`);
        }
        return promise;
    }
}
