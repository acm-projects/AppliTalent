import firebase from './firebase';
import React, {useState} from 'react';
import './App.css';
import Login from "./Login/Login.js"
import Home from "./Home/Home.js"
import AddCard from "./AddCard/AddCard.js"
import ViewCard from "./ViewCard/ViewCard.js"
import {AuthProvider} from "./Context/Auth.js"
import PrivateRoute from "./PrivateRoute.js"
import { BrowserRouter as Router, Route} from "react-router-dom";

const App = () => {
    const [curDocument, setCurDocument] = useState("");
    const [applications, setApplications] = useState([]);
    
    return (
      <AuthProvider>
        <Router>
          <div className="App">
            <PrivateRoute exact path="/" component={() => <Home setCurDocument={setCurDocument} applications={applications} setApplications={setApplications}/>} />
            <Route exact path="/login" component={() => <Login setApplications={setApplications}/>} />
            <Route exact path="/addCard" component={AddCard} />
            <Route exact path="/viewCard" component={() => <ViewCard curDocument={curDocument} applications={applications}/>} />
          </div>
        </Router>
      </AuthProvider>
    );
}

export default App;
