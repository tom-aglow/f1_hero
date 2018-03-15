import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

import App from './App';
import Login from './components/Login';

//	css styles
import './styles/main.scss';

const renderApp = async () => {
	let content;
	// const user = (await axios.get('/auth/current-user')).data;
  //
	// if (user) {
	// 	content = <App user={user} />;
	// } else if (window.location.pathname !== '/login') {
	// 	window.location.replace('/login');
	// } else {
	// 	content = <Login />;
	// }

	render(
		<BrowserRouter><App /></BrowserRouter>,
		document.getElementById('app')
	);
};

renderApp();

if (module.hot) {
	module.hot.accept('./App', () => {
		renderApp();
	});
}
