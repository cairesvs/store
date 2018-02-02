import * as React from 'react';
import './Products.css';
import * as fetch from 'isomorphic-fetch';
import { Product } from '../../products/model';
import { ProductsList, ProductsListProps } from './ProductsList';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Header } from './Header';
import { Typed } from './Typed';
import { Page } from './Page';

declare let BACKEND_HOST: string;
const host = BACKEND_HOST;

export interface ProductsProps extends RouteComponentProps<ProductsProps> {
  data: Product[];
  term: string;
  total: number;
  pageSize: number;
  page: number;
}

export class Products extends React.Component<ProductsProps, ProductsProps> {
  constructor(props: ProductsProps) {
    super(props);
    let data: Product[];
    let term: string;
    let total: number;
    let pageSize: number = 16;
    let page: number = 1;
    if (props.staticContext) {
      const sc = props.staticContext;
      data = !sc.results.error && sc.results.results || [];
      total = !sc.results.error && sc.results.total.count || 0;
      term = props.staticContext.term || '';
      pageSize = props.staticContext.pageSize || 16;
      page = props.staticContext.page || 1;
    } else {
      const dataWindow = (window as any).__data__;
      const termWindow = (window as any).__term__;
      data = !dataWindow.error && dataWindow.results || [];
      total = !dataWindow.error && dataWindow.total.count || 0;
      term = termWindow || '';
    }

    this.state = {
      total: total,
      term: term,
      data: data,
      page: page,
      pageSize: pageSize
    } as ProductsProps;

    this.changeTerm = this.changeTerm.bind(this);
    this.submit = this.submit.bind(this);
    this.changePageSize = this.changePageSize.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  changePage(page: number) {
    return (event: React.MouseEvent<HTMLAnchorElement>) => {
      this.props.history.push(`?q=${this.state.term}&size=${this.state.pageSize}&page=${page}`);
      event.preventDefault();
      Products.getInitialData(this.state.term, this.state.pageSize, page)
        .then(data => {
          if (!data.error)
            this.setState({ data: data.results, total: data.total.count, page: page });
        })
        .catch(error => console.log(error));
    };
  }

  changePageSize(event: React.ChangeEvent<HTMLSelectElement>) {
    const pageSize = parseInt(event.target.value, 10);
    this.props.history.push(`?q=${this.state.term}&size=${pageSize}&page=${this.state.page}`);
    Products.getInitialData(this.state.term, pageSize, this.state.page)
      .then(data => {
        if (!data.error)
          this.setState({ data: data.results, total: data.total.count, pageSize: pageSize });
      })
      .catch(error => console.log(error));
  }

  changeTerm(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ page: 1, term: event.target.value });
  }

  submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    this.props.history.push(`?q=${this.state.term}&size=${this.state.pageSize}&page=${this.state.page}`);
    Products.getInitialData(this.state.term, this.state.pageSize, this.state.page)
      .then(data => {
        if (!data.error)
          this.setState({ data: data.results, total: data.total.count });
      })
      .catch(error => console.log(error));
  }

  render() {
    const products = this.state.data;
    const total = this.state.total;
    const maxPage = Math.floor(total / this.state.pageSize);
    const pages = [...Array(maxPage).keys()].map((n) => n + 1);
    return (
      <div className='products'>
        <Header submitFn={this.submit} changeTermFn={this.changeTerm} />
        <Typed term={this.state.term} />
        <ProductsList total={total} products={products} />
        <Page changePageSizeFn={this.changePageSize} changePageFn={this.changePage}
          pages={pages} term={this.state.term} pageSize={this.state.pageSize} />
      </div>
    );
  }

  static getInitialData(term: string, size: number = 16, page: number = 1): Promise<any> {
    return fetch(`${host}/products/search?q=${term}&size=${size}&page=${page}`)
      .then(response => response.json());
  }
}

export default Products;
