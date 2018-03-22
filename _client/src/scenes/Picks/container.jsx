/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatePageHeading } from '../../services/page/actions';
import { getRaceList, selectRace } from '../../data/races/actions';
import { getDriverList } from '../../data/drivers/actions';
import Picks from './index';

export class PicksContainer extends Component {
	componentDidMount() {
		this.props.updatePageHeading('My picks');
		this.props.getRaceList();
		this.props.getDriverList();
	}

	componentWillUnmount() {
		this.props.selectRace(0);
	}

	render() {
		return <Picks races={this.props.races} />;
	}
}

export const mapStateToProps = state => ({ races: state.data.races.all });

export default connect(mapStateToProps, {
	updatePageHeading,
	getRaceList,
	selectRace,
	getDriverList
})(PicksContainer);
