/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import WithAuth from '../components/WithAuth.js';

class SearchResultCard extends Component {
  state = {
    redirect: false,
    redirectToInhabitant: false,
    favoriteList: []
  }

  // Heart icon. Whe there is a user in localStore, save the favorite ID; otherwise make a redirection to welcome page
  handleFavorite = (event) => {
    event.stopPropagation();
    const { addRemoveFavorite, inhabitant, isAllowedVisitor, favoriteList } = this.props;
    if(isAllowedVisitor) {
      addRemoveFavorite(inhabitant.id);
      this.setState({
        favoriteList
      })
    }else{
      this.setState({
        redirect: true
      })
    }
  }

  redirectToInhabitant = () => {
    this.setState({
      redirectToInhabitant: true
    })
  }

  render() {
    const { name, age, id } = this.props.inhabitant;
    if(this.state.redirect) { return <Redirect to='/favorites' /> }
    if(this.state.redirectToInhabitant) { return <Redirect to={`/gnomes/${id}`}/> }
    return (
      <div className="card-color" onClick={this.redirectToInhabitant}>
        <p>{name} - {age}</p> <span className="heart" onClick={this.handleFavorite}>&#10084;</span>
      </div>
    );
  }
}

export default WithAuth(SearchResultCard);