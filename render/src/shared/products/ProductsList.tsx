import * as React from 'react';
import './Products.css';
import { Product } from '../../products/model';
import './Products.css';

export interface ProductsListProps { products: Product[]; }

export class ProductsList extends React.Component<ProductsListProps, {}> {
    render() {
        const products = this.props.products;

        return (
            <div className='productslist'>
                <div className='header'>
                    <div className='header-title'>
                        <strong>Store</strong>
                    </div>
                </div>

                {products &&
                    products.map(product =>
                        <div key={product.id} className='products-item'>
                            <p>
                                <span className='products-position'>{product.id}</span> {product.name}{' '}
                            </p>
                        </div>
                    )}
            </div>
        );
    }
}
