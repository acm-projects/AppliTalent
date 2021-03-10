import React from 'react';
import './App.css';
import Login from "./Login/Login.js"
import Home from "./Home/Home.js"
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";



class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isAuthed: false,
      userId:""
    };
  }
  authedIsTrue(userID){
    this.setState({
      isAuthed: true,
    })
  }



  render(){
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Login} />
            
            {this.isAuthed ? <Route path="/home" exact component={Home} /> : <Redirect to="/"/>}
          </Switch>
        </div>
      </Router>      
    );
  }
}

export default App;
