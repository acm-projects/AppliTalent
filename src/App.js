import React from 'react';
import './App.css';
import Login from "./Login/Login.js"
import Home from "./Home/Home.js"
import { BrowserRouter as Router, Route, Switch, Link, Redirect, withRouter} from "react-router-dom";



class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isAuthed: true
    };
    this.authedTrue = this.authedTrue.bind(this)
  }

  authedTrue(){
    this.setState({
      isAuthed: true
    });
  }



  render(){
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" render={props => <Login />} />
            <Route exact path="/home" exact component={Home} />
            {/*{this.state.isAuthed ? (<Route path="/home" exact component={Home} />) : <Redirect to="/"/>}*/}
          </Switch>
        </div>
      </Router>      
    );
  }
}

export default App;
