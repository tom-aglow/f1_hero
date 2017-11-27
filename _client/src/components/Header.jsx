import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
	renderUsername() {
		if (this.props.auth) {
			return (
				<div>{this.props.auth.username}</div>
			)
		}
	}
	
  render() {
  	console.log(this.props.auth);
    return (
      <nav>
        <ul>
          <li>
            <Link to={'/'}>My Picks</Link>
          </li>
          <li>
            <Link to={'/leaderboard'}>Leaderboard</Link>
          </li>
        </ul>
				{this.renderUsername()}
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
