import React, { useContext, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";

import "./MainNavigation.css";
import ProfileDetails from "../modal/ProfileDetails";
import AuthContext from "../store/auth-context";

const MainNavigation = () => {
  const [showModal, setShowModal] = useState(false);
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const showModalHandler = () => setShowModal(true);

  const closeModal = () => setShowModal(false);

  const logoutHandler = () => {
    authCtx.logout();
    history.replace('/auth');
  }

  return (
    <header className="topnav">
      <NavLink to="/home" activeClassName="active">
        Home
      </NavLink>
      {!authCtx.isLoggedIn && <NavLink to="/auth" activeClassName="active">
        Login
      </NavLink>}
      {authCtx.isLoggedIn && <div className="topnavright">
      <p>
          Your profile is incomplete.
          <span className="topnavspan" onClick={showModalHandler}>Complete now</span>
          {showModal && <ProfileDetails closeModal={closeModal}/>}
        </p>
        <button onClick={logoutHandler}>Logout</button>
      </div>}
    </header>
  );
};

export default MainNavigation;
