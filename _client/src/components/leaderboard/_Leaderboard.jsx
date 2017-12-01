import React, { Component } from 'react';
import axios from 'axios';

import UserResult from './UserResult';
import SearchBar from './SearchBar';

class Leaderboard extends Component {
  async componentDidMount() {
    const scores = (await axios.get('/api/leaderboard')).data;
    this.setState({ scores });
  }

  handleSearchTermChange() {

  }

  render() {
    const content =
      this.state && this.state.scores
        ? this.state.scores.map((score, index) => (
            <UserResult score={{ score, index }} key={score.user} />
          ))
        : '';

    return (
      <div className="leaderboard">
        <SearchBar onChange={this.handleSearchTermChange} searchTerm={'s'} />
        <div className="results">{content}</div>
      </div>
    );
  }
}

export default Leaderboard;
