import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { isObjectEmpty } from '../../../services/utils/functions';
import { getPick } from './api';
import StandingList from './StandingList/container';

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
		const { race, selectedRace } = this.props;
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
				/>
			);
		} else if (race.isPassed) {
			return <StandingList status="passed" round={race.round} />;
		}
		return (
			<StandingList
				status="new"
				round={race.round}
				onSubmit={this.setRacePick}
			/>
		);
	}

	displayStatus() {
		const { isPassed, hasPick } = this.props.race;
		if (isPassed) {
			return <i className="fa fa-check" aria-hidden="true" />;
		} else if (hasPick) {
			return <i className="fa fa-circle" aria-hidden="true" />;
		}
		return <i className="fa fa-circle-o" aria-hidden="true" />;
	}

	render() {
		const { flagUrl, alpha3code, score } = this.props.race;
		const scoreText = score ? `${score}pt` : '-';

		return (
			<div className="race-container" id="race">
				<div className="race" onClick={this.fetchPick}>
					{this.displayStatus()}
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
	selectRace: PropTypes.func.isRequired
};

export default Race;
