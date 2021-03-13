import firebase from '../firebase';
import React, { useCallback, useContext } from "react";
import './Login.css';
import { Redirect, withRouter} from "react-router-dom";
import { AuthContext } from "../Context/Auth.js";
let forgotUserPassLink = "";

const Login = ({ history }) => {
  const handleSignUp = useCallback(async event => {
    console.log("THIS");
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      history.push("/");
    } catch (error) {
      alert(error);
    }
  }, [history]);



  const handleLogin = useCallback(
    async event => {
      console.log("THIS");
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );
  


  const flipLogin = ()=>{
    this.clearError();
    //6console.log(`state ${this.state.isFlipping}`);
    if(this.state.isFlipping === true)
    {//console.log(this.state.isFlipping);
      return;}
      
    let loginBlock = document.getElementsByClassName("loginBlock")[0];
    let signButton = document.getElementsByClassName("signUpButton")[0];
    //console.log(this.state.isLogin);
    if(this.state.isLogin === true){
      this.setState(state => ({isFlipping: true}));
      signButton.innerHTML = "Login";
      loginBlock.style.transform = "rotateY(180deg)";
      document.getElementsByClassName("loginBlockBack")[0].style.display = "block";
      document.getElementsByClassName("loginBlockFront")[0].style.opacity = 0;
      setTimeout(() => {
        document.getElementsByClassName("loginBlockBack")[0].style.opacity = 1;
        document.getElementsByClassName("loginBlockBack")[0].style.pointerEvents="auto";
        document.getElementsByClassName("loginBlockFront")[0].style.pointerEvents="none";
        document.getElementsByClassName("loginBlockFront")[0].style.display = "none";
        console.log("OKAY");
        document.getElementsByClassName("text1")[0].value = "";
        document.getElementsByClassName("text2")[0].value = "";
        this.setState(state => ({isFlipping: false}));
      },500);
      this.setState(state => ({isLogin: false}));
    }
    else{
      this.setState(state => ({isFlipping: true}));
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
        this.setState(state => ({isFlipping: false}));
      },500);
      this.setState(state => ({isLogin: true}));
    }
  }



  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    console.log(currentUser);
    return <Redirect to="/" />;
  }

  return (
    <div className="loginWhole">
        <div className="topBar">
          <div className="logo"></div>
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
              <input className="pswdEnter" type="password" name="pswd" placeholder="Password"></input>
              <p className="pswdInvalid2">Weak password, must be 6 or more characters</p>
              <button className = "createAccountButton" type="submit">Create & Login</button>
            </form>
          </figure>
        </div>
      </div>
  );
};
export default withRouter(Login);
