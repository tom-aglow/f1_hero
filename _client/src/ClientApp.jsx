import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import Perf from 'react-addons-perf';

import App from './App';
import Login from './components/Login';

//  performance tools
window.Perf = Perf;
Perf.start();

//	css styles
import './styles/main.scss';

const renderApp = async () => {
  let content;
  const user = (await axios.get('/api/current-user')).data;

  if (user) {
    content = <App />;
  } else if (window.location.pathname !== '/login') {
    window.location.replace('/login');
  } else {
    content = <Login />;
  }

  render(
    <BrowserRouter>{content}</BrowserRouter>,
    document.getElementById('app')
  );
};

renderApp();

if (module.hot) {
  module.hot.accept('./App', () => {
    renderApp();
  });
}
