import React from 'react';
import PropTypes from 'prop-types';

import NavLink from './NavLink';

const NavLinks = [
	{ path: '/picks', name: 'My Picks' },
	{ path: '/leaderboard', name: 'Leaderboard' },
	{ path: '/rules', name: 'Rules' }
];

const Header = ({ user }) => (
	<header className="page-header">
		<h1 className="page-title">
			F1 Hero <span>// Page header!!!</span>
		</h1>
		<nav className="navbar">
			<ul>
				{NavLinks.map(link => (
					<li>
						<NavLink {...link} key={link.name} />
					</li>
				))}
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
