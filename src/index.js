import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createStore, applyMiddleware } from 'redux';
import myReducer from './reduces/index';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import Boss from './Boss';

const store = createStore(
  myReducer,
  applyMiddleware(thunk),
)

ReactDOM.render(
  <Provider store={store}>
    <Boss />
  </Provider>
  ,
  document.getElementById('root'));

serviceWorker.unregister();