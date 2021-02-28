import React from 'react';
import './App.css';
import Login from "./Login/Login.js"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends React.Component{
  render(){
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Login} />
          </Switch>
        </div>
      </Router>      
    );
  }
}

export default App;
