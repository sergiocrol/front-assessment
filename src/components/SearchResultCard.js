/* eslint-disable react/prop-types */
import React, { Component } from 'react';

import WithAuth from '../components/WithAuth.js';

class SearchResultCard extends Component {
  render() {
    const { name, age } = this.props.inhabitant;
    return (
      <div>
        <p>{name} - {age}</p> <span>&#10084;</span>
      </div>
    );
  }
}

export default WithAuth(SearchResultCard);