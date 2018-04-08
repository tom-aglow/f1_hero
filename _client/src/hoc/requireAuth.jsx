/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getCurrentUser } from 'App/data/users/actions';

export class Auth extends Component {
	async componentDidMount() {
		if (!this.props.user.username) {
			try {
				await this.props.getCurrentUser();
				if (this.props.location.pathname === '/login') {
					this.props.history.push('/');
					console.log(this.props.history.push());
				}
			} catch (e) {
				this.props.history.push('/login');
			}
		}
	}

	render() {
		const ComposedComponent = this.props.composedComponent;
		return <ComposedComponent {...this.props} />;
	}
}

export default function(composedComponent) {
	function mapStateToProps(state) {
		return {
			user: state.data.users.current,
			composedComponent
		};
	}
	return withRouter(connect(mapStateToProps, { getCurrentUser })(Auth));
}
