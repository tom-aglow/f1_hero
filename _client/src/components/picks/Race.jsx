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
    }
  }

  submitRace = pick => {
    this.setState({ pick });
  };

  fetchPick = () => {
    //	dispatch action and save number of selected race to the store
    this.props.selectRace(this.props.race.round);
  };

  displayPick() {
    const isPickSet =
      this.state && this.state.hasOwnProperty('pick') && this.state.pick;
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
      } else if (this.props.race.isPassed) {
        return <Standings status={'passed'} data={data} />;
      } else {
        return (
          <Standings
            list={this.props.drivers}
            status={'new'}
            data={data}
            onSubmit={this.submitRace}
          />
        );
      }
    }

    return '';
  }

  displayStatus() {
    if ((this.state && this.state.pick) || this.props.race.isPassed) {
      if (this.props.race.isPassed) {
        return <i className="fa fa-check" aria-hidden="true" />;
      } else {
        return <i className="fa fa-circle" aria-hidden="true" />;
      }
    } else {
      return <i className="fa fa-circle-o" aria-hidden="true" />;
    }
  }

  displayScore() {
    if (this.state && this.state.pick && this.props.race.isPassed) {
      return <p className="score">{`${this.state.pick.score}pt`}</p>;
    } else {
      return <p className="score">-</p>;
    }
  }

  render() {
    return (
      <div className="race-container" ref="race">
        <div className="race" onClick={this.fetchPick}>
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

function mapStateToProps({ selectedRace, races, drivers }) {
  return { selectedRace, races, drivers };
}

export default connect(mapStateToProps, actions)(Race);
