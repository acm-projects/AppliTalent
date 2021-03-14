import React from 'react';
import "./AddCard.css";

const AddCard = () => {
    const addCardFunct = () =>{
        console.log("Submit something");
    }

  
      return (
        <div className = "wholeCardPage">
          <div className = "cardTopBar"></div>
          <div className = "cardAddCard">
              <form onSubmit={addCardFunct}>
                <input className="firstinput"></input>
                <button className="submitAddCard" type="submit"></button>
              </form>
            
          </div>
        </div>
      );
}
  
  export default AddCard;