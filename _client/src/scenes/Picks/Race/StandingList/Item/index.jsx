import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const Item = ({ score, position, _driver }) => {
	const icon =
		score !== null ? (
			<div className="score">{score}pt</div>
		) : (
			<i className="fa fa-sort" aria-hidden="true" />
		);

	return (
		<div className="StandingItem">
			<div className="position">{position}.</div>
			<div className="driver-name">{_driver.name}</div>
			<div className="driver-code">{_driver.code}</div>
			{icon}
		</div>
	);
};

Item.defaultProps = {
	score: null
};

Item.propTypes = {
	score: PropTypes.number,
	position: PropTypes.number.isRequired,
	_driver: PropTypes.shape({
		name: PropTypes.string.isRequired,
		code: PropTypes.string.isRequired
	}).isRequired
};

export default Item;
