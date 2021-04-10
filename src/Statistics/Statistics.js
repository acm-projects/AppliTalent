import './Statistics.css';
import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
const Statistics = () => {
  let history = useHistory();
  let numHired = 0;
  let numRejected = 0;
  let numPending = 0;
  let numNegotiating = 0;
  const arr = JSON.parse(localStorage.getItem("localArr"));
  const numApplications = arr.length;
  let dataArr = new Map();
  for(let i = 0; i < numApplications; i++){
    if(!dataArr.has(arr[i].dateApplied.substring(0, 4))){
      dataArr.set(arr[i].dateApplied.substring(0, 4), {
        aCount: 0,
        rCount: 0,
        pCount: 0,
        nCount: 0
      });
    }
    if(arr[i].status === "Rejected" && dataArr.has(arr[i].dateApplied.substring(0, 4))){
      dataArr.get(arr[i].dateApplied.substring(0, 4)).rCount++;
    }
    else if(arr[i].status === "Accepted"&& dataArr.has(arr[i].dateApplied.substring(0, 4))){
      dataArr.get(arr[i].dateApplied.substring(0, 4)).aCount++;
    }
    else if(arr[i].status === "Pending"&& dataArr.has(arr[i].dateApplied.substring(0, 4))){
      dataArr.get(arr[i].dateApplied.substring(0, 4)).pCount++;
    }
    else if(arr[i].status === "Negotiating"&& dataArr.has(arr[i].dateApplied.substring(0, 4))){
      dataArr.get(arr[i].dateApplied.substring(0, 4)).nCount++;
    }
    console.log(dataArr);
  }
  
  const goHome = () =>{
      history.push("/");
    };
  return(
     <div className = "wholeStatsPage">
          <div className="topBarCard">
            <div className="logo2"></div>
            <div className="siteNameDiv" onClick={goHome}>
              <label className="webNameCard" onClick={goHome}>GoHire</label>
            </div>
          </div>
          
          <div className = "cardAddCard2">
            <div className="cardTop2">
              <div className="backToHome2" onClick={goHome}></div>
              <label className="cardTitle2">App Statistics</label>
            </div>
            <div className="graphContainer">
            </div>
          </div>
        </div>
    );
}

  export default Statistics;