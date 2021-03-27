import './AppliCard.css';
import React from 'react';
import { useHistory } from 'react-router-dom';


const NotifCard = ({application, setCurDocument}) => {
  let history = useHistory();
  const viewAppli = ()=>{
    setCurDocument(application.docId);
    history.push(`/viewCard/?document=${application.docId}`);
  };
  return (
    <div onClick={viewAppli} className = "wholeAppliCard">
        <div className="label1">{application.company}</div>
        <div className="label2">{application.dateApplied}</div>
        <div className="label3">{application.jobTitle}</div>
    </div>
    );
}
  
  export default NotifCard;