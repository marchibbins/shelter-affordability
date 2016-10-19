import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';

import App from './components/App';
import store from './store';
import { URLS } from './config';

const handleUpdate = () => {
    if (window.dataLayer && (window.location.pathname !== URLS.baseUrl)) {
        window.dataLayer.push({
            'event': 'VirtualPageview',
            'virtualPageURL': window.location.pathname,
            'virtualPageTitle': `Affordability (More Homes)  – ${window.location.pathname.split('/').pop()}`
        });
    }
};

ReactDOM.render(

    <Provider store={store}>
        <Router history={browserHistory} onUpdate={handleUpdate}>
            <Route path={URLS.baseUrl} component={App}/>
            <Route path={URLS.baseUrl + '/:slug'} component={App}/>
        </Router>
    </Provider>,

document.getElementById('affordability-app'));
