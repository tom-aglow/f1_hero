import React, { Component } from 'react';

class Race extends Component {
	constructor() {
		super();
	}
	
	async fetchPick() {
		const pick = (await axios.get(`/api/pick/${this.props.race.round}`)).data;
		this.setState({pick});
	}
	
	displayPick() {
		if (this.state && this.state.hasOwnProperty('pick')) {
			return (
				<div className="picks">
					<div>yes</div>
				</div>
			)
		}
	}
	
	render() {
		
		return (
			<div className="race-container">
				<div className="race" onClick={this.fetchPick.bind(this)}>
					<i className="fa fa-circle-o" aria-hidden="true"></i>
					<div className="img-container">
						<img src={this.props.race.flagUrl} alt=""/>
					</div>
					<p className="country-code">{this.props.race.alpha3code}</p>
					<p className="score">28pt</p>
				</div>
				{this.displayPick()}
			</div>
		)
	}
}

export default Race;
