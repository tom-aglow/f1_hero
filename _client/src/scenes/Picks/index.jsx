import React from 'react';
import PropTypes from 'prop-types';
import Race from './Race/container';

import './styles.scss';

const Picks = ({ races }) => {
	const content =
		races && races.length > 0 ? (
			races.map(race => <Race key={race.round} race={race} races={races} />)
		) : (
			<div className="loader" />
		);

	return (
		<div className="Picks" id="race-holder">
			{content}
		</div>
	);
};

Picks.propTypes = {
	races: PropTypes.arrayOf(
		PropTypes.shape({
			round: PropTypes.number
		})
	).isRequired
};

export default Picks;
