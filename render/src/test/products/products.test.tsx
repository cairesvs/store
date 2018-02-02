import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-dom/test-utils';
import * as renderer from 'react-test-renderer';
import { Products, ProductsProps } from '../../main/shared/products/Products';
import { RouteComponentProps } from 'react-router';
import { UnregisterCallback, Href } from 'history';
import { Header } from '../../main/shared/products/Header';
import { Page } from '../../main/shared/products/Page';
import { Product } from '../../main/products/model';
import { ProductsItem } from '../../main/shared/products/ProductsItem';
import { ProductCategory } from '../../main/products/category';
import { ProductsList } from '../../main/shared/products/ProductsList';

it('<Header/>', () => {
    const data = {
        results: [],
        total: {
            count: 0
        }
    };
    const term: string = '';
    const total: number = 0;
    const pageSize: number = 16;
    const page: number = 1;
    const submitFn = (event: any) => { };
    const changeTermFn = (event: any) => { };
    const component = renderer.create(
        <Header submitFn={submitFn} changeTermFn={changeTermFn} />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

it('<Page/>', () => {
    const changePageFn = (page: number) => (event: React.MouseEvent<HTMLAnchorElement>) => { };
    const changePageSizeFn = (event: React.ChangeEvent<HTMLSelectElement>) => { };
    const pages = [] as number[];
    const term = '';
    const pageSize = 1;
    const component = renderer.create(
        <Page changePageFn={changePageFn} changePageSizeFn={changePageSizeFn} pages={pages} term={term} pageSize={pageSize} />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

it('<ProductsList/>', () => {
    const product = new Product('Sofá', 'Lindo sofá', [], 1000, 0, ProductCategory.COUCH, 1);
    const props = { total: 1, products: [product] };
    const component = renderer.create(
        <ProductsList products={props.products} total={props.total} />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

it('<ProductsItem/>', () => {
    const product = new Product('Sofá', 'Lindo sofá', [], 1000, 0, ProductCategory.COUCH, 1);
    const component = renderer.create(
        <ProductsItem product={product} />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

it('<ProductsItem/> without discount', () => {
    const product = new Product('Sofá', 'Lindo sofá', ['http://example.com/image.png'], 1000, 0, ProductCategory.COUCH, 1);
    const productItem: any = TestUtils.renderIntoDocument(
        <ProductsItem product={product} />
    );

    const productItemNode = ReactDOM.findDOMNode(productItem);
    const priceInfo = productItemNode.getElementsByClassName('products-info-price');
    expect(priceInfo.length).toEqual(1);

    expect(priceInfo[0].textContent).toEqual('R$1000');
});

it('<ProductsItem/> with discount', () => {
    const product = new Product('Sofá', 'Lindo sofá', ['http://example.com/image.png'], 1000, 10, ProductCategory.COUCH, 1);
    const productItem: any = TestUtils.renderIntoDocument(
        <ProductsItem product={product} />
    );

    const productItemNode = ReactDOM.findDOMNode(productItem);
    const priceInfo = productItemNode.getElementsByClassName('products-info-price');
    expect(priceInfo.length).toEqual(1);

    expect(priceInfo[0].textContent).toEqual('R$1000 por R$900');
});
