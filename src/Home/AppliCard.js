import './AppliCard.css';
import React from 'react';


const AppliCard = ({application}) => {

  return (
    <div className = "wholeAppliCard">
        <div>{application.companyName}</div>
        <div>{application.date}</div>
        <div>{application.salary}</div>
    </div>
    );
}
  
  export default AppliCard;