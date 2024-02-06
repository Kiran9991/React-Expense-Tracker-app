import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import "./MainNavigation.css";
import ProfileDetails from "../ProfileDetails/ProfileDetails";
import { authActions } from '../store/auth';

const MainNavigation = () => {
  const [showModal, setShowModal] = useState(false);
  const [ profileData, setProfileData ] = useState({});

  const isAuth = useSelector(state => state.auth.isAuthenticated);
  const showPremium = useSelector((state) => state.auth.showPremium);
  const isPremium = useSelector((state) => state.auth.isPremium);
  const dispatch = useDispatch();
  const history = useHistory();
  const idToken = localStorage.getItem("token");
  
  let content;

  const showModalHandler = () => setShowModal(true);

  const closeModal = () => setShowModal(false);

  const logoutHandler = () => {
    dispatch(authActions.logout());
    dispatch(authActions.removeToken());
    history.replace("/auth");
  };

  useEffect(() => {
    async function getProfileUpdateDetails() {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBBUlZNpTUE3QeJz8SoVxljlA-TggPXpac`,
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

  const premiumHandler = () => {
    dispatch(authActions.setIsPremium());
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
// Add a use Reducer Theme...
  return (
    <header className='topnav'>
      <NavLink to="/home" activeClassName="active">
        Home
      </NavLink>
      {isAuth && <NavLink to='/expense-form' activeClassName='active'>
        Expense
      </NavLink>}
      {!isAuth && (
        <NavLink to="/auth" activeClassName="active">
          Login
        </NavLink>
      )}
      {isAuth && (
        <div className="topnavright">
          {showPremium && <button className="navBtn1" onClick={premiumHandler}>
            {isPremium ? 'Your are now Premium User': 'ActivatePremium'}</button>}
          {content}
          <button className="navBtn" onClick={logoutHandler}>Logout</button>
        </div>
      )}
    </header>
  );
};

export default MainNavigation;
