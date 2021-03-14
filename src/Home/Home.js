import firebase from '../firebase';
import './Home.css';
import React from 'react';


const Home = () => {
    return (
      <div className = "wholeHome">
        <div className = "top"></div>
        <p>In the homepage</p>
        <button onClick={()=>firebase.auth().signOut()}>Sign out</button>
      </div>
    );
  }
  
  export default Home;