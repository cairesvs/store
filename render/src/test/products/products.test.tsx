import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-dom/test-utils';
import * as renderer from 'react-test-renderer';
import { Products, ProductsProps } from '../../main/shared/products/Products';
import { RouteComponentProps } from 'react-router';
import { UnregisterCallback, Href } from 'history';
import { Header } from '../../main/shared/products/Header';

it('empty <Header/>', () => {
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
