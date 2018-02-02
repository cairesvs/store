import * as React from 'react';
import './Products.css';
import { Product } from '../../products/model';
import { ProductsItem } from './ProductsItem';

export interface ProductsListProps { total: number; products: Product[]; }

export class ProductsList extends React.Component<ProductsListProps, {}> {
    render() {
        const products = this.props.products;

        return (
            <div className='productslist'>
                <div className='header'>
                    <div className='header-title'>
                        <strong>{this.props.total} produtos encontrados</strong>
                    </div>
                </div>

                {products &&
                    products.map((product, i) =>
                        <ProductsItem key={i} product={product} />
                    )}
            </div>
        );
    }
}
