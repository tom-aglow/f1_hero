import React from 'react';

const UserResult = (props) =>  {
  return (
    <div className="user-result">
      <div>{props.score.index + 1}.</div>
      <div className="username">{props.score.score.user}</div>
      <div>{props.score.score.scores}pt</div>
    </div>
  );
}

export default UserResult;