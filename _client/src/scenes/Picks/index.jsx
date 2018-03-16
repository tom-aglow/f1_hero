import React from 'react';
import Race from './Race/container';

const Picks = ({ races }) => {
	const content =
		races && races.length > 0 ? (
			races.map(race => <Race key={race.round} race={race} />)
		) : (
			<div className="loader" />
		);

	return (
		<div className="race-holder" id="race-holder">
			{content}
		</div>
	);
};

export default Picks;
