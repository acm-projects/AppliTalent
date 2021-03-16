import firebase from '../firebase';
import './Home.css';
import React from 'react';


const Home = ({ history }) => {
  const appArray = [];


  const goToAddCard = () => {
    history.push("/addCard")
  };
  return (
    <div className = "wholeHome">
      <div className="topBarHome">
        <div className="logoHome"></div>
        <div className="webNameDivHome">
          <label className="webNameHome">GoHire</label>
        </div>
        <div className="signOut" onClick={() => firebase.auth().signOut()} ></div>
        <div className="addCard" onClick={goToAddCard}></div>
        <div className="notifBell"></div>
      </div>
      <div className="middleBar">
        <input className="searchBar" placeholder="Search"></input>
        <div className="sortByBlock">
          <select className="dropDown">
            <option value="mostRecent">Most Recent</option>
            <option value="company">Company</option>
            <option value="Location">Location</option>
            <option value="Salary">Salary</option>
          </select>
          <button className="submitSort" type="submit" value="Submit">Sort</button>
          
        </div>
      </div>
    
    </div>
    
  );
  }
  
  export default Home;