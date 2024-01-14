import { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import email_icon from '../../assets/email.png';
import './ForgotPassword.css';

const ForgotPassword = () => {
    const enteredEmailRef = useRef();
    const [loading, setIsLoading] = useState(false);
    const history = useHistory();

    const submitFormHandler = async(e) => {
        e.preventDefault();
        setIsLoading(true);
        try{
        const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBBUlZNpTUE3QeJz8SoVxljlA-TggPXpac`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            requestType:"PASSWORD_RESET",
            email:enteredEmailRef.current.value,
          })
        });
        alert(`Successfully sended Reset password Link to your email`)
        const data = await res.json();
        console.log('successful', data)
        history.replace('/auth')
        }catch(err) {
            alert(err.message);
            console.log(err);
        }
        setIsLoading(false);
    }

    return (
    <form className="container" type="submit">
      <div className="header">
        <div className="text">Reset Password</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={email_icon} alt="" />
          <input
            type="email"
            placeholder="Enter the registered email"
            ref={enteredEmailRef}
            required
          />
        </div>
      </div>
      <div className="submit-container-btn">
        {loading && <p>Submitting...</p>}
        {!loading && <button className="submitBtn" onClick={submitFormHandler}>Submit</button>}
      </div>
    </form>
    )
}

export default ForgotPassword;