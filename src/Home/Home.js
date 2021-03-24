import firebase from '../firebase';
import AppliCard from "./AppliCard.js";
import './Home.css';
import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';


const Home = ({applications, setCurDocument, setApplications}) => {
  let history = useHistory();

  const sortCards = () => {
    console.log("RAN");
    const whatSort = document.getElementsByClassName("dropDown")[0].value;
    console.log(whatSort);
    if(whatSort === "company"){
      const sorted = [...applications].sort((a, b) => {
        if(a.company < b.company) { return -1; }
        if(a.company > b.company) { return 1; }
        return 0;
      });
      setApplications(sorted);
    }
    else if(whatSort === "dateApplied"){
      const sorted = [...applications].sort((a, b) => {
        if(a.dateApplied > b.dateApplied) { return -1; }
        if(a.dateApplied < b.dateApplied) { return 1; }
        return 0;
      });
      setApplications(sorted);
    }
    else if(whatSort === "salary"){
      const sorted = [...applications].sort((a, b) => {
        if(a.salary > b.salary) { return -1; }
        if(a.salary < b.salary) { return 1; }
        return 0;
      });
      setApplications(sorted);
    }
  };
  

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
          <div className = "sortBegin">
          <label className="sortLabel">Sort By:</label>
          </div>
          
          <select className="dropDown">
            <option value="dateApplied">Most Recent</option>
            <option value="company">Company</option>
            <option value="location">Location</option>
            <option value="salary">Salary</option>
          </select>
          <button className="submitSort" type="button" onClick={sortCards} value="Submit">Sort</button>
          
        </div>
      </div>
      <div className="appliIndex">
        <p className="label1">Company</p>
        <p className="label2">Date Applied</p>
        <p className="label3">Position</p>
        <p className="label4">Status</p>
      </div>
      <div className="applications">
        {applications.map((application, index) => <AppliCard application={application} key={index} setCurDocument={setCurDocument}/>)}
      </div>
    </div>
    
  );
  }
  
  export default Home;