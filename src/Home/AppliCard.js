import './AppliCard.css';
import React from 'react';
import { useHistory } from 'react-router-dom';


const AppliCard = ({application, setCurDocument}) => {
  let history = useHistory();
  const viewAppli = ()=>{

    setCurDocument(application.docId);
    console.log(application);
    console.log(application.docId);
    history.push(`/viewCard/?document=${application.docId}`);
  };
  return (
    <div onClick={viewAppli} className = "wholeAppliCard">
        <div className="label1">{application.company}</div>
        <div className="label2">{application.dateApplied}</div>
        <div className="label3">{application.jobTitle}</div>
        <div className="label4">{application.status}</div>
        <div className="label5">{application.salary}</div>
    </div>
    );
}
  
  export default AppliCard;