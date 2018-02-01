import * as React from 'react';
import './Products.css';
import * as fetch from 'isomorphic-fetch';
import { Product } from '../../products/model';
import { ProductsList, ProductsListProps } from './ProductsList';
import { RouteComponentProps } from 'react-router-dom';

declare let BACKEND_HOST: string;
const host = BACKEND_HOST;

export interface ProductsProperties extends RouteComponentProps<ProductsProperties> { data: Product[]; term: string; }

export class Products extends React.Component<ProductsProperties, ProductsListProps> {
  constructor(props: ProductsProperties) {
    super(props);
    let data: Product[];
    if (props.staticContext) {
      data = props.staticContext.results;
    } else {
      data = (window as any).__data__;
      delete (window as any).__data__;
    }
    this.state = { products: data };
  }

  render() {
    const products = this.state.products;
    return <ProductsList products={products} />;
  }

  static getResponse(term: string): Promise<any> {
    return fetch(`${host}/products/search?q=${term}`)
      .then(response => response.json());
  }
}

export default Products;
