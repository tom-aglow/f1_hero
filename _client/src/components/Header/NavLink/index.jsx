/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavLink = ({ path, name }) => (
	<Link to={path} className="btn btn-primary">
		{name}
	</Link>
);

NavLink.propTypes = {
	path: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired
};

export default NavLink;
