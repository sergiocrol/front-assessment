import React from 'react';
import { Link } from 'react-router-dom';

import heart from '../images/heart.svg';
import exit from '../images/exit.svg';

function Header() {
  return (
    <div className="header">
      <div className="header-container">
        <span>BRASTLEWARK</span>
        <div> 
          <Link to="/favorites"><img src={heart} alt="favorites"/></Link> 
          <Link to="/"><img className="header-container-exit" src={exit} alt="logout" /></Link> 
        </div>
      </div>
    </div>
  );
}

export default Header;
