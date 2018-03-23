/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { isObjectEmpty, makeRef } from 'App/services/utils/functions';
import { getPick } from './api';
import StandingList from './StandingList/container';
import StatusIcon from './StatusIcon';
import './styles.scss';

class Race extends Component {
	state = {
		pick: {}
	};

	setRacePick = pick => {
		const newState = {
			...this.state,
			pick: {
				...this.state.pick,
				...pick
			}
		};

		this.setState(newState);
	};

	fetchPick = async () => {
		const { round } = this.props.race;
		this.props.selectRace(round);

		const { pick } = (await getPick(round)).data;
		this.setRacePick(pick);
	};

	displayPick() {
		const { race, selectedRace, raceHolderNode } = this.props;
		const { pick } = this.state;
		const isPickSet = !isObjectEmpty(pick);
		const isRaceSelected = selectedRace.round === race.round;

		if (!isRaceSelected || (!isPickSet && race.hasPick)) {
			return null;
		}

		if (race.hasPick) {
			return (
				<StandingList
					list={pick.forecast}
					status="submitted"
					round={race.round}
					raceNode={this.raceNode}
					raceHolderNode={raceHolderNode}
				/>
			);
		} else if (race.isPassed) {
			return (
				<StandingList
					status="missed"
					round={race.round}
					raceNode={this.raceNode}
					raceHolderNode={raceHolderNode}
				/>
			);
		}
		return (
			<StandingList
				status="new"
				round={race.round}
				onSubmit={this.setRacePick}
				raceNode={this.raceNode}
				raceHolderNode={raceHolderNode}
			/>
		);
	}

	displayStatusIcon() {
		const { isPassed, hasPick } = this.props.race;

		// eslint-disable-next-line no-nested-ternary
		return isPassed ? (
			<StatusIcon iconClass="fa-check" status="passed" />
		) : hasPick ? (
			<StatusIcon iconClass="fa-circle" status="submitted" />
		) : (
			<StatusIcon iconClass="fa-circle-o" status="new" />
		);
	}

	render() {
		const { flagUrl, alpha3code, score } = this.props.race;
		const scoreText = score ? `${score}pt` : '-';

		return (
			<div
				ref={makeRef('raceNode', this)}
			>
				<div
					className="Race"
					onClick={this.fetchPick}
					role="link"
					tabIndex="0"
					data-test="race"
				>
					{this.displayStatusIcon()}
					<div className="img-container">
						<img src={flagUrl} alt={`flag of ${alpha3code}`} />
					</div>
					<p className="country-code">{alpha3code}</p>
					<p className="score">{scoreText}</p>
				</div>
				{this.displayPick()}
			</div>
		);
	}
}

export const racePropType = {
	round: PropTypes.number.isRequired,
	isPassed: PropTypes.bool.isRequired,
	hasPick: PropTypes.bool.isRequired,
	flagUrl: PropTypes.string.isRequired,
	alpha3code: PropTypes.string.isRequired,
	score: PropTypes.number
};

Race.propTypes = {
	race: PropTypes.shape(racePropType).isRequired,
	selectedRace: PropTypes.shape({
		round: PropTypes.number.isRequired
	}).isRequired,
	selectRace: PropTypes.func.isRequired,
	// eslint-disable-next-line react/forbid-prop-types
	raceHolderNode: PropTypes.object.isRequired
};

export default Race;
