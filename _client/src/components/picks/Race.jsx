import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Standings from './Standings';
import * as actions from './../../actions';

class Race extends Component {
	componentDidMount() {
		this.setState({ raceWidth: this.refs.race.offsetWidth });
	}

	submitRace = pick => {
		this.setState({ pick });
	};

	fetchPick = () => {
		//	dispatch action and save number of selected race to the store
		this.props.selectRace(this.props.race.round);

		axios
			.get(`/api/pick/${this.props.race.round}`)
			.then(res => this.setState({ pick: res.data }));
	};

	displayPick() {
		const isPickSet = this.state && this.state.hasOwnProperty('pick');
		const isRaceSelected = this.props.selectedRace === this.props.race.round;

		if (!isRaceSelected || !isPickSet) {
			return;
		}

		const data = {
			round: this.props.race.round,
			raceWidth: this.state.raceWidth,
			holderNode: this.props.holderNode
		};

		if (this.props.race.hasPick) {
			return (
				<Standings
					list={this.state.pick.forecast}
					status={'submitted'}
					data={data}
				/>
			);
		} else if (this.props.race.isPassed) {
			return <Standings status={'passed'} data={data} />;
		} else {
			return (
				<Standings
					list={this.props.drivers}
					status={'new'}
					data={data}
					onSubmit={this.submitRace}
				/>
			);
		}
	}

	displayStatus() {
		if (this.props.race.isPassed) {
			return <i className="fa fa-check" aria-hidden="true" />;
		} else if (this.props.race.hasPick) {
			return <i className="fa fa-circle" aria-hidden="true" />;
		} else {
			return <i className="fa fa-circle-o" aria-hidden="true" />;
		}
	}

	render() {
		const score = this.props.race.score ? `${this.props.race.score}pt` : '-';

		return (
			<div className="race-container" ref="race">
				<div className="race" onClick={this.fetchPick}>
					{this.displayStatus()}
					<div className="img-container">
						<img
							src={this.props.race.flagUrl}
							alt={`flag of ${this.props.race.alpha3code}`}
						/>
					</div>
					<p className="country-code">{this.props.race.alpha3code}</p>
					<p className="score">{score}</p>
				</div>
				{this.displayPick()}
			</div>
		);
	}
}

const mapStateToProps = ({ selectedRace, races, drivers }) => ({
	selectedRace,
	races,
	drivers
});

export default connect(mapStateToProps, actions)(Race);
