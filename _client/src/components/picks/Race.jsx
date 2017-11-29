import React, { Component } from 'react';
import { connect } from 'react-redux';

import Standing from './Standing';
import * as actions from './../../actions';

class Race extends Component {

  async fetchPick() {
    const pick = (await axios.get(`/api/pick/${this.props.race.round}`)).data;
    this.setState({ pick });
    this.selectRace();
  }

  selectRace() {
    //	dispatch action and save number of selected race to the store
    this.props.selectRace(this.props.race.round);
    
    //	get position class name for Picks component
		this.setState({pickPos: this.computePickPosition()});
  }

  computePickPosition() {
    const picksWidth = this.refs.picks ? this.refs.picks.offsetWidth : 0;
		
    const raceWidth = this.refs.race.offsetWidth;
    const holderWidth = this.props.holderNode.offsetWidth;
    const holderPadding = Race.getNodePadding(this.props.holderNode);
    const gutter =
      (holderWidth - holderPadding - raceWidth * this.props.races.length) /
      (this.props.races.length - 1);

    const offset =
      holderPadding / 2 +
      raceWidth * this.props.race.round -
      raceWidth / 2 +
      gutter * (this.props.race.round - 1) -
      picksWidth / 2;

    if (offset < 0) {
      return 0;
    } else if (offset + picksWidth > holderWidth) {
      return holderWidth - picksWidth;
    } else {
      return offset;
    }
  }

  static getNodePadding(node) {
    const nodeStyle = window.getComputedStyle(node);
    return (
      parseInt(nodeStyle.getPropertyValue('padding-right')) +
      parseInt(nodeStyle.getPropertyValue('padding-left'))
    );
  }

	displayPick() {
		const isPickSet =
			this.state && this.state.hasOwnProperty('pick') && this.state.pick;
		const isRaceSelected = this.props.selectedRace === this.props.race.round;

		if (isPickSet && isRaceSelected) {
			const standings = this.state.pick.forecast.map(standing => {
				return <Standing standing={standing} key={standing.position} />;
			});

			return (
				<div className="picks" style={{left: this.state.pickPos + 'px'}} ref="picks">
					{standings}
				</div>
			);
		}

		return '';
	}

  render() {
    return (
      <div className="race-container" ref="race">
        <div className="race" onClick={this.fetchPick.bind(this)}>
          <i className="fa fa-circle-o" aria-hidden="true" />
          <div className="img-container">
            <img src={this.props.race.flagUrl} alt="" />
          </div>
          <p className="country-code">{this.props.race.alpha3code}</p>
          <p className="score">28pt</p>
        </div>
        {this.displayPick()}
      </div>
    );
  }
}

function mapStateToProps({ selectedRace, races }) {
  return { selectedRace, races };
}

export default connect(mapStateToProps, actions)(Race);
