import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createStore } from 'redux';
import myReducer from './reduces/index';
import { Provider } from 'react-redux'
import Test from './testTheme/test';

const store = createStore(
  myReducer,
)

ReactDOM.render(
  <Provider store={store}>
    {/* <App /> */}
    <Test />
  </Provider>
  ,
  document.getElementById('root'));

serviceWorker.unregister();