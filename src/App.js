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
    const [sortState, setSortState] = useState("");
    return (
      <AuthProvider>
        <Router>
          <div className="App">
            <PrivateRoute exact path="/" component={() => <Home setCurDocument={setCurDocument}  setSortState={setSortState}/>} />
            <Route exact path="/login" component={() => <Login setApplications={setApplications}/>} />
            <Route exact path="/addCard" component={() => <AddCard setApplications={setApplications} applications={applications} sortState={sortState} />} />
            <Route exact path="/viewCard" component={() => <ViewCard curDocument={curDocument} setCurDocument={setCurDocument} applications={applications}/>} />
          </div>
        </Router>
      </AuthProvider>
    );
}

export default App;
