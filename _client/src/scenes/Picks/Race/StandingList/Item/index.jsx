import React from 'react';

const Item = ({ score, position, _driver }) => {
	const icon =
		score !== undefined ? (
			<div className="score">{score}pt</div>
		) : (
			<i className="fa fa-sort" aria-hidden="true" />
		);
	
	return (
		<div className="standing">
			<div className="position">{position}.</div>
			<div className="driver-name">{_driver.name}</div>
			<div className="driver-code">{_driver.code}</div>
			{icon}
		</div>
	);
};

export default Item;
