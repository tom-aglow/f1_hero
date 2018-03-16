import React from 'react';
import Race from './Race';

const Picks = ({ races }) => {
	const content =
		races && races.length > 0 ? (
			races.map(race => (
				<Race race={race} key={race.round} />
			))
		) : (
			<div className="loader" />
		);

	return (
		<div className="race-holder">
			{content}
		</div>
	);
};

export default Picks;
