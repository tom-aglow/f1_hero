import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ScoreRow from './ScoreRow';
import SearchBar from './SearchBar';

class Leaderboard extends Component {
	state = { searchTerm: '' };

	handleSearchTermChange = event => {
		this.setState({ searchTerm: event.target.value });
	};

	renderResultsList() {
		return this.props.scores
			? this.props.scores
					.filter(
						score =>
							score.user
								.toLowerCase()
								.indexOf(this.state.searchTerm.toLowerCase()) >= 0
					)
					.map((score, index) => (
						<ScoreRow {...score} index={index} key={score.user} />
					))
			: '';
	}

	render() {
		return (
			<div className="leaderboard">
				<SearchBar
					onChange={this.handleSearchTermChange}
					searchTerm={this.state.searchTerm}
				/>
				<div className="results">{this.renderResultsList()}</div>
			</div>
		);
	}
}

Leaderboard.propTypes = {
	scores: PropTypes.arrayOf(
		PropTypes.shape({
			user: PropTypes.string,
			total: PropTypes.number
		})
	).isRequired
};

export default Leaderboard;
