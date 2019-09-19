import React from 'react';

import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="header">
      <div className="header-container">
        <span>BRASTLEWARK</span>
        <div> <Link to="/favorites">favorites</Link> <Link to="/">Exit</Link> </div>
      </div>
    </div>
  );
}

export default Header;
