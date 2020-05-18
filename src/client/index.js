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
import dataUser from  './data/user.js'
import ENCKey from './data/ENC_KEY.js'

// //С ES6 fetch
// fetch('http://dataserver/data.json')
//   .then(data => {
//     // ...что-то делает с данными
//   }).catch(error => {
//     // Обработка ошибки
// });

// let somename = Object.assign({}, src1, src2, src3)

let tmp = { "message" : null , "channels" : null, "user" : null, "profile" : null, "users" : null};
let tmp2 = {}

// fetch('http://localhost:30001/badapi/users/1/channels').then( dataChanels =>
//   dataChanels.json().then( ent => tmp2.some = ent), err => console.log("ERROR : BAD PARSE DATA_CHANNELS" + err))
//     .catch( e => console.log("ERROR: " + e));

// fetch('http://localhost:30001/badapi/users/1/channels').then( dataChanels =>
//     dataChanels.json().then(x => {tmp.message= JSON.parse(JSON.stringify(x)); console.log(x);}),
//      err => console.log("ERROR : BAD PARSE DATA_CHANNELS" + err))
//     .catch( e => console.log("ERROR: " + e));
// let a = await !!!! ( async )

// fetch('http://localhost:30001/badapi/channels/1/messages').then( dataMessages =>
//   dataMessages.json().then( ent => console.log(ent)), err => console.log("ERROR : BAD PARSE DATA_MESSAGE" + err))
//     .catch( e => console.log("ERROR: " + e));
//
// fetch('http://localhost:30001/badapi/channels/1/messages').then( dataMessages =>
//   dataMessages.json().then( ent => ({js : ent , status : response.status})).then( res => tmp.message=res.js);



tmp.user = dataUser.user;
tmp.profile = dataUser.profile;
tmp.users = dataUser.users;

console.log("TMP :::");
console.log(tmp);
console.log("DATA :::");
console.log(data);

//let messages = data.message;

const store = createStore(reducer,
    {
        encKey: ENCKey.key,
        data: data,
        msi : data.message,
        state: {
            right_panel_mode: 'direct',
            active_chat_id : '0',
            activeTabs : new Set(),
            activeTab : 0,
            active_users: new Set()
        }
    }
    );

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
