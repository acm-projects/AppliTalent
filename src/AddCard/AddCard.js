import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import "./AddCard.css";
import firebase from '../firebase';

const AddCard = ({setApplications}) => {
    let whatSort = "";
    let history = useHistory();
    const [company, setCompanyName] = useState("");
    const [dateApplied, setDateApplied] = useState("");
    const [salary, setSalary] = useState("");
    const [location, setLocation] = useState("");
    const [status, setStatus] = useState("");
    const [jobTitle, setPosition] = useState("");
    const [jobDesc, setDescription] = useState("");
    const [contact, setContact] = useState("");
    const [applicationNum, setAppNum] = useState("");
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

    const handleContactChange = (e) => {
      setContact(e.target.value);
    };
    
    const handleAppNumChange = (e) => {
      setAppNum(e.target.value);
    };
    
    const handleDescriptionChange = (e) => {
      setDescription(e.target.value);
    };

    const goHome = () =>{
      history.push("/");
    };

    const addCard = (event) => {
      //console.log(firebase.firestore().collection("Applications").doc().id);
      const curCard = {
        company,
        dateApplied,
        contact,
        applicationNum,
        salary,
        location,
        status,
        jobTitle,
        jobDesc,
        userId,
        docId
      };
      const res = firebase.firestore().collection("Applications").add(curCard).then(docRef => {
        firebase.firestore().collection("Applications").doc(docRef.id).update({docId: docRef.id});
        curCard.docId = docRef.id;
      });
      let tmpArr = JSON.parse(localStorage.getItem("localArr"));
      
      tmpArr.push(curCard);
      if(whatSort === "company"){
        const sorted = [...tmpArr].sort((a, b) => {
          if(a.company < b.company) { return -1; }
          if(a.company > b.company) { return 1; }
          return 0;
        });
        setApplications(sorted);
        localStorage.setItem("localArr", JSON.stringify(sorted));
        localStorage.setItem("backUp", JSON.stringify(sorted));
      }
      else if(whatSort === "dateApplied"){
        const sorted = [...tmpArr].sort((a, b) => {
          if(a.dateApplied > b.dateApplied) { return -1; }
          if(a.dateApplied < b.dateApplied) { return 1; }
          return 0;
        });
        setApplications(sorted);
        localStorage.setItem("localArr", JSON.stringify(sorted));
        localStorage.setItem("backUp", JSON.stringify(sorted));
      }
      else if(whatSort === "salary"){
        const sorted = [...tmpArr].sort((a, b) => {
          if(a.salary > b.salary) { return -1; }
          if(a.salary < b.salary) { return 1; }
          return 0;
        });
        setApplications(sorted);
        localStorage.setItem("localArr", JSON.stringify(sorted));
        localStorage.setItem("backUp", JSON.stringify(sorted));
      }
      else{
         const sorted = [...tmpArr].sort((a, b) => {
          if(a.dateApplied > b.dateApplied) { return -1; }
          if(a.dateApplied < b.dateApplied) { return 1; }
          return 0;
        });
        setApplications(sorted);
        localStorage.setItem("localArr", JSON.stringify(sorted));
        localStorage.setItem("backUp", JSON.stringify(sorted));
      }
      const arr = document.getElementsByTagName("INPUT");
      for(let i = 0; i < arr.length; i++){
        arr[i].value = "";
      }
      goHome();
    };
      require("./AddCard.css");
      return (
        <div className = "wholeCardPage">
          <div className="topBarCard">
            <div className="logo2"></div>
            <div className="siteNameDiv" onClick={goHome}>
              <label className="webNameCard" onClick={goHome}>GoHire</label>
            </div>
          </div>
          
          <div className = "cardAddCard">
            <div className="cardTop">
              <div className="backToHome" onClick={goHome}></div>
              <label className="cardTitle">Add An Application</label>
            </div>
            
            <form onSubmit={addCard}>
              <input className="cmpName" placeholder="Company Name" value={company} onChange={handleCompanyNameChange}></input>
              <input type="date" className="Date" value={dateApplied} onChange={handleDateChange}></input>
              <input className="Position" placeholder="Position" value={jobTitle} onChange={handlePositionChange}></input>
              <select className="Status" placeholder="Status" value={status} onChange={handleStatusChange}>
                <option value="Status">Status</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
                <option value="Pending">Pending</option>
                <option value="Negotiating">Negotiating</option>
              </select>
              <input className="Location" placeholder="Location" value={location} onChange={handleLocationChange}></input>
              <input className="Salary" placeholder="Salary/Wage" value={salary} onChange={handleSalaryChange}></input>
              <input className="Contact" placeholder="Company Contact" value={contact} onChange={handleContactChange}></input>
              <input className="AppNum" placeholder="Application Number" value={applicationNum} onChange={handleAppNumChange}></input>
              <textarea className="Description" type="text" placeholder="Description" value={jobDesc} onChange={handleDescriptionChange}></textarea>
              <button onClick={addCard} className="submitAddCard" type="button">Add Card</button>
            </form>
          </div>
        </div>
      );
}
  
  export default AddCard;