/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatePageHeading } from '../../services/page/actions';
import Rules from './index';

class RulesContainer extends Component {
	componentDidMount() {
		this.props.updatePageHeading('Rules');
	}

	render() {
		return <Rules />;
	}
}

export default connect(null, { updatePageHeading })(RulesContainer);
