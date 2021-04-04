import './NotifCard.css';
import React from 'react';
import { useHistory } from 'react-router-dom';


const NotifCard = ({application, setCurDocument}) => {
  let history = useHistory();
  const viewAppli = ()=>{
    setCurDocument(application.docId);
    history.push(`/viewCard/?document=${application.docId}`);
  };
  return (
    <div onClick={viewAppli} className = "wholeNotiCard">
        <div className="notiCompany">{application.company}</div>
        <div className="notiDate">{application.dateApplied}</div>
        <div className="notiTitle">{application.jobTitle}</div>
    </div>
    );
}
  
  export default NotifCard;