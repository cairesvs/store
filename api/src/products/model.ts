import { ProductCategory } from "./category";

export class Product {
    private id: number;
    constructor(readonly name: string, readonly description: string, readonly photos: string[],
        readonly price: number, readonly discount: number, readonly category: ProductCategory) { }

    getID(): number {
        return this.id;
    }

    setID(id: number): void {
        this.id = id;
    }
}