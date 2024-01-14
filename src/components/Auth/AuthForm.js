import { useState, useRef, useContext } from "react";

import email_icon from '../assets/email.png';
import password_icon from '../assets/password.png';
import "./AuthForm.css";
import AuthContext from "../store/auth-context";
import { useHistory, NavLink } from "react-router-dom";


function validatePassWord(password, confirmPassword) {
  if (password.length < 6 || password !== confirmPassword) return false;
  return true;
}

function validateEmail(email) {
  if (email.length < 5 || !email.includes("@") || !email.includes(".")) {
    return false;
  }
  return true;
}

const Signup = () => {
  const [action, setAction] = useState("Sign Up");
  const [loading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const enteredEmail = useRef();
  const enteredPassword = useRef();
  const enteredConfirmPassword = useRef();

  const submitFormHandler = async (e) => {
    e.preventDefault();
    const email = enteredEmail.current.value;
    const password = enteredPassword.current.value;
    let confirmPassword;
    if(action==='Sign Up') confirmPassword = enteredConfirmPassword.current.value;
    setIsLoading(true);
    try {
      if (!validateEmail(email)) {
        alert(`Please enter valid Email`);
      } else if (action === 'Sign Up' && !validatePassWord(password, confirmPassword)) {
        alert(`Please enter valid Password`);
      } else {
        let url;
        if(action === 'Sign Up') {
          url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBBUlZNpTUE3QeJz8SoVxljlA-TggPXpac`;
        }else {
          url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBBUlZNpTUE3QeJz8SoVxljlA-TggPXpac`
        }
        const res = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
          headers: {
            "content-type": "application/json",
          },
        });
        const data = await res.json();
        if (res.ok && action === 'Sign Up') {
          alert(`Successfully created your account`);
          setAction('Login');
        }else if(res.ok && action === 'Login') {
          alert(`Successfully Logged in`)
          authCtx.login(data.idToken)
          history.replace('/home')
        }else if(action === 'Login' && !res.ok) {
          enteredEmail.current.value = "";
          enteredPassword.current.value = "";
          throw new Error(data.error.message)
        } else {
          const errorData = await res.json();
          console.log('error')
          throw new Error(errorData.error.message);
        }
        // console.log("successful", data);
        enteredEmail.current.value = "";
        enteredPassword.current.value = "";
      }
      if(action === 'Sign Up') enteredConfirmPassword.current.value = "";
    } catch (err) {
      alert(err.message);
      console.log(err.message);
    }
    setIsLoading(false);
  };

  return (
    <form className="container" type="submit">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={email_icon} alt="" />
          <input
            type="email"
            placeholder="Email Id"
            ref={enteredEmail}
            required
          />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input
            type="password"
            placeholder="Password"
            ref={enteredPassword}
            required
          />
        </div>
        {action === "Sign Up" && (
          <div className="input">
            <img src={password_icon} alt="" />
            <input
              type="password"
              placeholder="Confirm Password"
              ref={enteredConfirmPassword}
              required
            />
          </div>
        )}
      </div>
      <div className="submit-container-btn">
        {loading ? (
          <p>Submitting form data....</p>
        ) : (
          [action === 'Login' && <NavLink to='/forgot-password'>Forgot Password?</NavLink>,
          <button className="submitBtn" onClick={submitFormHandler}>
            Submit
          </button>]
        )}
      </div>
      <div className="submit-container">
        <div
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={() => {
            setAction("Sign Up");
          }}
        >
          Sign Up
        </div>
        <div
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={() => {
            setAction("Login");
          }}
        >
          Login
        </div>
      </div>
    </form>
  );
};

export default Signup;
