import React, { Component } from 'react';

import WithAuth from '../components/WithAuth.js';

class Favorites extends Component {
  render() {
    return (
      <div>
        <h1>Favorites Page</h1>
      </div>
    );
  }
}

export default WithAuth(Favorites);