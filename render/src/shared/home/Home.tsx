import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import * as fetch from 'isomorphic-fetch';
import './Home.css';
import { ProductsListProperties, ProductsList } from '../products/ProductsList';
import { Product } from '../../products/model';

export interface HomeProps extends RouteComponentProps<HomeProps> { }

declare let BACKEND_HOST: string;
const host = BACKEND_HOST;

class Home extends React.Component<HomeProps, { products: Product[], term: string }> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      term: '',
      products: []
    };

    this.submit = this.submit.bind(this);
    this.changeTerm = this.changeTerm.bind(this);
  }

  changeTerm(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ term: event.target.value });
  }

  submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const url = `${host}/products/search?q=${this.state.term}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.results.length > 0)
          this.setState({ products: data.results });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className='home'>
        <header className='default-header'>
          <div className='search-container'>
            <form onSubmit={this.submit}>
              <input onChange={this.changeTerm} />
              <button>Find</button>
            </form>
          </div>
        </header>
        {this.state.products.length > 0 && <ProductsList products={this.state.products} />}
      </div>
    );
  }
}

export default Home;
