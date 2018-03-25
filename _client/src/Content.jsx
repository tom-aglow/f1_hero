import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './components/Header/container';
import Picks from './scenes/Picks/container';
import Leaderboard from './scenes/Leaderboard/container';
import Rules from './scenes/Rules/container';

//	404 component placeholder
const FourOhFour = () => <h1>404</h1>;

const Content = () => (
	<div>
		<Header />
		<Switch>
			<Route exact path="/" component={Picks} />
			<Route exact path="/picks" component={Picks} />
			<Route path="/leaderboard" component={Leaderboard} />
			<Route path="/rules" component={Rules} />
			<Route component={FourOhFour} />
		</Switch>
	</div>
);

export default Content;
