import firebase from '../firebase';
import './Home.css';
import React from 'react';


const Home = () => {
    return (
      <div className = "wholeHome">
        <div className = "topBar">
        <img src="logo.png" width="80" height="80" alt="Computer Hope"></img>
          <div className="webNameDiv">
            <label className="webName">GoHire</label>
          </div>
        {/*<img src="NotifBell.png" width="100" height="80" alt="Computer Hope"></img>
          <button onClick={flipLogin} className="signUpButton">Sign up</button>
          
          
          <img src="logo.png" width="80" height="80" alt="Computer Hope"></img>
            <p>
              GoHire
            </p>
          <div className="NotifBell.png"></div>*/}
        
      </div>
      
      </div>
      
    );
  }
  
  export default Home;