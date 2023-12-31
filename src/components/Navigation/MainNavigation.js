import React from "react";
import { Link } from "react-router-dom";

import './MainNavigation.css';

const MainNavigation = () => {
  return (
    <header class="topnav">
      <Link to='/home'>Home</Link>
      <Link to='/auth'>Login</Link>
    </header>
  );
};

export default MainNavigation;
