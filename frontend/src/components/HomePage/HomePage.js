import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { NavLink } from 'react-router-dom';
import ModalInFunctionalComponent from '../ModalComponent/ModalComponent'
// import './SignupForm.css';

function HomePage() {
//   const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false)
  const sessionUser = useSelector((state) => state.session.user);
  useEffect(()=>{
    
    if (localStorage.getItem('hasVisited') == null) {
      setShowModal(true)
      localStorage.setItem('hasVisited', 'true');
    }
    
    
  },[])

  if (sessionUser) return <Redirect to="/properties" />;


  return (
    <>
    {showModal && <ModalInFunctionalComponent  />}
      <h1>Your are not currently logged in</h1>
      <h2><NavLink to="/signup">Sign Up</NavLink></h2>  
      {/* <p>or</p> */}
      <h2><NavLink to="/login">Login</NavLink></h2>
    </>
  );
}

export default HomePage;