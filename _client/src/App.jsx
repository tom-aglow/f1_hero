import React, { Component } from 'react';
import { BrowserRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


import Login from './components/Login';
import Dashboard from './components/Dashboard';
import * as actions from './actions';


class App extends Component {
	constructor() {
		super();
		this.state = { isAuth: null };
	}

  async componentWillMount() {
    const res = await axios.get('/api/current_user');
    this.setState({ isAuth: !!res.data });
		console.log(res.data);

	}

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
		let content;
		
		if (this.state.isAuth === true) {
			content = <Dashboard />;
		} else if (this.state.isAuth === false) {
			if (window.location.pathname !== '/login') {
				content = <Redirect to="/login"/>
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

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, actions)(App);
