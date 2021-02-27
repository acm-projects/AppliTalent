import React from 'react';
import ReactDOM from 'react-dom';
import './Login.css';
let forgotUserPassLink = "";
let signInLink = "";
let signUpLink = "";

class Login extends React.Component{
  constructor(props) {
    super(props);
    this.state = {isLogin: true};

  }

  gotoSignIn(){

  }
  gotoSignUp(){

  }
  flipLogin(){
    let loginBlock = document.getElementsByClassName("loginBlock")[0];
    let signButton = document.getElementsByClassName("signUpButton")[0];
    console.log(this.state.isLogin);
    if(this.state.isLogin === true){
      console.log("true");
      signButton.innerHTML = "Login";
      loginBlock.style.transform = "rotateY(180deg)";
      document.getElementsByClassName("loginBlockBack")[0].style.display = "block";
      document.getElementsByClassName("loginBlockFront")[0].style.opacity = 0;
      
      setTimeout(() => {
        document.getElementsByClassName("loginBlockBack")[0].style.opacity = 1;
        document.getElementsByClassName("loginBlockFront")[0].style.display = "none";
      },500);
      
      this.setState(state => ({isLogin: false}));
    }
    else{
      console.log("false");
      signButton.innerHTML = "Sign up";
      loginBlock.style.transform = "rotateY(0deg)";
      document.getElementsByClassName("loginBlockFront")[0].style.display = "block";
      document.getElementsByClassName("loginBlockBack")[0].style.opacity = 0;
      setTimeout(() => {
        document.getElementsByClassName("loginBlockFront")[0].style.opacity = 1;
        document.getElementsByClassName("loginBlockBack")[0].style.display = "none";
      },500);
      this.setState(state => ({isLogin: true}));
    }
    

  }
  render(){
    return (
      <div className="loginWhole">
        <div className="topBar">
          <div className="logo"></div>
          <div className="webNameDiv">
            <label className="webName">GoHire</label>
          </div>
          <button onClick={() => this.flipLogin()} className="signUpButton">Sign up</button>
        </div>
        <div className="loginBlock">
          <figure className="loginBlockFront">
            <label className="loginTitle">Login</label>
            <form id="loginForm">
              <input className="text1" type="text1" name="username" placeholder="Username"></input>
              <input className="text2" type="password" name="pswd" placeholder="Password"></input>
              <button onClick={() => this.gotoSignIn()} className = "signInButton" type="submit" form="form1" value="Submit">Sign in</button>
            </form>
            <a className="forgotUserPass" href={forgotUserPassLink}>Forgot Username/Password?</a>
          </figure>
          <figure className="loginBlockBack">
            <label className="signUpTitle">Sign up</label>
            <form id="signUpForm">
              <input className="usrnmEnter" type="text1" name="username" placeholder="Username"></input>
              <input className="pswdEnter" type="password" name="pswd" placeholder="Password"></input>
              <input className="confirmPswdEnter" type="password" name="pswd" placeholder="Confirm password"></input>
              <button onClick={() => this.gotoSignUp()} className = "createAccountButton" type="submit" form="form1" value="Submit">Create Account</button>
            </form>
            
          </figure>
        </div>
        
      </div>
    );
  }
}

export default Login;