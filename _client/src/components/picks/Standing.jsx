import React, { Component } from 'react';

class Standing extends Component {
  render() {
    const { score, position, _driver } = this.props.standing;
    const icon =
      score !== undefined ? (
        <div className="score">{score}pt</div>
      ) : (
        <i className="fa fa-sort" aria-hidden="true" />
      );

    return (
      <div className="standing">
        <div className="position">{position}.</div>
        <div className="driver-name">{_driver.name}</div>
        <div className="driver-code">{_driver.code}</div>
        {icon}
      </div>
    );
  }
}

export default Standing;
