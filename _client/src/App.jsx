import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import Header from './components/Header/container';
import Leaderboard from './scenes/Leaderboard/container';
import Picks from './scenes/Picks/container';
import Rules from './scenes/Rules/container';

//	css styles
import './styles/layout.scss';

//	404 component placeholder
const FourOhFour = () => <h1>404</h1>;

const App = () => (
	<Provider store={store}>
		<div className="app">
			<Header />
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
