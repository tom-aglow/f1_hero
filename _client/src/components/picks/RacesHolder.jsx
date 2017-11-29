import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from './../../actions';
import Race from './Race';

class RacesHolder extends Component {
	
	componentDidMount() {
		this.props.fetchRaces();
	}
	
	render() {
		let raceList;
		if (this.props.races) {
			raceList = this.props.races.map((race) => {
				return (
					<Race race={race} holderNode={this.refs.raceHolder} key={race.round}/>
				)
			});
		}
		
		return <div className="race-holder" ref="raceHolder">{raceList}</div>
	}
}

function mapStateToProps({ races }) {
	return { races };
}

export default connect(mapStateToProps, actions)(RacesHolder);
