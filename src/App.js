import React from 'react';
import './App.css';
import Login from "./Login/Login.js"
import Home from "./Home/Home.js"
import AddCard from "./AddCard/AddCard.js"
import {AuthProvider} from "./Context/Auth.js"
import PrivateRoute from "./PrivateRoute.js"
import { BrowserRouter as Router, Route} from "react-router-dom";

const App = () => {
    return (
      <AuthProvider>
        <Router>
          <div className="App">
            <PrivateRoute exact path="/" exact component={Home} />
            <Route exact path="/login" exact component={Login} />
            <Route exact path="/addCard" exact component={AddCard} />
          </div>
        </Router>
      </AuthProvider>
    );
}

export default App;
