import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Products } from './products/Products';
import Routes from './Route';

const App = () => {
    return (
        <Switch>
            {Routes.map((route, i) => <Route key={i} {...route} />)}
        </Switch>
    );
};

export default App;
