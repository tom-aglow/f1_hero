import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
	render() {
		return (
			<header className="page-header">
				<h1 className="page-title">
					F1 Hero <span>// {this.props.header}</span>
				</h1>
				<nav className="navbar">
					<ul>
						<li>
							<Link to={'/picks'} className="btn btn-primary">
								My Picks
							</Link>
						</li>
						<li>
							<Link to={'/leaderboard'} className="btn btn-primary">
								Leaderboard
							</Link>
						</li>
						<li>
							<Link to={'/rules'} className="btn btn-primary">
								Rules
							</Link>
						</li>
						<li className="btn btn-secondary username">
							<i className="fa fa-user" aria-hidden="true" />
							{/*{this.props.user ? this.props.user.username : ''}*/}
						</li>
					</ul>
				</nav>
			</header>
		);
	}
}

function mapStateToProps({ header }) {
	return { header };
}

export default connect(mapStateToProps)(Header);
