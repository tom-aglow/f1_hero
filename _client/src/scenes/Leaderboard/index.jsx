import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ScoreRow from './ScoreRow';
import SearchBar from './SearchBar';
import './styles.scss';

class Leaderboard extends Component {
	state = { searchTerm: '' };

	handleSearchTermChange = event => {
		const newState = {
			...this.state,
			searchTerm: event.target.value
		};
		this.setState(newState);
	};

	renderResultsList() {
		return this.props.scores
			.filter(
				score =>
					score.user
						.toLowerCase()
						.indexOf(this.state.searchTerm.toLowerCase()) >= 0
			)
			.map((score, index) => (
				<ScoreRow {...score} index={index} key={score.user} />
			));
	}

	render() {
		return (
			<div className="Leaderboard">
				<SearchBar
					onChange={this.handleSearchTermChange}
					searchTerm={this.state.searchTerm}
				/>
				<div className="results">{this.renderResultsList()}</div>
			</div>
		);
	}
}

Leaderboard.defaultProps = {
	scores: []
};

Leaderboard.propTypes = {
	scores: PropTypes.arrayOf(
		PropTypes.shape({
			user: PropTypes.string,
			total: PropTypes.number
		})
	)
};

export default Leaderboard;
