/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';

import StandingList from './index';
import { updateRace } from '../../../../data/races/actions';

const StandingListContainer = props => <StandingList {...props} />;

export const mapStateToProps = state => ({
	races: state.data.races.all,
	drivers: state.data.drivers.all
});

export default connect(mapStateToProps, { updateRace })(StandingListContainer);
