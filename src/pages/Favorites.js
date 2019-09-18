import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import WithAuth from '../components/WithAuth.js';

class Favorites extends Component {
  state = {
    favoriteList: []
  }

  componenDidMount() {
    const favoriteList = JSON.parse(localStorage.getItem('BrastlewarkVisitor'));
  }

  render() {
    const { isAllowedVisitor } = this.props;
    return (
      <div>
        <h1>Favorites Page</h1>
        {isAllowedVisitor ? (
          <p></p>
        ) : (
            <div>
              <p>Hey! Who are you? Have you jumped the wall?!</p>
              <p>You have to be registered to access to Hall of Fame!</p>
              <Link to="/welcome">Go back to the entrance</Link>
            </div>
          )}
      </div>
    );
  }
}

export default WithAuth(Favorites);