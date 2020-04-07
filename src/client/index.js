import '@babel/polyfill';
import 'whatwg-fetch';

import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Catch from './catch';
import Main from './pages/main';
import reducer from './reducers';
import data from './data/data.js';
import mess from './data/mess.js';

const store = createStore(reducer, {data: data, state: {right_panel_mode: 'direct', active_users: new Set()}});

ReactDOM.render(
    <Provider store={store}>
        <Catch>
            <Router>
              <Switch>
                    <Route
                      path="/"
                      component={Main}
                      exact />
              </Switch>
            </Router>
        </Catch>
    </Provider>,
    document.getElementById('app')
);
