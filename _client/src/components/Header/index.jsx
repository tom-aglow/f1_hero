import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Header = ({ user }) => (
	<header className="page-header">
		<h1 className="page-title">
			F1 Hero <span>// Page header!!!</span>
		</h1>
		<nav className="navbar">
			<ul>
				<li>
					<Link to="/picks" className="btn btn-primary">
						My Picks
					</Link>
				</li>
				<li>
					<Link to="/leaderboard" className="btn btn-primary">
						Leaderboard
					</Link>
				</li>
				<li>
					<Link to="/rules" className="btn btn-primary">
						Rules
					</Link>
				</li>
				<li className="btn btn-secondary username">
					<i className="fa fa-user" aria-hidden="true" />
					{user ? user.username : ''}
				</li>
			</ul>
		</nav>
	</header>
);

Header.propTypes = {
	user: PropTypes.shape({
		username: PropTypes.string
	}).isRequired
};

export default Header;
