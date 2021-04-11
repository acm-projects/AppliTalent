import './Statistics.css';
import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
const Statistics = () => {
  let history = useHistory();
  let numAccepted = 0;
  let numRejected = 0;
  let numPending = 0;
  let numNegotiating = 0;
  const arr = JSON.parse(localStorage.getItem("localArr"));
  const numApplications = arr.length;
  let dataArr = new Map();
  /*for(let i = 0; i < numApplications; i++){
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
  }*/
  for(let i = 0; i < numApplications; i++){
    if(arr[i].status === "Rejected"){
      numRejected++;
    }
    else if(arr[i].status === "Accepted"){
      numAccepted++;
    }
    else if(arr[i].status === "Pending"){
      numPending++;
    }
    else if(arr[i].status === "Negotiating"){
      numNegotiating++;
    }
  }
  let total = numRejected + numAccepted + numPending + numNegotiating;
  let width = 800;
  let aNum = 1.0 * numAccepted / total * width; 
  let rNum = 1.0 * numRejected / total * width; 
  let pNum = 1.0 * numPending / total * width; 
  let nNum = 1.0 * numNegotiating / total * width; 
  const drawGraph = () =>{
    if(document.getElementsByClassName("aBar").length != 0){
      document.getElementsByClassName("aBar")[0].style.width = `${aNum}px`;
    }
    if(document.getElementsByClassName("rBar").length != 0){
      document.getElementsByClassName("rBar")[0].style.width = `${rNum}px`;
    }
    if(document.getElementsByClassName("pBar").length != 0){
      document.getElementsByClassName("pBar")[0].style.width = `${pNum}px`;
    }
    if(document.getElementsByClassName("nBar").length != 0){
      document.getElementsByClassName("nBar")[0].style.width = `${nNum}px`;
    }
  };
  useEffect(()=>{
   drawGraph();
  }, []);
  
  console.log(numRejected + " " + numAccepted + " " + numPending + " " + numNegotiating);
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
              <label className="cardTitle2">Your Application Statistics</label>
            </div>
            <div className="graphContainer">
              <div className="graphLabels">
                <div className="aLabel">Accepted</div>
                <div className="rLabel">Rejected</div>
                <div className="pLabel">Negotiating</div>
                <div className="nLabel">Pending</div>
              </div>
              
              <div className= "actualGraph">
                <div className="aBar"><div style={{float:"right" , marginTop:"40px",fontSize:"20px", marginRight:"-25px", fontFamily:"Arial"}}>{numAccepted}</div></div>
                <div className="rBar"><div style={{float:"right" , marginTop:"40px",fontSize:"20px", marginRight:"-25px", fontFamily:"Arial"}}>{numRejected}</div></div>
                <div className="nBar"><div style={{float:"right" , marginTop:"40px",fontSize:"20px", marginRight:"-25px", fontFamily:"Arial"}}>{numNegotiating}</div></div>
                <div className="pBar"><div style={{float:"right" , marginTop:"40px",fontSize:"20px", marginRight:"-25px", fontFamily:"Arial"}}>{numPending}</div></div>
                
              </div>
            </div>
          </div>
        </div>
    );
}

  export default Statistics;