import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from './../../actions';
import Race from './Race';

class RacesHolder extends Component {
  componentDidMount() {
    this.props.fetchRaces();
    this.props.fetchDrivers();
  }

  componentWillUnmount() {
    this.props.selectRace(0);
  }

  render() {
    let raceList;
    if (this.props.races) {
      raceList = this.props.races.map(race => {
        return (
          <Race
            race={race}
            holderNode={this.refs.raceHolder}
            key={race.round}
          />
        );
      });
    } else {
      raceList = <div className="loader" />;
    }

    return (
      <div className="race-holder" ref="raceHolder">
        {raceList}
      </div>
    );
  }
}

const mapStateToProps = ({ races, drivers }) => ({ races, drivers });

export default connect(mapStateToProps, actions)(RacesHolder);
