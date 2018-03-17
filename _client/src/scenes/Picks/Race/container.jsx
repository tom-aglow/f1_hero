/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Race from './index';
import { selectRace } from '../../../data/races/actions';

class RaceContainer extends Component {
	render() {
		return <Race {...this.props} />;
	}
}

const mapStateToProps = state => ({
	races: state.data.races.all,			//todo possible duplication (see parent component)
	selectedRace: state.data.races.selected
});

export default connect(mapStateToProps, { selectRace })(RaceContainer);
