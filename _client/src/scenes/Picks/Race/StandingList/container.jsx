/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import StandingList from './index';

class StandingListContainer extends Component {
	render() {
		return <StandingList {...this.props} />;
	}
}

const mapStateToProps = state => ({
	races: state.data.races.all,
	drivers: state.data.drivers.all
});

export default connect(mapStateToProps, null)(StandingListContainer);
