import firebase from '../firebase';
import './ViewCard.css';
import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

const ViewCard = ({curDocument, setApplications}) => {
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
    let editedAppli = {
      company:document.getElementsByClassName("viewCompany")[0].value,
      dateApplied:document.getElementsByClassName("viewDateApplied")[0].value,
      salary:document.getElementsByClassName("viewSalary")[0].value,
      location:document.getElementsByClassName("viewLocation")[0].value,
      status:document.getElementsByClassName("viewStatus")[0].value,
      jobTitle:document.getElementsByClassName("viewJobTitle")[0].value,
      jobDesc:document.getElementsByClassName("viewJobDesc")[0].value,
    };
    firebase.firestore().collection("Applications").doc(curDocument).update(editedAppli);
    for(let i = 0; i < applications.length; i++){
      if(applications.docId === curDocument){
        applications[i]=editedAppli;
      }
    }
    localStorage.setItem("localArr", JSON.stringify(applications));
    document.getElementsByClassName("confirmChange")[0].style.display="none";
    submitSymbol();
  };
  const submitSymbol = ()=>{
    document.getElementsByClassName('submitted')[0].style.opacity = 1;
  };
  const editMode = ()=>{
    document.getElementsByClassName("confirmChange")[0].style.display="inline-block";
  };
  const discardChange = ()=>{

  };
  const logout = () =>{
    let emptyArr = [];
    localStorage.setItem("localArr", JSON.stringify(emptyArr));
    firebase.auth().signOut();
  };
  return (
    <div className = "wholeHome">
      <div className="submitted">updated</div>
      <div className="backToHomeView" onClick={goHome}></div>
      <div className="deleteCardView" onClick={deleteCard}></div>
      <div className="updateCardView" onClick={editMode}></div>
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
        <button type="button" className="confirmChange" onClick={updateCard}>Edit</button>
        <button type="button" className="discardChange" onClick={discardChange}>Edit</button>
      </div>
      
    </div>
    
  );
  }
  
  export default ViewCard;