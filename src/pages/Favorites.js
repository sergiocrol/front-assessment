import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import WithAuth from '../components/WithAuth.js';
import SearchResultCard from '../components/SearchResultCard';
import Header from '../components/Header';

import brastlewarkService from '../services/BrastlewarkService';

class Favorites extends Component {
  state = {
    favoriteList: []
  }

  // Get favoriteList from localStorage
  componentDidMount() {
    this.getFavoriteList();
  }

  getFavoriteList = () => {
    let favoriteList = JSON.parse(localStorage.getItem('BrastlewarkVisitor'));

    if (favoriteList !== null && favoriteList.favorites !== undefined) {
      brastlewarkService.getAllHabitants()
        .then(response => {
          favoriteList = response.data.Brastlewark.filter(inhabitant => { return favoriteList.favorites.includes(inhabitant.id) });
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
        <Header />
        <div className="homepage">
          <div className="homepage-container">
            <div className="homepage-searchbox u-margin-bottom-medium favorites-searchbox">
              <div className="triangle"></div>
              <h1>Here are your favorites</h1>
              <h2><span>(</span>AKA Tindegnomer :3<span>)</span></h2>
            </div>
            {isAllowedVisitor ? (
              favoriteList.length !== 0
                ? favoriteList.map((favorite) => <SearchResultCard key={favorite.id} inhabitant={favorite} getFavoriteList={this.getFavoriteList} />)
                : <p>No items</p>
            ) : (
                <div>
                  <p>Hey! Who are you? Did you jump the wall?!</p>
                  <p>You have to be registered to access to Hall of Fame!</p>
                  <Link to="/welcome">Go back to the entrance</Link>
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }
}

export default WithAuth(Favorites);