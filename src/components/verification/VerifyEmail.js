import { Fragment, useState } from "react";

const VerifyEmail = () => {
    const [isVerifiying, setIsVerifiying] = useState(false);
    const idToken = localStorage.getItem('token');

    const verifyUserEmail = async() => {
        try{
            setIsVerifiying(true);
            const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC8IykqejjI79ePKYsCrYciX6Vs8G6nySI`, {
                method: `POST`,
                headers: {
                    'Content-Type': 'json/application'
                },
                body: JSON.stringify({ requestType: "VERIFY_EMAIL" ,idToken }),
            })
            const data = await res.json();
            console.log('Successfully sended verifiying link', data);
            alert('Verifiying link is sent to your email')
        }catch(err) {
            alert(err.message)
            console.log(err)
        }
        setIsVerifiying(false);
    }

    return (<Fragment>
        <div>
            <h4>Please click the button below to verify your email</h4>
        </div>
        {isVerifiying && <p>Verifiying your Email....</p>} 
        {!isVerifiying && <button onClick={verifyUserEmail}>Verify your e-mail address</button>}
    </Fragment>)
}

export default VerifyEmail;