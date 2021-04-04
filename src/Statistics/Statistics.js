import firebase from '../firebase';
import './Statistics.css';
import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
const Statistics = () => {
  let numHired = 0;
  let numRejected = 0;
  let numPending = 0;
  let numNegotiating = 0;
  const arr = JSON.parse(localStorage.getItem("localArr"));
  const numApplications = arr.length;

  for(let i = 0; i < numApplications; i++){
    if(arr[i].status === "Rejected"){
      numRejected++;
    }
    else if(arr[i].status === "Accepted"){
      numHired++;
    }
    else if(arr[i].status === "Pending"){
      numPending++;
    }
    else if(arr[i].status === "Negotiating"){
      numNegotiating++;
    }
  }
      
  return(
  <div>
      <h2>Total applications: {numApplications}</h2>
      <h2>Accepeted: {numHired}</h2>
      <h2>Rejected: {numRejected}</h2>
      <h2>Pending: {numPending}</h2>
      <h2>Negotiating: {numNegotiating}</h2>
  </div>);
}
  export default Statistics;