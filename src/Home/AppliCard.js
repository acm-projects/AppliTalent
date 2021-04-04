import './AppliCard.css';
import React from 'react';
import { useHistory } from 'react-router-dom';


const AppliCard = ({isGrid, application, setCurDocument}) => {
  let history = useHistory();
  const viewAppli = ()=>{

    setCurDocument(application.docId);
    console.log(application);
    console.log(application.docId);
    history.push(`/viewCard/?document=${application.docId}`);
  };
  if(isGrid){
    return(
    <div onClick={viewAppli} className = "wholeAppliCard">
        <div className="appliComp">{application.company}</div>
        <div style={{
          backgroundImage: `${application.status}.png`
        }} className="statusPic"></div>
    </div>);
  }
  return (
  <div></div>
    
    );
}
  
  export default AppliCard;