import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Picks from './picks/_Picks';
import Leaderboard from './leaderboard/_Leaderboard';
import Header from './Header';

//	404 component placeholder
const FourOhFour = () => <h1>404</h1>;

const Dashboard = () => (
  <div>
    <Header />
    <Switch>
      <Route exact path="/" component={Picks} />
      <Route exact path="/picks" component={Picks} />
      <Route path="/leaderboard" component={Leaderboard} />
      <Route component={FourOhFour} />
    </Switch>
  </div>
);

export default Dashboard;
