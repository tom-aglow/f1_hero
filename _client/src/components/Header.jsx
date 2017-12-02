import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
  renderUsername() {
    if (this.props.auth) {
      return (
        <li className="btn btn-secondary username">
          <i className="fa fa-user" aria-hidden="true" />
          {this.props.auth.username}
        </li>
      );
    }
  }

  render() {
    return (
      <header className="page-header">
        <h1 className="page-title">F1 Hero</h1>
        <nav className="navbar">
          <ul>
            <li>
              <Link to={'/picks'} className="btn btn-primary">
                My Picks
              </Link>
            </li>
            <li>
              <Link to={'/leaderboard'} className="btn btn-primary">
                Leaderboard
              </Link>
            </li>
            {this.renderUsername()}
          </ul>
        </nav>
      </header>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
