import firebase from '../firebase';
import React from 'react';
import './Login.css';
let forgotUserPassLink = "";
let signInLink = "";
let signUpLink = "";

class Login extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
      isFlipping: false,
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
      user: "",
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  clearError(){
    this.setState({emailError: "", passwordError: ""});
  }
  
  clearInput(){
    this.setState({email: "", password: ""});
  }

  handleEmailChange(e){
    this.setState({
      email: e.target.value
    });
  }

  handlePasswordChange(e){
    this.setState({
      password: e.target.value
    })
  }

  gotoSignIn(){
    console.log("ran");
    this.clearError();
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .catch(err => {
      switch(err.code){
        case "auth/invalid-email":
        case "auth/user-disabled":
        case "auth/user-not-found":
          this.setState({emailError: "That email does not exist."});
          break;
        case "auth/wrong-password":
          this.setState({passwordError: "Wrong password"});
          break;
      }
    })
  }
  gotoSignUp(){
    console.log("ran");
    this.clearError();
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .catch(err => {
      switch(err.code){
        case "auth/email-already-in-use":
        case "auth/invalid-email":
          this.setState({emailError: "That email already exists or is invalid."})
          break;
        case "auth/invalid-password":
          this.setState({passwordError: "Weak password, must be 6 or more characters."})
          break;
      }
    })
  }

  authListener = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.clearInput();
      if(user){
        this.setState({user: user});
      }
      else{
        this.setState({user: ""});
      }
    })
  };

  componentWillReceiveProps(){
    this.authListener();
  }

  flipLogin(){
    this.clearError();
    //6console.log(`state ${this.state.isFlipping}`);
    if(this.state.isFlipping === true)
    {//console.log(this.state.isFlipping);
      return;}
      
    let loginBlock = document.getElementsByClassName("loginBlock")[0];
    let signButton = document.getElementsByClassName("signUpButton")[0];
    console.log(this.state.isLogin);
    if(this.state.isLogin === true){
      this.setState(state => ({isFlipping: true}));
      signButton.innerHTML = "Login";
      loginBlock.style.transform = "rotateY(180deg)";
      document.getElementsByClassName("loginBlockBack")[0].style.display = "block";
      document.getElementsByClassName("loginBlockFront")[0].style.opacity = 0;
      setTimeout(() => {
        document.getElementsByClassName("loginBlockBack")[0].style.opacity = 1;
        document.getElementsByClassName("loginBlockFront")[0].style.display = "none";
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
        document.getElementsByClassName("emailEnter")[0].value = "";
        document.getElementsByClassName("pswdEnter")[0].value = "";
        this.setState(state => ({isFlipping: false}));
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
              <input onChange={this.handleEmailChange} value={this.state.email} className="text1" type="email" name="email" placeholder="Email"></input>
              <p>{this.state.emailError}</p>
              <input onChange={this.handlePasswordChange} value={this.state.password} className="text2" type="password" name="pswd" placeholder="Password"></input>
              <p>{this.state.passwordError}</p>
              <button onClick={() => this.gotoSignIn()} className = "signInButton" type="submit" form="form1" value="Submit">Sign in</button>
            </form>
            <a className="forgotUserPass" href={forgotUserPassLink}>Forgot Username/Password?</a>
          </figure>
          <figure className="loginBlockBack">
            <label className="signUpTitle">Sign up</label>
            <form id="signUpForm">
              <input className="emailEnter" type="email" name="email" placeholder="Email"></input>
              <p>{this.state.emailError}</p>
              <input className="pswdEnter" type="password" name="pswd" placeholder="Password"></input>
              <p>{this.state.passwordError}</p>
              <button onClick={() => this.gotoSignUp()} className = "createAccountButton" type="submit" form="form1" value="Submit">Create Account</button>
            </form>
          </figure>
        </div>
      </div>
    );
  }
}

export default Login;
