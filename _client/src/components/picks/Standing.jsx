import React, { Component } from 'react';

class Standing extends Component {

	render() {
		
		return (
			<div className="standing">
				<div className="position">{this.props.standing.position}.</div>
				<div className="driver-name">{this.props.standing._driver.name}</div>
				<div className="driver-code">{this.props.standing._driver.code}</div>
			</div>
		)
	}
}

export default Standing;
