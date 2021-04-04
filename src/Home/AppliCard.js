import './AppliCard.css';
import React from 'react';
import acceptedPic from "./Accepted.png";
import pendingPic from "./Pending.png";
import negotiatingPic from "./Negotiating.png";
import rejectedPic from "./Rejected.png";
import { useHistory } from 'react-router-dom';


const AppliCard = ({isGrid, application, setCurDocument}) => {
  let history = useHistory();
  let imgUrl = `${application.status}.png`;
  console.timeLog(imgUrl);
  const viewAppli = ()=>{

    setCurDocument(application.docId);
    console.log(application);
    console.log(application.docId);
    history.push(`/viewCard/?document=${application.docId}`);
  };
  const appliPic = ()=>{
    if(application.status === "Accepted")
      return acceptedPic;
    else if(application.status === "Pending")
      return pendingPic;
    else if(application.status === "Negotiating")
      return negotiatingPic;
    else if(application.status === "Rejected")
      return rejectedPic;
  };
  if(isGrid){
    return(
    <div onClick={viewAppli} className = "wholeAppliCard">
        <div className="appliComp">{application.company}</div>
        <img className="statusImg" src={appliPic()} title={application.status}></img>
        <div className="jobTitleAppliCard">{application.jobTitle}</div>
    </div>);
  }
  return (
    <div onClick={viewAppli} className="wholeAppliCardList">
      <div className="label1">{application.company}</div>
          <div className="label2">{application.dateApplied}</div>
          <div className="label3">{application.jobTitle}</div>
          <div className="label4">{application.status}</div>
          <div className="label5">{application.salary}</div>
    </div>
    
    );
}
  
  export default AppliCard;