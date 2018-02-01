import Home from './home/Home';
import Products from './products/Products';

const routes = [
    {
        path: '/',
        exact: true,
        component: Home
    },
    {
        path: '/products',
        component: Products
    }
];

export default routes;
