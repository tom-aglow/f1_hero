/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsersScores } from '../../data/users/actions';
import Leaderboard from './index';

const mapStateToProps = state => ({ scores: state.data.leaderboard.scores });

class LeaderboardContainer extends Component {
	componentDidMount() {
		this.props.getUsersScores();
	}

	render() {
		return <Leaderboard />;
	}
}

export default connect(mapStateToProps, { getUsersScores })(
	LeaderboardContainer
);
