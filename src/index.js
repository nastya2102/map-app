import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import * as serviceWorker from './serviceWorker';
import { HashRouter } from 'react-router-dom';
import reducer from './Reducers';
import Routes from './routes';

const layerLocal = localStorage.getItem('layer');

const initialState = {
  layer: (layerLocal && JSON.parse(layerLocal)) || {},
};

const store = createStore(reducer, initialState);

store.subscribe(() => {
  localStorage.setItem('layer', JSON.stringify(store.getState().layer));
});

ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <Routes/>
    </Provider>
  </HashRouter>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
