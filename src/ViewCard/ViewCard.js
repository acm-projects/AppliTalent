import firebase from '../firebase';
import './ViewCard.css';
import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

const ViewCard = ({curDocument, applications,  setCurDocument}) => {
  let curIndex = 0;
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
  
  applications = JSON.parse(localStorage.getItem("localArr"));
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
    firebase.firestore().collection('Applications').doc(curDocument).delete();
    let tmpArr = JSON.parse(localStorage.getItem("localArr"));
    for(let i = 0; i < tmpArr.length; i++){
      if(tmpArr[i].docId === curDocument){
        tmpArr.splice(i, 1);
      }
    }
    localStorage.setItem("localArr", JSON.stringify(tmpArr));
    goHome();
  };
  const updateCard = () =>{

  };
  const logout = () =>{
    let emptyArr = [];
    localStorage.setItem("localArr", JSON.stringify(emptyArr));
    firebase.auth().signOut();
  };
  return (
    <div className = "wholeHome">
      <div className="backToHomeView" onClick={goHome}></div>
      <div className="deleteCardView" onClick={deleteCard}></div>
      <div className="updateCardView" onClick={updateCard}></div>
      <div className="topBarHome">
        <div className="logoHome"></div>
        <div className="webNameDivHome">
            <label className="webNameHome">GoHire</label>
        </div>
        <div className="signOut" onClick={logout} ></div>
        <div className="addCard" onClick={goToAddCard}></div>
        <div className="notifBell"></div>
      </div>
      <div className="underTopBar">
        <input type="text" className="viewCompany" defaultValue={application.company}></input>
        <input type="text" className="viewJobTitle" defaultValue={application.jobTitle}></input>
        <input type="text" className="viewLocation" defaultValue={application.location}></input> 
        <input type="text" className="viewDateApplied" defaultValue={application.dateApplied}></input>
        <input type="text" className="viewSalary" defaultValue={`${application.salary}`}></input>       
        <input type="text" className="viewStatus" defaultValue={application.status}></input>
        <p className="jobDescLabel">Job Description:</p>
        <textarea type="text" className="viewJobDesc" defaultValue={application.jobDesc}></textarea>
        <button type="button" className="confirmChange">change</button>
      </div>
      
    </div>
    
  );
  }
  
  export default ViewCard;