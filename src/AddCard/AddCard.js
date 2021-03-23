import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import "./AddCard.css";
import firebase from '../firebase';

const AddCard = () => {
    let history = useHistory();
    const [company, setCompanyName] = useState("");
    const [dateApplied, setDateApplied] = useState("");
    const [salary, setSalary] = useState("");
    const [location, setLocation] = useState("");
    const [status, setStatus] = useState("");
    const [jobTitle, setPosition] = useState("");
    const [jobDesc, setDescription] = useState("");
    const [userId, setUserId] = useState(firebase.auth().currentUser.uid);
    const [docId, setDocId] = useState("");
    const handleCompanyNameChange = (e) => {
      setCompanyName(e.target.value);
    };

    const handleDateChange = (e) => {
      setDateApplied(e.target.value);
    };

    const handleSalaryChange = (e) => {
      setSalary(e.target.value);
    };

    const handleLocationChange = (e) => {
      setLocation(e.target.value);
    };

    const handleStatusChange = (e) => {
      setStatus(e.target.value);
    };

    const handlePositionChange = (e) => {
      setPosition(e.target.value);
    };

    const handleDescriptionChange = (e) => {
      setDescription(e.target.value);
    };

    const goHome = () =>{
      history.push("/");
    };

    const addCard = (event) => {
      //console.log(firebase.firestore().collection("Applications").doc().id);
      const res = firebase.firestore().collection("Applications").add({
        company,
        dateApplied,
        salary,
        location,
        status,
        jobTitle,
        jobDesc,
        userId,
        docId
      }).then(docRef => {
        firebase.firestore().collection("Applications").doc(docRef.id).update({docId: docRef.id});
      });
      const arr = document.getElementsByTagName("INPUT");
      for(let i = 0; i < arr.length; i++){
        arr[i].value = "";
      }
    };
  
      return (
        <div className = "wholeCardPage">
          <div className="topBarCard">
            <div className="logo"></div>
            <div className="siteNameDiv">
              <label className="webNameCard">GoHire</label>
            </div>
          </div>
          
          <div className = "cardAddCard">
            <div className="cardTop">
              <label className="cardTitle">Add An Application</label>
              <div className="backToHome" onClick={goHome}></div>
            </div>
            
            <form onSubmit={addCard}>
              <input className="cmpName" placeholder="Company Name" value={company} onChange={handleCompanyNameChange}></input>
              <input type="date" className="Date" value={dateApplied} onChange={handleDateChange}></input>
              <input className="Position" placeholder="Position" value={jobTitle} onChange={handlePositionChange}></input>
              <input className="Status" placeholder="Status" value={status} onChange={handleStatusChange}></input>
              <input className="Salary" placeholder="Salary/Wage" value={salary} onChange={handleSalaryChange}></input>
              <input className="Location" placeholder="Location" value={location} onChange={handleLocationChange}></input>
              <input className="Description" placeholder="Description" value={jobDesc} onChange={handleDescriptionChange}></input>
              <button onClick={addCard} className="submitAddCard" type="button">Add Card</button>
            </form>
          </div>
        </div>
      );
}
  
  export default AddCard;