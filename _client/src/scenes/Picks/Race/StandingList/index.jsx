/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { arrayMove } from 'react-sortable-hoc';
import { calculatePickAndStemLeftPosition } from 'App/services/utils/functions';

import ForecastNew from './ForecastNew';
import ForecastMissed from './ForecastMissed';
import ForecastSubmitted from './ForecastSubmitted';
import { postPick } from './api';
import { racePropType } from '../index';
import './styles.scss';

class StandingList extends Component {
	state = {
		pickPos: 0,
		stemPos: 0,
		list:
			this.props.status === 'submitted' ? this.props.list : this.props.drivers,
		status: this.props.status
	};

	componentDidMount() {
		const { races, round, raceNode, raceHolderNode } = this.props;
		const { pickPos, stemPos } = calculatePickAndStemLeftPosition(
			{
				picksNode: this.picks,
				stemNode: this.stem,
				raceNode,
				raceHolderNode
			},
			races.length,
			round
		);

		const newState = {
			...this.state,
			pickPos,
			stemPos
		};
		this.setState(newState);
	}

	onSortEnd = ({ oldIndex, newIndex }) => {
		const newList = arrayMove(this.state.list, oldIndex, newIndex);
		const formattedList = newList.map((value, index) => ({
			...value,
			position: index + 1
		}));

		const newState = {
			...this.state,
			list: formattedList //	todo make list array immutable
		};
		this.setState(newState);
	};

	submitPick = () => {
		const { round, onSubmit, updateRace } = this.props;
		try {
			postPick(round, {
				round,
				forecast: this.state.list.slice(0, 10)
			}).then(res => {
				const { pick } = res.data;

				const newState = {
					...this.state,
					status: 'submitted',
					list: pick.forecast
				};

				this.setState(newState);
				onSubmit(pick);
				updateRace({ round, field: 'hasPick', value: true });
			});
		} catch (error) {
			//	todo display an error as a flash message
			console.error('error: unable to save pick!!', error);
		}
	};

	displayButton() {
		//	todo move to separate component
		return this.state.status === 'new' ? (
			<div
				className="btn btn-submit"
				onClick={this.submitPick}
				role="button"
				tabIndex="0"
				data-test="submit-pick-button"
			>
				<i className="fa fa-check" aria-hidden="true" /> Submit
			</div>
		) : null;
	}

	render() {
		let Standings;

		switch (this.state.status) {
			case 'new':
				Standings = ForecastNew;
				break;
			case 'passed':
				//	todo rename this status to 'missed'
				Standings = ForecastMissed;
				break;
			default:
				Standings = ForecastSubmitted;
		}

		return (
			<div
				ref={el => {
					this.picks = el;
				}}
				className="StandingList"
				style={{ left: `${this.state.pickPos}px` }}
			>
				<div
					ref={el => {
						this.stem = el;
					}}
					className="stem"
					style={{ left: `${this.state.stemPos}px` }}
				/>
				<Standings
					items={this.state.list}
					onSortEnd={this.onSortEnd}
					lockToContainerEdges
					helperClass="draggable"
					lockAxis="y"
				/>
				{this.displayButton()}
			</div>
			//	todo make function that will create refs
		);
	}
}

export const listItemPropTypes = {
	position: PropTypes.number.isRequired,
	_drivers: PropTypes.arrayOf(
		PropTypes.shape({
			code: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired
		})
	)
};

StandingList.defaultProps = {
	list: [],
	drivers: [],
	onSubmit: () => {}
};

StandingList.propTypes = {
	status: PropTypes.oneOf(['new', 'submitted', 'passed']).isRequired,
	list: PropTypes.arrayOf(PropTypes.shape(listItemPropTypes)),
	drivers: PropTypes.arrayOf(PropTypes.shape(listItemPropTypes)),
	round: PropTypes.number.isRequired,
	races: PropTypes.arrayOf(PropTypes.shape(racePropType)).isRequired,
	onSubmit: PropTypes.func,
	updateRace: PropTypes.func.isRequired,
	// eslint-disable-next-line react/forbid-prop-types
	raceHolderNode: PropTypes.object.isRequired,
	// eslint-disable-next-line react/forbid-prop-types
	raceNode: PropTypes.object.isRequired
};

export default StandingList;
