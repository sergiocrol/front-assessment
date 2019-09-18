/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import WithAuth from '../components/WithAuth.js';

class SearchResultCard extends Component {
  state = {
    redirect: false,
    redirectToInhabitant: false,
    color: '#777',
    favoriteList: []
  }

  componentDidMount() {
    this.updateFavoriteList();
  }

  // Heart icon. Whe there is a user in localStore, save the favorite ID; otherwise make a redirection to welcome page
  handleFavorite = (event) => {
    event.stopPropagation();
    const { addRemoveFavorite, inhabitant, isAllowedVisitor } = this.props;
    if (isAllowedVisitor) {
      addRemoveFavorite(inhabitant.id);
      this.updateFavoriteList();
    } else {
      this.setState({
        redirect: true
      })
    }
  }

  updateFavoriteList = () => {
    const { getFavoriteList } = this.props;
    const favoriteList = JSON.parse(localStorage.getItem('BrastlewarkVisitor'));
    this.setState({
      favoriteList: favoriteList.favorites
    }, () => { getFavoriteList() })
  }

  redirectToInhabitant = () => {
    this.setState({
      redirectToInhabitant: true
    })
  }

  render() {
    const { name, age, id } = this.props.inhabitant;
    const { favoriteList } = this.state;
    if (this.state.redirect) { return <Redirect to='/favorites' /> }
    if (this.state.redirectToInhabitant) { return <Redirect to={`/gnomes/${id}`} /> }
    return (
      <div className="card-color" onClick={this.redirectToInhabitant}>
        <p>{name} - {age}</p> <span className="heart" onClick={this.handleFavorite} style={favoriteList.includes(id) ? { color: '#F2627A' } : { color: '#777' }}>&#10084;</span>
      </div>
    );
  }
}

export default WithAuth(SearchResultCard);