import firebase from '../firebase';
import './ViewCard.css';
import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

const ViewCard = () => {
  let curIndex = 0;
  let curDocument= new URLSearchParams(window.location.search).get('document');
  const forceUpdate = useForceUpdate();
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
  
  let applications = JSON.parse(localStorage.getItem("localArr"));
  for(let i = 0; i < applications.length; i++){
    if(applications[i].docId === curDocument){
      application = applications[i];
      curIndex = i;
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
  const deleteCard = () =>{
    console.log(new URLSearchParams(window.location.search).get('document'));
    firebase.firestore().collection('Applications').doc(new URLSearchParams(window.location.search).get('document')).delete();
    let tmpArr = JSON.parse(localStorage.getItem("localArr"));
    for(let i = 0; i < tmpArr.length; i++){
      if(tmpArr[i].docId === curDocument){
        tmpArr.splice(i, 1);
      }
    }
    localStorage.setItem("localArr", JSON.stringify(tmpArr));
    localStorage.setItem("backUp", JSON.stringify(tmpArr));
    goHome();
  };
  const updateCard = () =>{
    let editedAppli = {
      company:document.getElementsByClassName("cmpName")[0].value,
      dateApplied:document.getElementsByClassName("Date")[0].value,
      salary:document.getElementsByClassName("Salary")[0].value,
      location:document.getElementsByClassName("Location")[0].value,
      status:document.getElementsByClassName("Status")[0].value,
      jobTitle:document.getElementsByClassName("Position")[0].value,
      jobDesc:document.getElementsByClassName("Description")[0].value,
      contact:document.getElementsByClassName("Contact")[0].value,
      applicationNum:document.getElementsByClassName("AppNum")[0].value,
      userId: application.userId,
      docId:application.docId
    };
    firebase.firestore().collection("Applications").doc(curDocument).update(editedAppli);
    for(let i = 0; i < applications.length; i++){
      if(applications.docId === curDocument){
        applications[i]=editedAppli;
      }
    }
    localStorage.setItem("localArr", JSON.stringify(applications));
    localStorage.setItem("backUp", JSON.stringify(applications));
    goHome();
  };
  return (
      <div style = {{backgroundColor:"rgb(75, 106, 75, 0.3)", width:"100vw", height:"100vh"}} className = "wholeCardPage2">
        <div className="topBarCard2">
          <div className="logo2"></div>
          <div className="siteNameDiv" onClick={goHome}>
            <label className="webNameCard" onClick={goHome}>GoHire</label>
          </div>
        </div>
        
        <div className = "cardAddCard">
          <div className="cardTop">
            <div className="backToHome" onClick={goHome}></div>
            <label className="cardTitle">View Application</label>
          </div>
          
          <form>
            <input className="cmpName" placeholder="Company Name" defaultValue={application.company}></input>
            <input type="date" className="Date" defaultValue={application.dateApplied}></input>
            <input className="Position" placeholder="Position" defaultValue={application.jobTitle}></input>
            <select className="Status" placeholder="Status" defaultValue={application.status}>
              <option value="Status">Status</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
              <option value="Pending">Pending</option>
              <option value="Negotiating">Negotiating</option>
            </select>
            <input className="Location" placeholder="Location" defaultValue={application.location}></input>
            <input className="Salary" placeholder="Salary/Wage" defaultValue={application.salary}></input>
            <input className="Contact" placeholder="Company Contact" defaultValue={application.contact}></input>
            <input className="AppNum" placeholder="Application Number" defaultValue={application.applicationNum}></input>
            <textarea className="Description" type="text" placeholder="Description" defaultValue={application.jobDesc}></textarea>
            <button onClick={updateCard} className="submitAddCard" type="button">Edit</button>
          </form>
        </div>
      </div>
  );
  }
  
  export default ViewCard;