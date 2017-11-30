import React, { Component } from 'react';
import { connect } from 'react-redux';

import Standing from './Standing';
import * as actions from './../../actions';

class Standings extends Component {
  constructor(props){
    super(props);
    this.state = {pickPos: 0, stemPos: 0};
  }

  componentDidMount() {
    const { pickPos, stemPos } = this.computePickPosition();
    this.setState({pickPos, stemPos});
  }

  computePickPosition() {
    const racesNum = this.props.races.length;
    const round = this.props.data.round;

    const picksWidth = this.refs.picks ? this.refs.picks.offsetWidth : 0;
    const stemWidth = this.refs.stem ? this.refs.stem.offsetWidth : 0;

    const raceWidth = this.props.data.raceWidth;
    const holderWidth = this.props.data.holderNode.offsetWidth;
    const holderPadding = Standings.getNodePadding(this.props.data.holderNode);

    const gutter =
      (holderWidth - holderPadding - raceWidth * racesNum) / (racesNum - 1);

    const offset =
      holderPadding / 2 +
      raceWidth * round -
      raceWidth / 2 +
      gutter * (round - 1) -
      picksWidth / 2;

    if (offset < 0) {
      return {
        pickPos: 0,
        stemPos:
          holderPadding / 2 +
          raceWidth / 2 +
          (raceWidth + gutter) * (round - 1) -
          stemWidth / 2 * 1.41
      };
    } else if (offset + picksWidth > holderWidth) {
      return {
        pickPos: holderWidth - picksWidth,
        stemPos:
          picksWidth -
          stemWidth / 2 * 1.41 -
          raceWidth / 2 -
          holderPadding / 2 -
          (raceWidth + gutter) * (racesNum - round)
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
      parseInt(nodeStyle.getPropertyValue('padding-right'), 10) +
      parseInt(nodeStyle.getPropertyValue('padding-left'), 10)
    );
  }

  displayButton() {
    return this.props.status === 'new' ? (
      <div className="btn btn-submit">
        <i className="fa fa-check" aria-hidden="true" /> Submit
      </div>
    ) : (
      ''
    );
  }

  render() {
    const standings = this.props.list.map(standing => {
      return <Standing standing={standing} key={standing.position} />;
    });

    return (
      <div
        className="picks"
        style={{ left: this.state.pickPos + 'px' }}
        ref="picks"
      >
        <div
          className="stem"
          style={{ left: this.state.stemPos + 'px' }}
          ref="stem"
        />
        <div className="standings-container">{standings}</div>
        {this.displayButton()}
      </div>
    );
  }
}

function mapStateToProps({ selectedRace, races }) {
  return { selectedRace, races };
}

export default connect(mapStateToProps, actions)(Standings);
