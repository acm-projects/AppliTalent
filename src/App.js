import React , {useState, useEffect} from 'react';
import firebase from './firebase';

function App() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const clearError = () => {
    setError("");
  };

  const handleSignUp = () => {
    clearError();
    firebase.auth().createUserWithEmailAndPassword(email, password).
    catch((err) => {
      switch(err.code){
        case "auth/email-already-in-use":
          setError("Email already in use");
      }
    })
  };

  return (
    <div>
    <section class="form animated flipInX">
  <h2>Sign up</h2>
  <label for="email">Email: </label>
    <input type="email" id="email" onChange={handleEmailChange} value={email}/>
    <label for="password">Password: </label>
    <input type="password" id="password" onChange={handlePasswordChange} value={password}/>
    <button id="submit" onClick={handleSignUp}>Create Account</button>
    <p>{error}</p>
</section>
    </div>
  );
}

export default App;
