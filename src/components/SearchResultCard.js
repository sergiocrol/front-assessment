/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import WithAuth from '../components/WithAuth.js';

class SearchResultCard extends Component {

  handleFavorite = () => {
    const { addRemoveFavorite, inhabitant } = this.props;
    addRemoveFavorite(inhabitant.id);
  }

  render() {
    const { name, age } = this.props.inhabitant;
    return (
      <div>
        <p>{name} - {age}</p> {this.props.isAllowedVisitor ? <a href="#0" onClick={this.handleFavorite}>&#10084;</a> : <Link to='/favorites'><span>&#10084;</span></Link>}
      </div>
    );
  }
}

export default WithAuth(SearchResultCard);