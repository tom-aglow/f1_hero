import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
	render() {
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
			</nav>
		)
	}
}

export default Header;
