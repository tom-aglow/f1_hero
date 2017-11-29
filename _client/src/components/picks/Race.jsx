import React, { Component } from 'react';
import { connect } from 'react-redux';

import Standing from './Standing';
import * as actions from './../../actions';

class Race extends Component {
  async fetchPick() {
    const pick = (await axios.get(`/api/pick/${this.props.race.round}`)).data;
    if (pick) {
      this.setState({ pick });
    } else {
      const drivers = (await axios.get('/api/drivers')).data;
      this.setState({ drivers });
    }
    this.selectRace();
  }

  selectRace() {
    //	dispatch action and save number of selected race to the store
    this.props.selectRace(this.props.race.round);

    //	get position class name for Picks component
    const {pickPos, stemPos} = this.computePickPosition();
    this.setState({ pickPos, stemPos });
  }

  computePickPosition() {
    const racesNum = this.props.races.length;
    const round = this.props.race.round;

    const picksWidth = this.refs.picks ? this.refs.picks.offsetWidth : 0;
    const stemWidth = this.refs.stem ? this.refs.stem.offsetWidth : 0;

    const raceWidth = this.refs.race.offsetWidth;
    const holderWidth = this.props.holderNode.offsetWidth;
    const holderPadding = Race.getNodePadding(this.props.holderNode);

    const gutter =
      (holderWidth - holderPadding - raceWidth * racesNum) /
      (racesNum - 1);


    const offset =
      holderPadding / 2 +
      raceWidth * round -
      raceWidth / 2 +
      gutter * (round - 1) -
      picksWidth / 2;

    if (offset < 0) {
      return {
        pickPos: 0,
        stemPos: holderPadding / 2 + raceWidth / 2 + (raceWidth + gutter) * (round - 1) - stemWidth / 2 * 1.41
      };
    } else if (offset + picksWidth > holderWidth) {
      return {
        pickPos: holderWidth - picksWidth,
        stemPos: picksWidth - stemWidth / 2 * 1.41 - raceWidth / 2 - holderPadding / 2 - (raceWidth + gutter) * (racesNum - round)
      };
    } else {
      return {
        pickPos: offset,
        stemPos: picksWidth / 2 - stemWidth / 2
      };
    }
  }

  static getNodePadding(node) {
    const nodeStyle = window.getComputedStyle(node);
    return (
      parseInt(nodeStyle.getPropertyValue('padding-right')) +
      parseInt(nodeStyle.getPropertyValue('padding-left'))
    );
  }

  static async fetchAllDrivers() {
    return await axios.get('/api/drivers');
  }

  displayPick() {
    const isPickSet =
      this.state && this.state.hasOwnProperty('pick') && this.state.pick;
    const isDriversSet = this.state && this.state.hasOwnProperty('drivers');
    const isRaceSelected = this.props.selectedRace === this.props.race.round;

    if (isPickSet && isRaceSelected) {
      const standings = this.state.pick.forecast.map(standing => {
        return <Standing standing={standing} key={standing.position} />;
      });

      return (
        <div
          className="picks"
          style={{ left: this.state.pickPos + 'px' }}
          ref="picks"
        >
          <div className="stem" style={{ left: this.state.stemPos + 'px' }} ref="stem" />
          {standings}
        </div>
      );
    } else if (isDriversSet && isRaceSelected) {
      let i = 0;
      const standings = this.state.drivers.map(driver => {
        i += 1;
        return <Standing standing={{ _driver: driver, position: i }} key={i} />;
      });

      return (
        <div
          className="picks"
          style={{ left: this.state.pickPos + 'px' }}
          ref="picks"
        >
          <div className="stem" style={{ left: this.state.stemPos + 'px' }} ref="stem" />
          <div className="standings-container">{standings}</div>
          <div className="btn btn-submit">
            <i className="fa fa-check" aria-hidden="true" /> Submit
          </div>
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
