import React, {Component} from 'react';

class UserResult extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const {index, user, scores} = this.props.score.score;

    return (
      <div className="user-result">
        <div>{index}.</div>
        <div className="username">{user}</div>
        <div>{scores}pt</div>
      </div>
    );
  }
}

export default UserResult;