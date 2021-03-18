import './AppliCard.css';
import React from 'react';


const AppliCard = ({application}) => {

  return (
    <div className = "wholeAppliCard">
        <div>{application.company}</div>
        <div>{application.dateApplied}</div>
        <div>{application.jobTitle}</div>
        <div>{application.salary}</div>
        <div>{application.status}</div>
    </div>
    );
}
  
  export default AppliCard;