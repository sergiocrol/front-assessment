/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../contexts/auth-context.js';

// If exists a visitor in the localStorage, we display the homepage, otherwise, we display welcome page
const AnonRoute = (props) => {
  const { component: Component } = props;
  return (
    <AuthContext.Consumer>
      {({ isAllowedVisitor, user, saveVisitorName }) => (
        isAllowedVisitor ? <Redirect to="/homepage" />
          : <Route render={props => {
            return <Component
              user={user}
              isAllowedVisitor={isAllowedVisitor}
              saveVisitorName={saveVisitorName}
              {...props} />;
          }}
          />
      )}
    </AuthContext.Consumer>
  );
};

export default AnonRoute;
