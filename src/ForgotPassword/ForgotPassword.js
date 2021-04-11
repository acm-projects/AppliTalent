import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import firebase from '../firebase';
import './ForgotPassword.css';
const ForgotPassword = ({setApplications}) => {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const resetPassword = () => {
    const auth = firebase.auth();
    auth.sendPasswordResetEmail(email).then(() => {
      setSuccess(true);
    }).catch(err => {
      switch(err.code){
        case "auth/invalid-email":
        case "auth/user-not-found":
          setError("That email does not exist or is invalid.");
          break;
      }
    });
  };
const goLogin = () =>{
      history.push("/login");
    };
      return (
        <div className = "wholeForgot">
          <div className = "forgotPasswordBlock">
            <figure className="forgotBlockMain">
              <div className = "backButton" onClick={goLogin}></div>
              <label className="passwordReset">Password Reset</label>
              <input className = "emailInput" name="email" id="email" type="email" required value={email} onChange={handleEmailChange} placeholder=" Email"/>
              <button className = "resetButton" onClick={resetPassword}>Send</button>
              {success ? <label className="successfulSend">Email has been sent!</label> : ""}
              {error ? <label className="unsuccessfulSend">This email either doesn't exist or is incorrect.</label> : ""}
            </figure>
          </div>  
        </div>
      );
}
  
  export default ForgotPassword;