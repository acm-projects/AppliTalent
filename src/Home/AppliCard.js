import './AppliCard.css';
import React from 'react';


const AppliCard = ({application}) => {

  return (
    <div className = "wholeAppliCard">
        <div><p>{application.company}</p></div>
        <div><p>{application.dateApplied}</p></div>
        <div><p>{application.salary}</p></div>
    </div>
    );
}
  
  export default AppliCard;