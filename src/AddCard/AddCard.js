import React, {useState} from 'react';
import "./AddCard.css";
import firebase from '../firebase';

const AddCard = ({history}) => {

    const [companyName, setCompanyName] = useState("");
    const [date, setDate] = useState("");
    const [salary, setSalary] = useState("");

    const handleCompanyNameChange = (e) => {
      setCompanyName(e.target.value);
    };

    const handleDateChange = (e) => {
      setDate(e.target.value);
    };

    const handleSalaryChange = (e) => {
      setSalary(e.target.value);
    };

    const addCardFunct = () =>{
        console.log("Submit something");
    };
    const goHome = () =>{
      history.push("/");
    };

    const addCard = () => {
      const applicationRef = firebase.firestore().collection("Applications");
      const application = {
        companyName,
        date,
        salary,
      };
      applicationRef.add(application);
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
            
            <form onSubmit={addCardFunct}>
              <input className="cmpName" placeholder="Company Name" value={companyName} onChange={handleCompanyNameChange}></input>
              <input type="date" className="Date" value={date} onChange={handleDateChange}></input>
              <input className="Salary" placeholder="Salary/Wage" value={salary} onChange={handleSalaryChange}></input>
              <button className="submitAddCard" type="submit">Add Card</button>
            </form>
          </div>
        </div>
      );
}
  
  export default AddCard;