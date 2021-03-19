import firebase from '../firebase';
import React, { useState, useCallback, useContext } from "react";
import './Login.css';
import { Redirect, withRouter} from "react-router-dom";
import { AuthContext } from "../Context/Auth.js";
let forgotUserPassLink = "";

const Login = ({ history }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isFlipping, setIsFlipping] = useState(false);
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    clearSignupError();
    const { email, password } = event.target.elements;
    console.log(email.value)
    console.log(password.value);
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
    .then(()=>{
      history.push("/")
    })
    .catch(err=>{
      console.log(err.code);
      switch(err.code){
        case "auth/email-already-in-use":
        case "auth/invalid-email":
          document.getElementsByClassName("emailInvalid2")[0].style.opacity = 1;
          return;
        case "auth/invalid-password":
        case "auth/weak-password":
          document.getElementsByClassName("pswdInvalid2")[0].style.opacity = 1;
          return;
        default:
          return;
      }
    });
  }, [history]);

  const handleLogin = useCallback(
    async event => {
      clearLoginError();
      event.preventDefault();
      const { email, password } = event.target.elements;
      firebase.auth().signInWithEmailAndPassword(email.value, password.value)
      .then(() => {
        history.push("/");
      })
      .catch(err => {
        console.log("HEY");
        console.log(email.value + "  " + password.value);
        console.log(err.code);
        switch(err.code){
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            document.getElementsByClassName("emailInvalid")[0].style.opacity = 1;
            break;
          case "auth/wrong-password":
            document.getElementsByClassName("pswdInvalid")[0].style.opacity = 1;
            break;
          default:
            return;
        }
        console.log()
        if(document.getElementsByClassName("text2")[0].value==="")
          document.getElementsByClassName("text2")[0].placeholder = "Please Enter Password";
        else
          document.getElementsByClassName("text2")[0].placeholder = "Password";
      });
    },
    [history]
  );
  


  const flipLogin = ()=>{
    if(isFlipping === true){
      return;
    }
    clearLoginError();
    clearSignupError();
    let loginBlock = document.getElementsByClassName("loginBlock")[0];
    let signButton = document.getElementsByClassName("signUpButton")[0];
    if(isLogin === true){
      setIsFlipping(true);
      signButton.innerHTML = "Login";
      loginBlock.style.transform = "rotateY(180deg)";
      document.getElementsByClassName("loginBlockBack")[0].style.display = "block";
      document.getElementsByClassName("loginBlockFront")[0].style.opacity = 0;
      setTimeout(() => {
        document.getElementsByClassName("loginBlockBack")[0].style.opacity = 1;
        document.getElementsByClassName("loginBlockBack")[0].style.pointerEvents="auto";
        document.getElementsByClassName("loginBlockFront")[0].style.pointerEvents="none";
        document.getElementsByClassName("loginBlockFront")[0].style.display = "none";
        document.getElementsByClassName("text1")[0].value = "";
        document.getElementsByClassName("text2")[0].value = "";
        setIsFlipping(false);
      },500);
      setIsLogin(false);
    }
    else{
      setIsFlipping(true);
      signButton.innerHTML = "Sign up";
      loginBlock.style.transform = "rotateY(0deg)";
      document.getElementsByClassName("loginBlockFront")[0].style.display = "block";
      document.getElementsByClassName("loginBlockBack")[0].style.opacity = 0;
      setTimeout(() => {
        document.getElementsByClassName("loginBlockFront")[0].style.opacity = 1;
        document.getElementsByClassName("loginBlockBack")[0].style.display = "none";
        document.getElementsByClassName("loginBlockBack")[0].style.pointerEvents="none";
        document.getElementsByClassName("loginBlockFront")[0].style.pointerEvents="auto";
        document.getElementsByClassName("emailEnter")[0].value = "";
        document.getElementsByClassName("pswdEnter")[0].value = "";
        setIsFlipping(false);
      },500);
      setIsLogin(true);
    }
  }
  const clearLoginError = () => {
    document.getElementsByClassName("emailInvalid")[0].style.opacity = 0;
    document.getElementsByClassName("pswdInvalid")[0].style.opacity = 0;
  };
  const clearSignupError = ()=>{
    document.getElementsByClassName("emailInvalid2")[0].style.opacity = 0;
    document.getElementsByClassName("pswdInvalid2")[0].style.opacity = 0;
  }
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="loginWhole">
        <div className="topBar">
          <div className="logoPhoto"></div>
          <div className="webNameDiv">
            <label className="webName">GoHire</label>
          </div>
          <button onClick={flipLogin} className="signUpButton">Sign up</button>
        </div>
        <div className="loginBlock">
          <figure className="loginBlockFront">
            <label className="loginTitle">Login</label>
            <form id="loginForm" onSubmit={handleLogin}>
              <input className="text1" type="email" name="email" placeholder="Email"></input>
              <p className="emailInvalid">That email does not exist</p>
              <input className="text2" type="password" name="password" placeholder="Password"></input>
              <p className="pswdInvalid">Wrong password</p>
              <button className = "signInButton" type="submit">Sign in</button>
            </form>
            <a className="forgotUserPass" href={forgotUserPassLink}>Forgot Username/Password?</a>
          </figure>
          <figure className="loginBlockBack" onSubmit={handleSignUp}>
            <label className="signUpTitle">Sign up</label>
            <form id="signUpForm">
              <input className="emailEnter" type="email" name="email" placeholder="Email"></input>
              <p className="emailInvalid2">That email already exists or is invalid</p>
              <input className="pswdEnter" type="password" name="password" placeholder="Password"></input>
              <p className="pswdInvalid2">Weak password, must be 6 or more characters</p>
              <button className = "createAccountButton" type="submit">Create & Login</button>
            </form>
          </figure>
        </div>
      </div>
  );
};
export default withRouter(Login);
