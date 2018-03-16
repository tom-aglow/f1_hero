import React, { Component } from 'react';

import { isObjectEmpty } from '../../../services/utils/functions';
import { getPick } from './api';

class Race extends Component {
	state = {
		pick: {}
	};

	fetchPick = async () => {
		const { round } = this.props.race;
		this.props.selectRace(round);

		const {pick} = (await getPick(round)).data;
		const newState = {
			...this.state,
			pick: {
				...this.state.pick,
				...pick
			}
		};

		this.setState(newState);
	};

	displayPick() {
		const { race, selectedRace } = this.props;
		const isPickSet = isObjectEmpty(this.state.pick);
		const isRaceSelected = selectedRace.round === race.round;
		
		if (!isRaceSelected || !isPickSet) {
			return null;
		}

		return null;
		// const data = {
		// 	round: this.props.race.round,
		// 	raceWidth: this.state.raceWidth,
		// 	holderNode: this.props.holderNode
		// };
		//
		// if (this.props.race.hasPick) {
		// 	return (
		// 		<Standings
		// 			list={this.state.pick.forecast}
		// 			status={'submitted'}
		// 			data={data}
		// 		/>
		// 	);
		// } else if (this.props.race.isPassed) {
		// 	return <Standings status={'passed'} data={data} />;
		// } else {
		// 	return (
		// 		<Standings
		// 			list={this.props.drivers}
		// 			status={'new'}
		// 			data={data}
		// 			onSubmit={this.submitRace}
		// 		/>
		// 	);
		// }
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
			<div className="race-container" ref="race">
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

export default Race;
