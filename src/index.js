import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import store from './store/store';

import '../node_modules/toastr/build/toastr.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './styles/styles.css';

// material-ui
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('app')
);
