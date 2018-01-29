import { Product } from "./model";
import { ProductRespository } from "./repository";
import { ProductSearch } from "./search";

export class ProductService {
    repository: ProductRespository;
    search: ProductSearch;
    constructor(repository: ProductRespository, search: ProductSearch) {
        this.repository = repository;
        this.search = search;
    }

    async add(product: Product): Promise<boolean> {
        let promise: Promise<boolean>;
        try {
            await this.repository.add(product);
            await this.search.index(product);
            promise = Promise.resolve(true);
        } catch (err) {
            promise = Promise.reject(err)
        }
        return promise;
    }

}