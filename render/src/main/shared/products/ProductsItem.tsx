import * as React from 'react';
import { Product } from '../../products/model';

export class ProductsItem extends React.Component<{ product: Product }, any> {
    render() {
        const product = this.props.product;
        const hasDiscount = product.discount > 0;
        let finalPrice = product.price;
        if (hasDiscount) finalPrice = product.price - (product.price * (product.discount / 100));
        return (
            <div className='products-info'>
                <div className='products-info-images'>
                    {product.photos.slice(0, 4).map((photo, i) => <img width='80' height='80' key={i} src={photo} />)}
                </div>
                <div className='products-info-detail'>
                    <p>{product.name}</p>
                    <p>{product.description}</p>
                </div>
                {!hasDiscount &&
                    <div className='products-info-price'>
                        <span>R${product.price}</span>
                    </div>
                }
                {hasDiscount &&
                    <div className='products-info-price'>
                        <span className='product-has-discount'>R${product.price}</span> por <span>R${finalPrice}</span>
                    </div>
                }
            </div>
        );
    }
}
