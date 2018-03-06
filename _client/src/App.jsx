import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

import Leaderboard from './components/leaderboard/_Leaderboard';
import Picks from './components/picks/_Picks';
import Header from './components/Header';
import Rules from './components/rules/_Rules';

//	404 component placeholder
const FourOhFour = () => <h1>404</h1>;

//	app state store
const store = createStore(
	reducers,
	compose(
		applyMiddleware(reduxThunk),
		typeof window === 'object' &&
		typeof window.devToolsExtension !== 'undefined'
			? window.devToolsExtension()
			: f => f
	)
);

if (module.hot) {
	module.hot.accept('./reducers', () => {
		const nextRootReducer = require('./reducers/index');
		store.replaceReducer(nextRootReducer);
	});
}

const App = props => (
	<Provider store={store}>
		<div className="app">
			<Header user={props.user} />
			<Switch>
				<Route exact path="/" component={Picks} />
				<Route exact path="/picks" component={Picks} />
				<Route path="/leaderboard" component={Leaderboard} />
				<Route path="/rules" component={Rules} />
				<Route component={FourOhFour} />
			</Switch>
		</div>
	</Provider>
);

export default App;
export { store };
