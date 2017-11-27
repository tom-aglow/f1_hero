import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import Leaderboard from '../pages/Leaderboard';
import Header from './Header';

//	404 component placeholder
const FourOhFour = () => <h1>404</h1>;

const Dashboard = () => (
	<div>
		<Header />
		<Switch>
			<Route exact path="/" component={Home} />
			<Route path="/leaderboard" component={Leaderboard} />
			<Route component={FourOhFour} />
		</Switch>
	</div>
);

export default Dashboard;
