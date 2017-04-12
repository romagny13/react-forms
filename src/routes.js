import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import SimplePage from './components/simple/SimplePage';
import ReactBootstrapPage from './components/react-bootstrap/ReactBootstrapPage';
import MaterialUiPage from './components/material-ui/MaterialUiPage';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={SimplePage} />
        <Route path="react-bootstrap" component={ReactBootstrapPage} />
        <Route path="material-ui" component={MaterialUiPage} />
    </Route>
);
