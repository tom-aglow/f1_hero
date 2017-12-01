import React from 'react';

const UserResult = (props) =>  {
  const {index, user, scores} = props.score.score;
  return (
    <div className="user-result">
      <div>{index}.</div>
      <div className="username">{user}</div>
      <div>{scores}pt</div>
    </div>
  );
}

export default UserResult;