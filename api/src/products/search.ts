import { Product } from "./model";
import { Search } from "../database/search";
import { IndexDocumentParams } from "elasticsearch";
import { ProductIndexable } from "./index";

export class ProductSearch {
    async search(text: string, size: number, page: number): Promise<Product[]> {
        const connection = Search.getConnection();
        let promise: Promise<Product[]>;
        try {
            const body = await connection.search<Product>({
                size: size,
                from: page === 1 ? 0 : size * page,
                q: text
            });
            const hits = body.hits.hits;
            const products = hits.map(h => {
                const product = new Product(h._source.name, h._source.description, h._source.photos, h._source.price, h._source.discount, h._source.category)
                product.setID(parseInt(h._id, 10));
                return product;
            });
            promise = Promise.resolve(products);
        } catch (err) {
            promise = Promise.reject(`Error occurred when searching for ${text} caused by ${err}`);
        }
        return promise;
    }

    async index(product: Product): Promise<boolean> {
        const connection = Search.getConnection();
        const indexable = new ProductIndexable('products', 'products', "" + product.getID(), product);
        let promise: Promise<boolean>;
        try {
            await connection.index(indexable);
            promise = Promise.resolve(true);
        } catch (err) {
            promise = Promise.reject(`Error occurred when indexing product id ${product.getID()} caused by ${err}`);
        }
        return promise;
    }
}