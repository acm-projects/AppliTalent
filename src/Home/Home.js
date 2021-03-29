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
  return (
    <div className = "wholeHome">
      <div className="notifModal">
        <Modal
        isOpen={modalOpen} 
        onRequestClose={()=>setModalOpen(false)}
        style={
          {
            overlay:{
              backgroundColor:'rgba(255,255,255,0.5)',
              
            },
            content:{
              borderRadius:"10px",
              width:"50%",
              margin:"auto",
              color: '#94618E',
              display: 'inline-block',
              fontFamily:"Arial, Helvetica, sans-serif",
            }
          }
        }>
          <div className="notifTopBar">
            <h2 className="notifTitle">Applied 2 Weeks Ago</h2>
            <div className="notifExit" onClick={()=> setModalOpen(false)}></div>
          </div>
          {applications.map((application, index) => {
            let today = new Date();
            let appliDate = new Date(application.dateApplied);
            if(dateDiffInDays(today, appliDate) === 14)
              return <NotifCard setCurDocument={setCurDocument} application={application} key={index}/>
          })}
        </Modal>
      </div>
      <div className="topBarHome">
        <div onClick={goHome} className="logoHome"></div>
        <div className="webNameDivHome">
            <label className="webNameHome">GoHire</label>
        </div>
        <div className="signOut" onClick={logout} ></div>
        <div className="addCard" onClick={goToAddCard}></div>
        <div className="notifBell" onClick={()=>setModalOpen(true)}></div>
        <div className="redDot" style={dotStyleString} onClick={()=>setModalOpen(true)}>{numNotif}</div>
      </div>
      <div className="middleBar">
        <input className="searchBar" placeholder="Search" onKeyUp={filterFunction}></input>
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
        {(applications != null)?applications.map((application, index) => <AppliCard setCurDocument={setCurDocument} application={application} key={index}/>):null}
      </div>
    </div>
    
  );
  }
  
  export default Home;