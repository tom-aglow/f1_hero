import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  SortableContainer,
  SortableElement,
  arrayMove
} from 'react-sortable-hoc';
import axios from 'axios';

import Standing from './Standing';
import * as actions from './../../actions';

class Standings extends Component {
  state = {
    pickPos: 0,
    stemPos: 0,
    list: this.props.list,
    status: this.props.status
  };

  componentDidMount() {
    const { pickPos, stemPos } = this.computePickPosition();
    this.setState({ pickPos, stemPos });
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

  submitPick = () => {
    axios
      .post(`/api/pick/${this.props.data.round}`, {
        round: this.props.data.round,
        forecast: this.state.list.slice(0, 10)
      })
      .then(pick => {
        this.setState({ status: 'submitted', list: pick.data.forecast });
        this.props.onSubmit(pick);
        this.props.setPickStatus(this.props.data.round, true);
      })
      .catch(err => console.log('error: unable to save pick', err));
  };

  displayButton() {
    return this.state.status === 'new' ? (
      <div className="btn btn-submit" onClick={this.submitPick}>
        <i className="fa fa-check" aria-hidden="true" /> Submit
      </div>
    ) : (
      ''
    );
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    const newList = arrayMove(this.state.list, oldIndex, newIndex);
    newList.map((value, index) => {
      value.position = index + 1;
      return value;
    });

    this.setState({
      list: newList
    });
  };

  render() {
    let Standings;

    switch (this.state.status) {
      case 'new':
        const SortableItem = SortableElement(({ standing }) => (
          <Standing standing={standing} />
        ));

        Standings = SortableContainer(({ items }) => {
          return (
            <div className="standings-container">
              {items.map((value, index) => (
                <SortableItem
                  key={`item-${index}`}
                  index={index}
                  standing={value}
                />
              ))}
            </div>
          );
        });

        break;
      case 'passed':
        Standings = () => (
          <div className="standings-container">
            <div className="standing">
              You didn't submit your prediction on time. No results available
              for you for this race.
            </div>
          </div>
        );

        break;
      default:
        Standings = ({ items }) => {
          return (
            <div className="standings-container">
              {items.map(item => (
                <Standing key={item.position} standing={item} />
              ))}
            </div>
          );
        };
    }

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
        <Standings
          items={this.state.list}
          onSortEnd={this.onSortEnd}
          lockToContainerEdges={true}
          helperClass={'draggable'}
          lockAxis={'y'}
        />
        {this.displayButton()}
      </div>
    );
  }
}

const mapStateToProps = ({ selectedRace, races, auth }) => ({
  selectedRace,
  races,
  auth
});

export default connect(mapStateToProps, actions)(Standings);
