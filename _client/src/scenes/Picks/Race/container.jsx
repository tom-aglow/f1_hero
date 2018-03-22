/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';

import Race from './index';
import { selectRace } from '../../../data/races/actions';

const RaceContainer = props => <Race {...props} />;

export const mapStateToProps = state => ({
	selectedRace: state.data.races.selected
});

export default connect(mapStateToProps, { selectRace })(RaceContainer);
