import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';


import Login from './components/Login';
import Master from './components/Master';
import * as actions from './actions';


class App extends Component {
	constructor() {
		super();
		this.state = { isAuth: null };
	}

  async componentDidMount() {
		const user = await axios.get('/api/current-user');
		this.setState({ isAuth: !!user.data });
    this.props.setUser(user);
  }

  render() {
		let content = '';
		
		if (this.state.isAuth === true) {
			content = <Master />;
		} else if (this.state.isAuth === false) {
			if (window.location.pathname !== '/login') {
				window.location.replace('/login');
			} else {
				content = <Login />
			}
		}
		
		return (
      <BrowserRouter>
        <div className="app">
          {content}
        </div>
      </BrowserRouter>
    );
	}
}

export default connect(null, actions)(App);
