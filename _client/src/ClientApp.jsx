import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import Header from './components/Header';
import './../styles/main.scss';

const FourOhFour = () => <h1>404</h1>;

const App = () => (
  <BrowserRouter>
    <div>
			<Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/leaderboard" component={Leaderboard} />
        <Route component={FourOhFour} />
      </Switch>
    </div>
  </BrowserRouter>
);

render(<App />, document.getElementById('app'));
