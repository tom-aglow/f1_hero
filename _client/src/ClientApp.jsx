import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import Perf from 'react-addons-perf';

import App from './App';
import reducers from './reducers';

import axios from 'axios';
window.axios = axios;

//  performance tools
window.Perf = Perf;
Perf.start();

//	css styles
import './styles/main.scss';

//	app state store
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

const renderApp = () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app')
  );
};

renderApp();

if (module.hot) {
  module.hot.accept('./App', () => {
    renderApp();
  });
}
