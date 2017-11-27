import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import Header from './components/Header';
import * as actions from './actions';

//	404 component placeholder
const FourOhFour = () => <h1>404</h1>;

class App extends Component {
  componentDidMount() {
  	this.props.fetchUser();
	}

  render() {
    return (
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/leaderboard" component={Leaderboard} />
            <Route component={FourOhFour} />
          </Switch>
        </div>
    );
  }
}

export default connect(null, actions)(App);
