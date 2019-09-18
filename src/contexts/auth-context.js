import React, { Component } from 'react';

export const AuthContext = React.createContext();

// Check if the visitor has introduced his name (we check if is saved in localstorage)
class AuthProvider extends Component {
  state = {
    user: null,
    isAllowedVisitor: false,
  }

  componentDidMount() {
    const user = localStorage.getItem('BrastlewarkVisitor');
    const isAllowedVisitor = user === null ? false : true;
    this.setState({
      user,
      isAllowedVisitor
    })
  }

  saveVisitorName = (name) => {
    if (name !== '') {
      localStorage.setItem('BrastlewarkVisitor', JSON.stringify({ 'name': name }));
      this.setState({
        isAllowedVisitor: true,
        user: name
      });
      return true;
    } else {
      return false;
    }
  }

  // Check is we have favorite list in localStorage, and store the selected id if not
  addRemoveFavorite = (inhabitantId) => {
    let favoriteList = JSON.parse(localStorage.getItem('BrastlewarkVisitor'));
    favoriteList.favorites === undefined ? favoriteList.favorites = [inhabitantId] : favoriteList.favorites.push(inhabitantId);

    localStorage.setItem('BrastlewarkVisitor', JSON.stringify(favoriteList));
    console.log(localStorage.getItem('BrastlewarkVisitor'))
  }

  render() {
    const { user, isAllowedVisitor } = this.state;
    return (
      <AuthContext.Provider value={
        {
          user,
          isAllowedVisitor,
          saveVisitorName: this.saveVisitorName,
          addRemoveFavorite: this.addRemoveFavorite
        }
      }>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthProvider;
