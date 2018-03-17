/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatePageHeading } from '../../services/page/actions';
import { getRaceList } from '../../data/races/actions';
import { getDriverList } from '../../data/drivers/actions';
import Picks from './index';

class PicksContainer extends Component {
	componentDidMount() {
		this.props.updatePageHeading('My picks');
		this.props.getRaceList();
		this.props.getDriverList();
	}

	render() {
		return <Picks races={this.props.races} />;
	}
}

const mapStateToProps = state => ({ races: state.data.races.all });

export default connect(mapStateToProps, {
	updatePageHeading,
	getRaceList,
	getDriverList
})(PicksContainer);
