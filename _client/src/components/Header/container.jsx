/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentUser } from '../../data/users/actions';
import Header from './index';

const mapStateToProps = state => ({ user: state.data.users.current });

// const HeaderContainer = connect(mapStateToProps, { getCurrentUser })(Header);

class HeaderContainer extends Component {
	componentDidMount() {
		this.props.getCurrentUser();
	}

	render() {
		return <Header user={this.props.user} />;
	}
}

export default connect(mapStateToProps, { getCurrentUser })(HeaderContainer);
