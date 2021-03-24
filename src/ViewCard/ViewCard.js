import firebase from '../firebase';
import './ViewCard.css';
import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';


const ViewCard = ({curDocument, applications}) => {
  let application={
        "company": "",
        "dateApplied": "",
        "salary": "",
        "location": "",
        "status": "",
       "jobTitle": "",
        "jobDesc": "",
        "userId": "",
        "docId": ""
      };
  for(let i = 0; i < applications.length; i++){
    if(applications[i].docId === curDocument){
      application = applications[i];
      break;
    }
  }
  
  let history = useHistory();
  const goToAddCard = () => {
    history.push("/addCard")
  };
  const goHome = () =>{
    history.push("/");
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
      <div>VIEWCARD</div>
      <div className="backToHome" onClick={goHome}></div>
      <div className="label1">{application.company}</div>
      <div className="label2">{application.dateApplied}</div>
      <div className="label3">{application.jobTitle}</div>
      <div className="label4">{application.status}</div>
    </div>
    
  );
  }
  
  export default ViewCard;