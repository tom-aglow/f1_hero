import React, { Component } from 'react';
import SearchBar from './SearchBar';

class Leaderboard extends Component {
	state = { searchTerm: '', scores: [] };

	handleSearchTermChange = event => {
		this.setState({ searchTerm: event.target.value });
	};

	renderResultsList() {
		return this.state.scores
			? this.state.scores
					.filter(
						score =>
							score.user
								.toLowerCase()
								.indexOf(this.state.searchTerm.toLowerCase()) >= 0
					)
					// .map(score => <UserResult score={{ score }} key={score.index} />)
					.map(score => <div>my score</div>)
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

export default Leaderboard;
