import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Standings from './Standings';
import * as actions from './../../actions';

class Race extends Component {
  async componentDidMount() {
    this.setState({ raceWidth: this.refs.race.offsetWidth });
    const pick = (await axios.get(`/api/pick/${this.props.race.round}`)).data;

    if (pick) {
      this.setState({ pick });
    } else {
      const drivers = (await axios.get('/api/drivers')).data;

      //  format drivers array similar to picks forecast array structure
      let i = 0;
      const formattedDrivers = drivers.map(driver => {
        i += 1;
        return { position: i, _driver: driver };
      });

      this.setState({ drivers: formattedDrivers });
    }
  }

  fetchPick() {
    //	dispatch action and save number of selected race to the store
    this.props.selectRace(this.props.race.round);
  }

  displayPick() {
    const isPickSet =
      this.state && this.state.hasOwnProperty('pick') && this.state.pick;
    const isDriversSet = this.state && this.state.hasOwnProperty('drivers');
    const isRaceSelected = this.props.selectedRace === this.props.race.round;

    if (isRaceSelected) {
      const data = {
        round: this.props.race.round,
        raceWidth: this.state.raceWidth,
        holderNode: this.props.holderNode
      };

      if (isPickSet) {
        return (
          <Standings
            list={this.state.pick.forecast}
            status={'submitted'}
            data={data}
          />
        );
      } else if (isDriversSet) {
        return (
          <Standings list={this.state.drivers} status={'new'} data={data} />
        );
      }
    }

    return '';
  }

  displayStatus() {
    if (this.state && this.state.pick) {
      if (this.state.pick.status === 'calculated') {
        return <i className="fa fa-check" aria-hidden="true" />;
      } else {
        return <i className="fa fa-circle" aria-hidden="true" />;
      }
    } else {
      return <i className="fa fa-circle-o" aria-hidden="true" />;
    }
  }

  displayScore() {
    if (this.state && this.state.pick && this.state.pick.status === 'calculated') {
      return <p className="score">{`${this.state.pick.score}pt`}</p>
    } else {
      return <p className="score">-</p>
    }
  }

  render() {
    return (
      <div className="race-container" ref="race">
        <div className="race" onClick={this.fetchPick.bind(this)}>
          {this.displayStatus()}
          <div className="img-container">
            <img src={this.props.race.flagUrl} alt="" />
          </div>
          <p className="country-code">{this.props.race.alpha3code}</p>
          {this.displayScore()}
        </div>
        {this.displayPick()}
      </div>
    );
  }
}

function mapStateToProps({ selectedRace }) {
  return { selectedRace };
}

export default connect(mapStateToProps, actions)(Race);
