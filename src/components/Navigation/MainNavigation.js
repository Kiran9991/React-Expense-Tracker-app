import React, { useContext, useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";

import "./MainNavigation.css";
import ProfileDetails from "../profileDetails/ProfileDetails";
import AuthContext from "../store/auth-context";

const MainNavigation = () => {
  const [showModal, setShowModal] = useState(false);
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const idToken = localStorage.getItem("token");
  const [ profileData, setProfileData ] = useState({});
  let content;

  const showModalHandler = () => setShowModal(true);

  const closeModal = () => setShowModal(false);

  const logoutHandler = () => {
    authCtx.logout();
    history.replace("/auth");
  };

  useEffect(() => {
    async function getProfileUpdateDetails() {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyC8IykqejjI79ePKYsCrYciX6Vs8G6nySI`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idToken }),
        }
      );
      const data = await res.json();
      // console.log("profile data", data);
      setProfileData({
        userName:data.users[0].displayName,
        url:data.users[0].photoUrl
      })
    }
    if(idToken) {
      getProfileUpdateDetails();
    }  
  }, [idToken, setProfileData]);

  const profileDataHandler = (userName, url) => {
    setProfileData({
      userName: userName,
      url:url
    })
  }

  if(profileData.userName !== undefined && profileData.url !== undefined) {
    content = (
      <p>
        <img className="profile" src={profileData.url} alt=""/>
        <span onClick={showModalHandler}>{profileData.userName}</span>
        {showModal && <ProfileDetails sendProfiledata={profileDataHandler} closeModal={closeModal} />}
      </p>
    );
  }else {
    content = (
      <p>
        Your profile is incomplete.
        <span className="topnavspan" onClick={showModalHandler}>
          Complete now
        </span>
        {showModal && <ProfileDetails sendProfiledata={profileDataHandler} closeModal={closeModal} />}
      </p>
    );
  }

  return (
    <header className="topnav">
      <NavLink to="/home" activeClassName="active">
        Home
      </NavLink>
      <NavLink to='/expense-form' activeClassName='active'>
        Expense
      </NavLink>
      {!authCtx.isLoggedIn && (
        <NavLink to="/auth" activeClassName="active">
          Login
        </NavLink>
      )}
      {authCtx.isLoggedIn && (
        <div className="topnavright">
          {content}
          <button onClick={logoutHandler}>Logout</button>
        </div>
      )}
    </header>
  );
};

export default MainNavigation;
