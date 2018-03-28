import React from 'react';
import PropTypes from 'prop-types';

import NavLink from './NavLink';
import './styles.scss';

const NavLinks = [
	{ path: '/picks', name: 'My Picks' },
	{ path: '/leaderboard', name: 'Leaderboard' },
	{ path: '/rules', name: 'Rules' }
];

const Header = ({ user, heading }) => (
	<header className="Header">
		<h1 className="page-title">
			F1 Hero <span>// {heading}</span>
		</h1>
		<nav className="navbar">
			<ul>
				{NavLinks.map(link => (
					<li key={link.name}>
						<NavLink {...link} />
					</li>
				))}
				<li className="btn btn-secondary username">
					<i className="fa fa-user" aria-hidden="true" />
					{user.username}
				</li>
			</ul>
		</nav>
	</header>
);

Header.defaultProps = {
	user: {
		username: ''
	}
};

Header.propTypes = {
	user: PropTypes.shape({
		username: PropTypes.string
	}),
	heading: PropTypes.string.isRequired
};

export default Header;
