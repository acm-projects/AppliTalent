import firebase from '../firebase';
import AppliCard from "./AppliCard.js";
import './Home.css';
import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

const Home = ({setCurDocument, setSortState}) => {
  let history = useHistory();
  const forceUpdate = useForceUpdate();
  let applications = JSON.parse(localStorage.getItem("localArr"));
  let whatSort  = "dateApplied";
  const setApplications = (sorted)=>{
    localStorage.setItem("localArr", JSON.stringify(sorted));
  };
  useEffect(()=>{
    applications = JSON.parse(localStorage.getItem("localArr"));
  }, []);

  const sortCards = () => {
    whatSort = document.getElementsByClassName("dropDown")[0].value;
    setSortState(whatSort);
    console.log(whatSort);
    if(whatSort === "company"){
      const sorted = [...applications].sort((a, b) => {
        if(a.company < b.company) { return -1; }
        if(a.company > b.company) { return 1; }
        return 0;
      });
      setApplications(sorted);
      localStorage.setItem("localArr", JSON.stringify(sorted));
      forceUpdate();
    }
    else if(whatSort === "dateApplied"){
      const sorted = [...applications].sort((a, b) => {
        if(a.dateApplied > b.dateApplied) { return -1; }
        if(a.dateApplied < b.dateApplied) { return 1; }
        return 0;
      });
      setApplications(sorted);
      localStorage.setItem("localArr", JSON.stringify(sorted));
      forceUpdate();
    }
    else if(whatSort === "salary"){
      const sorted = [...applications].sort((a, b) => {
        if(a.salary > b.salary) { return -1; }
        if(a.salary < b.salary) { return 1; }
        return 0;
      });
      setApplications(sorted);
      localStorage.setItem("localArr", JSON.stringify(sorted));
      forceUpdate();
    }
  };
  
  const logout = () =>{
    let emptyArr = [];
    localStorage.setItem("localArr", JSON.stringify(emptyArr));
    firebase.auth().signOut();
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
        <div className="signOut" onClick={logout} ></div>
        <div className="addCard" onClick={goToAddCard}></div>
        <div className="notifBell"></div>
      </div>
      <div className="middleBar">
        <input className="searchBar" placeholder="Search"></input>
        <div className="sortByBlock">
          <div className = "sortBegin">
          <label className="sortLabel">Sort By:</label>
          </div>
          
          <select onChange={sortCards} className="dropDown">
            <option>Select</option>
            <option value="dateApplied">Most Recent</option>
            <option value="company">Company</option>
            <option value="salary">Salary</option>
          </select>
          
        </div>
      </div>
      <div className="appliIndex">
        <p className="label5">Salary</p>
        <p className="label1">Company</p>
        <p className="label2">Date Applied</p>
        <p className="label3">Position</p>
        <p className="label4">Status</p>
      </div>
      <div className="applications">
        {(applications != null)?applications.map((application, index) => <AppliCard setCurDocument={setCurDocument} application={application} key={index} whatSort={whatSort} setApplications={setApplications}/>):null}
      </div>
    </div>
    
  );
  }
  
  export default Home;