import React from 'react';
import "./AddCard.css";

const AddCard = ({history}) => {
    const addCardFunct = () =>{
        console.log("Submit something");
    };
    const goHome = () =>{
      history.push("/");
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
              <input className="cmpName" placeholder="Company Name"></input>
              <input className="Date" placeholder="Date Applied dd/mm/yyyy"></input>
              <input className="Salary" placeholder="Salary/Wage"></input>
              <button className="submitAddCard" type="submit">Add Card</button>
            </form>
          </div>
        </div>
      );
}
  
  export default AddCard;