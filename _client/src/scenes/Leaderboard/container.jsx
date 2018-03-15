/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsersScores } from '../../data/leaderboard/actions';
import { updatePageHeading } from '../../services/page/actions';
import Leaderboard from './index';

const mapStateToProps = state => ({ scores: state.data.leaderboard.scores });

class LeaderboardContainer extends Component {
	componentDidMount() {
		this.props.updatePageHeading('Leaderboard');
		this.props.getUsersScores();
	}

	render() {
		return <Leaderboard scores={this.props.scores} />;
	}
}

export default connect(mapStateToProps, { getUsersScores, updatePageHeading })(
	LeaderboardContainer
);
