import { IndexDocumentParams } from "elasticsearch";
import { Product } from "./model";
export class ProductIndexable implements IndexDocumentParams<Product> {
    constructor(readonly index: string, readonly type: string, readonly id: string, readonly body: Product) { }

}