/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getCurrentUser } from 'App/data/users/actions';

export default function(ComposedComponent) {
	class Authentication extends Component {
		async componentWillMount() {
			if (!this.props.user.username) {
				try {
					await this.props.getCurrentUser();
					if (this.props.location.pathname === '/login') {
						this.props.history.push('/');
					}
				} catch (e) {
					this.props.history.push('/login');
				}
			}
		}

		render() {
			return <ComposedComponent {...this.props} />;
		}
	}

	function mapStateToProps(state) {
		return { user: state.data.users.current };
	}

	return withRouter(
		connect(mapStateToProps, { getCurrentUser })(Authentication)
	);
}
