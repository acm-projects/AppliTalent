import './appliCard.css';
import React from 'react';


const AppliCard = (props) => {

  return (
    <div className = "wholeAppliCard">
        <div>{props.companyName}</div>
        <div>{props.locationName}</div>
        <div>{props.salaryValue}</div>
    </div>
    );
}
  
  export default AppliCard;