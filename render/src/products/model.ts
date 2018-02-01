import { ProductCategory } from "./category";

export class Product {
    constructor(readonly name: string, readonly description: string, readonly photos: string[],
        readonly price: number, readonly discount: number, readonly category: ProductCategory, readonly id?: number) { }
}