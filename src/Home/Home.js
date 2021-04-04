import firebase from '../firebase';
import AppliCard from "./AppliCard.js";
import NotifCard from "./NotifCard.js"
import './Home.css';
import Modal from 'react-modal';
import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}
Modal.setAppElement('#root');
const Home = ({setCurDocument, setSortState}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isGrid, setIsGrid] = useState(true);
  let history = useHistory();
  let numNotif = 0;
  let dotStyleString = {display:'block'};
  const forceUpdate = useForceUpdate();
  let applications = JSON.parse(localStorage.getItem("localArr"));
  if(applications == null)
    applications = [];
  let applications2 = JSON.parse(localStorage.getItem("backUp"));
  if(applications2 == null)
    applications2 = [];
  let notifApplications = [];
  let whatSort  = "dateApplied";

  useEffect(()=>{
    applications = JSON.parse(localStorage.getItem("localArr"));
  }, []);
  function dateDiffInDays(date1, date2) {
  // Discard the time and time-zone information.
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays;
  }
  const updateNotifAppli = ()=>{
    applications2.map((application, index) => {
            let today = new Date();
            let appliDate = new Date(application.dateApplied);
            if(dateDiffInDays(today, appliDate) === 14)
              notifApplications.push(application);
      });
      numNotif = notifApplications.length;
      if(numNotif == 0){
        dotStyleString = {display:'none'};
      }
  };

  updateNotifAppli();

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
      localStorage.setItem("localArr", JSON.stringify(sorted));
      localStorage.setItem("backUp", JSON.stringify(sorted));
      forceUpdate();
    }
    else if(whatSort === "dateApplied"){
      const sorted = [...applications].sort((a, b) => {
        if(a.dateApplied > b.dateApplied) { return -1; }
        if(a.dateApplied < b.dateApplied) { return 1; }
        return 0;
      });
      localStorage.setItem("localArr", JSON.stringify(sorted));
      localStorage.setItem("backUp", JSON.stringify(sorted));
      forceUpdate();
    }
    else if(whatSort === "salary"){
      const sorted = [...applications].sort((a, b) => {
        if(a.salary > b.salary) { return -1; }
        if(a.salary < b.salary) { return 1; }
        return 0;
      });
      localStorage.setItem("localArr", JSON.stringify(sorted));
      localStorage.setItem("backUp", JSON.stringify(sorted));
      forceUpdate();
    }
  };
  const logout = () =>{
    let emptyArr = [];
    localStorage.setItem("localArr", JSON.stringify(emptyArr));
    localStorage.setItem("backUp", JSON.stringify(emptyArr));
    firebase.auth().signOut();
  };
  const goToAddCard = () => {
    history.push("/addCard")
  };
  const filterFunction = () =>{
    let searchValue = document.getElementsByClassName("searchBar")[0].value.toString().toLowerCase();
    let newApplications = [];
    applications = JSON.parse(localStorage.getItem("backUp"));
    localStorage.setItem("localArr", JSON.stringify(applications));
    for(let i = 0; i < applications.length; i++){
      if(applications[i].company.toLowerCase().indexOf(searchValue) > -1 ||
      applications[i].jobTitle.toLowerCase().indexOf(searchValue) > -1 ||
      applications[i].status.toLowerCase().indexOf(searchValue) > -1){
            newApplications.push(applications[i]);
          }
    }
    localStorage.setItem("localArr", JSON.stringify(newApplications));
    forceUpdate();
  };
  const goHome = () =>{
    history.push("/");
  };
  const toggleView = () =>{
    if(isGrid === true){
      setIsGrid(false);
      document.getElementsByClassName("togglePicGrid")[0].style.display = "none";
      document.getElementsByClassName("togglePicList")[0].style.display = "block";
      document.getElementsByClassName("infoBar")[0].style.display="block";
    }
    else{
      setIsGrid(true);
      document.getElementsByClassName("togglePicGrid")[0].style.display = "block";
      document.getElementsByClassName("togglePicList")[0].style.display = "none";
      document.getElementsByClassName("infoBar")[0].style.display="none";
    }
  };
  return (
    <div className = "wholeHome">
      <div className="leftArea">
        <div className="webTitle">
          <div className="logo"></div>
          <div className="webName">GoHire</div>
        </div>
        <div className="clickAddCard">
          <div className="addPic" onClick={goToAddCard}></div>
          <div className="addCardName" onClick={goToAddCard}>Add Card</div>
        </div>
        <div className="clickViewCard">
          <div className="viewCardPic"></div>
          <div className="viewCardName">View Card</div>
        </div>
        <div className="notiClick">
          <div className="notiPic"><div className="bellNoti"></div><div className="redDot">{numNotif}</div></div>
          <div className="notiName">Notifications</div>
        </div>
        <div className="clickStats">
          <div className="statsPic"></div>
          <div className="statsName">Statistics</div>
        </div>
        <div className="signOut">
          <div className="signOutPic" onClick={logout}></div>
          <div className="signName" onClick={logout}>Sign Out</div>
        </div>
      </div>

      <div className="topOfHome">
        <input className="searchBar" type="text" onKeyUp={filterFunction} placeholder="Search"></input>
        <div className="sortByDiv">
          Sort By:
          <select onChange={sortCards} className="dropDown">
            <option>Select</option>
            <option value="dateApplied">Most Recent</option>
            <option value="company">Company</option>
            <option value="salary">Salary</option>
          </select>
        </div>
        <div className="homeMadeToggle">
          <div className="viewTag">View:</div>
          <div className="toggleButton" onClick={toggleView}>
            <div className="togglePicGrid">
            </div>
            <div className="togglePicList">
            </div>
          </div>
        </div>
      </div>
      
      <div className="cardsHome">
        <div className="infoBar"></div>
        <div className="actualCards">
         {(applications != null)?applications.map((application, index) => <AppliCard isGrid={isGrid} setCurDocument={setCurDocument} application={application} key={index}/>):null}
         </div>
      </div>
    </div>
    
  );
  }
  
  export default Home;