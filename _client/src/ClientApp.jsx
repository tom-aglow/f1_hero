import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './App';
import reducers from './reducers';

import axios from 'axios';
window.axios = axios;

//	css styles
import './styles/main.scss';

//	app state store
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));


const renderApp = () => {
  render(
    <BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>
    </BrowserRouter>,
    document.getElementById('app')
  );
};

renderApp();
