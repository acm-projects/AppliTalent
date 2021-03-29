import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import firebase from '../firebase';

const ForgotPassword = ({setApplications}) => {
  
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

      return (
        <div className = "wholeForgot">
          <label for="email">Enter your email: </label>
          <input name="email" id="email" type="email" required value={email} onChange={handleEmailChange} />
          <button onClick={resetPassword}>Reset Email</button>
          {success ? <p>An password reset email has been sent to your email.</p> : ""}
          {error ? <p>{error}</p> : ""}
        </div>
      );
}
  
  export default ForgotPassword;