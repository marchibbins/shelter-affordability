import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory} from 'react-router';

import App from './components/App';
import store from './store';

ReactDOM.render(

    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App} />
        </Router>
    </Provider>,

document.getElementById('affordability-app'));
