import React, { Component } from 'react';
import Standing from './Standing';

class Race extends Component {

  async fetchPick() {
    const pick = (await axios.get(`/api/pick/${this.props.race.round}`)).data;
    this.setState({ pick });
  }

  displayPick() {
    if (this.state && this.state.hasOwnProperty('pick') && this.state.pick) {
      const standings = this.state.pick.forecast.map(standing => {
        return <Standing standing={standing} key={standing.position} />;
      });

      return <div className="picks">{standings}</div>;
    }
  }

  render() {
    return (
      <div className="race-container">
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

export default Race;
