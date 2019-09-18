import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import WithAuth from '../components/WithAuth.js';
import SearchResultCard from '../components/SearchResultCard';

import brastlewarkService from '../services/BrastlewarkService';

class Favorites extends Component {
  state = {
    favoriteList: []
  }

  // Get favoriteList from localStorage
  componentDidMount() {
    let favoriteList = JSON.parse(localStorage.getItem('BrastlewarkVisitor'));

    if (favoriteList.favorites !== undefined) {
      brastlewarkService.getAllHabitants()
        .then(response => {
          favoriteList = response.data.Brastlewark.filter(inhabitant => { return favoriteList.favorites.includes(inhabitant.id) });
          console.log(favoriteList)
          this.setState({
            favoriteList
          })
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  // Display the appropiate message if user is not allowed or favoriteList is empty
  render() {
    const { isAllowedVisitor } = this.props;
    const { favoriteList } = this.state;
    return (
      <div>
        <h1>Favorites Page</h1>
        {isAllowedVisitor ? (
          favoriteList.length !== 0
            ? favoriteList.map((favorite) =>
              <Link key={favorite.id}
                to={{ pathname: `/gnomes/${favorite.id}`, gnomeInfo: favorite }}>
                <SearchResultCard inhabitant={favorite} />
              </Link>)
            : <p>No items</p>
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