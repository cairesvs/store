import { Product } from "./model";
import { Database } from "../database/database";
import { QueryResult } from "pg";

export class ProductRespository {
    async add(product: Product): Promise<boolean> {
        let promise: Promise<boolean>;
        try {
            const client = await Database.getConnection().connect();
            const result = await client.query('INSERT INTO products(name, description, photos, price, discount, category) VALUES($1,$2,$3,$4,$5,$6) RETURNING id',
                [product.name, product.description, product.photos, product.price, product.discount, product.category]);
            client.release();
            product.setID(result.rows[0].id);
            promise = Promise.resolve(true);
        } catch (err) {
            promise = Promise.reject(`Problem executing the query ${err}`);
        }
        return promise;
    }

    async get(id: number): Promise<Product> {
        let promise: Promise<Product>;
        try {
            const client = await Database.getConnection().connect();
            const result = await client.query('SELECT * FROM products where id = $1', [id]);
            client.release();
            const pr = result.rows[0];
            if (pr) {
                promise = Promise.resolve(new Product(pr.name, pr.description, pr.photos, pr.price, pr.discount, pr.category));
            } else {
                promise = Promise.reject(`Couldn't find product with id ${id}`);
            }
        } catch (err) {
            promise = Promise.reject(`Problem executing the query ${err}`);
        }
        return promise;
    }
}