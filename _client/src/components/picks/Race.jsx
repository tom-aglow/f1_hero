import React, { Component } from 'react';

class Race extends Component {
	
	render() {
		return (
			<div className="race">
				<i className="fa fa-circle-o" aria-hidden="true"></i>
				<div className="img-container">
					<img src={this.props.race.flagUrl} alt=""/>
				</div>
				<p className="country-code">{this.props.race.alpha3code}</p>
				<p className="score">28pt</p>
			</div>
		)
	}
}

export default Race;
