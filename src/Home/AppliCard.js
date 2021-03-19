import './AppliCard.css';
import React from 'react';


const AppliCard = ({application}) => {

  return (
    <div className = "wholeAppliCard">
        <div className="label1">{application.company}</div>
        <div className="label2">{application.dateApplied}</div>
        <div className="label3">{application.jobTitle}</div>
        <div className="label4">{application.status}</div>
    </div>
    );
}
  
  export default AppliCard;