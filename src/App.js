import React from 'react';
import './App.css';
import Login from "./Login/Login.js"
import Home from "./Home/Home.js"
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";



class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isAuthed: false
    };
  }
  render(){
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/home" exact component={Home} />
          </Switch>
        </div>
      </Router>      
    );
  }
}

export default App;
