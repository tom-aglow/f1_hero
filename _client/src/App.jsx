import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import Content from './Content';
import Login from './scenes/Login';
import requireAuth from './hoc/requireAuth';

//	css styles
import './styles/layout.scss';

const App = () => (
	<Provider store={store}>
		<div className="app">
			<Switch>
				<Route path="/login" component={Login} />
				<Route path="" component={requireAuth(Content)} />
			</Switch>
		</div>
	</Provider>
);

export default App;
export { store };
