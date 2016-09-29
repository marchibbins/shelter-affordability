import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';

import App from './components/App';
import store from './store';
import { URLS } from './config';

ReactDOM.render(

    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path={URLS.baseUrl} component={App}/>
            <Route path={URLS.baseUrl + '/:slug'} component={App}/>
        </Router>
    </Provider>,

document.getElementById('affordability-app'));
