import { useState, useRef } from "react";
import email_icon from "./assets/email.png";
import password_icon from "./assets/password.png";
import "./AuthForm.css";

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
  const enteredEmail = useRef();
  const enteredPassword = useRef();
  const enteredConfirmPassword = useRef();

  const submitFormHandler = async (e) => {
    e.preventDefault();
    const email = enteredEmail.current.value;
    const password = enteredPassword.current.value;
    const confirmPassword = enteredConfirmPassword.current.value;
    setIsLoading(true);
    try {
      if (!validateEmail(email)) {
        alert(`Please enter valid Email`);
      } else if (!validatePassWord(password, confirmPassword)) {
        alert(`Please enter valid Password`);
      } else {
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC8IykqejjI79ePKYsCrYciX6Vs8G6nySI`;
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
        if (res.ok) {
          alert(`Successfully created your account`);
        } else {
          const errorData = await res.json();
          throw new Error(errorData.error.message);
        }
        const data = await res.json();
        console.log("successful", data);
        enteredEmail.current.value = "";
        enteredPassword.current.value = "";
      }
      enteredConfirmPassword.current.value = "";
    } catch (err) {
      alert(`Signing Failed`);
      console.log(err);
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
          <button className="submitBtn" onClick={submitFormHandler}>
            Submit
          </button>
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
