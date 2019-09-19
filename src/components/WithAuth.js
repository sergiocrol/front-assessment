import React, { Component } from 'react';

import { AuthContext } from '../contexts/auth-context.js';

const WithAuth = (Comp) => {
  return class WithAuth extends Component {
    render() {
      return (
        <AuthContext.Consumer>
          {({ user, isAllowedVisitor, addRemoveFavorite, saveVisitorName }) => (
            <Comp
              user={user}
              isAllowedVisitor={isAllowedVisitor}
              addRemoveFavorite={addRemoveFavorite}
              saveVisitorName={saveVisitorName}
              {...this.props}
            />
          )}
        </AuthContext.Consumer>
      );
    }
  };
};

export default WithAuth;