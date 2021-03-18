import firebase from '../firebase';
import AppliCard from "./AppliCard.js";
import './Home.css';
import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Button } from 'react';


const Home = ({ history }) => {

  const [applications, setApplications] = useState([]);

  const getApplications = () => {
    const ref = firebase.firestore().collection("Applications");
        ref.onSnapshot((snapshot) => {
            const apps = [];
            snapshot.forEach(doc => {
                apps.push(doc.data());
            })
            setApplications(apps);
        })
  };

  useEffect(() => {
    getApplications();
  }, []);

  const goToAddCard = () => {
    history.push("/addCard")
  };
  
  return (
    <div className = "wholeHome">
      <div className="topBarHome">
        <div className="logoHome"></div>
        <div className="webNameDivHome">
            <span style={{'fontSize': '25px'}}>GoHire</span>
            
        </div>
        <div className="signOut" onClick={() => firebase.auth().signOut()} ></div>
        <div className="addCard" onClick={goToAddCard}></div>
        <div className="notifBell"></div>
      </div>
      <div className="middleBar">
        <input className="searchBar" placeholder="Search"></input>
        <div className="sortByBlock">
          <div className = "sortBegin">
          <label className="sortLabel">Sort By:</label>
          </div>
          
          <select className="dropDown">
            <option value="mostRecent">Most Recent</option>
            <option value="company">Company</option>
            <option value="Location">Location</option>
            <option value="Salary">Salary</option>
          </select>
          <button className="submitSort" type="submit" value="Submit">Sort</button>
          
        </div>
      </div>
      <div className="applications">
        {applications.map((application, index) => <AppliCard application={application} key={index}/>)}
      </div>
    
    </div>
    
  );
  }
  
  export default Home;