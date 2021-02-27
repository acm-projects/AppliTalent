import React from 'react';
import './Login.css';
let forgotUserPassLink = "";
let signInLink = "";
let signUpLink = "";

class Login extends React.Component{

  gotoSignIn(){

  }
  gotoSignUp(){

  }
  render(){
    return (
      <div className="loginWhole">
        <div className="topBar">
          <div className="logo"></div>
          <div className="webNameDiv">
            <label className="webName">GoHire</label>
          </div>
          <button className="signUpButton" onClick={this.goToSignIn}>Sign up</button>
        </div>
        <div className="loginBlock">
          <label className="loginTitle">Login</label>
          <form id="loginForm">
					  <input className="text1" type="text1" name="username" placeholder="Username"></input>
					  <input className="text2" type="password" name="pswd" placeholder="Password"></input>
          </form>
          <button onClick={this.gotoSignUp} className = "signInButton" type="submit" form="form1" value="Submit">Sign in</button>
          <a className="forgotUserPass" href={forgotUserPassLink}>Forgot Username/Password?</a>
        </div>
      </div>
    );
  }
}

export default Login;
