import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

class ScoreRow extends Component {
	shouldComponentUpdate() {
		return false;
	}

	render() {
		const { index, user, total } = this.props;

		return (
			<div className="ScoreRow">
				<div>{index + 1}.</div>
				<div className="username">{user}</div>
				<div>{total}pt</div>
			</div>
		);
	}
}

ScoreRow.propTypes = {
	user: PropTypes.string.isRequired,
	total: PropTypes.number.isRequired,
	index: PropTypes.number.isRequired
};

export default ScoreRow;
