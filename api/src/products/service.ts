import { Product } from "./model";
import { ProductRespository } from "./repository";

export class ProductService {
    repository: ProductRespository;
    constructor(repository: ProductRespository) {
        this.repository = repository;
    }

    async add(product: Product): Promise<boolean> {
        let promise: Promise<boolean>;
        try {
            await this.repository.add(product);
            promise = Promise.resolve(true);
        } catch (err) {
            promise = Promise.reject(err)
        }
        return promise;
    }

}