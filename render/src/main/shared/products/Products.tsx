import * as React from 'react';
import './Products.css';
import * as fetch from 'isomorphic-fetch';
import { Product } from '../../products/model';
import { ProductsList, ProductsListProps } from './ProductsList';
import { RouteComponentProps, Link } from 'react-router-dom';
const logo = require('./logo.svg') as string;
const search = require('./search.svg') as string;

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
      data = props.staticContext.results.results || [];
      total = props.staticContext.results.total.count || 0;
      term = props.staticContext.term || '';
      pageSize = props.staticContext.pageSize || 16;
      page = props.staticContext.page || 1;
    } else {
      data = (window as any).__data__.results;
      total = (window as any).__data__.total.count;
      delete (window as any).__data__;
      term = (window as any).__term__;
      delete (window as any).__term__;
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
        <header className='default-header'>
          <img src={logo} />
          <div className='search-container'>
            <form onSubmit={this.submit}>
              <input type='search' className='search' placeholder='Buscar produtos...' onChange={this.changeTerm} />
            </form>
          </div>
        </header>
        {
          <div className='typed'>
            <span>{this.state.term}</span>
          </div>}
        {<ProductsList total={total} products={products} />}
        <div className='products-page'>
          <div className='products-page-size'>
            <select onChange={this.changePageSize}>
              <option value='16'>16 produtos por página</option>
              <option value='30'>30 produtos por página</option>
              <option value='50'>50 produtos por página</option>
            </select>
          </div>
          <div className='products-page-number'>
            {pages &&
              pages.map((page, i) =>
                <Link
                  key={i}
                  onClick={this.changePage(page)}
                  to={`/?q=${this.state.term}&size=${this.state.pageSize}&page=${page}`}>{page}</Link>
              )}
          </div>
        </div>
      </div>
    );
  }

  static getInitialData(term: string, size: number = 16, page: number = 1): Promise<any> {
    return fetch(`${host}/products/search?q=${term}&size=${size}&page=${page}`)
      .then(response => response.json());
  }
}

export default Products;
