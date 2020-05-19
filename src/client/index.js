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
import dataUser from  './data/user.js';
import ENCKey from './data/ENC_KEY.js';
import QueryService from './services/index.js';
import {replaceChannels} from './actions/index.js';

let tmp = { "message" : null , "channels" : null, "user" : null, "profile" : null, "users" : null};

tmp.user = dataUser.user;
tmp.profile = dataUser.profile;
tmp.users = dataUser.users;

console.log("TMP :::");
console.log(tmp);
console.log("DATA :::");
console.log(data);

const store = createStore(reducer,
    {
        encKey: ENCKey.key,
        data: data,
        msi : data.message,
        channelsXPEHb : new Set(),
        state: {
            right_panel_mode: 'direct',
            active_chat_id : '0',
            activeTabs : new Set(),
            activeTab : 0,
            active_users: new Set()
        }
    }
    );

// async function myFun() {
//     let queryService = new QueryService();
//     console.log("v ==== replaceChannels: ==== v");
//     //replaceChannels(await queryService.getResource('/badapi/users/1/channels'));
//     replaceChannels( new Set([7,8,9]));
//     console.log("^ ==== replaceChannels: ==== ^");
// }
// myFun();

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
