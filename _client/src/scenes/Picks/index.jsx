import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Race from './Race/container';
import Loader from '../../components/Loader';
import './styles.scss';

class Picks extends Component {
	state: {
		isMounted: false
	};

	componentDidMount() {
		this.setState({ isMounted: true });
	}

	renderContent() {
		const { races } = this.props;

		return races && races.length > 0 ? (
			races.map(race => (
				<Race
					key={race.round}
					race={race}
					races={races}
					raceHolderNode={this.raceHolderNode}
				/>
			))
		) : (
			<Loader />
		);
	}

	render() {
		return (
			<div
				className="Picks"
				ref={el => {
					this.raceHolderNode = el;
				}}
			>
				{this.renderContent()}
			</div>
		);
	}
}

//	todo: pass content as children

Picks.propTypes = {
	races: PropTypes.arrayOf(
		PropTypes.shape({
			round: PropTypes.number
		})
	).isRequired
};

export default Picks;
