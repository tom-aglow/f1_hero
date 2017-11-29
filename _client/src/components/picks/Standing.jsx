import React, { Component } from 'react';

class Standing extends Component {

	render() {
		const icon = (this.props.standing.score !== undefined) ? <div className="score">{this.props.standing.score}pt</div> : <i className="fa fa-sort" aria-hidden="true"></i>;
		
		return (
			<div className="standing">
				<div className="position">{this.props.standing.position}.</div>
				<div className="driver-name">{this.props.standing._driver.name}</div>
				<div className="driver-code">{this.props.standing._driver.code}</div>
				{icon}
			</div>
		)
	}
}

export default Standing;
