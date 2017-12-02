import React, { Component } from 'react';
import axios from 'axios';

import UserResult from './UserResult';
import SearchBar from './SearchBar';

class Leaderboard extends Component {
  state = { searchTerm: '' };

  async componentDidMount() {
    const scores = (await axios.get('/api/leaderboard')).data;
    this.setState({ scores });
  }

  handleSearchTermChange = event => {
    this.setState({ searchTerm: event.target.value });
  };

  render() {
    const content = this.state.scores
      ? this.state.scores
          .filter(score => {
            return (
              score.user
                .toLowerCase()
                .indexOf(this.state.searchTerm.toLowerCase()) >= 0
            );
          })
          .map(score => <UserResult score={{ score }} key={score.index} />)
      : '';

    return (
      <div className="leaderboard">
        <SearchBar
          onChange={this.handleSearchTermChange}
          searchTerm={this.state.searchTerm}
        />
        <div className="results">{content}</div>
      </div>
    );
  }
}

export default Leaderboard;
