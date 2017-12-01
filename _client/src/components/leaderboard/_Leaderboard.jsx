import React, {Component} from 'react';
import { connect } from 'react-redux';

import * as actions from './../../actions';

class Leaderboard extends Component {
  componentDidMount() {
  }

	render() {
		return (
      <div>
        <h1>Leaderboard</h1>
      </div>
    )
	}
}

export default connect(null, actions)(Leaderboard);