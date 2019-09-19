import React from 'react';
import { Link } from 'react-router-dom';

import heart from '../images/heart.svg';
import exit from '../images/exit.svg';

import WithAuth from '../components/WithAuth';

const Header = (props) => {
  return (
    <div className="header">
      <div className="header-container">
      <Link to="/homepage" style={{ textDecoration: 'none' }}><span>BRASTLEWARK</span></Link> 
        <div> 
          <Link to="/favorites"><img src={heart} alt="favorites"/></Link> 
          { props.isAllowedVisitor ?
            <Link to="/"><img className="header-container-exit" src={exit} alt="logout" /></Link> 
            : null
          }
        </div>
      </div>
    </div>
  );
}

export default WithAuth(Header);
