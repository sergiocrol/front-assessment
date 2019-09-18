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

  render() {
    const { user, isAllowedVisitor } = this.state;
    return (
      <AuthContext.Provider value={
        {
          user,
          isAllowedVisitor,
          saveVisitorName: this.saveVisitorName
        }
      }>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthProvider;
