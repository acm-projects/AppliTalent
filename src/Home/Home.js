import firebase from '../firebase';
import './Home.css';
import React from 'react';


class Home extends React.Component{


  
    render(){
      return (
        <div className = "wholeHome">
          <div className = "top"></div>
          <p>In the homepage</p>
          <button onClick={()=>firebase.auth().signOut()}>Sign out</button>
        </div>
      );
    }
  }
  
  export default Home;